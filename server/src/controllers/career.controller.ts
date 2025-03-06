import { Request, Response } from 'express';
import Career from '../models/Career.model';
import mongoose from 'mongoose';

// Get all careers
export const getAllCareers = async (req: Request, res: Response) => {
  try {
    const careers = await Career.find().select('title description skills averageSalary');
    res.json(careers);
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a career by ID
export const getCareerById = async (req: Request, res: Response) => {
  try {
    const career = await Career.findById(req.params.id);
    
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    
    res.json(career);
  } catch (error) {
    console.error('Error fetching career by id:', error);
    
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid career ID' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// Get multiple careers by IDs
export const getCareersByIds = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Career IDs must be provided as an array' });
    }
    
    // Validate each ID is a valid ObjectId
    const validIds = ids.filter((id: string) => mongoose.Types.ObjectId.isValid(id));
    
    const careers = await Career.find({ _id: { $in: validIds } });
    
    res.json(careers);
  } catch (error) {
    console.error('Error fetching careers by ids:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search careers
export const searchCareers = async (req: Request, res: Response) => {
  try {
    const query = req.params.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Search using text index
    const careers = await Career.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(20)
    .select('title description skills');
    
    res.json(careers);
  } catch (error) {
    console.error('Error searching careers:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 