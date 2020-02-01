import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './store/actions/index';
import Header from './components/Header/Header';
import ShoppingList from './components/ShoppingList/ShoppingList';
import ProductList from './components/ProductList/ProductList';
import Authentication from './components/Authentication/Authentication';
// import NotFound from './components/NotFound/NotFound';
import SignOut from './components/Authentication/SignOut/SignOut';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MobileNav from './components/MobileNav/MobileNav';
import MyAccount from './components/MyAccount/MyAccount';
import FriendsList from './components/FriendsList/FriendsList';
import Spinner from './components/UI/Spinner/Spinner';

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
        exact: false,
        component: ShoppingList
      },
      // {
      //   path: '/',
      //   exact: false,
      //   component: NotFound
      // }
    ];


    if (this.props.userID != null) {
      routers = [
        {
          path: '/list/:id',
          exact: true,
          component: ProductList
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

    const loading = this.props.loadingAuth || this.props.shopplingListLoading || this.props.productListLoading; 

    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <div className="app__body">
            <Switch>
              {routers}
            </Switch>
            {loading ? <Spinner /> : null} 
            
          </div>
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
    userID: state.auth.uId,
    loadingAuth: state.auth.loading,
    shopplingListLoading: state.shoppingList.loading,
    productListLoading: state.productList.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
