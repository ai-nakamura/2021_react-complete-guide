import React, {Component} from 'react';
import PropTypes from 'prop-types';

import AuthContext from '../../../context/auth-context';

import classes from './Person.css';

// hoc - Auxilary components to get rid of extra wrapping elements
import Aux from '../../../hoc/Aux';
// import {Fragment} from 'react';
// import WithClass from '../../../hoc/WithClass';
//    (the new 'withClass' is a different kind of hoc

import withClass from '../../../hoc/withClass';

class Person extends Component {
  constructor(props) {
    super(props);
    // more modern approach to getting references
    this.inputElementRef = React.createRef();
  }

  // React special!
  // this lets you access context outside of rendering
  // only available in classes
  // (unless I use the useContext Hook)
  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated)
  }

  render() {
    console.log('[Person.js] render');
    return (
      // <React.Fragment>
      // <Fragment>
      // <WithClass classes={classes.Person}>
      // <div className={classes.Person}>
      /* replace with less verbose versions static ContextType
        <AuthContext.Consumer>
          {context =>
            context.authenticated ?
              <p>Authenticated!</p> :
              <p>please log in</p>
          }
        </AuthContext.Consumer>
        */
      <Aux>
        {this.context.authenticated ?
          <p>Authenticated!</p> :
          <p>please log in</p>}
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age}!
        </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          // makes a global variable called inputElement
          // ref={(inputEl) => {this.inputElement = inputEl}}
          // uses createRef to make a reference
          ref={this.inputElementRef}
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

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

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
