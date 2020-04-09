import React from "react";
import { Box, Grid, ResponsiveContext, GridProps } from "grommet";
import { FlipCard } from "../FlipCard";

interface BirthPlanChoice {
    YesOption: string,
    NoOption: string
};

const birthPlanChoices: BirthPlanChoice[] = [
    { YesOption: "Additional Labor Support: Doula, friend or family", NoOption: "Partner as only support person" },
    { YesOption: "Stay at home as long as possible", NoOption: "Go to birthplace as soon as labor begins" },
    { YesOption: "No food during labor", NoOption: "Eat in labor, if desired" },
    { YesOption: "Go to bathroom to urinate as needed", NoOption: "Bladder catheter" },
    { YesOption: "No pain medication", NoOption: "Epidural" },
    { YesOption: "Breasteeding started in first hour", NoOption: "Feeding started after birthing person rests" },
    { YesOption: "Labor medically induced", NoOption: "Labor begins on its own" },
    { YesOption: "Routine IV or hydration", NoOption: "Drink fluids when needed" },
    { YesOption: "Spontaneous pushing with urge to push", NoOption: "Directed pushing" },
    { YesOption: "Vaginal Birth", NoOption: "Cesarean Birth" },
    { YesOption: "Baby cleaned up before skin to skin", NoOption: "Skin to skin immediately after birth" },
    { YesOption: "Push in positions that feel best", NoOption: "Push in semi-sititng or side-lying only" },
    { YesOption: "Continuous monitoring with EFM", NoOption: "Occasional monitoring (with Doppler or EFM)" },
    { YesOption: "Upright, moving, walking, dancing", NoOption: "Stay in bed through labor" },
    { YesOption: "Breaking bag of water or Pitocin to speed labor", NoOption: "No medical methods to speed labor" },
    { YesOption: "Bath, Shower, Soothing environment to encourage endorphins", NoOption: "IV Narcotics" }
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

// Create box for each  choice
const listPlanOptionBoxes = birthPlanChoices.map(choice => (
    <FlipCard key={choice.YesOption} frontText={choice.YesOption} backText={choice.NoOption} />
));

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
    return <Box>
        <Responsive size={size} fill={true} gap="large" margin="medium" rows="200px" >
            {listPlanOptionBoxes}
        </Responsive>
    </Box>
};