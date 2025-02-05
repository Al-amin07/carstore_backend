"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const route_1 = __importDefault(require("./app/route"));
const notFound_1 = require("./app/middleware/notFound");
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = require("./app/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://project-44.netlify.app'],
    credentials: true,
}));
exports.stripe = new stripe_1.default(config_1.config.stripe_secret);
app.use((0, cookie_parser_1.default)());
app.use('/api', route_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Car Store',
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
