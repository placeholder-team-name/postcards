import React from "react";

import "loaders.css/loaders.min.css";

import ColoredCircle from "./ColoredCircle";

const LoadingSpinner = () => {
    return (
        <div className="loader">
            <div className="loader-inner ball-clip-rotate">
                <ColoredCircle />
            </div>
        </div>
    );
};

export default LoadingSpinner;
