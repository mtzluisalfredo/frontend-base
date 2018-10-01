### Checkbox

```jsx
  const handleChange = () => setState({ checked: !state.checked });

  <Checkbox
    id="check1"
    name="check1"
    label="Check 1"
    checked={state.checked || false}
    onChange={handleChange}
  /> 
```

### Checkbox (disbaled)
```jsx
  const handleChange = () => setState({ checked: !state.checked });

  <Checkbox
    disabled
    id="check-disabled"
    name="check1"
    label="Check 1"
    checked={state.checked || false}
    onChange={handleChange}
  /> 
```

### Multiple checkbox with Redux-Form

```html
  const { Field, Form } = require('redux-form');

  <Form onSubmit={() => {}}>
    <Field
      id="custom[1]"
      name="custom[0]"
      type="checkbox"
      label="Custom 1"
      component={'input'}
    />
    <Field
      id="custom[2]"
      name="custom[1]"
      type="checkbox"
      label="Custom 2"
      component={'input'}
    />
    <Field
      id="custom[3]"
      name="custom[2]"
      type="checkbox"
      label="Custom 3"
      component={'input'}
    />
  </Form>
```
