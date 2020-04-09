import React, { useState } from 'react';
import ReactCardFlip, { ReactFlipCardProps } from 'react-card-flip';
import styled from 'styled-components';

export type FlipCardProps = Partial<ReactFlipCardProps> & {
    frontText: string,
    backText: string
}

const YesStyleBox = styled.div`
background-color: ${props => props.theme.global.colors.MebsDarkBlue};
border: 1px solid #000;
border-radius:40px;
text-align: center;
color: black;`;

const NoStyleBox = styled.div`
background-color: ${props => props.theme.global.colors.MebsDarkGray};
border: 1px solid #000;
border-radius:40px;
text-align: center;
color: white;`;


const CardText = styled.h1`
width:100%;`;

export function FlipCard(props: FlipCardProps) {
    const cardStyle = {
        borderRadius: '3px',
        padding: '15px',
        width: '250px',
        height: '150px',
        alignItems: "center",
        display: "flex",
        lineHeight: "normal"
    };

    const [isFlipped, setIsFlipped] = useState(false);

    return <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={{ width: "250px", height: "150px" }}>
        <YesStyleBox onClick={() => setIsFlipped(!isFlipped)} style={cardStyle}>
            <CardText>
                {props.frontText}
            </CardText>
        </YesStyleBox>
        <NoStyleBox onClick={() => setIsFlipped(!isFlipped)} style={cardStyle}>
            <CardText>
                {props.backText}
            </CardText>
        </NoStyleBox>
    </ReactCardFlip>;
}
