import React from "react";

const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            <p>{line}</p>
        </React.Fragment>
    ));
};

export default formatTextWithLineBreaks;