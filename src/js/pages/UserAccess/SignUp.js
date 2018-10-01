import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { reduxForm, Form, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Helmet, Title, TextField, Button, ErrorMessage, Alert } from '../../components';

import { Page } from './components';
import { validateForm } from './validations/signUp';
import * as mutations from './graphql/mutations';
import './style.scss';

@graphql(mutations.createUser, { name: 'createUser' })
@reduxForm({ form: 'signup', validate: validateForm })
class SignUpPage extends Component {
  static propTypes = {
    createUser: PropTypes.func,
  };

  state = {
    loading: false,
    success: false,
    errors: null,
    textPassword: false,
  };

  onSubmit = values => {
    const { createUser } = this.props;
    const { firstName, lastName, email, password } = values;

    this.setState({ loading: true, errors: null });

    createUser({
      variables: {
        firstName,
        lastName,
        role: 'ADMIN',
        access: { email: { email, password } },
      },
    })
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

  showPassword = () => {
    const { textPassword } = this.state;
    this.setState({ textPassword: !textPassword });
  };

  render() {
    const { handleSubmit, invalid } = this.props;
    const { loading, textPassword, errors, success } = this.state;

    return (
      <Page id="sign-up-page" styleName="sign-up-page">
        <Helmet>
          <title>Registro</title>
        </Helmet>
        <div styleName="form">
          {!success && (
            <Fragment>
              <Title color="primary">Abre una cuenta</Title>
              <p>Ingresa los siguientes datos para crear tu cuenta.</p>

              <Form method="post" onSubmit={handleSubmit(this.onSubmit)} autoComplete="off">
                {errors && <ErrorMessage id="error-message" type="span" error={errors} />}

                <Field className="row" id="firstName" name="firstName" label="Nombre" component={TextField} />
                <Field className="row" id="lastName" name="lastName" label="Apellidos" component={TextField} />
                <Field
                  className="row"
                  id="email"
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  errorText="Ingresa un formato de correo correcto."
                  component={TextField}
                />
                <Field
                  className="row"
                  id="password"
                  name="password"
                  type={textPassword ? 'text' : 'password'}
                  label="Contraseña"
                  errorText="Contraseña inválida."
                  component={TextField}
                />
                <div styleName="privacy">
                  Al crear tu cuenta, aceptas nuestra{' '}
                  <a href="http://regiztra.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">
                    <span>Política de Privacidad y Términos de Uso.</span>
                  </a>
                </div>
                <div className="row">
                  <Button id="btn-create" color="success" type="submit" disabled={invalid || loading} spinner={loading}>
                    Crear Cuenta
                  </Button>
                </div>
              </Form>

              <div id="sign-in" styleName="link">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login">
                  Inicia Sesión
                </Link>
              </div>
            </Fragment>
          )}

          {success && (
            <div styleName="success-container">
              <div className="row">
                <Title color="primary" styleName="title">
                  Gracias por elegirnos.
                </Title>
                <p id="success-message">Te hemos enviado un correo con instrucciones para que comiences a usar la aplicación</p>
              </div>
              <div className="row">
                <Link to="/login">
                  <Button id="btn-create" color="success" type="submit" styleName="button">
                    Iniciar Sesión
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Page>
    );
  }
}

export default SignUpPage;
