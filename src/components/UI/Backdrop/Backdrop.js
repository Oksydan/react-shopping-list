import React from 'react';
import PropTypes from 'prop-types';

const backdrop = (props) => (
    props.show ? <div 
                    className="backdrop"
                    onClick={props.clicked}
                    ></div> : null
);


backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func.isRequired
}

export default backdrop;