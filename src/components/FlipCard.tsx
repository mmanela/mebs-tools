import React, { useState } from 'react';
import ReactCardFlip, { ReactFlipCardProps } from 'react-card-flip';
import styled from 'styled-components';

export type FlipCardProps = Partial<ReactFlipCardProps> & {
    frontText: string,
    backText: string,
    frontBackgroundColor?: string,
    backBackgroundColor?: string,
    onFlip?: (flipped: boolean) => void
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

    const [isFlipped, setIsFlipped] = useState(props.isFlipped);

    const flip = (flipped: boolean) => {
        setIsFlipped(flipped);
        if (props.onFlip) {
            props.onFlip(flipped);
        }
    }

    let frontCss: React.CSSProperties = { ...cardStyle };
    if (props.frontBackgroundColor) {
        frontCss.backgroundColor = props.frontBackgroundColor;
    }

    let backCss: React.CSSProperties = { ...cardStyle };
    if (props.backBackgroundColor) {
        backCss.backgroundColor = props.backBackgroundColor;
    }

    return <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" containerStyle={{ width: "250px", height: "150px" }}>
        <YesStyleBox style={frontCss} onClick={() => flip(!isFlipped)}>
            <CardText>
                {props.frontText}
            </CardText>
        </YesStyleBox>
        <NoStyleBox style={backCss} onClick={() => flip(!isFlipped)}>
            <CardText>
                {props.backText}
            </CardText>
        </NoStyleBox>
    </ReactCardFlip>;
}
