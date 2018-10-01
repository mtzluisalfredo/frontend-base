import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function Badge(props) {
  const { value, color } = props;
  const styleName = classnames({
    [`badge-${color || 'default'}`]: true,
    'badge-value': true,
  });

  return (
    <span styleName={styleName}>{value}</span>
  );
}

Badge.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  color: PropTypes.oneOf([
    'default',
    'primary',
    'info',
    'success',
    'error',
  ]),
};

export default Badge;
