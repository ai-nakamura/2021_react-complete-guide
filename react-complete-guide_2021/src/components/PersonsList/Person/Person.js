import React, {Component, Fragment} from 'react';

import classes from './Person.css';

import Aux from '../../../hoc/Aux';
import WithClass from '../../../hoc/withClass';

class Person extends Component {
  render() {
    console.log('[Person.js] render');
    return (
      // <div className={classes.Person}>
      // <Aux>
      // <React.Fragment>
      // <Fragment>
      <WithClass classes={classes.Person}>
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
      </WithClass>
      // </Fragment>
      // </React.Fragment>
      // </Aux>
      // </div>
    )
  }
}

export default Person;

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
