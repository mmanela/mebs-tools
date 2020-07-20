import React, { useState } from "react";
import { Box, Grid, ResponsiveContext, GridProps } from "grommet";
import styled from "styled-components";
import { TriColorBoardConfig, TriColorBoardStore } from "../stores/triColorBoardStore";

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

export type TriColorBoardProps = {
    configuration: TriColorBoardConfig
    store: TriColorBoardStore
}

export const TriColorBoard: React.FC<TriColorBoardProps> = (props: TriColorBoardProps) => {

    const state = props.store.getState(props.configuration);
    const size = React.useContext(ResponsiveContext);
    // Create box for each  choice
    const listPlanOptionBoxes = state.cards.map(card => {
        const onChange = (isConcern: boolean) => {
            card.state = isConcern;
        }
        return <TriColorCard key={card.text} text={card.text} isConcern={card.state} config={props.configuration} onChange={onChange} />
    });

    return <Box>
        <Responsive size={size} fill={true} gap="0px" margin="0px" rows="auto">
            {listPlanOptionBoxes}
        </Responsive>
    </Box>
};

export type TriColorCardProps = {
    text: string,
    isConcern?: boolean,
    config: TriColorBoardConfig,
    onChange?: (state: boolean) => void
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


const TriColorCard = (props: TriColorCardProps) => {

    const [isConcern, setIsConcern] = useState(props.isConcern);

    const onClick = () => {
        let newState = false;
        if (isConcern === null || isConcern === undefined) {
            newState = false;
        }
        else if (isConcern === false) {
            newState = true;
        }
        else {
            newState = false;
        }

        setIsConcern(newState);
        if (props.onChange) {
            props.onChange(newState);
        }
    }

    let backgroundColor = props.config.cardColorOne!;
    if (isConcern === true) {
        backgroundColor = props.config.cardColorTwo!;
    }
    else if (isConcern === false) {
        backgroundColor = props.config.cardColorThree!;
    }

    return <TriColorCardBox key={props.text} backgroundColor={backgroundColor} onClick={onClick} >
        <span>{props.text}</span>
    </TriColorCardBox>;
}