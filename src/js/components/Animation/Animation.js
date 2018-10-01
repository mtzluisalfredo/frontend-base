import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import './style.scss';

function Animation(props) {
  const {
    children,
    name,
    time,
  } = props;

  return (<CSSTransitionGroup
    transitionName={name}
    transitionEnterTimeout={time}
    transitionLeaveTimeout={time}
    transitionEnter
    transitionLeave
  >
    {children}
  </CSSTransitionGroup>);
}

Animation.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
  time: PropTypes.number,
};

Animation.defaultProps = {
  time: 300,
};

export default Animation;
