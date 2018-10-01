import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import classnames from 'classnames';
import './style.scss';

class Select extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    labelText: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
  }

  renderField = field => {
    const {
      name,
      className,
      disabled,
      labelText,
      children,
    } = this.props;

    const classes = classnames({
      select: true,
      [className]: !!className,
      disabled,
    });
    const { value } = field.input;

    let label = '';

    if (children) {
      for (let i = 0; i < children.length; i += 1) {
        const element = children[i];
        if (element.props.value == value) { // eslint-disable-line eqeqeq
          label = element.props.children;
        }
      }
    }

    return (<span styleName="select-container">
      {labelText && <label htmlFor={name}>{labelText}</label>}
      <div styleName={classes}>
        <select {...field.input} disabled={disabled}>
          {children}
        </select>

        <span styleName="custom-select">
          {label}
        </span>

        <i className="icon-caret-down" />
      </div>
    </span>);
  }

  render() {
    return (<Field {...this.props} component={this.renderField} />);
  }
}

export default Select;
