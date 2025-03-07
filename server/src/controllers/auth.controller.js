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
exports.verifyToken = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, grade } = req.body;
        // Check if user already exists
        const existingUser = yield User_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        const user = new User_model_1.default({
            name,
            email,
            password,
            grade,
        });
        // Save user to database
        yield user.save();
        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';
        const token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email }, jwtSecret, { expiresIn: '30d' });
        // Return token and user (without password)
        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            grade: user.grade,
        };
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});
exports.register = register;
// Login user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = yield User_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';
        const token = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name, email: user.email }, jwtSecret, { expiresIn: '30d' });
        // Return token and user (without password)
        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            grade: user.grade,
        };
        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});
exports.login = login;
// Verify token
const verifyToken = (req, res) => {
    // If we've reached this point, the auth middleware has already verified the token
    res.json({ isValid: true, user: req.user });
};
exports.verifyToken = verifyToken;
