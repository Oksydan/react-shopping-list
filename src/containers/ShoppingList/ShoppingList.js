import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import ShoppingListElem from '../../components/ShoppingList/ShoppingListElem/ShoppingListsElem';
import Modal from '../../components/UI/Modal/Modal';
import Form from '../../components/AddElementForm/AddElementForm';

class ShoppingList extends Component {

    state = {
        modalVisible: false,
        editListId: null,
        editTitle: '',
        isTtileValid: true
    }

    componentDidMount() {
        if (this.props.userID !== null) {
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

    handleTitleChange = (e) => {
        const inputVal = e.target.value;

        this.setState({
            editTitle: inputVal
        });
    }

    handleTitleEditSubmit = (e) => {
        e.preventDefault();
        const state = { ...this.state };
        const valueFormated = state.editTitle.trim();
        if (valueFormated.length > 0) {
            this.props.listTitleEdit(this.state.editListId, this.state.editTitle);
            this.handleHideModal();
        }
        
    }
    

    render() {
        const shoppingLists = this.props.list.map(list => 
            <ShoppingListElem 
                title={list.listName}
                key={list.id}
                id={list.id}
                date={list.dateAdd}
                handleDelete={() => this.removeList(list.id)}
                handleEdit={() => this.editListTitle(list.id, list.listName)}
        />);


        
        return (
            <div>
                {shoppingLists.length > 0 ? 
                    <ul className="shoppingList">
                        {shoppingLists}
                    </ul> : null
                }
                <Modal
                    show={this.state.modalVisible}
                    modalClosed={this.handleHideModal}
                    title={this.state.editListId !== null ? 'Edit shopping list' : 'Add new shopping lsit'}
                >
                    <Form 
                        inputVal={this.state.editTitle}
                        isInputValid={this.state.isTtileValid}
                        handleInputChange={this.handleTitleChange}
                        handleSubmit={this.handleTitleEditSubmit}
                    />
                </Modal>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.shoppingList.shoppingLists,
        userID: state.auth.uId
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