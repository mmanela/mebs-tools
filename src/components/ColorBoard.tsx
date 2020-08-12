import React, { useState } from "react";
import { Box, Grid, ResponsiveContext, GridProps } from "grommet";
import styled from "styled-components";
import { ColorBoardConfig, ColorBoardStore } from "../stores/colorBoardStore";

interface IDictionary<TValue> {
    [id: string]: TValue;
}
// If the size is small, we only see 1 column
// If the size is medium, we only see 2 columns
// If the size is either large or xlarge, we see 3 columns
const columns: IDictionary<string[]> = {
    xsmall: ["auto"],
    small: ["auto", "auto"],
    medium: ["auto", "auto", "auto"],
    large: ["auto", "auto", "auto", "auto", "auto", "auto"],
    xlarge: ["auto", "auto", "auto", "auto", "auto", "auto"]
};

// If the size is small, we have 3 rows
// If the size is medium, we have 2 rows
// If the size is large or xlarge, we have 1 row
const rows: IDictionary<string[]> = {
    small: ["xsmall", "xsmall", "xsmall"],
    medium: ["xsmall", "xsmall"],
    large: ["xsmall"],
    xlarge: ["xsmall"]
};

type ResponsiveGridProps = { size: string, children: any } & GridProps;
const Responsive = (props: ResponsiveGridProps) => {
    const size = props.size;
    // Take into consideration if not array is sent but a simple string
    let columnsVal: (string[] | null) = null;
    if (columns) {
        if (columns[size]) {
            columnsVal = columns[size];
        }
    }

    let rowsVal: (string[] | null) = null;
    if (rows) {
        if (rows[size]) {
            rowsVal = rows[size];
        }
    }

    return (
        <Grid
            justifyContent="center"
            alignContent="stretch"
            align="center"
            justify="center"
            style={{ backgroundColor: '#000', padding: '1px' }}
            rows={!rowsVal ? size : rowsVal}
            columns={!columnsVal ? size : columnsVal}
            {...props}>
            {props.children}
        </Grid>
    );
}

export type ColorBoardProps = {
    configuration: ColorBoardConfig
    store: ColorBoardStore
}

export const ColorBoard: React.FC<ColorBoardProps> = (props: ColorBoardProps) => {

    const state = props.store.getState(props.configuration);
    const size = React.useContext(ResponsiveContext);
    // Create box for each  choice
    const listPlanOptionBoxes = state.cards.map(card => {
        const onChange = (index: number) => {
            card.colorIndex = index;
        }
        return <TriColorCard key={card.text} text={card.text} colorIndex={card.colorIndex} config={props.configuration} onChange={onChange} />
    });

    return <Box>
        <Responsive size={size} fill={true} gap="0px" margin="0px" rows="auto">
            {listPlanOptionBoxes}
        </Responsive>
    </Box>
};

export type ColorCardProps = {
    text: string,
    colorIndex: number,
    config: ColorBoardConfig,
    onChange?: (index: number) => void
}

interface BoxProps {
    backgroundColor: string;
}
const TriColorCardBox = styled.div<BoxProps>`
background-color: ${props => props.backgroundColor || "white"};
border: 0.5px solid #000;
border-radius:0;
text-align: center;
padding: 15px;
width: 200px;
height: 70px;
align-items: center;
display: flex;
line-height: normal;
font-size: 1.1rem;
justify-content: center;    
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
color: black;`;


const TriColorCard = (props: ColorCardProps) => {

    const [colorIndex, setColorIndex] = useState(props.colorIndex);

    const onClick = () => {
        let newIndex = (colorIndex + 1) % props.config.colors.length;

        if (props.config.skipFirstColorOnCycle && newIndex === 0) {
            newIndex++;
        }

        setColorIndex(newIndex);

        if (props.onChange) {
            props.onChange(newIndex);
        }
    }

    let backgroundColor = props.config.colors[colorIndex];

    return <TriColorCardBox key={props.text} backgroundColor={backgroundColor} onClick={onClick} >
        <span>{props.text}</span>
    </TriColorCardBox>;
}