import React from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.svg';
import './style.scss';

function Header(props) {
  const { className } = props;
  return (
    <header styleName="page-header" className={className}>
      <div className="container">
        <img src={logo} alt="logo" width="157" height="46" />
      </div>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
