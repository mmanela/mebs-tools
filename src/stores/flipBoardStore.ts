import { BaseConfig, BaseStore } from "./BaseStore";

export interface FlipBoardConfig extends BaseConfig {
    cardBackgroundColor?: string;
    cards: FlipBoardCardConfig[];
}

export interface FlipBoardCardConfig {
    frontText: string;
    backText: string;
}

interface FlipBoardCardData extends FlipBoardCardConfig {
    isFlipped?: boolean;
};

export interface FlipBoardState {
    cards: FlipBoardCardData[];
}

export class FlipBoardStore implements BaseStore<FlipBoardConfig, FlipBoardState> {

    private static instance: FlipBoardStore = new FlipBoardStore();
    public static get Instance() {
        return FlipBoardStore.instance;
    }

    stateMap: Map<string, FlipBoardState> = new Map();

    public getState(config: FlipBoardConfig) {
        if (this.stateMap.has(config.name)) {
            return this.stateMap.get(config.name)!;
        }
        else {

            const cards: FlipBoardCardData[] = config.cards.map((s) => { return { ...s } });
            const state: FlipBoardState = { cards };
            this.stateMap.set(config.name, state);
            return state;
        }
    }
}