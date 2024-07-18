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
exports.getUserSkills = exports.getUserBadges = exports.getInfo = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDao_1 = require("../dao/userDao");
const badgeDao_1 = require("../dao/badgeDao");
const axios_1 = __importDefault(require("axios"));
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullName, occupation, country } = userData;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield (0, userDao_1.createUser)({ email, password: hashedPassword, fullName, occupation, country });
    return user;
});
exports.register = register;
const login = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const user = yield (0, userDao_1.getUserByEmail)(email);
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return token;
});
exports.login = login;
const getInfo = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, userDao_1.getUserById)(email);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
});
exports.getInfo = getInfo;
const getUserBadges = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, badgeDao_1.getBadgesByUserEmail)(email);
});
exports.getUserBadges = getUserBadges;
const getUserSkills = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`http://skills-service/api/skills?email=${email}`);
    return response.data;
});
exports.getUserSkills = getUserSkills;
