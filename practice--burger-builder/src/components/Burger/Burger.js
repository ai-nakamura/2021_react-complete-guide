import React from 'react';

import classes from './Burger.module.css';

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transformedIngredients =
    Object.keys(props.ingredients).map( igKey => {
      const arraySize = props.ingredients[igKey];
      return (
        [...Array(arraySize)].map( (_, i) => {
          return <BurgerIngredient key={igKey + 1} type={igKey} />;
        })
      );
    }).reduce((arr,el) => {
      return arr.concat(el);
    });

  // these two return the same value, why did the teacher
  // choose something so convoluted??
  console.log(transformedIngredients.length);
  console.log(transformedIngredients.values.length);

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
