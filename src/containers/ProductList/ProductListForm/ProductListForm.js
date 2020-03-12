import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import { getUniqueId } from '../../../utils/utils';
import { withRouter } from "react-router";
import Form from '../../../components/Form/Form';



const productListForm = props =>  {


    const onSubmit = (data) => {
        props.onProductAdd(data.productName.value, getUniqueId(), props.match.params.id);
    }

    const fields = {
        productName: {
            name: 'productName',
            type: 'text',
            value: '',
            validation: {
                isRequired: true,
                minLength: 3
            },
            validationInfo: 'Product name have to contain at least 3 characters',
            validationInfoDisplayed: false,
            hasError: false
        }
    };
    

    return (
        <Form 
            onFormSubmit={onSubmit}
            submitText="Add"
            fields={fields}
            oneLineForm={true}
            clearFieldsAfterSubmit={true}
            />
    );
}



const mapDispatchToProps = dispatch => {
    return {
        onProductAdd: (name, id, listId) => dispatch(action.addProduct(name, id, listId))
    }
}


export default withRouter(connect(null, mapDispatchToProps)(productListForm));