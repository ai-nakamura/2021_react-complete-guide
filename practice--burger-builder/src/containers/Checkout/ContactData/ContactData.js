import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name:           null,
      street:         null,
      zipcode:        null,
      country:        null,
      email:          null,
      deliveryMethod: null
    },
    loading: false
  }

  componentDidMount() {
    this.setState({
      orderForm: {
        name:    this.orderFormHelper('input', 'text', 'Your name'),
        street:  this.orderFormHelper('input', 'text', 'Street'),
        zipcode: this.orderFormHelper('input', 'text', 'ZIP Code'),
        country: this.orderFormHelper('input', 'text', 'Country'),
        email:   this.orderFormHelper('input', 'email', 'Your E-Mail'),
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          }
        }
      }
    });
  }

  orderFormHelper = (elementType, configType, placeholder) => {
    return {
      elementType: elementType,
      elementConfig: {
        type: configType,
        placeholder: placeholder
      }
    };
}

  orderHandler = event => {
    // stop the page from reloading
    event.preventDefault();
    console.log('purchaseContinueHandler');

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Ai',
        address: {
          street: '123 fake street',
          zipcode: '12345',
          country: 'usa'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    let form = (
      <form>
        <Input elementType='...' elementConfig='...' value='...' />
        <Input inputtype='input' type='text' name='email'  placeholder='Your email' />
        <Input inputtype='input' type='text' name='street' placeholder='Street' />
        <Input inputtype='input' type='text' name='zip'    placeholder='Zip code' />
        <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
