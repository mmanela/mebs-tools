import React, { useState } from "react";
import { Box, Button } from "grommet";
import { WheelBoardStore, WheelBoardConfig, WheelData } from "../stores/wheelStore";
import { WinwheelWrapper } from "./WinwheelWrapper";
import styled from "styled-components";

export type WheelBoardProps = {
    configuration: WheelBoardConfig;
    store: WheelBoardStore;
}

export type WheelProps = {
    id: string;
    configuration: WheelBoardConfig;
    data: WheelData;
    spinIteration?: number,
    widthDivisor?: number
    spinFinished?: (val: string) => {};
}

const StyledButton = styled(Button)`
    width: 25%;
    font-size: 4vw;
    height: 100px;
    letter-spacing: 20px;
    font-weight: bold;
    background-color: black;
    color: white;
`;
const StyleBox = styled(Box)`
   min-width: 800px;
`;

const StyledChoiceBox = styled(Box)`
    margin-top: 10px;
    font-size: 2vw;
    font-weight: bold;
    background-color: white;
    color: black;
    width: 30vw;
    height: 100px;
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
`;

const WheelContainer: React.FC<WheelProps> = (props) => {

    let [lastResult, setLastResult] = useState("");
    const resultCallBack = (result?: string) => {
        setLastResult(result || "");
    };

    return <Box
    ><WinwheelWrapper
            id={props.id}
            widthDivisor={props.widthDivisor}
            spinResultCallback={resultCallBack}
            options={props.data.options}
            spinIteration={props.spinIteration}
            colors={props.configuration.backgroundColors}
        />
        <StyledChoiceBox alignSelf="center">{lastResult}</StyledChoiceBox>
    </Box>;
}

export const WheelBoard: React.FC<WheelBoardProps> = (props) => {

    let [spinIteration, setSpinIteration] = useState(0);
    const state = props.store.getState(props.configuration);
    // Create box for each  choice
    let id = 0;
    const wheels = state.wheels.map(wheel => {
        id = id + 1;
        return <WheelContainer key={id}
            id={id.toString()}
            widthDivisor={state.wheels.length}
            configuration={props.configuration}
            data={wheel}
            spinIteration={spinIteration} />
    });

    return <StyleBox flex fill direction="column">
        <Box flex direction="row" fill>
            {wheels}
        </Box>

        <StyledButton color="#f6e6ab" label="SPIN" alignSelf="center" onClick={() => setSpinIteration(++spinIteration)} />
    </StyleBox >;
};