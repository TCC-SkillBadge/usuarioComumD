"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generatePDF = (userInfo, badgeDescriptions, skillsText) => {
    const doc = new pdfkit_1.default();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        return pdfData;
    });
    doc.image(userInfo.avatar || 'path/to/default-avatar.png', {
        fit: [100, 100],
        align: 'left',
        valign: 'top'
    });
    doc.fontSize(20).text(userInfo.name, { align: 'left' });
    doc.fontSize(14).text(userInfo.location, { align: 'left' });
    doc.fontSize(14).text(userInfo.occupation, { align: 'left' });
    doc.fontSize(14).text(userInfo.phone, { align: 'left' });
    doc.moveDown();
    doc.fontSize(16).text('Sobre:', { underline: true });
    doc.fontSize(14).text(userInfo.about);
    doc.moveDown();
    doc.fontSize(16).text('Descrições das Badges:', { underline: true });
    doc.fontSize(14).text(badgeDescriptions);
    doc.moveDown();
    doc.fontSize(16).text('Habilidades:', { underline: true });
    doc.fontSize(14).text(skillsText);
    doc.end();
    return Buffer.concat(buffers);
};
exports.generatePDF = generatePDF;
