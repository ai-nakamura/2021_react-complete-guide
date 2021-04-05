import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

import classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  componentDidMount() {
    if ( !this.props.buildingBurger && this.props.authRedirectPath !== '/' ) {
      this.props.onSetAuthRedirectPath('/');
    }
  }

/*  checkValidity (value, rules) {
    let isValid = true;

    if ( rules.required ) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if ( rules.minLength ) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }*/

  inputChangedHandler = (event, controlName) => {
    // this makes a clone of just the top most layer
    /*const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };*/
    const oldControls = this.state.controls;
    const updatedControls = updateObject( oldControls, {
      [controlName]: updateObject( oldControls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, oldControls[controlName].validation),
        touched: true
      })
    });

    this.setState({ controls: updatedControls});
  }

  submitHandler = event => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.onAuth(email, password, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState( prevState => {
      return { isSignup: !prevState.isSignup };
    })
  }

  render () {
  const formElementsArray = [];
  for (let fieldName in this.state.controls) {
    formElementsArray.push({
      id: fieldName,
      config: this.state.controls[fieldName]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}

      elementType={    formElement.config.elementType}
      elementConfig={  formElement.config.elementConfig}
      invalid={       !formElement.config.valid}
      shouldValidate={ formElement.config.validation}
      touched={        formElement.config.touched}
      value={          formElement.config.value}
      valueType={      formElement.id}

      changed={event => this.inputChangedHandler(event, formElement.id)}
    />
  ));

  if (this.props.loading) {
    form = <Spinner />;
  }

  const  errorMessage =
    this.props.error ? <p>{this.props.error.message}</p> : null;

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          <p>{!this.state.isSignup ? 'Please Sign-in' : 'Sign up form'}</p>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {this.state.isSignup ?
            'Already have an account? Sign-in instead!' :
            'New? Sign up here!'}
        </Button>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: !!state.auth.loading,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
