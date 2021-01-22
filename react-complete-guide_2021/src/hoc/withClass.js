import React from 'react';


// hoc version 2
// regular javascript function
// this kind of hoc makes it clear that it's more involved with the logic
//    and not so much the JSX code (like <Aux> is for reducing elements)
// @param - component to be wrapped. Should be capital since it's a component
// @param - something you need in your higher order component
// @return - a function defintion specifically for a component function
const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props}/>
    </div>
  );
};
export default withClass;


/*
// hoc version 1
// return a functional component
const withClass = props => {

    <div className={props.classes}>
      {props.children}
    </div>

}
export default withClass;
*/
