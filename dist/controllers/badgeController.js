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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBadgesController = exports.confirmBadgeController = exports.assignBadgeController = void 0;
const authService_1 = require("../services/authService");
const badgeService_1 = require("../services/badgeService");
const assignBadgeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email_com, email_empr, id_badge, imagem_b } = req.body;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).send('Token não fornecido');
        }
        const decoded = (0, authService_1.verifyToken)(token);
        if (decoded.email !== email_empr) {
            return res.status(403).send('Usuário não autorizado');
        }
        const badgeAssignment = yield (0, badgeService_1.assignBadge)(email_com, email_empr, id_badge, imagem_b);
        res.status(201).json(badgeAssignment);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Erro desconhecido');
        }
    }
});
exports.assignBadgeController = assignBadgeController;
const confirmBadgeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const badgeAssignment = yield (0, badgeService_1.confirmAssignment)(token);
        res.status(200).json(badgeAssignment);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Erro desconhecido');
        }
    }
});
exports.confirmBadgeController = confirmBadgeController;
const getUserBadgesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email_com } = req.params;
    try {
        const badges = yield (0, badgeService_1.getBadgesByUserEmail)(email_com);
        res.status(200).json(badges);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
        else {
            res.status(500).send('Erro desconhecido');
        }
    }
});
exports.getUserBadgesController = getUserBadgesController;
