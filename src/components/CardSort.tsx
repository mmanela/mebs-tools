import React, { useState } from "react";
import { Box, ResponsiveContext } from "grommet";
import styled from "styled-components";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { CardSortStore, CardData, CardLocation, CardCategoryData, CardSortConfig } from "../stores/cardSortStore";


const StyledCard = styled(Box)`
background-color: lightblue;
border: 1px solid #000;
padding:5px;
cursor: move;
display: inline-block;
border-radius:10px;`;

type CardProps = { card: CardData, location: CardLocation, config: CardSortConfig };
const Card: React.FC<CardProps> = (props: CardProps): JSX.Element => {
    const [{ opacity, isDragging, isDropped }, drag] = useDrag({
        item: props.card,
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

    if (isDragging || isDropped || props.location !== props.card.location) {
        return <div />;
    }

    let css: React.CSSProperties = { opacity, fontSize, "top": props.card.top, "left": props.card.left, "position": props.card.left ? "absolute" : "static" };
    if (props.config.cardBackgroundColor) {
        css.backgroundColor = props.config.cardBackgroundColor;
    }

    return <StyledCard style={css}
        ref={drag}
        align="center"
        elevation="small"
        hoverIndicator>
        <h3>{props.card.id}</h3>
    </StyledCard>;
}

type CardSortInternalProps = { cards: CardData[], categories: CardCategoryData[], config: CardSortConfig };
const CardSection: React.FC<CardSortInternalProps> = (props) => {
    var boxes = props.cards.map(s => {
        return <Card key={s.id} card={s} config={props.config} location={CardLocation.List} />;
    });
    return <Box height="40%" direction="row" align="center" gap="medium" justify="center" wrap margin={{ "bottom": "70px" }} >
        {boxes}
    </Box>;
};

const DropZone = styled.div`
display:block;
position: relative;
width: 100%;
height: 100%;
`;
const CategoriesDropTarget: React.FC<CardSortInternalProps> = (props): JSX.Element => {
    const dropTargetRef = React.useRef<HTMLDivElement>(null);
    const [boxes, setBoxes] = useState<CardData[]>(props.cards.filter(x => x.location === CardLocation.Categories));
    const moveBox = (item: CardData) => {

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
        accept: "card",
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
        hover(item: CardData, monitor) {
            const delta = monitor.getClientOffset();
            if (delta) {
                console.log(`x:${delta.x}, y:${delta.y})`);
            }
        },
        drop(item: CardData, monitor) {
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

    var cardBoxes = boxes.map(x => {
        return <Card key={x.id} card={x} location={CardLocation.Categories} config={props.config} />
    });

    return (
        <Box style={{ backgroundColor }} fill ref={dropTargetRef}>
            <DropZone ref={drop}>
                <CategoriesSection {...props} />
                {cardBoxes}
            </DropZone>
        </Box >
    )
}

const CategoriesSection: React.FC<CardSortInternalProps> = (props) => {
    var categoryBoxes = props.categories.map(c => <Box key={c.title} width="33%">
        <h1>{c.title}</h1>
        <span>{c.description}</span>
    </Box>);
    return <Box height="auto" direction="row" align="stretch" gap="large">
        {categoryBoxes}
    </Box>;
};

const StyledBox = styled(Box)`
  padding-left:15px;
  padding-right:15px;
`;

export type CardSortProps = {
    configuration: CardSortConfig
    store: CardSortStore
}

export const CardSort: React.FC<CardSortProps> = (props: CardSortProps) => {

    const state = props.store.getState(props.configuration);
    return <DndProvider backend={Backend}>
        <StyledBox direction="column" align="center" fill>
            <h1>{props.configuration.title}</h1>
            <CardSection cards={state.cards} categories={state.categories} config={props.configuration} />
            <CategoriesDropTarget cards={state.cards} categories={state.categories} config={props.configuration} />
        </StyledBox>
    </DndProvider>;
};

