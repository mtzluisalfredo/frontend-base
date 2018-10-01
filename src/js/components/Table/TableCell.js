import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function TableCell(props) {
  const { className, children } = props;

  return <td className={className}>{children}</td>;
}

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableCell.defaultProps = {
  className: '',
};

export default TableCell;
