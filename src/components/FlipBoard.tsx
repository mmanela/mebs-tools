import React from "react";
import { Box, Grid, ResponsiveContext, GridProps } from "grommet";
import { FlipCard } from "./FlipCard";
import { FlipBoardStore, FlipBoardConfig } from "../stores/flipBoardStore";


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
    large: ["auto", "auto", "auto", "auto"],
    xlarge: ["auto", "auto", "auto", "auto"]
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
            margin="0"
            rows={!rowsVal ? size : rowsVal}
            columns={!columnsVal ? size : columnsVal}
            {...props}>
            {props.children}
        </Grid>
    );
}



export type FlipBoardProps = {
    configuration: FlipBoardConfig
    store: FlipBoardStore
}

export const FlipBoard: React.FC<FlipBoardProps> = (props: FlipBoardProps) => {

    const size = React.useContext(ResponsiveContext);
    const state = props.store.getState(props.configuration);
    // Create box for each  choice
    const listPlanOptionBoxes = state.cards.map(choice => {
        const onFlip = (flipped: boolean) => {
            choice.isFlipped = flipped;
        }
        return <FlipCard key={choice.frontText}
            isFlipped={choice.isFlipped}
            frontText={choice.frontText}
            backText={choice.backText}
            frontBackgroundColor={props.configuration.cardBackgroundColorFront}
            backBackgroundColor={props.configuration.cardBackgroundColorBack}
            onFlip={onFlip} />
    });

    return <Box>
        <Responsive size={size} fill={true} gap="large" margin="medium" rows="200px" >
            {listPlanOptionBoxes}
        </Responsive>
    </Box>
};