## Datepicker Component

This component uses [react-datepicker](http://asasd.com)

### DatePicker

```jsx
  const handleChange = date => setState({ date });

  <DatePicker
    id="name"
    name="name"
    label="Select a date"
    onDateChange={handleChange}
    date={state.date}
    autoComplete="off"
  />
```

### DatePicker with pickable min date set as today

```jsx
  const moment = require('moment');
  const handleChange = date => setState({ date });

  <DatePicker
    id="name"
    name="name"
    label="Select a date"
    minDate={moment()}
    maxDate={moment().add(1, 'month')}
    onDateChange={handleChange}
    date={state.date}
    autoComplete="off"
  />
```

### DatePicker with pickable max date set as tomorrow

```jsx
  const moment = require('moment');
  const handleChange = date => setState({ date });

  <DatePicker
    id="name"
    name="name"
    label="Select a date"
    maxDate={moment().add(1, 'day')}
    onDateChange={handleChange}
    date={state.date}
    autoComplete="off"
  />
```
