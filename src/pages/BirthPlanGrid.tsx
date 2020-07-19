import React from "react";
import { Box, Grid, ResponsiveContext, GridProps } from "grommet";
import { FlipCard } from "../components/FlipCard";

interface BirthPlanChoice {
    yesOption: string,
    NoOption: string,
    isFlipped?: boolean
};

const birthPlanChoices: BirthPlanChoice[] = [
    { yesOption: "Additional Labor Support: Doula, friend or family", NoOption: "Partner as only support person" },
    { yesOption: "Stay at home as long as possible", NoOption: "Go to birthplace as soon as labor begins" },
    { yesOption: "No food during labor", NoOption: "Eat in labor, if desired" },
    { yesOption: "Go to bathroom to urinate as needed", NoOption: "Bladder catheter" },
    { yesOption: "No pain medication", NoOption: "Epidural" },
    { yesOption: "Breasteeding started in first hour", NoOption: "Feeding started after birthing person rests" },
    { yesOption: "Labor medically induced", NoOption: "Labor begins on its own" },
    { yesOption: "Routine IV or hydration", NoOption: "Drink fluids when needed" },
    { yesOption: "Spontaneous pushing with urge to push", NoOption: "Directed pushing" },
    { yesOption: "Vaginal Birth", NoOption: "Cesarean Birth" },
    { yesOption: "Baby cleaned up before skin to skin", NoOption: "Skin to skin immediately after birth" },
    { yesOption: "Push in positions that feel best", NoOption: "Push in semi-sititng or side-lying only" },
    { yesOption: "Continuous monitoring with EFM", NoOption: "Occasional monitoring (with Doppler or EFM)" },
    { yesOption: "Upright, moving, walking, dancing", NoOption: "Stay in bed through labor" },
    { yesOption: "Breaking bag of water or Pitocin to speed labor", NoOption: "No medical methods to speed labor" },
    { yesOption: "Bath, Shower, Soothing environment to encourage endorphins", NoOption: "IV Narcotics" }
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

export const BirthPlanGrid = () => {

    const size = React.useContext(ResponsiveContext);
    // Create box for each  choice
    const listPlanOptionBoxes = birthPlanChoices.map(choice => {
        const onFlip = (flipped: boolean) => {
            choice.isFlipped = flipped;
        }
        return <FlipCard key={choice.yesOption} isFlipped={choice.isFlipped} frontText={choice.yesOption} backText={choice.NoOption} onFlip={onFlip} />
    });

    return <Box>
        <Responsive size={size} fill={true} gap="large" margin="medium" rows="200px" >
            {listPlanOptionBoxes}
        </Responsive>
    </Box>
};