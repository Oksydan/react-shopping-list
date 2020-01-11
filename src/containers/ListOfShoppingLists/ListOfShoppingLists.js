import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import ShoppingListElem from '../../components/ListOfLists/ShoppingListsElem';
import Modal from '../../components/UI/Modal/Modal';

class ListOfShoppingLists extends Component {

    state = {
        modalVisible: false
    }

    componentDidMount() {
        this.props.fetchShopplingLists();
    }

    removeList = (id) => {
        this.props.removeListEleme(id);
    }

    editListTitle = (id) => {
        this.setState({
            modalVisible: true
        })
    }

    handleHideModal = () => {
        this.setState({
            modalVisible: false
        })
    }
    

    render() {
        const shoppingLists = this.props.list.map(list => 
            <ShoppingListElem 
                title={list.listName}
                key={list.id}
                id={list.id}
                handleDelete={() => this.removeList(list.id)}
                handleEdit={() => this.editListTitle(list.id)}
        />);
        
        return (
            <div>
                {shoppingLists}
                <Modal 
                    show={this.state.modalVisible}
                    modalClosed={this.handleHideModal}
                >
                    CHILDREN
                </Modal>
            </div>
        )
    }
}

const mapStateToPros = state => {
    return {
        list: state.listOfShoppingLists.shoppingLists
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchShopplingLists: () => dispatch(action.fetchList()),
        removeListEleme: (id) => dispatch(action.removeList(id))
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(ListOfShoppingLists);