import React, { useEffect } from 'react';

import classes from './Cockpit.css';


const cockpit = props => {
  // for every render cycle of Cockpit
  // kind of like "componentDidMount" and "componentDidUpdate" together
  /*
   * useEffect (func, arrVariables)
   * - runs for every render cycle of Cockpit
   * - kind of like "componentDidMount" and "componentDidUpdate" together
   * - can have more than one useEffect in a class
   * - arrVariables - list of variables that will re-trigger this useEffect
   *                - make it empty if we want this to run only once at the beginning
   *                - works bc there's no variable that can re-trigger
   */
  useEffect( () => {
    console.log('[Cockpit.js] useEffect');
    // good place for Http request

    setTimeout( () => {
      alert('setTimeout triggered');
    }, 100);
  // }, [props.persons]);
  }, []);



  const assignedClasses = []
  let btnClass = '';

  // Button
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  // setting P to 'red bold'
  if (props.persons.length <=2 ) {
    assignedClasses.push(classes.red);
  }
  if (props.persons.length <=1 ) {
    assignedClasses.push(classes.bold);
  }


  return (
    <div className={classes.Cockpit}>

      <h1>{props.title}</h1>
      <h2>I'm a react app :3</h2>
      <p className={assignedClasses.join(' ')}>Yay this works</p>

    <button
      className={btnClass}
      alt={props.showPersons ? 1 : 0 }
      onClick={props.clicked}>
      Toggle Persons
    </button>

    </div>
  );
};

/*const StyledButton = styled.button`
  background-color: ${ props => props.alt ? 'tomato' : '#00FA9A' };
  font: inherit;
  border: 1px solid grey;
  padding: 8px;
  cursor: pointer;

 &:hover {
   background-color: ${ props => props.alt ? '#DB7093' : '#98FB98' };
   color: ${ props => props.alt ? 'purple' : '#FF7F50'};
`*/

export default cockpit;