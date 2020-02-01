import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import Header from './components/Header/Header';
import ListOfLists from './components/ListOfLists/ListOfLists';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Authentication from './components/Authentication/Authentication';
import NotFound from './components/NotFound/NotFound';
import SignOut from './components/Authentication/SignOut/SignOut';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MobileNav from './components/MobileNav/MobileNav';
import MyAccount from './components/MyAccount/MyAccount';
import FriendsList from './components/FriendsList/FriendsList';

class App extends Component {
  constructor(props) {
    super(props);
      props.loginUserIfDataExist();
  }
 

  render() {

    let routers;



    routers = [
      {
        path: this.props.userID != null ? '/myaccount' : '/auth',
        exact: true,
        component: this.props.userID != null ? MyAccount : Authentication
      },
      {
        path: '/logout',
        exact: true,
        component: SignOut
      },
      {
        path: '/friendslist',
        exact: true,
        component: FriendsList
      },
      {
        path: '/',
        exact: true,
        component: ListOfLists
      },
      {
        path: '/',
        exact: false,
        component: NotFound
      }
    ];


    if (this.props.userID != null) {
      routers = [
        {
          path: '/list/:id',
          exact: true,
          component: ShoppingList
        },
        ...routers
      ]
    }

    routers = routers.map(({ path, component, exact }, i) => <Route 
      path={path} 
      component={component} 
      exact={exact}
      key={i}
      />)

    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            {routers}
          </Switch>
          <MobileNav />
        </div>

      </BrowserRouter>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    loginUserIfDataExist: () =>  dispatch(action.loginIfUserDataPersist()),
  }
}
const mapStateToProps = state => {
  return {
    userID: state.auth.uId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
