// work around to prevent the DOM from rendering unnecessary elements
// let's you render multiple adjacent jsx elements without having
//    to wrap them in an extra <div> tag

// this version of an Auxilary component is also included in React as
//    <React.Fragment> or import {Fragment} fromt 'react' <Fragment>

const aux = props => props.children;

export default aux;
