import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

class Checkbox extends Component {
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
    const { id, className, label, disabled, checked, input = {}, ...others } = this.props;
    const { focus } = this.state;
    const classes = classnames({
      checkbox: true,
      active: checked || (input && input.checked),
      disabled,
      focus,
    });
    const inputProps = {
      disabled,
      checked,
      ...others,
      ...input,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
    };

    return (
      <div id={`${id}-container`} className={className} styleName={classes}>
        <label htmlFor={id}>
          <div styleName="checkbox-button">
            <input {...inputProps} id={id} type="checkbox" />
          </div>
          <span>{label}</span>
        </label>
      </div>
    );
  }
}

export default Checkbox;
