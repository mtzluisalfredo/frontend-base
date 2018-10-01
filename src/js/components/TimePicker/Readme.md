## TimePicker Component

### Time picker

```jsx
const onFocusTimeChange = focused => setState({ focusedStartTime: focused });

const handleTimeChange = newTime => {
 let time = `${newTime.hour}:`+`${newTime.minute}`
  setState({ startTime: time})
}

<div style={{ height: 400 }}>
  <SingleTimePicker
    id="start-time"
    name="start-time"
    labelText="Hora inicial *"
    focused={state.focusedStartTime}
    onFocusChange={onFocusTimeChange}
    onTimeChange={handleTimeChange}
    time={state.startTime}
  />
</div>;
```

### Time picker changing timeMode

```jsx
const onFocusTimeChange = focused => setState({ focusedStartTime: focused });

const handleTimeChange = newTime => {
 let time = `${newTime.hour}:`+`${newTime.minute}`
  setState({ startTime: time})
}

<div style={{ height: 400 }}>
  <SingleTimePicker
    id="start-time"
    name="start-time"
    labelText="Hora inicial *"
    focused={state.focusedStartTime}
    onFocusChange={onFocusTimeChange}
    onTimeChange={handleTimeChange}
    time={state.startTime}
    timeMode="12"
  />
</div>;
```

### Time picker with changing color

```jsx
const onFocusTimeChange = focused => setState({ focusedStartTime: focused });

const handleTimeChange = newTime => {
 let time = `${newTime.hour}:`+`${newTime.minute}`
  setState({ startTime: time})
}

<div style={{ height: 400 }}>
  <SingleTimePicker
    id="start-time"
    name="start-time"
    labelText="Hora inicial *"
    focused={state.focusedStartTime}
    onFocusChange={onFocusTimeChange}
    onTimeChange={handleTimeChange}
    time={state.startTime}
    timeMode="12"
    colorPalette="dark"
  />
</div>;
```

### Time picker showing time zone

```jsx
const onFocusTimeChange = focused => setState({ focusedStartTime: focused });

const handleTimeChange = newTime => {
 let time = `${newTime.hour}:`+`${newTime.minute}`
  setState({ startTime: time})
}

<div style={{ height: 450 }}>
  <SingleTimePicker
    id="start-time"
    name="start-time"
    labelText="Hora inicial *"
    focused={state.focusedStartTime}
    onFocusChange={onFocusTimeChange}
    onTimeChange={handleTimeChange}
    time={state.startTime}
    colorPalette="light"
    timezone="America/New_York"
    showTimezone={true}
  />
</div>;
```

### Basic time picker with time formatter

```jsx
const onFocusTimeChange = focused => setState({ focusedStartTime: focused });

const handleTimeChange = newTime => {
 let time = `${newTime.hour}:`+`${newTime.minute}`
  setState({ startTime: time})
}

const timeFormatter = (time) => {
  if (time !== '') {
    return `${time} Hrs`;
  }

  return time;
}

<div style={{ height: 400 }}>
  <SingleTimePicker
    id="start-time"
    name="start-time"
    labelText="Hora inicial *"
    focused={state.focusedStartTime}
    onFocusChange={onFocusTimeChange}
    onTimeChange={handleTimeChange}
    time={state.startTime || '00:00'}
    timeMode="12"
    colorPalette="classic"
    timezone="America/New_York"
    timeFormatter={() => timeFormatter(state.startTime || '00:00')}
  />
</div>;
```
