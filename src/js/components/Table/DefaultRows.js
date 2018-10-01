import React from 'react';

import TableRow from './TableRow';

function DefaultRows(defaultRows, itemsSize) {
  const rowsToRender = itemsSize > defaultRows ? 0 : defaultRows - itemsSize;
  const rows = [];

  for (let i = 1; i <= rowsToRender; i += 1) {
    rows.push(<TableRow key={`defaultrow-${i}`} className="empty-row" />);
  }

  return rows;
}


export default DefaultRows;
