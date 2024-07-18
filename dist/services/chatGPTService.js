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
exports.generateDescription = void 0;
const axios_1 = __importDefault(require("axios"));
const generateDescription = (skills) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Descreva as habilidades do usuário com base nas seguintes pontuações: ${JSON.stringify(skills)}`,
        max_tokens: 150,
        temperature: 0.7,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    });
    return response.data.choices[0].text;
});
exports.generateDescription = generateDescription;
