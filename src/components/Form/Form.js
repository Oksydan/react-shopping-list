import React from 'react';
import PropTypes from 'prop-types';

const form = props => (
    <form onSubmit={props.handleSubmit}>
        {props.children}
        <button type='submit' onClick={props.handleSubmit}>SUBMIT</button>
    </form>
);

form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}


export default form;