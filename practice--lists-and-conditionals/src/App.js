import React, { Component } from 'react';
import './App.css';

import ValidationComponent from "./ValidationComponent/ValidationComponent";
import CharComponent from "./CharComponent/CharComponent";

class App extends Component {

  state = {
    text: "hi",
    validLength: 5
  }

  change = event => {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    // const tabSpace = '&nbsp;&nbsp;&nbsp;&nbsp;'
    const done = {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      color: 'gray'
    }

    const charList = this.state.text.split('');

    const textList = charList.map( (char, index) => {
      return (
        <CharComponent
          char={char}
          key={index}
          deleteHandler={ () => deleteCharHandler(index) } />
        );
    });

    const deleteCharHandler = (index) => {
      console.log("deleteCharHandler at index " + index);
      // console.log(charList.splice(index, 1));
      charList.splice(index, 1);
      this.setState({
        text: charList.join('')
      });
    }

    return (
      <div className="App">
        <h1>Practice -- Lists & Conditionals </h1>

        <input
          type="text"
          value={this.state.text}
          onChange={(event) => this.change(event)} />

        <p>text length: {this.state.text.length}</p>
        <ValidationComponent
          textLen={this.state.text.length}
          validLength={this.state.validLength} />

        {textList}

        <h2>Instructions</h2>
        <ol>
          <li style={done}>Create an input field (in App component) with a change listener which outputs<br />
            &nbsp;&nbsp;&nbsp;&nbsp;the length of the entered text below it (e.g. in a paragraph)</li>
          <li style={done}>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li style={done}>Inside the ValidationComponent, either output "Text too short" or "Text long enough"<br />
            &nbsp;&nbsp;&nbsp;&nbsp;depending on the text length (e.g. take 5 as a minimum length)</li>
          <li style={done}>Create another component (=> CharComponent) and style it as an inline box<br />
            &nbsp;&nbsp;&nbsp;&nbsp;(=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black)</li>
          <li style={done}>Render a list of CharComponents where each CharComponent receives a different letter<br />
            &nbsp;&nbsp;&nbsp;&nbsp;of the entered text (in the initial output field) as a prop</li>
          <li style={done}>When you click a CharComponent, it should be removed from the entered text<br />
            &nbsp;&nbsp;&nbsp;&nbsp;Hint: Keep in mind that JavaScript strings are basically arrays!</li>
        </ol>


      </div>
    );
  };
}

export default App;
