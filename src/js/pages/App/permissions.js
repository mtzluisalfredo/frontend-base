import React from 'react';
import PropTypes from 'prop-types';

import roles from './roleAccess';

function getPage() {
  const { pathname } = window.location;
  const path = pathname.split('/')[1] || '';

  return path.toLowerCase();
}

export default Component => {
  function Permissions(props = {}) {
    const role = props.role ? props.role : undefined;
    const permissions = {
      getRole() {
        return role;
      },

      getDefaultPage() {
        return roles.defaultPage[role];
      },

      hasPageAccess() {
        const page = getPage();
        const { pages } = roles;

        return role ? pages[role].indexOf(page) > -1 : false;
      },
    };


    return <Component {...props} {...permissions} />;
  }

  Permissions.propTypes = {
    role: PropTypes.string,
  };

  return Permissions;
};
