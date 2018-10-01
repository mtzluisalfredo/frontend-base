import React from 'react';
import PropTypes from 'prop-types';

function TooltipWrapper(props) {
  const { children } = props;
  return (<span>
    {children}
  </span>);
}

TooltipWrapper.propTypes = {
  children: PropTypes.node,
};

export default TooltipWrapper;
