import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Button/Button';

const form = props => (
    <form onSubmit={props.handleSubmit} className="form">
        {props.children}
        <div className="form__submit">
            <Button
                type='submit'
                clicked={props.handleSubmit}
                displayType='primary'
                classes={['button--block']}
            >
                {props.submitText ? props.submitText : 'Submit'}
            </Button>
        </div>
        
    </form>
);

form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    submitText: PropTypes.string
}


export default form;