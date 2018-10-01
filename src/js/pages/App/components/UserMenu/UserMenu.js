import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import { Button, Dropdown, Avatar } from '../../../../components';
import './style.scss';

const temporaryLogo = '';
const optionShape = {
  value: PropTypes.string,
  label: PropTypes.string,
};

function formatRole(role) {
  const roles = {
    ADMIN: 'Administrador',
  };

  return roles[role] || '';
}

@onClickOutside
class UserMenu extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    logoUrl: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
    role: PropTypes.string,
    onOptionSelected: PropTypes.func.isRequired,
  };

  static defaultProps = {
    name: '',
  };

  state = {
    showOptions: false,
  };

  handleClickOutside = () => {
    this.hideMenu();
  };

  hideMenu = () => {
    const { showOptions } = this.state;

    if (showOptions) {
      this.setState({
        showOptions: false,
      });
    }
  }

  showMenu = () => {
    const { showOptions } = this.state;

    if (!showOptions) {
      this.setState({
        showOptions: true,
      });
    }
  }

  render() {
    const { id, name, role, logoUrl, options, className, onOptionSelected } = this.props;
    const { showOptions } = this.state;

    return (
      <div id={id} styleName="app-user-menu" className={className}>
        {!showOptions && (
          <Button color="unstyled" onClick={this.showMenu}>
            <Avatar src={logoUrl || temporaryLogo} alt={name || 'logo'} type={logoUrl ? 'square' : 'circle'} />
            <div styleName="info">
              <span>{name}</span>
              <div styleName="user-role">{formatRole(role)}</div>
            </div>
          </Button>
        )}

        {showOptions && (
          <Dropdown
            id="dropdown-options"
            styleName="dropdown-options"
            alwaysOpen
            options={options}
            onChange={onOptionSelected}
            onToggle={this.hideMenu}
          />
        )}
      </div>
    );
  }
}

export default UserMenu;
