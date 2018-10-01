import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

class Switch extends PureComponent {
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
    prefixText: PropTypes.string,
    suffixText: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    prefixText: 'Off',
    suffixText: 'On',
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

  onKeyDown = e => {
    const { checked, input = {} } = this.props;
    const active = checked || (input && input.checked);

    if (e.keyCode === 39 && !active) {
      this.input.click();
    } else if (e.keyCode === 37 && active) {
      this.input.click();
    }
  };

  setRef = ele => {
    this.input = ele;
  }

  render() {
    const { id, className, label, disabled, checked, prefixText, suffixText, input = {}, ...others } = this.props;
    const { focus } = this.state;
    const styleNames = classnames({
      switch: true,
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
      onKeyDown: this.onKeyDown,
    };

    return (
      <div id={`${id}-container`} styleName={styleNames} className={className}>
        {label && <label>{label}</label>}
        <div>
          {prefixText && <span>{prefixText}</span>}
          <label htmlFor={id} styleName="label">
            <div styleName="switch-bg">
              <div id={`${id}-switch`} styleName="switch-button" />
              <input {...inputProps} id={id} checked={checked} type="checkbox" ref={this.setRef} />
            </div>
          </label>
          {suffixText && <span styleName="suffix">{suffixText}</span>}
        </div>
      </div>
    );
  }
}

export default Switch;
