import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Store from './store';
import * as actions from './actions/pages';

export default options => WrappedComponent => {
  const { page, destroyOnUnmount } = options;
  const { dispatch } = Store;
  const pageActions = {};
  const createPage = bindActionCreators(actions.createPage, dispatch);
  const removePage = bindActionCreators(actions.removePage, dispatch);

  Object
    .keys(actions)
    .forEach(key => {
      const action = actions[key];

      if (typeof action === 'function') {
        const bindAction = bindActionCreators(action, dispatch);
        pageActions[key] = bindAction.bind(null, page);
      }
    });

  return class extends Component {
    state = {}

    componentWillMount() {
      this.state.pageSpinner = true;
      createPage(page);
    }

    componentWillUnmount() {
      if (destroyOnUnmount) {
        removePage(page);
      }
    }

    render() {
      const props = {
        ...pageActions,
        ...this.props,
      };

      return <WrappedComponent {...props} />;
    }
  }
};