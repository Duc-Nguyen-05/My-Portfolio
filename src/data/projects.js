export const projects = [
    {
        id: 1,
        title: "Automated CV Ranking",
        category: "AI Research",
        image: "https://placehold.co/600x400/1e293b/FFF?text=CV+Ranking+System",
        desc: "Automates resume scoring and ranking based on Job Description (JD) relevance utilizing advanced NLP techniques.",
        tech: ["Python", "ChromaDB", "GLiNER", "Gemini AI"],
        links: { code: "https://github.com/Duc-Nguyen-05/CV-Ranking", demo: "#", caseStudy: "/projects/cv-ranking" },
        isLive: true
    },
    {
        id: 2,
        title: "ClassPal App",
        category: "Engineering",
        image: "https://placehold.co/600x400/1e293b/FFF?text=ClassPal+Mobile+App",
        desc: "Empowers class monitors to manage events, tasks, and funds while keeping members updated. Features an AI Chatbot (via OpenRouter API) that automates the creation of events, tasks, and financial records.",
        tech: ["Flutter", "Firebase", "Riverpod", "OpenRouter API"],
        links: { code: "https://github.com/Duc-Nguyen-05/ClassPal", demo: "#", caseStudy: "/projects/classpal" },
        isLive: true
    },
    {
        id: 3,
        title: "Saltwater Intrusion Forecast",
        category: "AI Research",
        image: "https://placehold.co/600x400/1e293b/FFF?text=Saltwater+Prediction",
        desc: "Developed a Global Spatial-Temporal Model utilizing XGBoost/CatBoost. Innovated with Physics-Informed Preprocessing (Knudsen eq, Stochastic PMM-KNN) and advanced spatial-temporal feature engineering to overcome highly sparse data.",
        tech: ["Python", "Pandas", "XGBoost", "CatBoost", "FastAPI", "Leaflet.js", "Supabase"],
        links: { code: "https://github.com/Duc-Nguyen-05/webGis_mekong-salinity-forecasting", demo: "https://web-gis-mekong-salinity-forecasting.vercel.app/", caseStudy: "/projects/saltwater-intrusion" },
        isLive: false
    }
];