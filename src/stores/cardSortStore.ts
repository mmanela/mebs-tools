import { BaseConfig, BaseStore } from "./BaseStore";

export interface CardSortConfig extends BaseConfig {
    cardBackgroundColor?: string;
    cards: CardSortCardConfig[];
    categories: CardSortCategoryConfig[];
}

export interface CardSortCardConfig {
    title: string;
}
export interface CardSortCategoryConfig {
    title: string;
    description: string;
}


export interface CardData {
    type: string
    id: string
    top?: number
    left?: number,
    location: CardLocation
}

export interface CardCategoryData {
    title: string,
    description: string
};


export enum CardLocation { List, Categories };

export interface CardSortState {
    cards: CardData[];
    categories: CardCategoryData[];
}

export class CardSortStore implements BaseStore<CardSortConfig, CardSortState> {
    private static instance: CardSortStore = new CardSortStore();
    public static get Instance() {
        return CardSortStore.instance;
    }

    stateMap: Map<string, CardSortState> = new Map();

    public getState(config: CardSortConfig) {
        if (this.stateMap.has(config.name)) {
            return this.stateMap.get(config.name)!;
        }
        else {

            const cards: CardData[] = config.cards.map((s) => { return { id: s.title, type: "card", location: CardLocation.List } });
            const categories: CardCategoryData[] = config.categories;
            const state: CardSortState = { cards, categories };
            this.stateMap.set(config.name, state);
            return state;
        }
    }
}