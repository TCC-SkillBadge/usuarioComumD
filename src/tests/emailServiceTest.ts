import { sendConfirmationEmail } from '../services/emailService';

const testEmailService = async () => {
  try {
    await sendConfirmationEmail('luizzz.z127@gmail.com', 'dummy-token');
    console.log('Email de teste enviado com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar email de teste:', error);
  }
};

testEmailService();
