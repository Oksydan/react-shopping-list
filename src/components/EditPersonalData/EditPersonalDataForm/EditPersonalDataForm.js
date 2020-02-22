import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../Form/Form';
import * as actions from '../../../store/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';



class PersonalDataForm extends Component {

    componentWillUnmount() {
        this.props.clearError();
    }

    render() {
        const fields = {
            name: {
                name: 'name',
                type: 'text',
                label: 'Your name',
                value: this.props.uName,
                validation: {
                    minLength: 3,
                    isRequired: true
                },
                validationInfo: 'Name must contains at least 3 characters',
                validationInfoDisplayed: false,
                hasError: false,
                icon: <FontAwesomeIcon icon={faUser} />
            }
        }

        return (
            <Form
                onFormSubmit={this.props.updateData}
                submitText="Edit"
                fields={fields}
                error={this.props.error}
            >
                <p>Edit your user name</p>
            </Form>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        uName: state.auth.displayName,
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateData: ({ name }) => dispatch(actions.updateUserData(name)),
        clearError: () => dispatch(actions.eraseError())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PersonalDataForm);