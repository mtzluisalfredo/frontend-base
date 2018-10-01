import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../Dropdown';
import './style.scss';

const options = {
  25: {
    label: 'Mostrar 25',
    value: '25',
  },
  50: {
    label: 'Mostrar 50',
    value: '50',
  },
  75: {
    label: 'Mostrar 75',
    value: '75',
  },
};

class PageSizeDropdown extends Component {
  static propTypes = {
    className: PropTypes.string,
    currentPageSize: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onChangePageSize: PropTypes.func.isRequired,
  };

  onOptionSelected({ value }) {
    const { onChangePageSize } = this.props;
    onChangePageSize(Number(value));
  }

  render() {
    const { className, id, currentPageSize, disabled } = this.props;
    const selectedOption = options[currentPageSize] || options[25];

    return (
      <div className={className} id={id} styleName="page-size-dropdown">
        <Dropdown
          styleName="dropdown"
          color={false}
          optionsOnTop
          disabled={disabled}
          options={Object.values(options)}
          selectedOption={selectedOption}
          onChange={option => this.onOptionSelected(option)}
          defaultOptionText={<span>Mostrar {currentPageSize}</span>}
        />
      </div>
    );
  }
}

export default PageSizeDropdown;
