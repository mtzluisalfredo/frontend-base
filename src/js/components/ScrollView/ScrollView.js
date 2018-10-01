import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import './style.scss';

function ScrollView(props) {
  const {
    className,
    children,
    ...others
  } = props;

  return (<Scrollbars
    className={className}
    styleName="scrollbar"
    renderTrackVertical={() => <div className="vertical" />}
    renderTrackHorizontal={() => <div className="horizontal" />}
    renderThumbVertical={p => <div {...p} className={p.style.height !== '100%' ? 'thumb' : ''} />}
    renderThumbHorizontal={p => <div {...p} className={p.style.height !== '100%' ? 'thumb' : ''} />}
    {...others}
  >
    {children}
  </Scrollbars>);
}

ScrollView.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

ScrollView.defaultProps = {
  autoHide: true,
  autoHeight: true,
  autoHeightMax: 300,
  autoHideTimeout: 2000,
  autoHideDuration: 200,
};

export default ScrollView;
