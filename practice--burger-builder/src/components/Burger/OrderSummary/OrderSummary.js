import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

// This could be a functional component, changed it for debugging
class OrderSummary extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[OrderSummary] didupdate")
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map( igKey =>
        <li key={igKey} style={{textAlign: 'left'}}>
          <span style={{textTransform: 'capitalize'}}>{igKey}</span>
          : {this.props.ingredients[igKey]}
        </li>
      );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>omnomnom has this:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Price: ${this.props.price}</strong></p>
        <p>checkout?</p>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>yes!</Button>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>not yet!</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
