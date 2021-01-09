import React, { Component } from 'react';
import './App.css';

import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

  state = {
    userName: "Ai"
  };

  changeUsernameHandler = event => {
    // console.log('newName: ' + event.target.value);
    this.setState({
      userName: event.target.value
    })
  }

  // for fun :)
  reverseName = name => {
    return name.split("").reverse().join("");
  }

  render() {

    const done = {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    }

    return (
      <div className="App">
        <h1>Practice - The Best Sy</h1>
        <UserInput changed={this.changeUsernameHandler} value={this.state.userName} />
        <UserOutput name={this.state.userName} />
        <UserOutput name={this.reverseName(this.state.userName)} />
        <br />

        <h2>The Instructions</h2>
        <ol>
          <li style={done}>Create TWO new components: UserInput and UserOutput</li>
          <li style={done}>UserInput should hold an input element, UserOutput two paragraphs</li>
          <li style={done}>Output multiple UserOutput components in the App component (any paragraph texts of your choice)</li>
          <li style={done}>Pass a username (of your choice) to UserOutput via props and display it there</li>
          <li style={done}>Add state to the App component (=> the username) and pass the username to the UserOutput component</li>
          <li style={done}>Add a method to manipulate the state (=> an event-handler method)</li>
          <li style={done}>Pass the event-handler method reference to the UserInput component and bind it to the input-change event</li>
          <li style={done}>Ensure that the new input entered by the user overwrites the old username passed to UserOutput</li>
          <li style={done}>Add two-way-binding to your input (in UserInput) to also display the starting username</li>
          <li style={done}>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
        </ol>
      </div>
    );
  }
}

export default App;
