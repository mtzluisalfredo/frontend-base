### Simple Empty State

```jsx
<EmptyState
  buttonText="I'm empty on the inside"
  description="You can add a short description here, only if you want to (no pressure)"
/>
```

### Empty State with title

```jsx
<EmptyState
  title="I'm empty on the inside"
  description="You can add a short description here, only if you want to (no pressure)"
/>
```

### Empty State with title, and icon

```jsx
const onClick = () => console.log('Hello!');
<EmptyState
  title="I'm empty on the inside"
  description="You can add a short description here, only if you want to (no pressure)"
  icon={<img src="http://via.placeholder.com/20x20" />}
/>
```

```jsx
const onClick = () => alert('Hello!');
<EmptyState
  title="I'm empty on the inside"
  description="You can add a short description here, only if you want to (no pressure)"
  icon={<img src="http://via.placeholder.com/20x20" />}
  onClick={onClick}
  buttonColor="primary"
  buttonText={<span>Click me!</span>}
/>
```
