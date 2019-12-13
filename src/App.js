import React from 'react';
import Header from './components/Header/Header';
import ShoppingLists from './containers/ShoppingLists/ShoppingLists';
import Authentication from './containers/Authentication/Authentication';
import NotFound from './components/NotFound/NotFound';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/auth" exact component={Authentication} />
          <Route path="/" exact component={ShoppingLists} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    
    </BrowserRouter>
  );
}

export default App;
