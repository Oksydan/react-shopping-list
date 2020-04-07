import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import { getUniqueId } from '../../../utils/utils';
import PropTypes from 'prop-types';
import Form from '../../../components/Form/Form';



const shoppingListForm = props =>  {

    const onSubmit = data => {
        props.onListAdd(data.listName.value, getUniqueId(), props.userID);
    }

    const fields = {
        listName: {
            name: 'listName',
            type: 'text',
            value: '',
            validation: {
                isRequired: true,
                minLength: 3
            },
            validationInfo: 'Shopping list name have to contain at least 3 characters',
            validationInfoDisplayed: false,
            hasError: false
        }
    };

    const conent = (
        props.userID !== null ? 
            <Form
                onFormSubmit={onSubmit}
                submitText="Add"
                fields={fields}
                oneLineForm={true}
                clearFieldsAfterSubmit={true}
            />
        :
        <p>Login to your account to start adding products to your shopping list</p>
    )
    

    return conent;
}



const mapDispatchToProps = dispatch => {
    return {
        onListAdd: (name, id, authorID) => dispatch(action.addList(name, id, authorID))
    }
}
const mapStateToProps = state => {
    return {
        userID: state.auth.uId
    }
}

shoppingListForm.propTypes = {
    onListAdd: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(shoppingListForm);