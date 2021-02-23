import React, { Component } from 'react';
import axios from '../../../../axios-orders';

import Button from '../../../UI/Button/Button';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name:'Ai',
    email: 'test@test.com',
    address: {
      street: '123 fake street',
      zipcode: '12345',
      country: 'usa'
    },
    loading: false
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
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false, purchasing: false});
      });
  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <form>
          <input className={classes.input} type='text' name='name'   placeholder='Your name' />
          <input className={classes.input} type='text' name='email'  placeholder='Your email' />
          <input className={classes.input} type='text' name='street' placeholder='Street' />
          <input className={classes.input} type='text' name='zip'    placeholder='Zip code' />
          <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
        </form>
      </div>
    )
  }
}

export default ContactData;
