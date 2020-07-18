import React from "react";
import { CardSort, CardSortConfig, CardSortCategoryConfig } from "../components/CardSort";


const laborCategories: CardSortCategoryConfig[] = [
    { title: "Possible", description: "Could be related to labor starting, but could also just be discomfort in late pregnancy - it could still be several weeks before baby is here" },
    { title: "Pre-Labor", description: "It could still be several weeks before baby is here Pre-Labor: your body is definitely making changes towards labor - don't be surprised if you meet baby in a week or two" },
    { title: "Positive", description: "Surefire signs of labor coming on! Get ready to welcome your baby in the next day or two" },
]

const signsOfLaborTitles = [
    "Bloody Show",
    "Non-progressing Contractions",
    "Restless Backache",
    "Nesting Urge",
    "Soft Bowel Movements",
    "Progressing Contractions (Longer, Stronger, Closer Together)",
    "Rupture of Membranes (Gush of Fluid)",
    "Leaking Fluid",
    "Cramping",
    "Nausea"
];

export const SignsOfLabor: React.FC = () => {
    const config: CardSortConfig = {
        name: "laborsigns",
        title: "Signs of Labor",
        cardBackgroundColor: '#78d0bb',
        cards: signsOfLaborTitles.map(x => { return { title: x } }),
        categories: laborCategories
    }
    return <CardSort configuration={config} />;
};

