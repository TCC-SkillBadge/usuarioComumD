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
exports.getBadgesByUserEmail = exports.confirmAssignment = exports.assignBadge = void 0;
const BadgeAssignment_1 = __importDefault(require("../models/BadgeAssignment"));
const emailService_1 = require("./emailService");
const uuid_1 = require("uuid");
const assignBadge = (email_com, email_empr, id_badge, imagem_b) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmation_token = (0, uuid_1.v4)();
    const dt_emissao = new Date();
    const dt_vencimento = new Date();
    dt_vencimento.setFullYear(dt_emissao.getFullYear() + 1);
    const badgeAssignment = yield BadgeAssignment_1.default.create({
        dt_emissao,
        dt_vencimento,
        email_com,
        email_empr,
        id_badge,
        imagem_b,
        confirmation_token
    });
    yield (0, emailService_1.sendConfirmationEmail)(email_com, confirmation_token);
    return badgeAssignment;
});
exports.assignBadge = assignBadge;
const confirmAssignment = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const badgeAssignment = yield BadgeAssignment_1.default.findOne({ where: { confirmation_token: token } });
    if (!badgeAssignment) {
        throw new Error('Token de confirmação inválido');
    }
    // Confirmar a atribuição (pode adicionar lógica adicional aqui)
    badgeAssignment.confirmation_token = '';
    yield badgeAssignment.save();
    return badgeAssignment;
});
exports.confirmAssignment = confirmAssignment;
const getBadgesByUserEmail = (email_com) => __awaiter(void 0, void 0, void 0, function* () {
    return yield BadgeAssignment_1.default.findAll({ where: { email_com } });
});
exports.getBadgesByUserEmail = getBadgesByUserEmail;
