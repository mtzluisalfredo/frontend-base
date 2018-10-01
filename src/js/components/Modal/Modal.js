import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    closeOnESC: PropTypes.bool,
    focusInput: PropTypes.bool,
    footer: PropTypes.node,
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    closeOnESC: true,
  }

  componentDidMount() {
    const { modalContent } = this;
    const { focusInput, closeOnESC } = this.props;
    const scrollContainer = document.getElementById('scroll');
    const bodyClasses = scrollContainer ? scrollContainer.className : '';

    this.centerModal();

    if (focusInput) {
      const inputs = modalContent.querySelectorAll('input[type=text]') || [];
      if (inputs.length > 0) {
        inputs[0].focus();
      }
    }

    if (closeOnESC) {
      document.addEventListener('keydown', this.closeModal, true);
    }

    if (scrollContainer) {
      scrollContainer.className = `${bodyClasses} has-modal`;
    }
  }

  componentWillUnmount() {
    const { closeOnESC } = this.props;
    const scrollContainer = document.getElementById('scroll');
    const bodyClasses = scrollContainer ? scrollContainer.className : '';
    const regex = /has-modal/ig;

    if (closeOnESC) {
      document.removeEventListener('keydown', this.closeModal, true);
    }

    if (scrollContainer) {
      scrollContainer.className = bodyClasses.replace(regex, '');
    }
  }

  setModalContentRef = ele => {
    this.modalContent = ele;
  }

  setModalViewRef = ele => {
    this.modalView = ele;
  }

  closeModal = e => {
    const { onClose } = this.props;

    if (typeof onClose === 'function' && e.keyCode === 27) {
      onClose();
    }
  }

  centerModal = () => {
    const { modalContent, modalView } = this;

    if (modalContent && modalContent.offsetHeight > modalView.offsetHeight) {
      modalView.style.height = 'auto';
    } else if (modalContent) {
      modalView.style.height = '100%';
    }
  }

  render() {
    const { id, className, children, title, footer, onClose } = this.props;
    const isBody = children instanceof ModalBody;
    const isFooter = footer instanceof ModalFooter;
    const hasHeader = title || onClose;
    const styleNames = classnames({
      modal: true,
      'no-header': !hasHeader,
    });
    const modal =  (
      <div styleName={styleNames} className={className} id={id} role="dialog">
        <div styleName="modal-view" ref={this.setModalViewRef}>
          <div styleName="modal-content" role="contentinfo" ref={this.setModalContentRef}>
            {hasHeader && (
              <ModalHeader onClose={onClose}>
                {title && <h1>{title}</h1>}
              </ModalHeader>)
              }
            {!isBody && <ModalBody>{children}</ModalBody>}
            {isBody && children}

            {(!isFooter && footer) && <ModalFooter>{footer}</ModalFooter>}
            {isFooter && footer}
          </div>
        </div>
      </div>
    );

    if (!modalRoot) {
      return modal;
    }

    return createPortal(modal, modalRoot);
  }
}

export default Modal;
