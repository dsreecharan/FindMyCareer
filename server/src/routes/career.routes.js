"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const career_controller_1 = require("../controllers/career.controller");
const router = express_1.default.Router();
// Get all careers
router.get('/', career_controller_1.getAllCareers);
// Get a career by ID
router.get('/:id', career_controller_1.getCareerById);
// Get multiple careers by IDs
router.post('/batch', career_controller_1.getCareersByIds);
// Search careers
router.get('/search/:query', career_controller_1.searchCareers);
exports.default = router;
