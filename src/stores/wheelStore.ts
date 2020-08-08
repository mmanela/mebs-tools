import { BaseConfig, BaseStore } from "./BaseStore";

export interface WheelBoardConfig extends BaseConfig {
    cardBackgroundColorFront?: string;
    cardBackgroundColorBack?: string;
    wheels: WheelConfig[];
    backgroundColors?: string[]
}

export interface WheelConfig {
    title: string;
    options: (string | WheelSegmentConfig)[];
}

export interface WheelSegmentConfig {
    text: string,
    fontSize?: number,
    backgroundColor?: string
}

export interface WheelData extends WheelConfig {
    options: WheelSegmentConfig[];
};

export interface WheelBoardState {
    wheels: WheelData[];
}


function mapOptions(options: (string | WheelSegmentConfig)[]): WheelSegmentConfig[] {
    return options.map<WheelSegmentConfig>(x => {
        if (typeof x === 'string') {
            return { text: x };
        }
        else {
            return { ...x }
        }
    });
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

            const wheels: WheelData[] = config.wheels.map((s) => { return { ...s, options: mapOptions(s.options) } });
            const state: WheelBoardState = { wheels };
            this.stateMap.set(config.name, state);
            return state;
        }
    }
}