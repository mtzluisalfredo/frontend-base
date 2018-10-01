import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { UserMenu } from '../';
import logo from '../../assets/logo.svg';
import logoSm from '../../assets/logo-sm.svg';
import './style.scss';

function Header(props) {
  const { user, options, collapsed, defaultPage, onSelectUserOption } = props;
  const logoStyles = classnames({
    'logo-container': true,
    expanded: !collapsed,
    collapsed,
  });

  return (
    <header styleName="app-header">
      <div className="container">
        <div className="row">
          <Link styleName={logoStyles} to={defaultPage}>
            <img styleName="logo-lg" src={logo} alt="Regiztra" width="157" height="46" />
            <img styleName="logo-sm" src={logoSm} alt="Regiztra" width="50" height="50" />
          </Link>

          <div styleName="separator" />

          <div styleName="right-menu">
            <div styleName="separator" />
            <UserMenu
              id="app-user-menu"
              name={`${user.firstName} ${user.lastName}`}
              logoUrl={user.avatar}
              role={user.role}
              options={options}
              onOptionSelected={onSelectUserOption}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  collapsed: PropTypes.bool,
  defaultPage: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    role: PropTypes.string,
  }),
  onSelectUserOption: PropTypes.func.isRequired,
};

export default Header;
