### Select
**Must** be inside a Redux-Form decorated class/component
```html
@reduxForm({ form: 'demo' })
class Demo extends React.Component {
  render() {
    return (
      <Select
        name="demo"
        labelText="demo"
      />
    );
  };
}
```