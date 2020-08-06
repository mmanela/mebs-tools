import { BaseConfig, BaseStore } from "./BaseStore";

export interface WheelBoardConfig extends BaseConfig {
    cardBackgroundColorFront?: string;
    cardBackgroundColorBack?: string;
    wheels: WheelConfig[];
}

export interface WheelConfig {
    title: string;
    options: string[];
}

export interface WheelData extends WheelConfig {
};

export interface WheelBoardState {
    wheels: WheelData[];
}

export class WheelBoardStore implements BaseStore<WheelBoardConfig, WheelBoardState> {

    private static instance: WheelBoardStore = new WheelBoardStore();
    public static get Instance() {
        return WheelBoardStore.instance;
    }

    stateMap: Map<string, WheelBoardState> = new Map();

    public getState(config: WheelBoardConfig) {
        if (this.stateMap.has(config.name)) {
            return this.stateMap.get(config.name)!;
        }
        else {

            const wheels: WheelData[] = config.wheels.map((s) => { return { ...s } });
            const state: WheelBoardState = { wheels };
            this.stateMap.set(config.name, state);
            return state;
        }
    }
}