
## RadioButton Component

### Single radio

```jsx
  const handleChange = () => setState({ checked: !state.checked });

  <RadioButton
    id="radio"
    name="radio"
    label="Radio 1"
    value="1"
    checked={state.checked || false}
    onChange={handleChange}
  />
```

### Single radio (big)

```jsx
  const handleChange = () => setState({ checked: !state.checked });

  <RadioButton
    id="radio-big"
    name="radio-big"
    label="Am i big enough?"
    value="big"
    checked={state.checked || false}
    onChange={handleChange}
    size="big"
  />
```

### Single radio (disabled)

```jsx
  const handleChange = () => setState({ checked: !state.checked });

  <RadioButton
    disabled
    id="radio-disabled"
    name="radio-disabled"
    label="Radio disabled"
    value="1"
    checked={state.checked || false}
    onChange={handleChange}
  />
```

### Multiple radio button, use the same name as regular radio button and use different id for each radio

```jsx
  const handleChange = e => setState({ value: e.target.value });

  <div>
    <RadioButton
      id="radio1"
      name="multipleRadio"
      label="Radio 1"
      value="1"
      checked={state.value === '1'}
      onChange={handleChange}
    />

    <RadioButton
      id="radio2"
      name="multipleRadio"
      label="Radio 2"
      value="2"
      checked={state.value === '2'}
      onChange={handleChange}
    />
  </div>
```

### Usage with Redux-Form, just pass RadioButton as a prop

```html
  <Field
    name="radio"
    label="radio 1"
    id="value1"
    value="1"
    type="radio"
    component={RadioButton}
  />
```
