import React from 'react';

import classes from './Burger.module.css';

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  // I'm used to imperative programming so this looks
  // overly complicated, but this is
  // more like functional programming.
  // It's just a different style.
  let transformedIngredients =
    Object.keys(props.ingredients).map( igKey => {

      if ( igKey === 'price' ) {
        return null;
      }

      const arraySize = props.ingredients[igKey];
      return (
        [...Array(arraySize)].map( (_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        })
      );
    }).flat();/*reduce((arr,el) => { return arr.concat(el); }, []);*/


  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>please start adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={"bread-top"}/>
      {transformedIngredients}
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  );
};

export default burger;
