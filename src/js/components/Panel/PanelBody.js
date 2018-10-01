import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

function PanelBody(props) {
  const { className, children } = props;
  const classes = classnames({
    [className]: !!className,
    clearfix: true,
  });

  return (<div styleName="content-box" className={classes}>
    { children }
  </div>);
}

PanelBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PanelBody;
