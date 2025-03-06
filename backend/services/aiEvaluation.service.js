const axios = require('axios');
const College = require('../models/college.model');

class AIEvaluationService {
    constructor() {
        this.ollamaEndpoint = process.env.OLLAMA_URL || 'http://localhost:11434';
        this.model = process.env.OLLAMA_MODEL || 'deepseek-r1:8b';
        console.log('AI Evaluation Service initialized with:', {
            endpoint: this.ollamaEndpoint,
            model: this.model
        });
    }

    async checkOllamaConnection() {
        try {
            console.log('Checking Ollama connection...');
            const response = await axios.get(`${this.ollamaEndpoint}/api/version`);
            console.log('Ollama connection successful:', response.data);
            return true;
        } catch (error) {
            console.error('Ollama server connection error:', error.message);
            return false;
        }
    }

    async generatePrompt(assessmentResults, userProfile) {
        console.log('Generating prompt for user:', userProfile.name);
        
        // Process answers to include question categories
        const personalityAnswers = assessmentResults.filter(a => a.questionId && a.questionId.category === 'personality');
        const skillsAnswers = assessmentResults.filter(a => a.questionId && a.questionId.category === 'skills');
        const interestsAnswers = assessmentResults.filter(a => a.questionId && a.questionId.category === 'interests');
        const valuesAnswers = assessmentResults.filter(a => a.questionId && a.questionId.category === 'values');

        const prompt = `Analyze these assessment responses and provide a career recommendation in this exact format:

CAREER: [career name]
STRENGTHS: [3 key strengths]
AREAS: [2 development areas]
STEPS: [3 next steps]

Student: ${userProfile.name}
Grade: ${userProfile.grade || 'Not specified'}

Responses:
${personalityAnswers.map(a => `${a.questionText}: ${a.selectedOption.text}`).join('\n')}
${skillsAnswers.map(a => `${a.questionText}: ${a.selectedOption.text}`).join('\n')}
${interestsAnswers.map(a => `${a.questionText}: ${a.selectedOption.text}`).join('\n')}
${valuesAnswers.map(a => `${a.questionText}: ${a.selectedOption.text}`).join('\n')}

Keep responses brief and direct.`;

        console.log('Generated prompt length:', prompt.length);
        return prompt;
    }

    analyzeResponse(response) {
        if (response.toLowerCase().includes('very') || response.toLowerCase().includes('excellent')) {
            return 'a strong preference or capability';
        } else if (response.toLowerCase().includes('good') || response.toLowerCase().includes('comfortable')) {
            return 'moderate confidence or interest';
        } else if (response.toLowerCase().includes('sometimes') || response.toLowerCase().includes('somewhat')) {
            return 'an area for potential development';
        } else {
            return 'an area worth exploring further';
        }
    }

    async evaluateAssessment(assessmentResults, userProfile) {
        try {
            console.log('Starting assessment evaluation for user:', userProfile.name);
            
            // Check Ollama connection
            const isOllamaAvailable = await this.checkOllamaConnection();
            if (!isOllamaAvailable) {
                console.error('Ollama server is not available');
                return {
                    success: false,
                    error: 'Ollama server is not available. Please ensure it is running.',
                    rawError: null
                };
            }

            const prompt = await this.generatePrompt(assessmentResults, userProfile);
            
            try {
                console.log('Sending request to Ollama...');
                const response = await axios.post(`${this.ollamaEndpoint}/api/generate`, {
                    model: this.model,
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: 0.7,
                        top_p: 0.9,
                        top_k: 40,
                        num_predict: 2000
                    }
                });

                console.log('Received response from Ollama');
                if (!response.data || !response.data.response) {
                    console.error('Invalid response from Ollama:', response.data);
                    throw new Error('Invalid response from Ollama');
                }

                const aiResponse = response.data.response;
                console.log('AI Response length:', aiResponse.length);
                
                const sections = this.parseAIResponse(aiResponse);
                console.log('Parsed AI response sections:', Object.keys(sections));

                // Get college recommendations based on career path
                const collegeRecommendations = await this.getCollegeRecommendations(sections.careerPath);
                console.log('College recommendations generated');

                return {
                    success: true,
                    evaluation: {
                        ...sections,
                        collegeRecommendations
                    },
                    rawResponse: aiResponse
                };
            } catch (error) {
                console.error('Error during Ollama API call:', error);
                if (error.code === 'ECONNREFUSED') {
                    return {
                        success: false,
                        error: 'Could not connect to Ollama server. Please ensure it is running.',
                        rawError: error
                    };
                }
                throw error;
            }
        } catch (error) {
            console.error('AI Evaluation Error:', error);
            return {
                success: false,
                error: error.message || 'Error during AI evaluation',
                rawError: error,
                details: {
                    stack: error.stack,
                    code: error.code
                }
            };
        }
    }

    parseAIResponse(response) {
        try {
            console.log('Parsing AI response...');
            
            // Remove the think section if present
            const cleanResponse = response.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
            console.log('Cleaned AI response:', cleanResponse);
            
            // Initialize result object
            const result = {
                careerPath: '',
                strengths: [],
                developmentAreas: [],
                nextSteps: [],
                collegeRecommendations: {
                    government: [],
                    private: [],
                    international: []
                }
            };

            // Extract career path
            const careerMatch = cleanResponse.match(/CAREER:\s*([^\n]+)/);
            if (careerMatch) {
                result.careerPath = careerMatch[1].trim();
                console.log('Found career path:', result.careerPath);
            }

            // Extract strengths
            const strengthsMatch = cleanResponse.match(/STRENGTHS:\s*([^\n]+)/);
            if (strengthsMatch) {
                result.strengths = strengthsMatch[1]
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
                console.log('Found strengths:', result.strengths);
            }

            // Extract development areas
            const areasMatch = cleanResponse.match(/AREAS:\s*([^\n]+)/);
            if (areasMatch) {
                result.developmentAreas = areasMatch[1]
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
                console.log('Found development areas:', result.developmentAreas);
            }

            // Extract next steps
            const stepsMatch = cleanResponse.match(/STEPS:\s*([^\n]+)/);
            if (stepsMatch) {
                result.nextSteps = stepsMatch[1]
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s.length > 0);
                console.log('Found next steps:', result.nextSteps);
            }

            // Log final parsed result
            console.log('Final parsed result:', {
                careerPath: result.careerPath,
                strengthsCount: result.strengths.length,
                developmentAreasCount: result.developmentAreas.length,
                nextStepsCount: result.nextSteps.length
            });

            return result;
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return {
                careerPath: 'Career path analysis temporarily unavailable',
                strengths: ['Please try again later'],
                developmentAreas: ['Please try again later'],
                nextSteps: ['Please try again later'],
                collegeRecommendations: {
                    government: [],
                    private: [],
                    international: []
                }
            };
        }
    }

    async getCollegeRecommendations(careerPath) {
        try {
            console.log('Getting college recommendations for career path:', careerPath);
            
            if (!careerPath || careerPath.trim() === '' || careerPath === 'Career path analysis temporarily unavailable') {
                console.log('No valid career path provided, returning empty recommendations');
                return {
                    government: [],
                    private: [],
                    international: []
                };
            }
            
            // Improved career path cleaning and keyword extraction
            const cleanCareerPath = careerPath
                .replace(/\*\*/g, '')
                .replace(/^[*-]\s*/, '')
                .replace(/^Recommended Career Path:\s*/, '')
                .trim();

            // Extract meaningful keywords from the career path
            const keywords = cleanCareerPath
                .split(/[\s,&]+/)
                .filter(word => word.length > 2)
                .map(word => new RegExp(word, 'i'));

            console.log('Extracted keywords for search:', keywords);

            // Search for colleges using multiple keywords
            const colleges = await College.find({
                $and: [
                    { isActive: true },
                    {
                        $or: [
                            { careers: { $in: keywords } },
                            { courses: { $in: keywords } },
                            { specializations: { $in: keywords } }
                        ]
                    }
                ]
            })
            .sort({ ranking: 1 })
            .limit(10);

            // Group and sort recommendations
            const recommendations = {
                government: colleges
                    .filter(c => c.type === 'government')
                    .sort((a, b) => (b.ranking || 999) - (a.ranking || 999))
                    .slice(0, 3),
                private: colleges
                    .filter(c => c.type === 'private')
                    .sort((a, b) => (b.ranking || 999) - (a.ranking || 999))
                    .slice(0, 3),
                international: colleges
                    .filter(c => c.type === 'international')
                    .sort((a, b) => (b.ranking || 999) - (a.ranking || 999))
                    .slice(0, 3)
            };

            console.log('Found college recommendations:', {
                government: recommendations.government.length,
                private: recommendations.private.length,
                international: recommendations.international.length
            });

            return recommendations;
        } catch (error) {
            console.error('Error getting college recommendations:', error);
            return {
                government: [],
                private: [],
                international: []
            };
        }
    }
}

// Export a singleton instance with error handling
let aiEvaluationService;
try {
    aiEvaluationService = new AIEvaluationService();
} catch (error) {
    console.error('Error creating AIEvaluationService:', error);
    aiEvaluationService = {
        evaluateAssessment: async () => ({
            success: false,
            error: 'AI Evaluation Service is not available',
            rawError: null
        })
    };
}

module.exports = aiEvaluationService; 