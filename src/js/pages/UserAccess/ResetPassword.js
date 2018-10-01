import React, { Component } from 'react';
import { reduxForm, Form, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Helmet, Title, TextField, Button, ErrorMessage } from '@/components';

import { Page } from './components';
import './style.scss';
import { validateForm } from './validations/resetPassword';

@reduxForm({ form: 'resetPassword', validate: validateForm })
class ResetPasswordPage extends Component {
  static propTypes = {
    recoveryState: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
      success: PropTypes.bool,
    }),
    requestPasswordRecovery: PropTypes.func,
    resetPassword: PropTypes.func,
    resetState: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.shape({
        message: PropTypes.string,
      }),
      success: PropTypes.bool,
      isValidToken: PropTypes.bool,
    }),
    validatePasswordToken: PropTypes.func,
  };

  state = {
    loading: false,
    errors: null,
    success: false,
    isValidToken: true,
  };

  componentWillMount = () => {
    const { match: { params }, validatePasswordToken } = this.props;

    if (validatePasswordToken) {
      validatePasswordToken(params.token)
        .then(() => {
          this.setState({ isValidToken: true });
        })
        .catch(({ graphQLErrors }) => {
          const [errors] = (graphQLErrors || []);
          this.setState({
            errors,
            isValidToken: false,
          });
        });
    }
  };

  onSubmit = values => {
    const { match: { params }, resetPassword } = this.props;

    resetPassword({ token: params.token, ...values })
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch(({ graphQLErrors }) => {
        const [errors] = (graphQLErrors || []);
        this.setState({
          errors,
          loading: false,
        });
      });
  };

  onSubmitRecovery = values => {
    const { requestPasswordRecovery } = this.props;

    this.setState({ loading: true, errors: null });

    requestPasswordRecovery(values)
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch(({ graphQLErrors }) => {
        const [errors] = (graphQLErrors || []);
        this.setState({
          errors,
          loading: false,
        });
      });
  };

  render() {
    const { valid, handleSubmit, recoveryState, invalid } = this.props;
    const { success, loading, errors, isValidToken } = this.state;

    return (
      <Page id="reset-password-page" styleName="reset-password-page">
        <Helmet>
          <title>Crea tu contraseña</title>
        </Helmet>

        {isValidToken && (
          <div styleName="form">
            <div className="row">
              {!success && <Title color="primary">Crea tu contraseña</Title>}

              {success && (
                <div>
                  <div className="row">
                    <p id="succesful-update">
                      ¡Enhorabuena! Ya puedes utilizar regiztra; solo da click en Iniciar Sesión.
                      Recuerda que tu usuario es tu correo electrónico.
                    </p>
                  </div>
                  <div className="row" styleName="success-bttn">
                    <Link to="/login">
                      <Button id="button-login" color="success" type="button">
                        <span styleName="button-login-text">Iniciar Sesión</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {!success && (
              <div className="row">
                <Form method="post" onSubmit={handleSubmit(this.onSubmit)}>
                  {errors && <ErrorMessage id="error-message" type="span" error={errors} />}

                  <div className="row">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      label="Contraseña"
                      errorText="Contraseña inválida."
                      component={TextField}
                    />
                  </div>

                  <div className="row">
                    <Field
                      id="confirmation_password"
                      name="confirmation_password"
                      type="password"
                      label="Confirmar contraseña"
                      errorText="Confirmación no coincide con la nueva contraseña."
                      maxLength="50"
                      component={TextField}
                    />
                  </div>

                  <div className="row">
                    <Button
                      color="success"
                      type="submit"
                      spinner={loading}
                      disabled={invalid || loading}
                    >
                      Crear contraseña
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        )}

        {!isValidToken && (
          <div className="row">
            {!success ? (
              <div id="error-msg-tk" className="row">
                <Title color="primary">¡Lo sentimos! Tu link ha expirado</Title>
                <p>Ingresa tu correo para enviarte un nuevo link</p>
              </div>
            ) : (
              <div styleName="input-success-message-reset">
                <p id="success-message">Se envió un link con instrucciones para resetear tu contraseña</p>
              </div>
            )}

            <Form method="post" onSubmit={handleSubmit(this.onSubmitRecovery)}>
              {errors && <ErrorMessage id="error-message" type="span" error={errors} />}

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
                <Button
                  color="success"
                  type="submit"
                  spinner={recoveryState.loading}
                  disabled={!valid || recoveryState.loading}
                >
                  Recuperar Contraseña
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
        )}
      </Page>
    );
  }
}

export default ResetPasswordPage;
