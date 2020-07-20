
export interface BaseConfig {
    name: string;
    title: string;
}


export interface BaseStore<T extends BaseConfig, RType> {
    getState(config: T): RType;
}
