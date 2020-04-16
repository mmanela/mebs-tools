import React, { useState } from "react";
import { Box, ResponsiveContext } from "grommet";
import styled from "styled-components";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';


export interface SignOfLabor {
    type: string
    id: string
    top?: number
    left?: number,
    location: CardLocation
}


interface LaborCategory {
    Title: string,
    Description: string
};

const laborCategories: LaborCategory[] = [
    { Title: "Possible", Description: "Could be related to labor starting, but could also just be discomfort in late pregnancy - it could still be several weeks before baby is here" },
    { Title: "Pre-Labor", Description: "It could still be several weeks before baby is here Pre-Labor: your body is definitely making changes towards labor - don't be surprised if you meet baby in a week or two" },
    { Title: "Positive", Description: "Surefire signs of labor coming on! Get ready to welcome your baby in the next day or two" },
]

const signsOfLaborTitles = [
    "Bloody Show",
    "Non-progressing Contractions",
    "Restless Backache",
    "Nesting Urge",
    "Soft Bowel Movements",
    "Progressing Contractions (Longer, Stronger, Closer Together)",
    "Rupture of Membranes (Gush of Fluid)",
    "Leaking Fluid",
    "Cramping",
    "Nausea"
];


enum CardLocation { Signs, Categories };
const signsOfLabor: SignOfLabor[] = signsOfLaborTitles.map((s) => { return { id: s, type: "sign", location: CardLocation.Signs } });

const StyledCard = styled(Box)`
background-color: ${props => props.theme.global.colors.MebsDarkBlue};
border: 1px solid #000;
padding:5px;
cursor: move;
display: inline-block;
border-radius:10px;`;

type SignCardProps = { laborSign: SignOfLabor, location: CardLocation };
const SignCard: React.FC<SignCardProps> = (props: SignCardProps): JSX.Element => {
    const [{ opacity, isDragging, isDropped }, drag] = useDrag({
        item: props.laborSign,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            isDropped: monitor.didDrop(),
            opacity: monitor.isDragging() ? 0.4 : 1,
        })
    })


    const size = React.useContext(ResponsiveContext);
    let fontSize = "inherit";
    if (size === "small") {
        fontSize = "11px";
    }
    else if (size === "xsmall") {
        fontSize = "9px";
    }

    if (isDragging || isDropped || props.location !== props.laborSign.location) {
        return <div />;
    }

    return <StyledCard style={{ opacity, fontSize, "top": props.laborSign.top, "left": props.laborSign.left, "position": props.laborSign.left ? "absolute" : "static" }}
        ref={drag}
        align="center"
        elevation="small"
        hoverIndicator>
        <h3>{props.laborSign.id}</h3>
    </StyledCard>;
}

const SignsOfLaborSection: React.FC = () => {
    var signBoxes = signsOfLabor.map(s => {
        return <SignCard key={s.id} laborSign={s} location={CardLocation.Signs} />;
    });
    return <Box height="40%" direction="row" align="center" gap="medium" justify="center" wrap margin={{ "bottom": "70px" }} >
        {signBoxes}
    </Box>;
};

const DropZone = styled.div`
display:block;
position: relative;
width: 100%;
height: 100%;
`;
const LaborSignDropTarget: React.FC = (): JSX.Element => {
    const dropTargetRef = React.useRef<HTMLDivElement>(null);
    const [boxes, setBoxes] = useState<SignOfLabor[]>(signsOfLabor.filter(x => x.location === CardLocation.Categories));
    const moveBox = (item: SignOfLabor) => {

        let boxList = boxes.filter(x => x.id === item.id);
        if (boxList != null && boxList.length > 0) {
            const box = boxList[0];
            box.left = item.left;
            box.top = item.top;
        } else {
            boxes.push(item);
        }
        setBoxes(boxes);
    }


    const [{ canDrop, isOver }, drop] = useDrop({
        accept: "sign",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        hover(item: SignOfLabor, monitor) {
            const delta = monitor.getClientOffset();
            if (delta) {
                console.log(`x:${delta.x}, y:${delta.y})`);
            }
        },
        drop(item: SignOfLabor, monitor) {
            item.location = CardLocation.Categories;
            const delta = monitor.getClientOffset();
            if (delta !== null && dropTargetRef.current) {
                item.left = delta.x - dropTargetRef.current.offsetLeft;
                item.top = delta.y - dropTargetRef.current.offsetTop;

                moveBox(item);
            }
            return undefined
        },
    });
    const isActive = canDrop && isOver
    let backgroundColor = 'transparent';
    if (isActive) {
        backgroundColor = '#ccc';
    } else if (canDrop) {
        backgroundColor = '#ddd';
    }

    var signBoxes = boxes.map(x => {
        return <SignCard key={x.id} laborSign={x} location={CardLocation.Categories} />
    });

    return (
        <Box style={{ backgroundColor }} fill ref={dropTargetRef}>
            <DropZone ref={drop}>
                <LaborCategoriesSection />
                {signBoxes}
            </DropZone>
        </Box >
    )
}

const LaborCategoriesSection: React.FC = () => {
    var categoryBoxes = laborCategories.map(c => <Box key={c.Title} width="33%">
        <h1>{c.Title}</h1>
        <span>{c.Description}</span>
    </Box>);
    return <Box height="auto" direction="row" align="stretch" gap="large">
        {categoryBoxes}
    </Box>;
};

const StyledBox = styled(Box)`
  padding-left:15px;
  padding-right:15px;
`;

export const SignsOfLabor: React.FC = () => {
    return <DndProvider backend={Backend}>
        <StyledBox direction="column" align="center" fill>
            <h1>Signs of Labor</h1>
            <SignsOfLaborSection />
            <LaborSignDropTarget />
        </StyledBox>
    </DndProvider>;
};

