### Page Size Dropdown

```jsx
const onChangePageSize = pageSize => setState({ pageSize });
const height = 200+'px';

<div style={{ position: 'relative', height }}>
  <div style={{ position: 'absolute', height }}>
    <PageSizeDropdown
      id="demo"
      currentPageSize={state.pageSize}
      onChangePageSize={onChangePageSize}
    />
  </div>
</div>
```

### Page Size Dropdown (disabled)

```jsx
const onChangePageSize = pageSize => setState({ pageSize });
const height = 200+'px';

<div style={{ position: 'relative', height }}>
  <div style={{ position: 'absolute', height }}>
    <PageSizeDropdown
      disabled
      id="demo"
      currentPageSize={state.pageSize}
      onChangePageSize={onChangePageSize}
    />
  </div>
</div>
```