### Switch

```jsx
  const handleChange = () => setState({checked: !state.checked});

  <Switch
    id="lights"
    name="lights"
    label="Turn lights"
    checked={state.checked}
    onChange={handleChange}
  />
```

### Switch with custom labels

```jsx
  const handleChange = () => setState({checked: !state.checked});

  <Switch
    id="cake"
    name="cake"
    label="Do you want a cake?"
    prefixText="No"
    suffixText="Yes"
    checked={state.checked}
    onChange={handleChange}
  />
```

### Disabled switch

```jsx
  const handleChange = () => setState({checked: !state.checked});

  <Switch
    id="disabled"
    name="disabled"
    label="Disabled switch"
    checked={state.checked}
    onChange={handleChange}
    disabled
  />
```

### Redux-Form switch

```html
  <Field
    id="reduxform"
    name="reduxform"
    type="checkbox"
    label="Custom switch"
    component={Switch}
  />
```

