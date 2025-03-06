import { Request, Response } from 'express';
import User from '../models/User.model';
import Career from '../models/Career.model';
import mongoose from 'mongoose';

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { name, email, grade } = req.body;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    // Check if email is already taken
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }
    
    // Update user with provided fields
    const updateData: { [key: string]: any } = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (grade) updateData.grade = grade;
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'Profile updated successfully', 
      user: updatedUser 
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Save a career to user's saved list
export const saveCareer = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const careerId = req.params.careerId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(careerId)) {
      return res.status(400).json({ message: 'Invalid career ID' });
    }
    
    // Check if career exists
    const career = await Career.findById(careerId);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    
    // Add career to user's saved careers if not already saved
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedCareers: careerId } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'Career saved successfully', 
      savedCareers: user.savedCareers 
    });
  } catch (error) {
    console.error('Error saving career:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove a saved career
export const removeSavedCareer = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const careerId = req.params.careerId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (!mongoose.Types.ObjectId.isValid(careerId)) {
      return res.status(400).json({ message: 'Invalid career ID' });
    }
    
    // Remove career from user's saved careers
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedCareers: careerId } },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'Career removed from saved list', 
      savedCareers: user.savedCareers 
    });
  } catch (error) {
    console.error('Error removing saved career:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all saved careers
export const getSavedCareers = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const user = await User.findById(userId).populate('savedCareers');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.savedCareers);
  } catch (error) {
    console.error('Error fetching saved careers:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 