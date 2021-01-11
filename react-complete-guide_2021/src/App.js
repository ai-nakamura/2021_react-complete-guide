import React, { Component } from 'react';
// import Radium, { StyleRoot } from "radium";
import styled from 'styled-components'
import './App.css';
import Person from './Person/Person'

// React Hooks
// collection of functions exposed to you by React that you can use on functional components

/*
 * Styled components use real css syntax
 */
const StyledButton = styled.button`
  background-color: ${ props => props.alt ? 'tomato' : '#00FA9A' };
  font: inherit;
  border: 1px solid grey;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: ${ props => props.alt ? '#DB7093' : '#98FB98' };
    color: ${ props => props.alt ? 'purple' : '#FF7F50'};
}
`;


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
    console.log('nameChangedHandler');

    // get index of person who matches the id
    const personIndex = this.state.persons.findIndex( p =>
       p.id === id
    );

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

  deletePersonHandler = (personIndex) => {
    console.log('deletePersonHandler');
    // make a new object of the whole this.state.persons list
    const persons = [...this.state.persons];
    // remove the person at that index
    persons.splice(personIndex, 1);
    // set state
    this.setState({
      persons: persons
    });
  }

  togglePersonHandler = () => {
    console.log('togglePersonHandler');
    // make copy of variable
    const doesShow = this.state.showPersons;
    // then set state
    this.setState({ showPersons: !doesShow });
  }

  render() {
    /*
     * Radium to add CSS pseudo selectors
     *
     * const style = {
     *  backgroundColor: 'aquamarine',
     *  font: 'inherit',
     *  border: '10x solid yellow',
     *  padding: '8px',
     *  cursor: 'pointer',
     *  ':hover': {
     *    backgroundColor: 'skyblue',
     *    color: 'white'
     *   }
     *  };
     */

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

      /* Gets taken care of in StyledButton
       * style.backgroundColor = '#f2493d'
       * style[':hover'] = {
       *   backgroundColor: 'palevioletred',
       *   color: 'white'
       * }
       */
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


    return (
      <div className="App">
        <h1>hi I'm a react app :3</h1>
        <p className={classes}>Yay this works</p>

        <StyledButton
          // style={style}
          onClick={this.togglePersonHandler}
          alt={this.state.showPersons ? 1 : 0}>
          Toggle Persons
        </StyledButton>
          {/*
            - Passing in a function to pass properties. Performance takes a hit
                `onClick={ () => this.switchNameHandler('MaxFunction!') }>`
            - Using bind to pass properties. More efficient
                `click={this.switchNameHandler.bind(this, "MaxBind!")}`
            */}
        {persons}
      </div>
  );

  }

}

export default App;
