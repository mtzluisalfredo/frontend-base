import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Cell from './Cell';
import HeadColumns from './HeadColumns';
import DefaultRows from './DefaultRows';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableCell from './TableCell';
import TableFooter from './TableFooter';

import './style.scss';

function Table(props) {
  const {
    id,
    className,
    hover,
    children,
    defaultRows,
    columns,
    items,
    orderBy,
    onClickItem,
    onOrderBy,
  } = props;

  const styleNames = classnames({
    table: true,
    hover: hover === true,
  });

  if (!children) {
    return (
      <table styleName={styleNames} className={className} id={id}>
        <TableHeader>
          <HeadColumns columns={columns} orderBy={orderBy} onOrderBy={onOrderBy} />
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id} onClick={() => onClickItem(item)}>
              {columns.map(column => <Cell key={`${item.id}-${column.propertyName}`} item={item} column={column} />)}
            </TableRow>
          ))}
          {DefaultRows(defaultRows, items.length)}
        </TableBody>
      </table>
    );
  }

  return (
    <table styleName={styleNames} className={className} id={id}>
      {children}
    </table>
  );
}

Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.Row = TableRow;

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.node,
    propertyName: PropTypes.string,
    tamplate: PropTypes.func,
  })),
  defaultRows: PropTypes.number,
  hover: PropTypes.bool,
  id: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  orderBy: PropTypes.shape({
    propertyName: PropTypes.string,
    desc: PropTypes.bool,
  }),
  onClickItem: PropTypes.func,
  onOrderBy: PropTypes.func,
};

Table.defaultProps = {
  hover: true,
  className: '',
  id: '',
  columns: [],
  defaultRows: 4,
  items: [],
  orderBy: {},
};

export default Table;
