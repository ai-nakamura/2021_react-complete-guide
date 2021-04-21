import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name:    this.orderFormHelper('input', 'text', 'Your name'),
      street:  this.orderFormHelper('input', 'text', 'Street'),
      zipcode: this.orderFormHelper('input', 'text', 'ZIP Code', 5, 5),
      country: this.orderFormHelper('input', 'text', 'Country'),
      email:   this.orderFormHelper('input', 'email', 'Your E-Mail'),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  orderFormHelper (elementType, configType, placeholder, min, max) {
    return {
      elementType: elementType,
      elementConfig: {
        type: configType,
        placeholder: placeholder
      },
      value: '',
      validation: {
        required: true,
        minLength: min, // for zipcode
        maxLength: max  // for zipcode
      },
      valid: false,
      touched: false
    };
}

  orderHandler = event => {
    // stop the page from reloading
    event.preventDefault();

    // this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);

    // moved to redux: src/actions/order.js
    // axios
    //   .post('/orders.json', order)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ loading: false });
    //     this.props.history.push('/');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({ loading: false });
    //   });
  }

  /*checkValidity (value, rules) {
    let isValid = true;

    if ( rules.required ) {
      isValid = value.trim() !== '' && isValid;
    }

    // for zipcode
    if ( rules.minLength ) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if ( rules.maxLength ) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }*/

inputChangedHandler = (event, inputIdentifier) => {
/*
  // this makes a clone of just the top most layer
  const updatedOrderForm = {
    ...this.state.orderForm
  };

  // so to safely edit the inner layer we need to clone it again
  const updatedFormElement = {
    ...updatedOrderForm[inputIdentifier]
  };

  // and now we safely update the value
  updatedFormElement.value = event.target.value;
  updatedOrderForm[inputIdentifier] = updatedFormElement;

  // check element's validity
  updatedFormElement.valid =
    this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

  // form has been touched
  updatedFormElement.touched = true;
 */
  const oldFormElement = this.state.orderForm[inputIdentifier];
  const updatedFormElement = updateObject(oldFormElement, {
    value: event.target.value,
    valid: checkValidity(event.target.value, oldFormElement.validation),
    touched: true
  });

  const updatedOrderForm = updateObject(this.state.orderForm, {
    [inputIdentifier]: updatedFormElement
  });

  // update form's validity
  let formIsValid = true;
  for ( let formIdentifier in updatedOrderForm) {
    formIsValid = updatedOrderForm[formIdentifier].valid && formIsValid;
  }

  this.setState({
    orderForm: updatedOrderForm,
    formIsValid: formIsValid
  });
}


  render() {
    // console.log(`formIsValid? ${this.state.formIsValid}`);

    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>
        {formElementsArray.map( formElement =>
          <Input
            key={formElement.id}

            elementType={     formElement.config.elementType}
            elementConfig={   formElement.config.elementConfig}
            invalid={        !formElement.config.valid}
            shouldValidate={  formElement.config.validation}
            touched={         formElement.config.touched}
            value={           formElement.config.value}
            valueType={       formElement.id}

            changed={ event => this.inputChangedHandler(event, formElement.id)}
          />
        )}
        <Button
          disabled={!this.state.formIsValid}
          btnType='Success'
          clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings:    state.burgerBuilder.ingredients,
    price:   state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
