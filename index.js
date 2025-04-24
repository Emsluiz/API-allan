require('dotenv').config();
const axios = require('axios');
const { OpenAI } = require('openai');

const deepSeekAPIUrl = 'https://api.deepseek.com/v1/chat/completions';
const API_KEY_DEEPSEEK = process.env.DEEPSEEK_API_KEY;
const API_KEY_OPENAI = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: API_KEY_OPENAI });

async function getDeepSeekResponse(prompt) {
  try {
    const response = await axios.post(
      deepSeekAPIUrl,
      {
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      },
      {
        headers: { Authorization: `Bearer ${API_KEY_DEEPSEEK}` }
      }
    );
    console.log("🧠 DeepSeek:\n", response.data.choices[0].message.content);
  } catch (error) {
    console.error("Erro ao chamar DeepSeek:", error.response?.data || error.message);
  }
}

async function getOpenAIResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Adicionada a vírgula aqui
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });
    console.log("🤖 OpenAI:\n", response.choices[0].message.content);
  } catch (error) {
    console.error("Erro ao chamar OpenAI:", error.response?.data || error.message);
  }
}

getDeepSeekResponse("Explique a Teoria da Relatividade");
getOpenAIResponse("O que é Machine Learning?");
