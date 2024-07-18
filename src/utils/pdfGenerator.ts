import PDFDocument from 'pdfkit';

export const generatePDF = (userInfo: any, badgeDescriptions: string, skillsText: string): Buffer => {
  const doc = new PDFDocument();
  let buffers: any[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    return pdfData;
  });

  // Corrigido a chamada da função doc.image
  doc.image(userInfo.avatar || 'path/to/default-avatar.png', 50, 50, {
    fit: [100, 100]
  });

  doc.fontSize(20).text(userInfo.fullName, 160, 50);
  doc.fontSize(14).text(userInfo.country, 160, 70);
  doc.fontSize(14).text(userInfo.occupation, 160, 90);

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
