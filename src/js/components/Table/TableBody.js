import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function TableBody(props) {
  const {
    className,
    children,
  } = props;

  const styleNames = classnames({
    'table-body': true,
  });

  return (
    <tbody styleName={styleNames} className={className}>
      {children}
    </tbody>
  );
}

TableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableBody.defaultProps = {
  className: '',
};

export default TableBody;
