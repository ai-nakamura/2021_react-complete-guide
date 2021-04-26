import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import './App.css';
import {Redirect} from 'react-router';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render () {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/' />
      </Switch>
    );
    // console.log(this.props.isAuthenticated);
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>
        <h2 style={{
          fontFamily: 'Lucida Sans Unicode',
          textAlign: 'center'}}>
          (☆▽☆) hello!
        </h2>
          {routes}
          {/*<Switch>*/}
          {/*  <Route path='/checkout' component={Checkout}/>*/}
          {/*  <Route path='/orders' component={Orders}/>*/}
          {/*  <Route path='/auth' component={Auth}/>*/}
          {/*  <Route path='/logout' component={Logout}/>*/}
          {/*  <Route path='/' exact component={BurgerBuilder}/>*/}
          {/*</Switch>*/}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
