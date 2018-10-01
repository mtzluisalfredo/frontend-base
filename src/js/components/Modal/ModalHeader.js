import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { Icon } from '../';


function ModalHeader(props) {
  const { className, children, onClose } = props;

  return (
    <header styleName="modal-header" className={className}>
      {onClose && (
        <button styleName="close" id="cross-button" onClick={onClose}>
          <Icon type="arrowCloseGray" width="14" height="14" />
        </button>
      )}

      {children}
    </header>
  );
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export default ModalHeader;
