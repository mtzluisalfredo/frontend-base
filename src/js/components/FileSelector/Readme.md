### File selector

```html
const onSelectFile = event => setState({ event });

<FileSelector
  id="demo"
  name="demo"
  accept="*"
  onSelectFile={onSelectFile}
/>
```