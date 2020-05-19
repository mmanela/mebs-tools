import React, { useState } from "react";
import { Box, Grid, ResponsiveContext, GridProps } from "grommet";
import styled from "styled-components";


interface PostpartumConcern {
    text: string,
    isConcern?: boolean
};

const postpartumConcerns: PostpartumConcern[] = [
    { text: "Cone-Shaped Head" },
    { text: "Soft Spots on Head" },
    { text: "Spitting up that baby doesn't mind" },
    { text: "Not feeding well because very sleepy" },
    { text: "Peeling skin" },
    { text: "Umbilical cord has pus, foul smell" },
    { text: "Black sticky bowel movement" },
    { text: "Vaginal discharge" },
    { text: "Umbilical cord dries up and falls off" },
    { text: "Circumcised penis has some discharge" },
    { text: "Listless, weak or changes in behavior" },
    { text: "Bluish-green or gray mark" },
    { text: "Stool that contains blood or mucus" },
    { text: "Serios difficulty breathing" },
    { text: "White substance on skin after birth" },
    { text: "Tiny white bumps on face" },
    { text: "Throws out arms and legs at loud noise" },
    { text: "Forceful vomiting" },
    { text: "Rash or red spotches on skin" },
    { text: "Loose, yellow seedy poop after day 5" },
    { text: "Snorts, pants, groans in sleep" },
    { text: "Flaking skin on scalp" },
    { text: "Patches of deep pink skin" },
    { text: "Blue color of lips, tongue, mouth" },
    { text: "Purple or blue hands and feet" },
    { text: "No bowel movement in 24 hour period" },
    { text: "Swelling in genital area" },
    { text: "Fewer than 6 wet diapers per day by day 5" },
    { text: "Skin or whites of eyes look yellow" },
    { text: "You feel something is \"off\"" },
    { text: "Hiccups frequently after feedings" },
    { text: "Fever or seems ill" },
    { text: "Soft downy hair covering body" },
    { text: "Difficulty latching on the breast" },
    { text: "Underarm temperature of 99° or higher" },
    { text: "Some periods of irregular breathing" }
];
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

export const PostpartumConcernGrid = () => {

    const size = React.useContext(ResponsiveContext);
    // Create box for each  choice
    const listPlanOptionBoxes = postpartumConcerns.map(concern => {
        const onChange = (isConcern: boolean) => {
            concern.isConcern = isConcern;
        }
        return <PostpartumConcernCard key={concern.text} text={concern.text} isConcern={concern.isConcern} onChange={onChange} />
    });

    return <Box>
        <Responsive size={size} fill={true} gap="0px" margin="0px" rows="auto">
            {listPlanOptionBoxes}
        </Responsive>
    </Box>
};

export type PostpartumCardProps = {
    text: string,
    isConcern?: boolean,
    onChange?: (state: boolean) => void
}

interface BoxProps {
    backgroundColor: string;
}
const PostpartumConcernBox = styled.div<BoxProps>`
background-color: ${props => props.backgroundColor || "white"};
border: 0.5px solid #000;
border-radius:0;
text-align: center;
padding: 15px;
width: 200px;
height: 100px;
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

const isConcernColor = "#F9928F";
const notConcernColor = "#C5E0B3";


const PostpartumConcernCard = (props: PostpartumCardProps) => {

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

    let backgroundColor = "#FFFFFF";
    if (isConcern === true) {
        backgroundColor = isConcernColor;
    }
    else if (isConcern === false) {
        backgroundColor = notConcernColor;
    }

    return <PostpartumConcernBox key={props.text} backgroundColor={backgroundColor} onClick={onClick} >
        <span>{props.text}</span>
    </PostpartumConcernBox>;
}