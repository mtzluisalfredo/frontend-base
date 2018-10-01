### Error message

```jsx
const error = { code: 401, message: 'Unauthorized, Area 51 files are protected 👽' };

<ErrorMessage 
  id="demo-error"
  error={error}
/>;
```

### Error message (dismisable)

```jsx
state.open = true;
const onClose = () => setState({ open: false })
const error = { code: 401, message: 'Unauthorized, Area 51 files are protected 👽' };
const style = { position: 'relative', width: 100+'%', clear: 'both', };

<div style={style}>
  {state.open && (
    <ErrorMessage 
      id="demo-error"
      error={error}
      onClose={onClose}
      type="alert"
    />
  )}
</div>
```