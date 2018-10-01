import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function PanelRow(props) {
  const {
    children,
    className,
    title,
  } = props;

  return (<div styleName="panel-row" className={className}>
    {title !== '' && <div styleName="panel-row-title">{title}</div>}
    <div>{children}</div>
  </div>);
}

PanelRow.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

PanelRow.defaultProps = {
  className: '',
  title: '',
};

export default PanelRow;
