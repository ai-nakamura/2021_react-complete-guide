import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    /*
     * React note:
     * Turns out that constructor is called TWICE in React
     * Once to see if there's any side effects, another
     * to actually render.
     * That's why we're not supposed to put any side effects
     * in there!!
     * We'll need to redo the rest of the app so everything can be
     * in a loading state for a second so that we can get the data
     * and load everything up properly
     */
    // constructor(props) { // <-- doesn't work!
    //   super(props);
    //   console.log('[withErrorHandler] constructor');

    // render()

    UNSAFE_componentWillMount() { // <-- works!
      console.log('[withErrorHandler] componentWillMount');

    // ???

    // componentDidMount() { // <-- doesn't work!
    //   console.log('[withErrorHandler] componentDidMount');

      // axios listeners --
      // this sets up global interceptors which allows us to handle errors
      // NOTE: THESE ARE SIDE EFFECTS!!
      this.reqInterceptors =
        axios
          .interceptors.request.use(req => {
            this.setState({error: null});
            return req;
          });
      this.resInterceptors =
        axios
          .interceptors.response.use(res => {
            console.log('interceptors/response');
            return res;
        }, error => {
            console.log(error);
            this.setState({error: error});
          });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () =>
      this.setState({ error: null });

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
