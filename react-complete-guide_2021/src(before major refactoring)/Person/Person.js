import React from 'react';
// import Radium from "radium";
import styled from 'styled-components';

// import './Person.css';


/*
 * With styled-components
 * always returns a valid react component
 * needs to be outside of components
 */
  const StyledDiv = styled.div`
    // .StyledDiv {   <-- would looks like this in vanilla css file
      width: 60%;
      margin: 16px auto;
      border: 1px solid #eee;
      box-shadow: 0 2px 3px;
      padding: 16px;
      text-align: center;
    
    @media (min-width: 500px) { width: 450px }
  `


/*
 * Components
 * A component is a function which returns some jsx (HTML like-code)
 */

const person = (props) => {
  /*
   * With Radium package
   * const Radiumstyle = {
   *   '@media (min-width: 500px)': { width: '450px' }
   * }
   */

  /*
   * Testing ErrorBoundary
   *
   * const rnd = Math.random();
   * if (rnd > 0.7) {
   * throw new Error( 'Something went wrong :(' );
   * }
   */


  return (
    // <div className="Person" style={style}>
    <StyledDiv>
      <p onClick={props.click}>
        I'm {props.name} and I am {props.age}!
      </p>
      <p>
        {props.children}
      </p>
      <input type="text" onChange={props.changed} value={props.name} />
    </StyledDiv>
    )
};


export default person;


