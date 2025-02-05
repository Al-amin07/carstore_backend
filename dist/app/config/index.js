"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.config = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refrest_token_secret: process.env.REFREST_TOKEN_SECRET,
    access_token_expire_date: process.env.ACCESS_TOKEN_EXPIRE_DATE,
    refresh_token_expire_date: process.env.REFREST_TOKEN_EXPIRE_DATE,
    cloudnary_api: process.env.CLOUDINARY_API,
    stripe_secret: process.env.STRIPE_SECRET,
};
