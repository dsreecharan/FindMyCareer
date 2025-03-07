"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapScoresToCareers = exports.loadMasterCareerData = exports.loadCareerRecommendationData = exports.parseCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
/**
 * Parses a CSV file and returns the data as an array of objects
 * @param filePath Path to the CSV file
 * @returns Promise that resolves to an array of objects
 */
const parseCSV = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const results = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
            .on('end', () => {
            resolve(results);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
});
exports.parseCSV = parseCSV;
/**
 * Loads career recommendation data from CSV
 * @returns Promise that resolves to career recommendation data
 */
const loadCareerRecommendationData = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, '../../uploads/career_recommendation_dataset.csv');
    return (0, exports.parseCSV)(filePath);
});
exports.loadCareerRecommendationData = loadCareerRecommendationData;
/**
 * Loads master career data from CSV
 * @returns Promise that resolves to master career data
 */
const loadMasterCareerData = () => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.join(__dirname, '../../uploads/master_career_dataset.csv');
    return (0, exports.parseCSV)(filePath);
});
exports.loadMasterCareerData = loadMasterCareerData;
/**
 * Maps test scores to career recommendations
 * @param scores User's test scores
 * @param recommendationData Career recommendation data from CSV
 * @returns Array of recommended career IDs sorted by match percentage
 */
const mapScoresToCareers = (scores, recommendationData) => {
    // Calculate match percentage for each career
    const careerMatches = recommendationData.map((career) => {
        let totalMatchPoints = 0;
        let totalPossiblePoints = 0;
        // Compare scores with threshold values in the recommendation data
        Object.keys(scores).forEach((scoreKey) => {
            const userScore = scores[scoreKey];
            const thresholdKey = `${scoreKey}Threshold`;
            if (career[thresholdKey]) {
                const threshold = parseFloat(career[thresholdKey]);
                const weight = career[`${scoreKey}Weight`] ? parseFloat(career[`${scoreKey}Weight`]) : 1;
                totalPossiblePoints += weight;
                if (userScore >= threshold) {
                    totalMatchPoints += weight;
                }
            }
        });
        const matchPercentage = totalPossiblePoints > 0
            ? (totalMatchPoints / totalPossiblePoints) * 100
            : 0;
        return {
            careerId: career.careerId,
            careerTitle: career.careerTitle,
            matchPercentage: Math.round(matchPercentage),
        };
    });
    // Sort by match percentage (highest first)
    return careerMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
};
exports.mapScoresToCareers = mapScoresToCareers;
