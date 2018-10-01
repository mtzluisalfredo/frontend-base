
## TextField Component

### Basic input

```jsx
  const handleChange = (e) => setState({ value: e.target.value });

  <TextField
    id="name"
    name="name"
    label="Full Name"
    onChange={handleChange}
    value={state.value}
    autoComplete="off"
  />
```

### Basic input (password)

```jsx
  const handleChange = (e) => setState({ value: e.target.value });

  <TextField
    id="password"
    name="password"
    label="Password"
    onChange={handleChange}
    value={state.value}
    autoComplete="off"
    type="password"
  />
```

### Basic input (numeric)

```jsx
  const handleChange = (e) => setState({ value: e.target.value });

  <TextField
    id="cellphone"
    name="cellphone"
    label="Cellphone"
    onChange={handleChange}
    value={state.value}
    autoComplete="off"
    type="number"
  />
```

### Basic with icons, Icon can be string or a React node
```jsx
  <TextField
    id="name"
    name="name"
    label="Full Name"
    leftIcon="👾"
    rightIcon={<img src="http://via.placeholder.com/20x20" />}
    autoComplete="off"
  />
```

### Disabled input
```jsx
  <TextField
    id="name"
    name="name"
    label="Full Name"
    disabled
    autoComplete="off"
  />
```

### Custom error message
```jsx
  <TextField
    id="name"
    name="name"
    label="Full Name"
    errorText="Required field"
    autoComplete="off"
  />
```

### Use with redux-form, just send TextField as component

```html
  <Field
    id="name"
    name="name"
    label="Full Name"
    component={TextField}
    autoComplete="off"
  />
```
