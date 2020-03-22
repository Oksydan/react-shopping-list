import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import ShoppingListElem from '../../components/ShoppingList/ShoppingListElem/ShoppingListsElem';
import Modal from '../../components/UI/Modal/Modal';
import Form from '../../components/Form/Form';
import Alert from '../../components/UI/Alert/Alert';

class ShoppingList extends Component {

    state = {
        modalVisible: false,
        editListId: null,
        editTitle: '',
        isTtileValid: true
    }

    componentDidMount() {
        if (this.props.userID !== null && !this.props.alreadySubscribed) {
            this.props.fetchShopplingLists();
        }
    }

    removeList = (id) => {
        this.props.removeListEleme(id);
    }

    editListTitle = (id, title) => {
        this.setState({
            modalVisible: true,
            editListId: id,
            editTitle: title,
        })
    }

    handleHideModal = () => {
        this.setState({
            modalVisible: false,
            editListId: null,
            editTitle: ''
        })
    }


    handleTitleEditSubmit = (data) => {
        this.props.listTitleEdit(this.state.editListId, data.listName.value);
        this.handleHideModal();
    }
    

    render() {
        const shoppingLists = this.props.list.sort((a, b) => b.dateAdd - a.dateAdd).map(list => 
            <ShoppingListElem 
                title={list.listName}
                key={list.id}
                id={list.id}
                date={list.dateAdd}
                listElemes={list.listElems}
                checkedElemes={list.checkedElems}
                handleDelete={() => this.removeList(list.id)}
                handleEdit={() => this.editListTitle(list.id, list.listName)}
        />);

        const fields = {
            listName: {
                name: 'listName',
                type: 'text',
                value: this.state.editTitle,
                validation: {
                    isRequired: true,
                    minLength: 3
                },
                validationInfo: 'Shopping list name have to contain at least 3 characters',
                validationInfoDisplayed: false,
                hasError: false
            }
        };

        
        return (
            <div>
                {shoppingLists.length > 0 ? 
                    <ul className="shoppingList">
                        {shoppingLists}
                    </ul>
                    :
                    <Alert type="info" text="Add your first shopping list" />
                }
                <Modal
                    show={this.state.modalVisible}
                    modalClosed={this.handleHideModal}
                    title='Edit shopping list'
                >
                    <Form
                        onFormSubmit={this.handleTitleEditSubmit}
                        submitText="Edit"
                        fields={fields}
                        oneLineForm={true}
                    />
                </Modal>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.shoppingList.shoppingLists,
        userID: state.auth.uId,
        alreadySubscribed: state.shoppingList.dataSubscribed
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchShopplingLists: () => dispatch(action.fetchList()),
        removeListEleme: (id) => dispatch(action.removeList(id)),
        listTitleEdit: (id, title) => dispatch(action.editListTitle(id, title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);