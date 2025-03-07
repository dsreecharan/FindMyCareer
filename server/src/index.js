"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const career_routes_1 = __importDefault(require("./routes/career.routes"));
const test_routes_1 = __importDefault(require("./routes/test.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Create upload directory if it doesn't exist
const uploadsDir = path_1.default.join(__dirname, '../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Database connection
mongoose_1.default
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/findmycareer')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/careers', career_routes_1.default);
app.use('/api/tests', test_routes_1.default);
app.use('/api/users', user_routes_1.default);
// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to FindMyCareer API' });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
