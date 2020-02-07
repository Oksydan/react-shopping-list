import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button/Button';

const form = props => (
    <form onSubmit={props.handleSubmit}>
        {props.children}
        <Button
            type='submit'
            clicked={props.handleSubmit}
            displayType='primary'
            classes={['button--block']}
            >
            Submit
        </Button>
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