import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { graphql } from 'react-apollo';

import { session } from '@/store/actions';
import { getQueryParam } from '@/lib/util';

import * as mutations from './graphql/mutations';

const actions = { ...session, push };

@connect(null, actions)
@graphql(mutations.logout, { name: 'logoutUser' })
class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func,
    logoutUser: PropTypes.func,
  };

  componentWillMount() {
    const { history, logoutUser, logout } = this.props;
    const redirectQuery = getQueryParam('redirect');
    let redirect = '/login';

    if (redirectQuery !== '' && redirectQuery.search(redirect) < 0) {
      redirect += `?redirect=${redirectQuery}`;
    }

    if (localStorage && localStorage.getItem('token')) {
      logoutUser()
        .finally(() => {
          localStorage.clear();
        });
    }

    logout();
    history.push(redirect);
  }

  render() {
    return null;
  }
}

export default Logout;
