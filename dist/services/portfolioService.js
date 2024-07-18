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
exports.createPortfolio = void 0;
const Portfolio_1 = __importDefault(require("../models/Portfolio"));
const userService_1 = require("./userService");
const chatGPTService_1 = require("./chatGPTService");
const pdfGenerator_1 = require("../utils/pdfGenerator");
const createPortfolio = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield (0, userService_1.getInfo)(email);
    const userBadges = yield (0, userService_1.getUserBadges)(email);
    const userSkills = yield (0, userService_1.getUserSkills)(email);
    // Assumindo que as badges possuem uma propriedade 'descricao' ou similar.
    const badgeDescriptions = userBadges.map(badge => badge.descricao).join(' '); // Ajuste conforme a propriedade correta
    const skillsText = yield (0, chatGPTService_1.generateDescription)(userSkills);
    const pdfBuffer = (0, pdfGenerator_1.generatePDF)(userInfo, badgeDescriptions, skillsText);
    const portfolio = yield Portfolio_1.default.create({
        userId: email,
        title: 'Meu Portfólio',
        description: 'Portfólio com badges e habilidades'
    });
    return { portfolio, pdfBuffer };
});
exports.createPortfolio = createPortfolio;
