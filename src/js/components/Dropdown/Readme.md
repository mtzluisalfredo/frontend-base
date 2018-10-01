## Dropdown Component

### Dropdown

```jsx
const handleChange = e => setState({ value: e });
const options = [{ id: 0, label: 'Option 1', value: 'Option 1' }, { id: 1, label: 'Option 2', value: 'Option 2' }];
const style = { position: 'relative', height: 200 + 'px' };

<div style={style}>
  <Dropdown
    id="id"
    name="Dropdown name"
    labelText="My dropdown"
    options={options}
    color={false}
    onChange={handleChange}
    defaultOptionText="Seleccionar"
    selectedOption={state.value || {}}
    showActiveItem
  />
</div>
```

### Dropdown with search input

```jsx
const handleChange = e => setState({ value: e });
const options = [{ id: 0, label: 'Mexico', value: 'Mexico' }, { id: 1, label: 'Argentina', value: 'Argentina' }];
const style = { position: 'relative', height: 200 + 'px' };

<div style={style}>
  <Dropdown
    id="id"
    name="Dropdown name"
    labelText="My dropdown"
    options={options}
    color={false}
    onChange={handleChange}
    defaultOptionText="Seleccionar"
    selectedOption={state.value || {}}
    showActiveItem
    editable={true}
    placeholderText="Search"
  />
</div>
```

### Disabled dropdown

```jsx
const handleChange = e => setState({ value: e });
const options = [{ id: 0, label: 'Option 1', value: 'Option 1' }, { id: 1, label: 'Option 2', value: 'Option 2' }];
const style = { position: 'relative', height: 200 + 'px' };

<div style={style}>
  <Dropdown
    id="id"
    name="Dropdown name"
    labelText="My dropdown"
    options={options}
    color={false}
    onChange={handleChange}
    defaultOptionText="Seleccionar"
    selectedOption={state.value || {}}
    showActiveItem
    disabled={true}
  />
</div>
```

### Dropdown (always open)

```jsx
const handleChange = e => setState({ value: e });
const options = [{ id: 0, label: 'Option 1', value: 'Option 1' }, { id: 1, label: 'Option 2', value: 'Option 2' }];
const style = { position: 'relative', height: 200 + 'px' };

<div style={style}>
  <Dropdown
    alwaysOpen
    id="id"
    name="Dropdown name"
    labelText="My dropdown"
    options={options}
    color={false}
    onChange={handleChange}
    defaultOptionText="Seleccionar"
    selectedOption={state.value || {}}
    showActiveItem
  />
</div>
```

### Usage with redux-form, just pass Dropdown as a prop

```html
  <Field
    component={Dropdown}
    id="id"
    name="Dropdown name"
    labelText="My dropdown"
    options={options}
    color={false}
    onChange={handleChange}
    defaultOptionText="Seleccionar"
    selectedOption={state.value || {}}
    showActiveItem
  />
```
