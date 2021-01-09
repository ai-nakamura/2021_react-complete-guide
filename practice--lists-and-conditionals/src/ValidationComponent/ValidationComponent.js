import React from 'react';

const validationComponent = (props) => {
  let validation = "text too short";
  // console.log(`vc: len_${props.textLen} valid_${props.validLength}`)

  if ( props.textLen >= props.validLength ) {
    validation = "Text long enough";
  }
  return (
    <p>{validation}</p>
  );
}

export default validationComponent;