### Button (primary)

```jsx
<Button color="primary">Primary button</Button>
```

### Button (info)

```jsx
<Button color="info" onClick={() => alert('testing')}>Info button</Button>
```

### Button (success)

```jsx
<Button color="success">Success button</Button>
```

### Button (primary), and disabled

```jsx
<Button disabled color="primary">Success button</Button>
```

### Button (primary), with spinner

```jsx
<Button spinner color="primary">Success button</Button>
```

### Button (primary + block)

```jsx
<Button color="primary block">Primary button</Button>
```

### Button (info + block)

```jsx
<Button color="info block" onClick={() => alert('testing')}>Info button</Button>
```

### Button (success + block)

```jsx
<Button color="success block">Success button</Button>
```

### Button (primary + block), and disabled

```jsx
<Button disabled color="primary block">Success button</Button>
```

### Button (primary + block), with spinner

```jsx
<Button spinner color="primary block">Success button</Button>
```

### Button usage for Redux-Form
To use this component as the submission action inside Redux-Form,
override the default button type and pass `type="submit"` instead

```jsx
<Button type="submit" color="primary">Submit form</Button>
```