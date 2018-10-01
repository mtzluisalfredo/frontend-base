import React from 'react';
import PropTypes from 'prop-types';

function formatMoney(value, fixed) {
  const re = new RegExp(`\\d(?=(\\d{3})+${fixed > 0 ? '\\D' : '$'})`, 'g');
  const num = value.toFixed(fixed);
  return num.replace(re, '$&,');
}

function NumberFormat(props) {
  const {
    className,
    value,
    decimals,
    type,
    prefix,
    suffix,
    ...others
  } = props;
  let formatted = parseFloat(value) || 0;

  if (type === 'currency') {
    formatted = formatMoney(formatted, decimals, ',');
  } else if (type === 'percent') {
    formatted = formatted.toFixed(decimals);
  } else if (decimals) {
    formatted = formatted.toFixed(decimals);
  }

  return (<span className={className} {...others}>
    <span>{prefix}</span>
    <span>{formatted}</span>
    <span>{suffix}</span>
  </span>);
}

NumberFormat.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  decimals: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  type: PropTypes.oneOf(['number', 'percent', 'currency']),
};

NumberFormat.defaultProps = {
  type: 'number',
};

export default NumberFormat;
