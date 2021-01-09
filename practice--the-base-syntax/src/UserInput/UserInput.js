import React from 'react';

const userInput = (props) => {
  return (
    <input
      type="text"
      onChange={props.changed}
      value={props.value} />
  );
}

export default userInput;