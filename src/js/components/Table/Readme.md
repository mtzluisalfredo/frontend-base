### Simple

If you want to create a simple table just use these tags (which under the hood are equivalents to native HTML tags).

```jsx
<Table id="simple-table">
  <Table.Header>
    <Table.Row>
      <Table.Cell>Name</Table.Cell>
      <Table.Cell>Registration Date</Table.Cell>
      <Table.Cell>E-mail address</Table.Cell>
      <Table.Cell>Premium Plan</Table.Cell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Foo</Table.Cell>
      <Table.Cell>September 15, 2015</Table.Cell>
      <Table.Cell>john@email.com</Table.Cell>
      <Table.Cell>No</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Jamie Bar</Table.Cell>
      <Table.Cell>July 22, 2013</Table.Cell>
      <Table.Cell>jamie@email.com</Table.Cell>
      <Table.Cell>Yes</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Jill Baz</Table.Cell>
      <Table.Cell>January 28, 2018</Table.Cell>
      <Table.Cell>jill_baz@email.com</Table.Cell>
      <Table.Cell>Yes</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

### Sortable

If you want to use a table with sorting columns, you have to pass an array of object specifying which column is sortable and which one isn't.

```jsx
const columns = [
  {
    label: 'Name',
    propertyName: 'name',
    template: ({ name }) => name,
  },
  {
    label: 'Last Name',
    propertyName: 'lastName',
    sortable: false,
    template: ({ lastName }) => lastName,
  },
  {
    label: 'Email',
    propertyName: 'email',
    sortable: true,
    template: ({ email }) => email,
  },
];

const tableData = [
  {
    id: '1',
    name: 'Raviv',
    lastName: 'Lomond',
    email: 'rlomond0@forbes.com',
  },
  {
    id: 2,
    name: 'Derrick',
    lastName: 'McCahill',
    email: 'dmccahill1@multiply.com',
  },
  {
    id: 3,
    name: 'Alecia',
    lastName: 'Timbridge',
    email: 'atimbridge2@friendfeed.com',
  },
  {
    id: 4,
    name: 'Markus',
    lastName: 'Mitchinson',
    email: 'mmitchinson8@about.com',
  },
];

const orderBy = { propertyName: 'title', desc: true };
const handleClick = (item) => alert(JSON.stringify(item, null, 2));
const handleOrderBy = (columnName, desc) => alert(columnName, desc);

<Table
  id="sortable-table"
  columns={columns}
  items={tableData}
  onClickItem={handleClick}
  orderBy={orderBy}
  onOrderBy={handleOrderBy}
/>
```
