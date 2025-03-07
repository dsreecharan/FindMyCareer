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
exports.searchCareers = exports.getCareersByIds = exports.getCareerById = exports.getAllCareers = void 0;
const Career_model_1 = __importDefault(require("../models/Career.model"));
const mongoose_1 = __importDefault(require("mongoose"));
// Get all careers
const getAllCareers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const careers = yield Career_model_1.default.find().select('title description skills averageSalary');
        res.json(careers);
    }
    catch (error) {
        console.error('Error fetching careers:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllCareers = getAllCareers;
// Get a career by ID
const getCareerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const career = yield Career_model_1.default.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career not found' });
        }
        res.json(career);
    }
    catch (error) {
        console.error('Error fetching career by id:', error);
        if (error instanceof mongoose_1.default.Error.CastError) {
            return res.status(400).json({ message: 'Invalid career ID' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getCareerById = getCareerById;
// Get multiple careers by IDs
const getCareersByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: 'Career IDs must be provided as an array' });
        }
        // Validate each ID is a valid ObjectId
        const validIds = ids.filter((id) => mongoose_1.default.Types.ObjectId.isValid(id));
        const careers = yield Career_model_1.default.find({ _id: { $in: validIds } });
        res.json(careers);
    }
    catch (error) {
        console.error('Error fetching careers by ids:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getCareersByIds = getCareersByIds;
// Search careers
const searchCareers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.params.query;
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        // Search using text index
        const careers = yield Career_model_1.default.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .limit(20)
            .select('title description skills');
        res.json(careers);
    }
    catch (error) {
        console.error('Error searching careers:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.searchCareers = searchCareers;
