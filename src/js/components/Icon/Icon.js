import React from 'react';
import PropTypes from 'prop-types';
import * as icons from './icons';

function Icon(props) {
  const { type, ...others } = props;
  return <img src={icons[type]} alt={type} {...others} />;
}

Icon.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)),
};

Icon.defaultProps = {
  width: 22,
  height: 22,
};

export default Icon;
