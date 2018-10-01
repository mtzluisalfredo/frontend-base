import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function TableFooter(props) {
  const {
    className,
    children,
  } = props;

  const styleNames = classnames({
    'table-footer': true,
  });

  return (
    <tfoot styleName={styleNames} className={className}>
      {children}
    </tfoot>
  );
}

TableFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableFooter.defaultProps = {
  className: '',
};

export default TableFooter;
