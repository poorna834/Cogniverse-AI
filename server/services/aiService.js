const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIResponse = async (question) => {
  try {
    const prompt = `
You are Pixi AI, the friendly AI learning mentor inside Cogniverse AI.

Your job is to help students learn technology, programming, computer science,
AI, cybersecurity, careers, interview preparation, and related subjects.

Give clear, practical and beginner-friendly answers.

When explaining technical concepts:
- Explain the concept simply first.
- Give examples when useful.
- Use bullet points when appropriate.
- Give a practical next step for the learner.
- Do not make the answer unnecessarily long.

Student question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const answer = response.text?.trim();

    if (!answer) {
      throw new Error("Gemini returned an empty response.");
    }

    return {
      answer,
      category: detectCategory(question),
    };
  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error("Pixi AI could not generate a response.");
  }
};

const detectCategory = (question) => {
  const text = question.toLowerCase();

  if (
    text.includes("ai") ||
    text.includes("machine learning") ||
    text.includes("deep learning")
  ) {
    return "Artificial Intelligence";
  }

  if (
    text.includes("react") ||
    text.includes("javascript") ||
    text.includes("node") ||
    text.includes("express") ||
    text.includes("mern") ||
    text.includes("html") ||
    text.includes("css")
  ) {
    return "Web Development";
  }

  if (
    text.includes("python") ||
    text.includes("java") ||
    text.includes("c++") ||
    text.includes("programming") ||
    text.includes("coding")
  ) {
    return "Programming";
  }

  if (
    text.includes("cybersecurity") ||
    text.includes("security") ||
    text.includes("hacking") ||
    text.includes("burp")
  ) {
    return "Cybersecurity";
  }

  if (
    text.includes("interview") ||
    text.includes("resume") ||
    text.includes("career") ||
    text.includes("job")
  ) {
    return "Career";
  }

  if (
    text.includes("database") ||
    text.includes("mongodb") ||
    text.includes("sql")
  ) {
    return "Database";
  }

  return "General";
};

module.exports = {
  generateAIResponse,
};