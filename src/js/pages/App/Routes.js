import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../404';
import Profile from '../Profile';

function Routes(props) {
  const { className, actions, user } = props;
  const customProps = { user, ...actions };

  return (
    <div className={className}>
      <Switch>
        <Route exact path="/profile" render={p => <Profile {...p} {...customProps} />} />
        <Route render={p => <NotFound {...p} {...customProps} />} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  actions: PropTypes.shape({
    showMenu: PropTypes.func,
    hideMenu: PropTypes.func,
  }),
  className: PropTypes.string,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default Routes;
