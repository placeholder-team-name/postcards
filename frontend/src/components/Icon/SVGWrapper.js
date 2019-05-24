import styled from "styled-components";

const SVGWrapper = styled.div`
    display: inline-block;
    flex: 0 0 ${props => (props.size ? `${props.size}px` : "32px")};
    width: ${props => (props.size ? `${props.size}px` : "32px")};
    height: ${props => (props.size ? `${props.size}px` : "32px")};
    min-width: ${props => (props.size ? `${props.size}px` : "32px")};
    min-height: ${props => (props.size ? `${props.size}px` : "32px")};
    position: relative;
    color: inherit;
`;

export default SVGWrapper;
