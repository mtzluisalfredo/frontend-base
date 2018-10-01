import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';

import TextField from '../TextField';
import Icon from '../Icon';
import './style.scss';

function DatePicker(props) {
  const { className, name, label, disabled, date, id, onDateChange, ...others } = props;

  return (
    <div id={`${id}-container`} className={className} styleName="datepicker">
      <ReactDatePicker
        {...others}
        id={id}
        selected={date}
        onChange={onDateChange}
        disabled={disabled}
        dropdownMode="select"
        styleName="input"
        customInput={(
          <TextField
            id={`${id}-input`}
            label={label}
            name={name}
            autoComplete="off"
            leftIcon={<Icon type="calendar" />}
          />
        )}
      />
    </div>
  );
}

DatePicker.propTypes = {
  className: PropTypes.string,
  date: PropTypes.instanceOf(moment),
  dateFormatCalendar: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  maxDate: PropTypes.instanceOf(moment),
  minDate: PropTypes.instanceOf(moment),
  name: PropTypes.string.isRequired,
  peekNextMonth: PropTypes.bool,
  showMonthDropdown: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  onDateChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  peekNextMonth: true,
  showMonthDropdown: true,
  showYearDropdown: true,
  dateFormatCalendar: 'MMMM YYYY',
  minDate: moment().subtract(6, 'years'),
  maxDate: undefined,
  readOnly: true,
};

export default DatePicker;
