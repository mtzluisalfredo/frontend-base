import React, { Component } from 'react';
import { reduxForm, Form, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Helmet, Title, TextField, Button, ErrorMessage } from '../../components';

import { Page } from './components';
import './style.scss';
import { validateForm } from './validations/userAccess';

@reduxForm({ form: 'validate_account', validate: validateForm })
class ValidateAccountPage extends Component {
  static propTypes = {
    resendToken: PropTypes.func,
    validateTokenAccount: PropTypes.func,
  };

  state = {
    loading: false,
    errors: null,
    success: false,
  };

  componentWillMount = () => {
    const { match: { params: { token } }, validateTokenAccount } = this.props;

    if (validateTokenAccount) {
      validateTokenAccount(token);
    }
  };

  onSubmit = ({ email }) => {
    const { resendToken } = this.props;

    resendToken(email);
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    const { errors, success, loading } = this.state;

    return (
      <Page id="validate-account-page" styleName="validate-account-page">
        <Helmet>
          <title>Validar cuenta</title>
        </Helmet>

        <div styleName="form">
          {!errors && <Title color="primary">Validar cuenta</Title>}

          <Form method="post" onSubmit={handleSubmit(this.onSubmit)}>
            {errors && (
              <div id="error-msg-tk">
                <Title color="primary">¡Oops! Tu link ha expirado</Title>
                <p>Ingresa tu correo para enviarte un nuevo link</p>
              </div>
            )}
            {success && (
              <p id="success-message">
                Ahora revisa la bandeja de tu correo y verifica tu cuenta
              </p>
            )}
            {errors && <ErrorMessage id="error-message" error={errors} />}

            <div className="row">
              <Field
                id="email"
                name="email"
                type="email"
                label="Correo electrónico"
                errorText="Ingresa un formato de correo correcto."
                component={TextField}
              />
            </div>

            <div className="row">
              <Button id="button-resend" color="success" type="submit" spinner={loading} disabled={invalid || loading}>
                Reenviar correo
              </Button>
            </div>
          </Form>

          <div id="sign-in" styleName="link">
            Ir a{' '}
            <Link to="/login">
              <span>Inicio de Sesión</span>
            </Link>
          </div>
        </div>
      </Page>
    );
  }
}

export default ValidateAccountPage;
