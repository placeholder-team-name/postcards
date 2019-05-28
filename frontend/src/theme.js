const breakpoints = [32, 48, 64, 80].map(n => n + "em");

let space = [];

for (let i = 0; i < 37; i++) {
    space.push(i * 4);
}

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 72, 96];

const fontWeights = {
    normal: 400,
    bold: 700
};

const radii = [0, 2, 4];

const shadows = {
    low: `0 2px 8px rgba(0, 0, 0, 0.08)`,
    lowRight: `2px 2px 8px rgba(0, 0, 0, 0.08)`,
    mid: `0 4px 12px rgba(0, 0, 0, 0.08)`,
    high: `0 8px 16px rgba(0, 0, 0, 0.08)`
};

const theme = {
    breakpoints,
    space,
    fontSizes,
    fontWeights,
    radii,
    shadows
};

export default theme;
