import React, { useEffect, useRef, useContext } from 'react';

import AuthContext from '../../context/auth-context';

import classes from './Cockpit.css';


const cockpit = props => {

  const toggleBtnRef = useRef(null);
  // ** toggleBtnRef.current.click();
  // we can't call click right away because we need to render at least once
  // before useRef gets a reference

  /*
   * Work around since we can only use static contextType in classes
   * React Hook 'useContext'
   */
  const authContext = useContext(AuthContext);
  console.log(authContext.authenticated);


  /*
   * for every render cycle of Cockpit
   * kind of like "componentDidMount" and "componentDidUpdate" together
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

    // setTimeout( () => { alert('setTimeout triggered'); }, 1000);

    // useEffect runs after the render, so by the time this code
    // gets here useRef will have a reference!
    toggleBtnRef.current.click();

    // optional - return a function
    // it runs BEFORE the main useEffect function runs,
    // but AFTER the (first) render cycle
    return () => {
      console.log("[Cockpit.js] cleanup work in effect")
    }
  }, []);

  useEffect( () => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log("[Cockpit.js] 2nd cleanup work in effect")
    };
  });


  // setting button to 'red' if showPersons === true
  let btnClass = '';
  if (props.showPersons) {btnClass = classes.Red;}

  // setting <p> to 'red  if personsLength gets shorter
  const assignedClasses = []
  if (props.personsLength <= 2 ) {assignedClasses.push(classes.red);}
  if (props.personsLength <= 1 ) {assignedClasses.push(classes.bold);}


  return (
    <div className={classes.Cockpit}>

      <h1>{props.title}</h1>
      <h2>I'm a react app :3</h2>
      <p className={assignedClasses.join(' ')}>Yay this works</p>

      <button
        ref={toggleBtnRef}
        className={btnClass}
        alt={props.showPersons ? 1 : 0 }
        onClick={props.clicked}>
        Toggle Persons
      </button>

      <button onClick={authContext.login}>Log in</button>
      {/*
      <AuthContext.Consumer>
        {context => <button onClick={context.login}>Log in</button>}
      </AuthContext.Consumer>
      */}

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