const { GoogleGenAI } = require("@google/genai");

if (!process.env.GEMINI_API) {
  throw new Error("GEMINI_API environment variable not set in .env file");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: msg,
  });
  return response.text;
}

module.exports = main;
