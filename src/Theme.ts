
export const GlobalTheme = {
    global: {
        colors: {
            MebsDarkBlue: '#78d0bb',
            MebsLightBlue: '#9befdb',
            MebsDarkYellow: '#f2dd8c',
            MebsLightYellow: '#f6e6ab',
            MebsDarkGray: '#737373',
            MebsLightGray: '#cbcdca'
        },
        font: {
            family: 'Helvetica',
            size: '14px',
            height: '20px',
        },
        breakpoints: {
            xsmall: {
                value: 650,
            },
            small: {
                value: 950
            },
            medium: {
                value: 1300
            },
            large: {
                value: 1600
            },
            xlarge: {
                value: 3000
            }
        }
    },
};

type Sizes = ('xsmall' | 'small' | 'medium' | 'large' | 'xlarge');
export function getGridBoxWidth(size: Sizes) {

    var x = GlobalTheme.global.breakpoints[size];
    return x;
}