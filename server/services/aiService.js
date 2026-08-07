// This file will later connect to OpenAI / Gemini.
// For now it returns intelligent mock responses.

const generateAIResponse = async (question) => {
  const text = question.toLowerCase();

  if (text.includes("mern")) {
    return {
      answer:
        "To become a MERN Stack Developer, start with HTML, CSS, JavaScript, then React, Node.js, Express.js, MongoDB, Git, REST APIs and finally build full-stack projects.",
      category: "Web Development",
    };
  }

  if (text.includes("python")) {
    return {
      answer:
        "Start with Python basics, functions, OOP, file handling, then move to NumPy, Pandas, Matplotlib, Machine Learning and AI.",
      category: "Programming",
    };
  }

  if (text.includes("ai")) {
    return {
      answer:
        "Learn Python, Data Structures, Mathematics, Machine Learning, Deep Learning, NLP, Computer Vision and build AI projects.",
      category: "Artificial Intelligence",
    };
  }

  if (text.includes("interview")) {
    return {
      answer:
        "Prepare your resume, revise core concepts, solve aptitude questions, practice communication and participate in mock interviews.",
      category: "Career",
    };
  }

  return {
    answer:
      "That's an interesting question. Pixi AI will soon provide highly personalized answers using an advanced AI model. For now, continue learning consistently and build practical projects.",
    category: "General",
  };
};

module.exports = {
  generateAIResponse,
};