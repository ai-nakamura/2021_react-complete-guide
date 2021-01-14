import React, { Component } from 'react';

  /* Introduced in React 16+
   * - Will be executed whenever a component we wrap
   *    with the ERROR BOUNDARY throws an error
   * - This will only execute on error. It's up to dev to use the info
   * - Don't use this willy nilly, only where you *know* you might fail
   * - With ErrorBoundary, the React application will still work
   *    instead of completely crashing. Only the failed component will
   *    render with the error
   */

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }
  componentDidCatch = (error, errorInfo) => {
    this.setState({
      hasError: true,
      errorMessage: error
    });
  }

  render() {
    // catching the error
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>;
    }

    // else, just bypass
    else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
