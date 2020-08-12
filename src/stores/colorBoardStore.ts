import { BaseConfig, BaseStore } from "./BaseStore";

export interface ColorBoardConfig extends BaseConfig {
    colors: string[];
    cards: ColorBoardCardConfig[];
    skipFirstColorOnCycle?: boolean;
}

export interface ColorBoardCardConfig {
    text: string;
}

interface ColorBoardCardData extends ColorBoardCardConfig {
    colorIndex: number;
};

export interface ColorBoardState {
    cards: ColorBoardCardData[];
}

export class ColorBoardStore implements BaseStore<ColorBoardConfig, ColorBoardState> {

    private static instance: ColorBoardStore = new ColorBoardStore();
    public static get Instance() {
        return ColorBoardStore.instance;
    }

    stateMap: Map<string, ColorBoardState> = new Map();

    public getState(config: ColorBoardConfig) {
        if (this.stateMap.has(config.name)) {
            return this.stateMap.get(config.name)!;
        }
        else {
            const cards: ColorBoardCardData[] = config.cards.map((s) => { return { ...s, colorIndex: 0 } });
            const state: ColorBoardState = { cards };
            this.stateMap.set(config.name, state);
            return state;
        }
    }
}