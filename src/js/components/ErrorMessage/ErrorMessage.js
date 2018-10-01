import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Alert from '../Alert';
import Button from '../Button';
import Icon from '../Icon';
import scrollTo from '../../lib/scrollTo';

import errorCodes from './errorCodes';
import './style.scss';

function Span({ className, children, id }) {
  return <p className={className} id={id}>{children}</p>;
}

class ErrorMessage extends Component {
  componentWillMount() {
    if (this.props.scrollTop) {
      scrollTo();
    }
  }

  render() {
    const { className, type, error, id, onClose, color } = this.props;
    const styleNames = classnames({
      'error-message': true,
      alert: type === 'alert',
    });
    let Wrapper = Span;

    if (!error) {
      return null;
    }

    let errorMessage = error.message || 'Error inesperado';

    if (type === 'alert') {
      Wrapper = Alert;
    }

    if (errorCodes[error.code]) {
      errorMessage = errorCodes[error.code];
    } else if (errorMessage.indexOf('GraphQL error') > -1) {
      errorMessage = 'Error inesperado';
    }

    return (
      <Wrapper id={id} styleName={styleNames} className={className} color={color}>
        {type === 'alert' && (
          <figure styleName="error-icon">
            <Icon type="attentionRed" width="20" height="20" />
          </figure>
        )}
        <span styleName="message">{errorMessage}</span>
        {type === 'alert' && onClose && (
          <div styleName="close">
            <Button id={`${id || 'error-message'}-dismiss-button`} color="unstyled" type="button" onClick={onClose}>
              <Icon type="arrowCloseGray" width="22" height="22" />
            </Button>
          </div>
        )}
      </Wrapper>
    );
  }
}

ErrorMessage.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(['span', 'alert']),
  error: PropTypes.shape({
    code: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    message: PropTypes.string,
  }),
  onClose: PropTypes.func,
  scrollTop: PropTypes.bool,
};

ErrorMessage.defaultProps = {
  type: 'alert',
  color: 'error',
};


export default ErrorMessage;
