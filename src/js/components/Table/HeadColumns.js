import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from '@/components';

import TableRow from './TableRow';
import TableCell from './TableCell';

import './style.scss';

function HeadColumns(props) {
  const { columns, orderBy, onOrderBy } = props;

  return (
    <TableRow styleName="custom-table-header">
      {columns.map(column => {
        const { headerTemplate, sortable } = column;
        const isSorted = orderBy.propertyName === column.propertyName;
        const isTemplate = typeof headerTemplate === 'function';
        const title = typeof column.label === 'string' ? column.label : '';
        const stylenames = classnames({
          sorted: isSorted,
          unsortable: sortable === false,
        });

        const onClick = sortable !== false ? () => onOrderBy(column.propertyName, !orderBy.desc) : undefined;
        const columnName = [
          (
            <button tabIndex="0" onClick={onClick} styleName={stylenames} title={title} key="link">
              {isTemplate ? headerTemplate(column) : <span>{column.label}</span>}
            </button>
          ),
          (sortable !== false) &&
            <span onKeyPress={() => false} tabIndex="0" role="button" styleName="arrows" key="sort" onClick={onClick}>
              {isSorted &&
                <Icon
                  styleName="sorted-arrow"
                  type={`arrow${orderBy.desc ? 'DownGray' : 'UpGray'}`}
                  width="10"
                  height="10"
                />
              }
              {!isSorted &&
                <Icon
                  styleName="unsorted-arrow"
                  type="arrowSortGray"
                  width="10"
                  height="10"
                />
              }
            </span>,
        ];

        return (
          <TableCell className={column.propertyName} key={column.propertyName}>
            {columnName}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

HeadColumns.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.node,
    propertyName: PropTypes.string,
  })),
  orderBy: PropTypes.shape({
    propertyName: PropTypes.string,
    desc: PropTypes.bool,
  }),
  onOrderBy: PropTypes.func,
};

export default HeadColumns;
