"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
// All routes require authentication
router.use(auth_middleware_1.authMiddleware);
// Get user profile
router.get('/profile', user_controller_1.getProfile);
// Update user profile
router.put('/profile', user_controller_1.updateProfile);
// Save a career to user's saved list
router.post('/careers/save/:careerId', user_controller_1.saveCareer);
// Remove a saved career
router.delete('/careers/save/:careerId', user_controller_1.removeSavedCareer);
// Get all saved careers
router.get('/careers/saved', user_controller_1.getSavedCareers);
exports.default = router;
