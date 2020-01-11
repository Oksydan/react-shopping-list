import React from 'react';
import PropTypes from 'prop-types';

const backdrop = (props) => (
    props.show ? <div 
                    onClick={props.clicked}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        zIndex: '100',
                        left: 0,
                        top: 0,
                        backgroundColor: 'rgba(0, 0, 0, .5)'
                    }}
                    ></div> : null
);


backdrop.propTypes = {
    show: PropTypes.bool.isRequired,
    clicked: PropTypes.func.isRequired
}

export default backdrop;