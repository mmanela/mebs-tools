import React, { useState } from "react";
import { Box, Text, Button } from "grommet";
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
    spinFinished?: (val: string) => {};
}

const StyledButton = styled(Button)`
    width: 30%;
`;
const StyleBox = styled(Box)`
   min-width: 800px;
`;

const StyledChoiceText = styled(Text)`
   margin-top: 10px;
   font-size: 20px;
`;
const WheelContainer: React.FC<WheelProps> = (props) => {

    let [options, setOptions] = useState(props.data.options);
    let [lastResult, setLastResult] = useState("");
    const resultCallBack = (result?: string) => {
        setLastResult(result || "");
    };

    return <Box
    ><WinwheelWrapper id={props.id} spinResultCallback={resultCallBack} options={options} spinIteration={props.spinIteration} />
        <StyledChoiceText alignSelf="center">{lastResult}</StyledChoiceText>
    </Box>;
}

export const WheelBoard: React.FC<WheelBoardProps> = (props) => {

    let [spinIteration, setSpinIteration] = useState(0);
    const state = props.store.getState(props.configuration);
    // Create box for each  choice
    let id = 0;
    const wheels = state.wheels.map(wheel => {
        id = id + 1;
        return <WheelContainer key={id} id={id.toString()} configuration={props.configuration} data={wheel} spinIteration={spinIteration} />
    });

    return <StyleBox flex fill direction="column">
        <Box flex direction="row" fill>
            {wheels}
        </Box>

        <StyledButton primary label="Spin!" alignSelf="center" onClick={() => setSpinIteration(++spinIteration)} />
    </StyleBox>;
};