const breakpoints = [32, 48, 64, 80].map(n => n + "em");

let space = [];

for (let i = 0; i < 37; i++) {
    space.push(i * 2);
}

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72, 96];

const fontWeights = {
    normal: 400,
    bold: 700
};

const radii = [0, 2, 4];

const theme = {
    breakpoints,
    space,
    fontSizes,
    fontWeights,
    radii
};

export default theme;
