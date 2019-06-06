// Adapted from https://github.com/rebassjs/rebass/blob/master/src/index.js
// MIT License

import styled from "styled-components";
import {
    space,
    color,
    width,
    height,
    flex,
    order,
    alignSelf,
    flexWrap,
    flexDirection,
    alignItems,
    justifyContent,
    fontSize,
    fontFamily,
    fontWeight,
    textAlign,
    lineHeight,
    letterSpacing,
    borders,
    borderColor,
    borderRadius,
    size,
    buttonStyle,
    boxShadow,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    opacity,
    variant,
    maxWidth
} from "styled-system";
import { Link as ReachLink } from "@reach/router";

const themed = key => props => props.theme[key];

export const Box = styled("div")(
    {
        boxSizing: "border-box"
    },
    space,
    boxShadow,
    width,
    fontSize,
    color,
    flex,
    order,
    alignSelf,
    maxWidth,
    height,
    themed("Box")
);

Box.propTypes = {
    ...space.propTypes,
    ...boxShadow.propTypes,
    ...width.propTypes,
    ...fontSize.propTypes,
    ...color.propTypes,
    ...flex.propTypes,
    ...order.propTypes,
    ...alignSelf.propTypes,
    ...maxWidth.propTypes,
    ...height.propTypes
};

export const Flex = styled(Box)(
    {
        display: "flex"
    },
    flexWrap,
    flexDirection,
    alignItems,
    justifyContent,
    themed("Flex")
);

Flex.propTypes = {
    ...flexWrap.propTypes,
    ...flexDirection.propTypes,
    ...alignItems.propTypes,
    ...justifyContent.propTypes
};

export const Text = styled(Box)(
    fontFamily,
    fontWeight,
    textAlign,
    lineHeight,
    letterSpacing,
    maxWidth,
    themed("Text")
);

Text.propTypes = {
    ...fontFamily.propTypes,
    ...fontWeight.propTypes,
    ...textAlign.propTypes,
    ...lineHeight.propTypes,
    ...letterSpacing.propTypes,
    ...maxWidth.propTypes
};

Text.defaultProps = {
    as: "p"
};

export const Heading = styled(Text)(themed("Heading"));

Heading.defaultProps = {
    as: "h2",
    m: 0,
    fontSize: 4,
    fontWeight: "bold",
    lineHeight: 1.25
};

export const Link = styled(Box)(
    {
        textDecoration: "none",
        color: "inherit"
    },
    themed("Link")
);

Link.defaultProps = {
    as: "a"
};

export const Button = styled(Box)(
    {
        appearance: "none",
        display: "inline-block",
        textAlign: "center",
        lineHeight: "inherit",
        textDecoration: "none"
    },
    fontWeight,
    borders,
    borderColor,
    borderRadius,
    buttonStyle,
    themed("Button")
);

Button.propTypes = {
    ...fontWeight.propTypes,
    ...borders.propTypes,
    ...borderColor.propTypes,
    ...borderRadius.propTypes,
    ...buttonStyle.propTypes
};

Button.defaultProps = {
    as: "button",
    fontSize: "inherit",
    fontWeight: "bold",
    m: 0,
    px: 3,
    py: 2,
    color: "white",
    bg: "blue",
    border: 0,
    borderRadius: 4
};

export const Image = styled(Box)(
    {
        maxWidth: "100%",
        height: "auto"
    },
    height,
    borderRadius,
    themed("Image")
);

Image.propTypes = {
    ...height.propTypes,
    ...borderRadius.propTypes
};

Image.defaultProps = {
    as: "img",
    m: 0
};

const cards = variant({ key: "cards" });

export const Card = styled(Box)(
    borders,
    borderColor,
    borderRadius,
    boxShadow,
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    opacity,
    cards,
    themed("Card")
);

Card.propTypes = {
    ...borders.propTypes,
    ...borderColor.propTypes,
    ...borderRadius.propTypes,
    ...boxShadow.propTypes,
    ...backgroundImage.propTypes,
    ...backgroundSize.propTypes,
    ...backgroundPosition.propTypes,
    ...backgroundRepeat.propTypes,
    ...opacity.propTypes,
    ...cards.propTypes
};

export const Container = styled(Box)({
    maxWidth: "1024px",
    width: "100%"
});

Container.defaultProps = {
    mx: "auto",
    px: 6
};

export const Measure = styled(Box)({});

Measure.defaultProps = {
    maxWidth: "30rem"
};

export const PageLink = styled(ReachLink)(
    {
        textDecoration: "none",
        color: "inherit"
    },
    color
);

export const Avatar = styled("img")(
    {
        display: "inline-block"
    },
    borderRadius,
    space,
    color,
    size
);

Avatar.propTypes = {
    ...borderRadius.propTypes,
    ...space.propTypes,
    ...color.propTypes,
    ...size.propTypes
};

Avatar.defaultProps = {
    size: 48,
    borderRadius: "50%"
};

export const ScrollView = styled(Flex)({
    overflowY: "auto"
});

ScrollView.defaultProps = {
    flexDirection: "column",
    flex: 1
};
