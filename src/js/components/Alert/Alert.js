import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function Alert(props) {
  const {
    className,
    children,
    color,
    ...others
  } = props;

  const classes = classnames({
    'alert-message': true,
    [color]: !!color,
  });

  return (<div {...others} styleName={classes} className={className}>
    {children}
  </div>);
}

Alert.propTypes = {
  /**
   * An extra className you can pass to override base styles
   */
  className: PropTypes.string,
  /**
   * Any valid node supports by ReactJS: [Children](https://reactjs.org/docs/jsx-in-depth.html#children-in-jsx)
   */
  children: PropTypes.node,
  /**
   * One of: primary, success, info, error
   */
  color: PropTypes.string.isRequired,
};

export default Alert;
