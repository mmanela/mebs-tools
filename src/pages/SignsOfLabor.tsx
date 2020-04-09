import React, { useState } from "react";
import { Box, ResponsiveContext } from "grommet";
import styled from "styled-components";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';


export interface DragItem {
    type: string
    id: string
    top: number
    left: number
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

const signsOfLabor = [
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
const StyledCard = styled(Box)`
border: 1px solid #000;
padding:5px;
margin:10px;
cursor: move;
display: inline-block;
border-radius:10px;`;

type SignCardProps = { title: string, top?: number, left?: number };
export const SignCard: React.FC<SignCardProps> = (props: SignCardProps): JSX.Element => {
    const [{ opacity }, drag] = useDrag({
        item: { id: props.title, type: "sign" } as DragItem,
        collect: (monitor) => ({
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

    return <StyledCard style={{ opacity, fontSize, "top": props.top, "left": props.left, "position": props.left ? "absolute" : "static" }} ref={drag} align="center" elevation="small" hoverIndicator>
        <h3>{props.title}</h3>
    </StyledCard>;
}

export const SignsOfLaborSection: React.FC = () => {
    var signBoxes = signsOfLabor.map(s => {
        return <SignCard key={s} title={s} />;
    });
    return <Box height="40%" direction="row" align="center" justify="center" wrap margin={{ "bottom": "70px" }} >
        {signBoxes}
    </Box>;
};


export const LaborSignDropTarget: React.FC = (): JSX.Element => {
    const dropTargetRef = React.useRef<HTMLDivElement>(null);
    const [boxes, setBoxes] = useState<DragItem[]>([]);
    const moveBox = (item: DragItem) => {

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
        drop(item: DragItem, monitor) {
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
        return <SignCard title={x.id} left={x.left} top={x.top} />
    });


    const DropZone = styled.div`
    display:block;
    position: relative;
    width: 100%;
    height: 100%;
    `;

    return (
        <Box style={{ backgroundColor }} fill>
            <LaborCategoriesSection />
            <DropZone ref={dropTargetRef}>
                <DropZone ref={drop}>
                    {signBoxes}
                </DropZone>
            </DropZone>
        </Box >
    )
}

export const LaborCategoriesSection: React.FC = () => {
    var categoryBoxes = laborCategories.map(c => <Box key={c.Title} width="33%">
        <h1>{c.Title}</h1>
        <span>{c.Description}</span>
    </Box>);
    return <Box height="auto" direction="row" align="stretch" gap="large">
        {categoryBoxes}
    </Box>;
};

export const SignsOfLabor: React.FC = () => {
    return <DndProvider backend={Backend}>
        <Box direction="column" align="center" fill>
            <h1>Signs of Labor</h1>
            <SignsOfLaborSection />
            <LaborSignDropTarget />
        </Box>
    </DndProvider>;
};

