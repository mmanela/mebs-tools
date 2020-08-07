
export declare function createWinWheel(config: WinwheelConfig, drawWheel?: boolean): Winwheel;
declare class Winwheel {
    constructor(config: WinwheelConfig, drawWheel?: boolean);
    getIndicatedSegmentNumber(): number;
    getIndicatedSegment(): string;
    startAnimation(): void;
    stopAnimation(canCallback?: boolean): void;
    draw(clearTheCanvas?: boolean): void;
    deleteSegment(position?: number): void;
    addSegment(segment?: WinwheelSegment, position?: number): void;
    rotationAngle?: number;
}

export interface WinwheelPointerGuide {
    display?: string;
    strokeStyle?: string;
    lineWidth?: number;
}
export interface WinwheelPin {
    visible?: boolean;
    number?: number;
    outerRadius?: number;
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;
    margin?: number;
    responsive?: boolean;
}

export interface WinwheelSegment {
    size?: number;
    text?: string;
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;
    textFontFamily?: string;
    textFontSize?: number;
    textFontWeight?: string;
    textOrientation?: ('horizontal' | 'vertical' | 'curved');
    textAlignment?: ('inner' | 'outer' | 'center');
    textDirection?: ('normal' | 'reversed');
    textMargin?: number;
    textFillStyle?: string;
    textStrokeStyle?: string;
    textLineWidth?: number;
    image?: string;
    imageDirection?: ('N' | 'E' | 'S' | 'W')

}
export interface WinwheelAnimation {
    type?: ('spinOngoing' | 'spinToStop' | 'spinAndBack' | 'custom');
    direction?: ('clockwise' | 'anti-clockwise');
    propertyName?: string;
    duration?: number;
    yoyo?: boolean;
    repeat?: number;
    easing?: any;
    stopAngle?: number;
    spins?: number;
    clearTheCanvas?: boolean;
    callbackFinished?: (indicatedSegment: WinwheelSegment) => void;
    callbackBefore?: () => void;
    callbackAfter?: () => void;
    soundTrigger?: ('segment' | 'pin');
}
export interface WinwheelConfig {
    canvasId?: string;
    centerX?: number;
    centerY?: number;
    outerRadius?: number;
    innerRadius?: number;
    drawMode?: ('code' | 'image' | 'segmentImage');
    numSegments?: number;
    rotationAngle?: number;

    // Same as in WinwheelSegment
    textFontFamily?: string;
    textFontSize?: number;
    textFontWeight?: string;
    textOrientation?: ('horizontal' | 'vertical' | 'curved');
    textAlignment?: ('inner' | 'outer' | 'center');
    textDirection?: ('normal' | 'reversed');
    textMargin?: number;
    textFillStyle?: string;
    textStrokeStyle?: string;
    textLineWidth?: number;
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;

    clearTheCanvas?: boolean;
    imageOverlay?: boolean;
    drawText?: boolean;
    pointerAngle?: number;
    wheelImage?: any;
    imageDirection?: ('N' | 'E' | 'S' | 'W');
    responsive?: boolean;
    scaleFactor?: number;
    segments?: WinwheelSegment[];
    animation?: WinwheelAnimation;
    pointerGuide?: WinwheelPointerGuide;
    pins?: boolean | WinwheelPin;

    // MManela Additions
    widthDivisor?: number;
}
