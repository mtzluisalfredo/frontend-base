### Page Selector

```jsx
const onChangePage = page => setState({ page });

<PageSelector
  id="page-selector"
  onChangePage={onChangePage}
  currentPage={state.page || 1}
  totalPages={4}
/>
```