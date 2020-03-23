import React, { useState } from 'react';
import ReactCardFlip, { ReactFlipCardProps } from 'react-card-flip';
import styled from 'styled-components';

export type FlipCardProps = Partial<ReactFlipCardProps> & {
    frontText: string,
    backText: string
}

const YesStyleBox = styled.div`
border: 1px solid ${props => props.theme.global.colors.brand};
border-radius:40px;
`;

const NoStyleBox = styled.div`
background-color: ${props => props.theme.global.colors.brand};
border: 1px solid #000;
border-radius:40px;
color: white;`;

export function FlipCard(props: FlipCardProps) {
    const cardStyle = {
        borderRadius: '3px',
        padding: '15px',
        width: '250px',
        height: '250px',
        alignItems: "center",
        display: "flex",
        lineHeight: "normal"
    };

    const [isFlipped, setIsFlipped] = useState(false);
    return <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={{ width: "250px", height: "250px" }}>
        <YesStyleBox onClick={() => setIsFlipped(!isFlipped)} style={cardStyle}>
            <h1>
                {props.frontText}
            </h1>
        </YesStyleBox>
        <NoStyleBox onClick={() => setIsFlipped(!isFlipped)} style={cardStyle}>
            <h1>
                {props.backText}
            </h1>
        </NoStyleBox>
    </ReactCardFlip>;
}
