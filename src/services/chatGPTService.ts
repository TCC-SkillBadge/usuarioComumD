import axios from 'axios';

export const generateDescription = async (skills: any) => {
  const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    prompt: `Descreva as habilidades do usuário com base nas seguintes pontuações: ${JSON.stringify(skills)}`,
    max_tokens: 150,
    temperature: 0.7,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });

  return response.data.choices[0].text;
};
