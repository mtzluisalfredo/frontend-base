import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

import Icon from '../Icon';

class PageSelector extends React.PureComponent {
  static propTypes = {
    currentPage: PropTypes.number,
    id: PropTypes.string,
    totalPages: PropTypes.number,
    onChangePage: PropTypes.func,
  };

  renderNumberButton(pageNumber) {
    const { currentPage, onChangePage } = this.props;
    const active = currentPage === pageNumber;
    const stylenames = classnames({ active });
    const id = active ? 'current-page' : '';

    return (
      <button
        id={id}
        key={pageNumber}
        styleName={stylenames}
        onClick={() => {
          if (pageNumber !== currentPage) {
            onChangePage(pageNumber);
          }
        }}
      >
        {pageNumber}
      </button>
    );
  }

  renderShiftBackButton() {
    const { currentPage, onChangePage } = this.props;
    const nextPage = currentPage - 3 > 0 ? currentPage - 3 : 1;

    return (
      <button key="shift-back" onClick={() => onChangePage(nextPage)}>
        ...
      </button>
    );
  }

  renderShiftForwardButton() {
    const { currentPage, totalPages, onChangePage } = this.props;
    const nextPage = currentPage + 3 <= totalPages ? currentPage + 3 : totalPages;

    return (
      <button key="shift-forward" onClick={() => onChangePage(nextPage)}>
        ...
      </button>
    );
  }

  renderPageButtons() {
    const { currentPage, totalPages } = this.props;
    const buttons = [];
    let firstPage = currentPage - 1 > 0 ? currentPage - 1 : currentPage;

    if (currentPage === totalPages && totalPages > 2) {
      firstPage = currentPage - 2;
    }

    for (let i = firstPage; i <= totalPages; i += 1) {
      if (buttons.length < 3) {
        buttons.push(this.renderNumberButton(i));
      }
    }

    if (currentPage - 1 > 1) {
      buttons.unshift(this.renderShiftBackButton());
    }
    if (currentPage + 1 < totalPages) {
      buttons.push(this.renderShiftForwardButton());
    }

    return buttons;
  }

  render() {
    const { id, currentPage, totalPages, onChangePage } = this.props;

    return (
      <div styleName="page-selector" id={id}>
        <button styleName="btn-prev" disabled={currentPage === 1} onClick={() => onChangePage(currentPage - 1)}>
          <Icon type="arrowLeftGray" width="20" height="20" />
        </button>

        {this.renderPageButtons()}

        <button
          styleName="btn-next"
          disabled={currentPage === totalPages}
          onClick={() => onChangePage(currentPage + 1)}
        >
          <Icon type="arrowRightGray" width="20" height="20" />
        </button>
      </div>
    );
  }
}

export default PageSelector;
