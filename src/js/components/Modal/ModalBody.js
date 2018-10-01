import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function ModalBody(props) {
  const { className, children } = props;

  return (
    <section styleName="modal-body" className={className}>
      {children}
    </section>
  );
}

ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ModalBody;
