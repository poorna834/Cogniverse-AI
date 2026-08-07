const generateRoadmap = (career, level) => {

  if (career === "AI Engineer") {

    return [

      {
        month: 1,
        title: "Programming Basics",
        topics: [
          "Python",
          "Git",
          "Problem Solving",
          "Linux Basics"
        ]
      },

      {
        month: 2,
        title: "Core Programming",
        topics: [
          "OOP",
          "Data Structures",
          "Algorithms",
          "SQL"
        ]
      },

      {
        month: 3,
        title: "Machine Learning",
        topics: [
          "NumPy",
          "Pandas",
          "Scikit-Learn"
        ]
      },

      {
        month: 4,
        title: "Deep Learning",
        topics: [
          "TensorFlow",
          "PyTorch",
          "Neural Networks"
        ]
      },

      {
        month: 5,
        title: "Projects",

        topics: [
          "Chatbot",
          "Image Classification",
          "Recommendation System"
        ]
      },

      {
        month: 6,
        title: "Career Preparation",

        topics: [
          "Resume",
          "Portfolio",
          "Mock Interviews"
        ]
      }

    ];

  }

  if (career === "Full Stack Developer") {

    return [

      {
        month: 1,
        title: "Frontend",

        topics: [
          "HTML",
          "CSS",
          "JavaScript"
        ]
      },

      {
        month: 2,
        title: "React",

        topics: [
          "React",
          "React Router",
          "Tailwind CSS"
        ]
      },

      {
        month: 3,
        title: "Backend",

        topics: [
          "Node.js",
          "Express"
        ]
      },

      {
        month: 4,
        title: "Database",

        topics: [
          "MongoDB",
          "REST API"
        ]
      },

      {
        month: 5,
        title: "Projects",

        topics: [
          "E-Commerce",
          "Expense Tracker"
        ]
      },

      {
        month: 6,
        title: "Deployment",

        topics: [
          "Render",
          "Vercel",
          "Interview"
        ]
      }

    ];

  }

  return [

    {

      month: 1,

      title: "Learning Foundation",

      topics: [
        "Programming Basics",
        "Problem Solving",
        "Projects"
      ]

    }

  ];

};

module.exports = {
  generateRoadmap,
};