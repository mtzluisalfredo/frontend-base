import React, { Component } from 'react';

const withFirstLoading = (dataName = 'data') => WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    componentWillMount() {
      this.state.pageSpinner = true;
    }

    componentWillUpdate(nextProps) {
      const data = nextProps[dataName] || {};
      const { networkStatus } = data;

      if (networkStatus >= 7) {
        this.state.pageSpinner = false;
      }
    }

    render() {
      const { pageSpinner } = this.state;
      const props = {
        ...this.props,
        pageSpinner,
      };

      return <WrappedComponent {...props} />;
    }
  };

export default withFirstLoading;
