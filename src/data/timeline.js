import { personalInfo } from "./personalInfo";

export const timelineData = [
    {
        type: "education",
        title: "Information Technology Student",
        place: "Thuy Loi University",
        date: "2023 - Present",
        desc: "Major in Information Technology.",
        details: [
            `Current ${personalInfo.gpa}`,
            `Won Academic Scholarship for ${personalInfo.scholarship} consecutive semesters (achieved 4.0 GPA in ${personalInfo.gpa_4} semesters).` // Dùng từ 'consecutive' (liên tiếp) rất hay
        ]
    },
    {
        type: "experience",
        title: "AI Research Student",
        place: "Scientific Research Projects",
        date: "10/2025 - 01/2026",
        desc: "Participated in researching and developing Deep Learning models.",
        details: [
            "Built an LSTM model for Saltwater Intrusion prediction.",
            "Researched NLP algorithms for automated CV Ranking."
        ]
    },
    {
        type: "achievement",
        title: "Mathematics Olympiad",
        place: "University Level",
        date: "2024 & 2025",
        desc: "Participated in the Student Mathematics Olympiad.",
        details: [
            "Third Prize (2024)",
            "Third Prize (2025)"
        ]
    },
    {
        type: "certificate",
        title: "Professional Certifications",
        place: "Online Platforms",
        date: "2024 - 2025",
        desc: "Completed specialized courses to strengthen technical foundation.",
        details: [
            "Samsung AI Inovation",

        ]
    }
];