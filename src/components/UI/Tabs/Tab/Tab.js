import React from 'react';


const tab = ({ children, selected, ...props}) => {

    let classes = "tabs__panel";

    if(selected) {
        classes += " tabs__panel--active";
    }

    return (
        <div 
            className={classes}
            {...props}>
            {children}
        </div>
    );
}

export default tab;