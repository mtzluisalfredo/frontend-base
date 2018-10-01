import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { reduxForm, Form, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Helmet, Title, TextField, Button, ErrorMessage } from '@/components';

import { Page } from './components';
import { validateForm } from './validations/userAccess';
import * as mutations from './graphql/mutations';
import './style.scss';

@graphql(mutations.recoverPassword, { name: 'recoverPassword' })
@reduxForm({ form: 'recovery', validate: validateForm })
class RecoveryPage extends Component {
  static propTypes = {
    recoverPassword: PropTypes.func,
  };

  state = {
    loading: false,
    errors: null,
    success: false,
  };

  onSubmit = values => {
    const { recoverPassword, reset } = this.props;

    this.setState({ loading: true, errors: null });

    recoverPassword(values)
      .then(() => {
        this.setState({ loading: false, success: true });
        reset();
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
    const { handleSubmit, invalid } = this.props;
    const { loading, errors, success } = this.state;

    return (
      <Page id="recover-password-page" styleName="recover-password-page">
        <Helmet>
          <title>Recuperar contraseña</title>
        </Helmet>

        <div styleName="form">
          {!success && <Title color="primary">¿Olvidaste tu contraseña?</Title>}

          {errors && errors.code === 503 ? (
            <ErrorMessage id="error-message" type="span" error={{ code: 703 }} />
          ) : (
            <ErrorMessage id="error-message" type="span" error={errors} />
          )}

          {success && (
            <div>
              <div className="row">
                <p id="success-message">
                  ¡Casi listo! Te hemos enviado un correo con las instrucciones para recuperar tu contraseña
                </p>
              </div>
            </div>
          )}

          {!success && (
            <p>Indícanos tu correo electrónico registrado y te enviaremos instrucciones de cómo recuperarla</p>
          )}

          <Form method="post" onSubmit={handleSubmit(this.onSubmit)}>
            {!success && (
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
            )}

            <div className="row">
              {!success && (
                <Button
                  id="button-recovery"
                  color="success"
                  type="submit"
                  spinner={loading}
                  disabled={invalid || loading}
                >
                  Recuperar Contraseña
                </Button>
              )}
            </div>
          </Form>

          {success && (
            <Link to="/login">
              <Button id="button-login" color="success" type="button" spinner={loading} disabled={loading}>
                <span styleName="button-login-text">Ir a Inicio de Sesión</span>
              </Button>
            </Link>
          )}
        </div>
      </Page>
    );
  }
}

export default RecoveryPage;
