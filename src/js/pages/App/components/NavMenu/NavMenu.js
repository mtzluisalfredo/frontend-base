import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { ScrollView } from '@/components';

import NavMenuItem from './NavMenuItem';
import './style.scss';

const optionShape = PropTypes.shape({
  label: PropTypes.string,
  to: PropTypes.string,
  icon: PropTypes.string,
});

function getActiveItem(options, currentPage) {
  let i = options.length - 1;
  for (; i > 0; i -= 1) {
    if (currentPage.search(options[i].to) > -1) {
      break;
    }
  }

  return i;
}

function NavMenu(props) {
  const { activePage, collapsed, options, onToggleCollapse } = props;
  const classes = classnames({
    'app-nav-menu': true,
    collapsed: collapsed === true,
  });
  const activeitem = getActiveItem(options, activePage);

  return (
    <div styleName={classes} id="app-nav-menu">
      <div styleName="scroll-container">
        <ScrollView autoHeight={false} autoHeightMax={820}>
          <ul>
            {options.map((opt, index) => (
              <NavMenuItem
                key={opt.label}
                active={activeitem === index}
                label={opt.label}
                icon={opt.icon}
                collapsed={collapsed}
                to={opt.to}
              />
            ))}
          </ul>
        </ScrollView>
      </div>

      <button id="nav-menu-collapse-toggle" styleName="toggle-menu" onClick={onToggleCollapse}>
        <span>{collapsed ? 'Abrir Menú' : 'Minimizar'}</span>
      </button>
    </div>
  );
}

NavMenu.propTypes = {
  activePage: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(optionShape).isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
};

export default NavMenu;
