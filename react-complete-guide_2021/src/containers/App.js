import React, { Component } from 'react';

import classes from './App.css';

import Aux from '../hoc/Aux';
import Cockpit from '../components/Cockpit/Cockpit';
import PersonsList from '../components/PersonsList/PersonsList';
import withClass from '../hoc/withClass';


// CLASS based components = state management
// FUNCTIONAL components = presentation
// Preference is to use more functional components than class based ones

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // this.state = {}
  }

  state = {
    persons: [
      { id: 'asdfk', name: "Max",        age: 28},
      { id: 'sdfgh', name: "Manu",       age: 29},
      { id: 'sdhfd', name: "Stephanie",  age: 26}
    ],
    otherState: "some other value",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[App.js] shouldComponentUpdate', this.props);
    if (nextProps.persons !== this.state) {
      return true;
    } else {
      return false;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[App.js] componentDidUpdate', this.props);
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p => p.id === id );

    const person = { ...this.state.persons[personIndex] }

    person.name = event.target.value;

    const persons = [...this.state.persons]

    persons[personIndex] = person;

    this.setState( (prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];

    persons.splice( personIndex, 1 );

    this.setState({ persons: persons} );
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;

    this.setState({ showPersons: !doesShow });
  }

  render() {
    console.log('[App.js] render');
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          <PersonsList
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
        </div>
      );

    }


    return (
      <Aux>
        <button
          onClick={ () => this.setState({ showCockpit: !this.state.showCockpit})}>
          Toggle Cockpit
        </button>

        {this.state.showCockpit ? (
          <Cockpit
            title={this.props.appTitle}
            personsLength={this.state.persons.length}
            showPersons={this.state.showPersons}
            clicked={this.togglePersonHandler}
          />
        ) : null}
        {persons}
      </Aux>
  );

  }

}



export default withClass(App, classes.App);
