import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function TableRow(props) {
  const {
    className,
    children,
    onClick,
  } = props;

  const styleNames = classnames({
    'table-row': true,
  });

  return (
    <tr styleName={styleNames} className={className} onClick={onClick} role="button">
      {children}
    </tr>
  );
}

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

TableRow.defaultProps = {
  className: '',
};

export default TableRow;
