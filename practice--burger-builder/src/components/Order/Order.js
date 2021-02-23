import React from 'react';

import classes from './Order.module.css';

const order = props => {

  const price = Number.parseFloat(props.price).toFixed(2);

  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push(
      {
        name: ingredientName,
        amount: props.ingredients[ingredientName]
      }
    );
  }

  const ingredientOutput = ingredients.map( ig =>
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={ig.name}>
        {`${ig.name} (${ig.amount}) `}
    </span>
  );

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price:
        <strong>
          ${price}
        </strong>
      </p>
    </div>
  )
};

export default order;