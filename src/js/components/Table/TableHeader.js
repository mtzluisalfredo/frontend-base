import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

function TableHeader(props) {
  const {
    className,
    children,
  } = props;

  const styleNames = classnames({
    'table-header': true,
  });

  return (
    <thead styleName={styleNames} className={className}>
      {children}
    </thead>
  );
}

TableHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

TableHeader.defaultProps = {
  className: '',
};

export default TableHeader;
