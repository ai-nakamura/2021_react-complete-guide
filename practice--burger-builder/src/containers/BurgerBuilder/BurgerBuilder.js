import React, {Component} from "react";
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

/*  componentDidMount() {
    console.log('[BurgerBuilder] componentDidMount/preAxios');
    setTimeout( () => {
      axios
        .get('http://react-my-burger-8295f-default-rtdb.firebaseio.com/ingredients.json')
        // .get('http://react-my-burger-8295f-default-rtdb.firebaseio.com/ingredients')
        .then(response => {

          const  ingredients = response.data;

          // calculate price
          const sum = Object.keys(ingredients)
            .map( igKey => {
              return ingredients[igKey] *  INGREDIENT_PRICES[igKey]
            })
            .reduce( (accumulator, currentValue) =>
              accumulator + currentValue
            , 0);

          this.setState({
            ingredients: ingredients,
            totalPrice: sum +this.state.totalPrice
          });
          this.updatePurchaseState(ingredients);

        })
        .catch(error =>
          this.setState({ error: true })
        );
      console.log('[BurgerBuilder] componentDidMount/postAxios')
    }, 500);
  }*/

  updatePurchaseState(ingredients) {

    const sum = Object.keys(ingredients)
      .map( igKey => ingredients[igKey] )
      .reduce( (sum, el) =>  sum + el, 0 );

    return sum > 0;
  }
/*
  addIngredientHandler = type => {

    // update ingredients
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    // update price
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    // update ingredients
    const oldCount = this.state.ingredients[type]
    // but only if > 0
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    // update price
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  }
 */
  purchaseHandler = () => {
    console.log('[purchaseHandler]');
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {

    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     // safer way
    //     encodeURIComponent(i) + '=' + encodeURIComponent( this.state.ingredients[i] )
    //     // unsafe but still works in our case
    //     // i + '=' + this.state.ingredients[i]
    //   );
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      // search: '?' + queryString
    });

  }

  render() {
    const disabledInfo = { ...this.props.ings }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ?
      <p>Ingredients can't be loaded!</p> :
      <Spinner/>;

    if ( this.props.ings ) {
      burger  =
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>;

      orderSummary =
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),

    onIngredientRemoved: (ingName) =>
      dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));




