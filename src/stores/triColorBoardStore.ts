import { BaseConfig, BaseStore } from "./BaseStore";

export interface TriColorBoardConfig extends BaseConfig {
    cardColorOne?: string;
    cardColorTwo?: string;
    cardColorThree?: string;
    cards: TriColorBoardCardConfig[];
}

export interface TriColorBoardCardConfig {
    text: string;
}

interface TriColorBoardCardData extends TriColorBoardCardConfig {
    state?: boolean;
};

export interface TriColorBoardState {
    cards: TriColorBoardCardData[];
}

export class TriColorBoardStore implements BaseStore<TriColorBoardConfig, TriColorBoardState> {

    private static instance: TriColorBoardStore = new TriColorBoardStore();
    public static get Instance() {
        return TriColorBoardStore.instance;
    }

    stateMap: Map<string, TriColorBoardState> = new Map();

    public getState(config: TriColorBoardConfig) {
        if (this.stateMap.has(config.name)) {
            return this.stateMap.get(config.name)!;
        }
        else {
            const cards: TriColorBoardCardData[] = config.cards.map((s) => { return { ...s } });
            const state: TriColorBoardState = { cards };
            this.stateMap.set(config.name, state);
            return state;
        }
    }
}