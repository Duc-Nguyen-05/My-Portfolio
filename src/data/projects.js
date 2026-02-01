export const projects = [
    {
        id: 1,
        title: "Automated CV Ranking",
        category: "AI Research",
        image: "https://placehold.co/600x400/1e293b/FFF?text=CV+Ranking+System",
        desc: "Automates resume scoring and ranking based on Job Description (JD) relevance utilizing advanced NLP techniques.",
        tech: ["Python", "Scikit-learn", "NLP", "FastAPI"],
        links: { code: "#", demo: "#" },
        isLive: true
    },
    {
        id: 2,
        title: "ClassPal App",
        category: "Engineering",
        image: "https://placehold.co/600x400/1e293b/FFF?text=ClassPal+Mobile+App",
        desc: "Empowers class monitors to manage events, tasks, and funds while keeping members updated. Features an AI Chatbot (via OpenRouter API) that automates the creation of events, tasks, and financial records.",
        tech: ["Flutter", "Firebase", "OpenRouter API"],
        links: { code: "https://github.com/Duc-Nguyen-05/ClassPal", demo: "#" },
        isLive: true
    },
    {
        id: 3,
        title: "Saltwater Intrusion Forecast",
        category: "AI Research",
        image: "https://placehold.co/600x400/1e293b/FFF?text=Saltwater+Prediction",
        desc: "Utilizes LSTM time-series analysis to predict salinity levels in the Mekong Delta, enabling farmers to proactively manage water resources.",
        tech: ["Python", "Pandas", "LSTM", "Matplotlib"],
        links: { code: "#", demo: "#" },
        isLive: false
    }
];