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
import PersonalData from './components/EditPersonalData/EditPersonalData';
import EditPassword from './components/EditPassword/EditPassword';
import EditEmail from './components/EditEmail/EditEmail';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
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
        path: '/auth',
        exact: true,
        component: Authentication
      },
      {
        path: '/logout',
        exact: true,
        component: SignOut
      },
      {
        path: '/forgotpassword',
        exact: true,
        component: ForgotPassword
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
        {
          path: '/myaccount',
          exact: true,
          component: MyAccount
        },
        {
          path: '/myaccount/personal-data',
          exact: true,
          component: PersonalData
        },
        {
          path: '/myaccount/edit-email',
          exact: true,
          component: EditEmail
        },
        {
          path: '/myaccount/edit-password',
          exact: true,
          component: EditPassword
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
