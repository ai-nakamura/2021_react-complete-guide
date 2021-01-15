import React, { Component } from 'react'
import Person from "./Person/Person";

class PersonsList extends Component {

  state = {};

  static getDerivedStateFromProps(props, state) {
    console.log('[PersonsList.js] getDerivedStateFromProps', props);
    return state
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[PersonsList.js] shouldComponentUpdate', this.props);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[PersonsList.js] getSnapshotBeforeUpdate');
    return {message : 'Snapshot!'};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[PersonsList.js] componentDidUpdate', snapshot);
  }

  render () {

    console.log('[PersonsList.js] render');
    return (
      this.props.persons.map((person, index) =>

        <Person
          name={person.name}
          age={person.age}
          key={person.id}
          click={() => this.props.clicked(index)}
          changed={(event) => this.props.changed(event, person.id)}/>
      )
    )
  }
}

export default PersonsList;

/*
import React from 'react';
import Person from "./Person/Person";

const personsList = props => {
  console.log('[PersonList.js] render');

  return (
    props.persons.map((person, index) =>

      <Person
        name={person.name}
        age={person.age}
        key={person.id}
        click={() => props.clicked(index)}
        changed={(event) => props.changed(event, person.id)}/>
    )
  )
}

export default personsList;
*/
