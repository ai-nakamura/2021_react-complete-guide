import React, {Component} from 'react';
import classes from './Person.css';

// hoc - Auxilary components to get rid of extra wrapping elements
import Aux from '../../../hoc/Aux';
// import {Fragment} from 'react';
// import WithClass from '../../../hoc/WithClass';
//    (the new 'withClass' is a different kind of hoc

import withClass from '../../../hoc/withClass';

class Person extends Component {
  render() {
    console.log('[Person.js] render');
    return (
      // <React.Fragment>
      // <Fragment>
      // <WithClass classes={classes.Person}>
      // <div className={classes.Person}>
      <Aux>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age}!
        </p>
        <p>
          {this.props.children}
        </p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
      // </div>
      // </WithClass>
      // </Fragment>
      // </React.Fragment>
    )
  }
}

export default withClass(Person, classes.Person);

/*
import React from 'react';

import classes from './Person.css';


const person = props => {
  console.log('[Person.js] render');
  return (
    <div className={classes.Person}>
      <p onClick={props.click}>
        I'm {props.name} and I am {props.age}!
      </p>
      <p>
        {props.children}
      </p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
    )
};


export default person;

*/
