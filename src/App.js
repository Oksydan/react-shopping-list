import React from 'react';
import Header from './components/Header/Header';
import ListOfLists from './components/ListOfLists/ListOfLists';
import ShoppingList from './components/ShoppingList/ShoppingList';
import Authentication from './components/Authentication/Authentication';
import NotFound from './components/NotFound/NotFound';
import SignOut from './components/Authentication/SignOut/SignOut';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/list/:id" exact component={ShoppingList} />
          <Route path="/auth" exact component={Authentication} />
          <Route path="/logout" exact component={SignOut} />
          <Route path="/" exact component={ListOfLists} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
