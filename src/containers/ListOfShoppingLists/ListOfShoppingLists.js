import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';
import ShoppingListElem from '../../components/ListOfLists/ShoppingListsElem';

class ListOfShoppingLists extends Component {

    componentDidMount() {
        this.props.fetchShopplingLists();
    }

    removeList = (id) => {
        this.props.removeListEleme(id);
    }

    render() {
        const shoppingLists = this.props.list.map(list => 
            <ShoppingListElem 
                title={list.listName}
                key={list.id}
                handleDelete={() => this.removeList(list.id)}
        />);
        
        return (
            <div>
                {shoppingLists}
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