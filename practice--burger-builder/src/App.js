import React, {Component} from "react";
import { Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';

import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <Layout>
        <h2 style={{
          fontFamily: 'Lucida Sans Unicode',
          textAlign: 'center'}}>
          (☆▽☆) hi
        </h2>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
