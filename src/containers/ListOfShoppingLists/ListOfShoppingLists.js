import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class ListOfShoppingLists extends Component {

    componentDidMount() {
        this.props.fetchShopplingLists();
    }

    render() {
        console.log(this.props.list);
        return (
            
            <div>
                list
                
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
        fetchShopplingLists: () => dispatch(action.fetchList())
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(ListOfShoppingLists);