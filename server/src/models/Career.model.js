"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const CareerSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Career title is required'],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    skills: {
        type: [String],
        required: [true, 'Skills are required'],
    },
    personalityTraits: {
        type: [String],
        required: [true, 'Personality traits are required'],
    },
    educationRequirements: {
        type: [String],
        required: [true, 'Education requirements are required'],
    },
    jobOutlook: {
        type: String,
        required: [true, 'Job outlook is required'],
    },
    averageSalary: {
        type: String,
        required: [true, 'Average salary is required'],
    },
    colleges: [
        {
            name: {
                type: String,
                required: [true, 'College name is required'],
            },
            location: {
                type: String,
                required: [true, 'College location is required'],
            },
            ranking: {
                type: Number,
            },
        },
    ],
    entranceExams: [
        {
            name: {
                type: String,
                required: [true, 'Exam name is required'],
            },
            description: {
                type: String,
            },
            website: {
                type: String,
            },
        },
    ],
    eligibility: {
        minGrade: {
            type: String,
        },
        subjects: {
            type: [String],
        },
        requirements: {
            type: [String],
        },
    },
    applicationProcess: {
        steps: {
            type: [String],
            required: [true, 'Application steps are required'],
        },
        deadlines: {
            type: [String],
        },
        documents: {
            type: [String],
        },
    },
    relatedCareers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Career',
        },
    ],
}, {
    timestamps: true,
});
// Add text index for searching
CareerSchema.index({
    title: 'text',
    description: 'text',
    skills: 'text',
    personalityTraits: 'text'
});
exports.default = mongoose_1.default.model('Career', CareerSchema);
