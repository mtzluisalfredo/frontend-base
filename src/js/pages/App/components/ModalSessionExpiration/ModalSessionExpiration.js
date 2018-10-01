import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './style.scss';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '../../../../components';


class ModalSessionExpiration extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    cancelText: 'Cancelar',
    submitText: 'Cambiar',
  };

  constructor(props) {
    super(props);

    this.state = {
      expirationDate: this.getExpirationDate(),
    };
  }

  componentWillMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getExpirationDate = () => {
    let expirationDate;

    if (localStorage) {
      expirationDate = localStorage.getItem('expiration_date');
    }

    return moment(moment(expirationDate).diff(moment())).format('mm:ss');
  }

  tick = () => {
    this.setState({
      expirationDate: this.getExpirationDate(),
    });
  }

  render() {
    const { onClose, onSubmit } = this.props;
    const { expirationDate } = this.state;
    const footer = (
      <div>
        <Button type="button" color="info" onClick={onSubmit}>
          Continuar
        </Button>
      </div>
    );

    return (
      <Modal
        id="modal-demo"
        styleName="modal-session-expiration"
        title="Expiración de Sesión"
        onClose={onClose}
        footer={footer}
      >
        <div styleName="modal-session-body">
          <p>Tu sesión se cerrará automaticamente en</p>
          <p className="expiration-date">{expirationDate} Minutos</p>
          <p>da clic en <b>Continuar</b> para mantener tu sesión.</p>
        </div>
      </Modal>
    );
  }
}

export default ModalSessionExpiration;
