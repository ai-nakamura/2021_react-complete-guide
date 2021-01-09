import React, { Component } from 'react';
import Radium, { StyleRoot } from "radium";

import './App.css';
import Person from './Person/Person'

// React Hooks
// collection of functions exposed to you by React that you can use on functional components
// const app = props => {
// uses useState to set state instead
// very useful for setting useState Slices in changing different states

// traditional React uses class components
class App extends Component {
  state = {
    persons: [
      { id: 'asdfk', name: "Max",        age: 28},
      { id: 'sdfgh', name: "Manu",       age: 29},
      { id: 'sdhfd', name: "Stephanie",  age: 26}
    ],
    otherState: "some other value",
    showPersons: false
  };

  /*
   * Person component handlers
   */
  nameChangedHandler = (event, id) => {
    console.log('changed name');

    // get index of person who matches the id
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    });

    // make new object of the single person
    // (avoiding manipulating the this.state reference)
    const person = {
      ...this.state.persons[personIndex]
    }

    // change the person's name
    person.name = event.target.value;

    // make a new object of the whole this.state.persons list
    const persons = [...this.state.persons]

    // change the single person
    persons[personIndex] = person;

    // finally we can setState safely
    this.setState( {persons: persons} );
  }

  render() {
    /*
     * Radium to add CSS pseudo selectors
     */
    const style = {
      backgroundColor: 'aquamarine',
      font: 'inherit',
      border: '10x solid yellow',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'skyblue',
        color: 'white'
      }
    };

    /*
     * Using conditionals to out put components
     */
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                key={person.id}
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
          {/*  the result of the return ends up about here */}
        </div>
      );

      style.backgroundColor = '#f2493d'
      style[':hover'] = {
        backgroundColor: 'palevioletred',
        color: 'white'
      }
    }

    /*
     * Dynamic classes
     */
    const classList = []
    if (this.state.persons.length <=2 ) {
      classList.push('red');
    }
    if (this.state.persons.length <=1 ) {
      classList.push('bold');
    }
    let classes = classList.join(' ');
    console.log(`classes: ${classes}`);


    return (
      <StyleRoot>
        <div className="App">
          <h1>hi I'm a react app :3</h1>
          <p className={classes}>Yay this works</p>

          <button
            style={style}
            onClick={this.togglePersonHandler}>
            Toggle Persons
          </button>
          {/*
              - Passing in a function to pass properties. Performance takes a hit
                  `onClick={ () => this.switchNameHandler('MaxFunction!') }>`
              - Using bind to pass properties. More efficient
                  `click={this.switchNameHandler.bind(this, "MaxBind!")}`
              */}

          {persons}
        </div>
      </StyleRoot>
  );
  }

  deletePersonHandler = (personIndex) => {
    console.log('deletePersonHandler');
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons
    });
  }

  /*
   * Button handler
   */
  togglePersonHandler = () => {
    console.log('togglePersonHandler');
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }
}

export default Radium(App);
