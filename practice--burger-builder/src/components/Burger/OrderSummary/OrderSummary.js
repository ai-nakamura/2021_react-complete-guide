import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map( igKey =>
      <li key={igKey} style={{textAlign: 'left'}}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>
        : {props.ingredients[igKey]}
      </li>
    );

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>omnomnom has this:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Price: ${props.price}</strong></p>
      <p>checkout?</p>
      <Button btnType="Success" clicked={props.purchaseContinued}>yes!</Button>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>not yet!</Button>
    </Aux>
  );
};

export default orderSummary;
