import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import ScrollView from '../ScrollView';
import Icon from '../Icon';
import './style.scss';

const optionShape = {
  value: PropTypes.string,
  label: PropTypes.string,
};

@onClickOutside
class Dropdown extends Component {
  static propTypes = {
    alwaysOpen: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.bool,
    defaultIcon: PropTypes.node,
    defaultOptionText: PropTypes.node,
    disabled: PropTypes.bool,
    editable: PropTypes.bool,
    errorText: PropTypes.node,
    id: PropTypes.string,
    input: PropTypes.shape({
      // ReduxForm Prop
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    labelText: PropTypes.node,
    maxHeight: PropTypes.number,
    meta: PropTypes.shape({
      // ReduxForm Prop
      error: PropTypes.arrayOf(PropTypes.string),
    }),
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
    optionsOnTop: PropTypes.bool,
    placeholderText: PropTypes.string,
    selectedOption: PropTypes.shape(optionShape),
    showActiveItem: PropTypes.bool,
    showArrows: PropTypes.bool,
    template: PropTypes.func,
    toggleOnClick: PropTypes.bool,
    onChange: PropTypes.func,
    onToggle: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    color: true,
    defaultOptionText: 'Opciones',
    editable: false,
    placeholderText: '',
    selectedOption: {},
    showActiveItem: true,
    showArrows: true,
    template: option => option.label,
    optionsOnTop: false,
    disabled: false,
    maxHeight: 420,
    errorText: 'Valor requerido',
    toggleOnClick: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      showOptions: props.alwaysOpen || false,
      activeItem: 0,
      showActive: props.alwaysOpen || false,
      searchText: '',
      searchInput: false,
      tabIndexOnChange: null,
      letterFounded: false,
    };
    this.optsLength = 0;
  }

  componentDidUpdate() {
    const { searchInput } = this.state;
    if (searchInput === true) {
      this.triggerFocus('search-input-dropdown');
    }
  }

  onChangeWithKey = (num = 0) => {
    const { showOptions, activeItem } = this.state;
    const { input, onChange, options } = this.props;

    if (showOptions === false) {
      this.setState({ tabIndexOnChange: activeItem - num });
      if (input && input.onChange) {
        input.onChange(options[activeItem - num]);
      } else if (onChange) {
        onChange(options[activeItem - num]);
      }
    }
  };

  getLetter = key => {
    const { options } = this.props;
    const { activeItem } = this.state;
    let { letterFounded } = this.state;
    let search = null;
    let index = activeItem;
    for (; index <= options.length - 1;) {
      search = options[index].label.indexOf(key.toUpperCase());
      if (search === 0 && index !== activeItem) {
        this.setState({ activeItem: index, letterFounded: true });
        break;
      } else if (index === options.length - 1 && letterFounded === true) {
        letterFounded = false;
        index = -1;
      }
      index += 1;
    }
  };

  triggerFocus = id => {
    document.getElementById(id).focus();
  };

  keyEnter = () => {
    const { activeItem, showOptions } = this.state;
    const indexId = `${activeItem}-option`;
    if (showOptions === true) {
      document.getElementById(indexId).click();
      this.triggerFocus(indexId);
    }
  };

  filterOptions = (text = '', elements) => {
    const items = [].concat(elements);
    const query = text.trim().replace(/\s+/gi, ' ');
    const regexp = new RegExp(query, 'gi');
    if (!query.length) {
      this.optsLength = items.length;
      return items;
    }
    const options = items.filter(item => item.label.search(regexp) >= 0);
    this.optsLength = options.length;

    return options;
  };

  keyDown = () => {
    const { activeItem, showOptions } = this.state;
    if (activeItem >= 0 && activeItem < this.optsLength - 1) {
      this.setState({ activeItem: activeItem + 1 });
      if (showOptions === true) {
        this.triggerFocus(`${activeItem + 1}-option`);
      }
    }
    if (showOptions === false) {
      this.onChangeWithKey();
    }
  };

  keyUp = () => {
    const { activeItem, showOptions } = this.state;
    if (activeItem > 0) {
      this.setState({ activeItem: activeItem - 1 });
      if (showOptions === true) {
        this.triggerFocus(`${activeItem - 1}-option`);
      } else if (showOptions === false) {
        this.onChangeWithKey(1);
      }
    }
  };

  keyEsc = () => {
    this.setState({
      showOptions: false,
      searchInput: false,
      activeItem: 0,
      tabIndexOnChange: null,
    });
  };

  keyEvent = e => {
    this.setState({ showActive: true });
    e.stopPropagation();
    if (e.keyCode === 13) {
      this.keyEnter();
    } else if (e.keyCode === 40) {
      this.keyDown();
    } else if (e.keyCode === 38) {
      this.keyUp();
    } else if (e.keyCode === 27) {
      this.keyEsc();
    } else {
      this.getLetter(e.key);
    }
  };

  mouseEvent = e => {
    const { showActiveItem } = this.props;
    const idItem = e.currentTarget.id.split('-');
    const index = Number(idItem[0]);
    this.setState({ activeItem: index });
    if (showActiveItem === false) {
      this.setState({ showActive: false });
    }
  };

  handleClickOutside = () => {
    const { alwaysOpen, onToggle, input } = this.props;
    const { showOptions } = this.state;

    if (showOptions) {
      if (onToggle) {
        onToggle();
      }

      if (input) {
        input.onBlur();
      }

      this.setState({
        showOptions: alwaysOpen || false,
        searchInput: false,
      });
    }
  };

  toggleMenu = e => {
    const { alwaysOpen, onToggle, input, editable, showActiveItem } = this.props;
    const { showOptions } = this.state;
    e.stopPropagation();

    if (onToggle) {
      onToggle();
    }

    if (input && !showOptions) {
      input.onFocus();
    } else if (input) {
      input.onBlur();
    }

    if (editable === true) {
      this.setState({ searchInput: true });
    }

    this.setState({
      showOptions: alwaysOpen || !showOptions,
      activeItem: 0,
      showActive: showActiveItem === true,
      searchText: '',
      tabIndexOnChange: null,
    });
  };

  renderLabel() {
    const { selectedOption, defaultOptionText, options } = this.props;

    const { tabIndexOnChange, showOptions } = this.state;
    const option = { ...selectedOption };

    if (tabIndexOnChange !== null && showOptions === false) {
      return options[tabIndexOnChange].label;
    }
    return option.label || defaultOptionText;
  }

  renderOption = (option, index) => {
    const { input, toggleOnClick, onChange, selectedOption, template } = this.props;
    const { disabled, action } = option;
    const value = selectedOption.value || (input && input.value);
    const active = value === option.value;
    const { activeItem, showActive } = this.state;
    const classes = classnames({
      active,
      disabled,
      pointedItem: activeItem === index && showActive === true,
    });

    let onClick = e => {
      if (toggleOnClick) {
        this.toggleMenu(e);
      }

      if (input && input.onChange) {
        input.onChange(option);
      } else if (onChange) {
        onChange(option);
      }

      this.setState({ searchInput: false });
    };

    if (typeof action === 'function') {
      onClick = action;
    }

    return (
      <a
        id={`${index}-option`}
        tabIndex="0"
        disabled={disabled}
        className={classes}
        onClick={disabled ? undefined : onClick}
        onMouseOver={this.mouseEvent}
      >
        {template(option, active)}
      </a>
    );
  };

  renderIcon() {
    const { showOptions } = this.state;
    const { showArrows, disabled, color, defaultIcon } = this.props;

    if (!showArrows) {
      return null;
    }

    let arrowType = showOptions ? 'arrowUp' : 'arrowDown';
    if (disabled || !color) {
      arrowType += 'Gray';
    }

    return <Icon styleName="arrow" type={defaultIcon || arrowType} width="16" height="16" />;
  }

  render() {
    const {
      id,
      name,
      className,
      labelText,
      options,
      input,
      optionsOnTop,
      disabled,
      maxHeight,
      selectedOption,
      errorText,
      meta,
      placeholderText,
    } = this.props;
    const { showOptions, searchText, searchInput } = this.state;
    const inputName = name || (input && input.name);
    const allOptions = this.filterOptions(searchText, options);
    const styleNames = classnames({
      dropdown: true,
      open: showOptions,
      'options-on-top': optionsOnTop,
    });
    let hasError = JSON.stringify(selectedOption) === JSON.stringify({});

    if (input && meta) {
      hasError = meta.touched && meta.error && meta.visited;
    }

    return (
      <div
        id={id}
        className={className}
        styleName="dropdown-container"
        tabIndex="-1"
        role="button"
        onKeyDown={this.keyEvent}
      >
        {labelText && <label htmlFor={inputName}>{labelText}</label>}

        <div styleName={styleNames} disabled={disabled}>
          {!searchInput && (
            <button
              tabIndex="0"
              type="button"
              onClick={this.toggleMenu}
              id={`${id}-button`}
              name={inputName}
              disabled={disabled}
            >
              <span styleName="dropdown-label">
                {this.renderLabel()}
                {this.renderIcon()}
              </span>
            </button>
          )}
          {searchInput && (
            <div styleName="dropdown-input">
              <Icon type="search" width="20" height="20" />
              <input
                id="search-input-dropdown"
                type="text"
                styleName="searchInput"
                placeholder={placeholderText}
                value={searchText}
                autoComplete="off"
                onChange={({ target: { value } }) => {
                  this.setState({ searchText: value, activeItem: 0 });
                }}
              />
            </div>
          )}
          {showOptions && (
            <div styleName="dropdown-options">
              <ScrollView autoHeightMax={maxHeight}>
                <ul>
                  {allOptions &&
                    allOptions.map((option, index) => {
                      const key = option.id || index;
                      return <li key={key}>{this.renderOption(option, index)}</li>;
                    })}
                </ul>
              </ScrollView>
            </div>
          )}
        </div>

        {hasError && (
          <span id={`${id}-error`} styleName="input-error-text">
            {errorText}
          </span>
        )}
      </div>
    );
  }
}

export default Dropdown;
