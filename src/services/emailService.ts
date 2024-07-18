import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendConfirmationEmail = async (to: string, token: string) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: 'Confirmação de Atribuição de Badge',
    text: `Por favor, confirme a atribuição do badge clicando no link: http://localhost:${process.env.PORT}/confirm/${token}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email de confirmação enviado para:', to);
  } catch (error) {
    console.error('Erro ao enviar email de confirmação:', error);
  }
};
