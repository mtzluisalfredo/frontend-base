import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import './style.scss';

import { Button, Icon } from '../../../../components';

function NavMenuItem(props) {
  const {
    active,
    label,
    icon,
    collapsed,
    to,
    onClick,
    className,
    ...others
  } = props;
  const styleNames = classnames({
    'app-nav-menu-item': true,
    active: active === true,
    collapsed: collapsed === true,
  });

  const itemContent = (<div styleName="app-nav-menu-item-content">
    <Icon type={icon} />
    <span styleName="app-nav-menu-item-label">{label}</span>
  </div>);

  return (<li {...others} styleName={styleNames} className={className}>
    {to ?
      <Link to={to}>
        {itemContent}
      </Link>
    :
      <Button color="unstyled" onClick={onClick}>
        {itemContent}
      </Button>
    }
  </li>);
}

NavMenuItem.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

NavMenuItem.defaultProps = {
  active: false,
};

export default NavMenuItem;
