import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TableCell from './TableCell';

function Cell(props) {
  const { item, column, className } = props;
  const { propertyName, template } = column;
  const isTemplate = typeof template === 'function';
  const classes = classnames({
    [className]: !!className,
    [propertyName]: true,
  });
  const value = item[propertyName];

  return (
    <TableCell key={`${item.id}-${propertyName}`} className={classes}>
      <div>{isTemplate ? template(item) : value}</div>
    </TableCell>
  );
}

Cell.propTypes = {
  className: PropTypes.string,
  column: PropTypes.shape({
    label: PropTypes.node,
    propertyName: PropTypes.string,
    headerTemplate: PropTypes.func,
    template: PropTypes.func,
  }),
  item: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,
  }),
};

export default Cell;
