import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-times';

import './style.scss';

function SingleTimePicker(props) {
  const { className, name, labelText, id, focused, onFocusChange, onTimeChange, time, defaultTime, ...others } = props;

  return (
    <div id={id} className={className} styleName="single-time-picker">
      {labelText && <label htmlFor={name}>{labelText}</label>}
      <TimePicker
        {...others}
        draggable={false}
        focused={focused}
        onFocusChange={onFocusChange}
        onTimeChange={onTimeChange}
        time={time}
        withoutIcon
        defaultTime={defaultTime}
      />
    </div>
  );
}

SingleTimePicker.propTypes = {
  className: PropTypes.string,
  defaultTime: PropTypes.string,
  focused: PropTypes.bool,
  id: PropTypes.string,
  labelText: PropTypes.node,
  name: PropTypes.string.isRequired,
  time: PropTypes.string,
  onFocusChange: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
};

export default SingleTimePicker;
