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
exports.getSavedCareers = exports.removeSavedCareer = exports.saveCareer = exports.updateProfile = exports.getProfile = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const Career_model_1 = __importDefault(require("../models/Career.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// Get user profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = yield User_model_1.default.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getProfile = getProfile;
// Update user profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const { name, email, grade } = req.body;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Check if email is already taken
        if (email) {
            const existingUser = yield User_model_1.default.findOne({ email, _id: { $ne: userId } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
        }
        // Update user with provided fields
        const updateData = {};
        if (name)
            updateData.name = name;
        if (email)
            updateData.email = email;
        if (grade)
            updateData.grade = grade;
        const updatedUser = yield User_model_1.default.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateProfile = updateProfile;
// Save a career to user's saved list
const saveCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const careerId = req.params.careerId;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(careerId)) {
            return res.status(400).json({ message: 'Invalid career ID' });
        }
        // Check if career exists
        const career = yield Career_model_1.default.findById(careerId);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        // Add career to user's saved careers if not already saved
        const user = yield User_model_1.default.findByIdAndUpdate(userId, { $addToSet: { savedCareers: careerId } }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'Career saved successfully',
            savedCareers: user.savedCareers
        });
    }
    catch (error) {
        console.error('Error saving career:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.saveCareer = saveCareer;
// Remove a saved career
const removeSavedCareer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const careerId = req.params.careerId;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(careerId)) {
            return res.status(400).json({ message: 'Invalid career ID' });
        }
        // Remove career from user's saved careers
        const user = yield User_model_1.default.findByIdAndUpdate(userId, { $pull: { savedCareers: careerId } }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            message: 'Career removed from saved list',
            savedCareers: user.savedCareers
        });
    }
    catch (error) {
        console.error('Error removing saved career:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.removeSavedCareer = removeSavedCareer;
// Get all saved careers
const getSavedCareers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = yield User_model_1.default.findById(userId).populate('savedCareers');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.savedCareers);
    }
    catch (error) {
        console.error('Error fetching saved careers:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getSavedCareers = getSavedCareers;
