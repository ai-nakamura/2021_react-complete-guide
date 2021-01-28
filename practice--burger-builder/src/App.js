import React, {Component} from "react";

import './App.css';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render () {
    return (
      <div className="App">
        <br/><br/><br/>
        <h1 style={{
          fontFamily: 'Lucida Sans Unicode',
          textAlign: 'center'}}>
          (☆▽☆) hi
        </h1>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
