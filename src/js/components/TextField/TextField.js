import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function TextField(props) {
  const {
    id,
    className,
    disabled,
    errorText,
    label,
    leftIcon,
    rightIcon,
    onChange,
    value,
    name,
    type,
    input,
    meta,
    ...others
  } = props;
  const hasError = meta && meta.error && meta.touched && !meta.active;
  const stylenames = classnames({
    'input-container': true,
    error: hasError,
    disabled,
  });
  const containerStyleNames = classnames({
    'input-group': true,
    'left-text': typeof leftIcon === 'string',
    'right-text': typeof rightIcon === 'string',
    'left-icon': (typeof leftIcon !== 'string' && leftIcon),
    'right-icon': (typeof rightIcon !== 'string' && rightIcon),
  });
  const inputID = `${id}-input`;

  return (
    <div id={id} className={className} styleName={stylenames}>
      {label && <label htmlFor={`${id}-input`}>{label}</label>}

      <div styleName={containerStyleNames}>
        {leftIcon && (
          <span styleName="input-addon">
            {leftIcon}
          </span>
        )}


        {input && <input {...others} {...input} styleName="input" id={inputID} type={type} />}
        {!input && (
          <input
            {...others}
            styleName="input"
            id={inputID}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
          />
        )}

        {rightIcon && (
          <span styleName="input-addon">
            {rightIcon}
          </span>
        )}
      </div>

      {hasError && <span id={`${id}-error`} styleName="input-error-text">{errorText}</span>}
    </div>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.node,
  id: PropTypes.string.isRequired,
  /**
  * ReduxForm Prop
  */
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  label: PropTypes.node,
  leftIcon: PropTypes.node,
  /**
  * ReduxForm Prop
  */
  meta: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  name: PropTypes.string,
  rightIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  type: 'text',
  errorText: 'Valor requerido',
};

export default TextField;
