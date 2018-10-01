import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

class RadioButton extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    /**
    * ReduxForm Prop
    */
    input: PropTypes.shape({
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    label: PropTypes.node,
    name: PropTypes.string,
    size: PropTypes.oneOf(['big']),
    value: PropTypes.node.isRequired,
    onChange: PropTypes.func,
  };

  state = {
    focus: false,
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  onBlur = () => {
    this.setState({ focus: false });
  };

  render() {
    const { id, className, checked, disabled, name, size, value, label, onChange, input } = this.props;
    const { focus } = this.state;
    const isChecked = checked || (input && input.checked);
    const classes = classnames({
      radio: true,
      active: isChecked,
      [size]: !!size,
      disabled,
      focus,
    });

    const radioClasses = classnames({
      'radio-button': true,
      active: isChecked,
    });

    return (
      <div styleName={classes} className={className}>
        <label htmlFor={id}>
          <div id={`${id}-radio`} styleName={radioClasses}>
            {!input && (
              <input
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            )}
            {input && (
              <input
                {...input}
                id={id}
                type="radio"
                disabled={disabled}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            )}
          </div>

          <span>{label}</span>
        </label>
      </div>
    );
  }
}

export default RadioButton;
