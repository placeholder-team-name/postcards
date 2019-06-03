import React from "react";
import "loaders.css/loaders.min.css";

import ColoredCircle from "./ColoredCircle";
import Ball from "./Ball";

const LoadingSpinner = ({ type }) => {
    switch (type) {
        case "circle":
            return (
                <div className="loader">
                    <div className="loader-inner ball-clip-rotate">
                        <ColoredCircle />
                    </div>
                </div>
            );
        case "balls":
            return (
                <div className="loader">
                    <div className="ball-pulse">
                        <Ball />
                        <Ball />
                        <Ball />
                    </div>
                </div>
            );
    }
};

export default LoadingSpinner;
