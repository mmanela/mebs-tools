import React, { Component } from "react";

import { createWinWheel, WinwheelConfig, Winwheel, WinwheelSegment } from '../external/Winwheel'
import styled from "styled-components";
import { WheelSegmentConfig } from "../stores/wheelStore";

export type WinWheelProps = {
    id: string;
    spinResultCallback?: (result?: string) => void;
    spinIteration: number;
    widthDivisor?: number;
    options: WheelSegmentConfig[];
    colors?: string[];
};

export type WinWheelState = {
    options: string[]
}



const CanvasContainer = styled.div`
    position: relative;
`;

const StyledCanvas = styled.canvas`
margin-left: 10px;
margin-right: 10px;
margin-top:10px;
`;

export class WinwheelWrapper extends Component<WinWheelProps, WinWheelState> {
    static defaultProps: WinWheelProps = { id: "", spinIteration: 0, options: [], widthDivisor: 1 }
    private winwheel?: Winwheel;
    private defaultColors: string[] = ['#eae56f', '#89f26e', '#7de6ef', '#e7706f'];

    constructor(props: WinWheelProps) {
        super(props);
        this.state = { options: props.options.map(x => x.text) };
    }

    findOptionIndex(text: string) {
        for (let i = 0; i < this.state.options.length; i++) {
            if (this.state.options[i] === text) {
                return i;
            }
        }
        return -1;
    }

    componentDidMount() {

        const colors = this.props.colors || this.defaultColors;
        const segments: WinwheelSegment[] = this.props.options.map<WinwheelSegment>((value, index) => {
            return {
                text: value.text,
                textFontSize: value.fontSize,
                fillStyle: value.backgroundColor || colors[index % colors.length]
            }
        });
        let config: WinwheelConfig = {
            canvasId: `winwheel - canvas - ${this.props.id} `,
            innerRadius: 30,
            widthDivisor: this.props.widthDivisor,
            numSegments: segments.length,         // Number of segments
            textFontSize: 28,        // Font size.
            responsive: true,
            segments: segments,            // Definition of all the segments.,
            animation:               // Definition of the animation
            {
                type: 'spinToStop',
                duration: 5,
                spins: 8,
                callbackFinished: (indicatedSegment) => {

                    if (this.props.spinResultCallback) {
                        this.props.spinResultCallback(indicatedSegment.text);
                    }

                    setTimeout(() => {

                        if (indicatedSegment && indicatedSegment.text) {
                            const indexToRemove = this.findOptionIndex(indicatedSegment.text);
                            let newOptions = [...this.state.options];
                            newOptions.splice(indexToRemove, 1);
                            this.winwheel?.deleteSegment(indexToRemove + 1);
                            this.setState({ options: newOptions });
                            this.winwheel?.draw();
                        }
                    }, 1000);

                }
            }
        };
        this.winwheel = createWinWheel(config);
    }

    componentWillUnmount() {
        if (this.winwheel) {
            this.winwheel = undefined;
        }
    }

    componentDidUpdate(prevProps: WinWheelProps) {
        if (this.winwheel) {
            if (prevProps.spinIteration < this.props.spinIteration) {
                // If we have increased the spin iteration do another spin
                this.winwheel.stopAnimation(false);

                // Reset the rotation angle to less than or equal to 360 so spinning again works as expected.
                // Setting to modulus (%) 360 keeps the current position.
                this.winwheel.rotationAngle = this.winwheel.rotationAngle ? this.winwheel.rotationAngle % 360 : 0;

                // Start animation.
                this.winwheel.startAnimation();
            }
        }
    }


    render() {
        return <CanvasContainer>
            <StyledCanvas className="winwheel-canvas" id={`winwheel - canvas - ${this.props.id} `}
                data-responsiveminwidth="200"
                data-responsivemaxwidth="800"
                data-responsivemaxheight="800"
                data-responsivescaleheight="true"   /* Optional Parameters */
                data-responsivemargin="80"
                width="800"
                height="800"
            >
                Canvas not supported, use another browser.
        </StyledCanvas>
        </CanvasContainer >;
    }
}