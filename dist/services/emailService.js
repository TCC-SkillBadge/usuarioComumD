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
exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
const sendConfirmationEmail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to,
        subject: 'Confirmação de Atribuição de Badge',
        text: `Por favor, confirme a atribuição do badge clicando no link: http://localhost:${process.env.PORT}/confirm/${token}`
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log('Email de confirmação enviado para:', to);
    }
    catch (error) {
        console.error('Erro ao enviar email de confirmação:', error);
    }
});
exports.sendConfirmationEmail = sendConfirmationEmail;
