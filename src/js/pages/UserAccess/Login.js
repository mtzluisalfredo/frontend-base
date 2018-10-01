import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { reduxForm, Form, Field, getFormValues } from 'redux-form';

import { Helmet, Title, TextField, Button, ErrorMessage, SuccessMessage } from '@/components';
import { session } from '@/store/actions';
import roleAccess from '@/pages/App/roleAccess';

import { Page } from './components';
import { validateForm } from './validations/userAccess';
import * as mutations from './graphql/mutations';
import './style.scss';

const mapStateToProps = state => {
  const { role, token } = state.session || {};
  const formValues = getFormValues('login')(state) || {};
  const authenticated = !!token;

  return {
    role,
    formValues,
    authenticated,
  };
};

@connect(mapStateToProps, { ...session })
@graphql(mutations.login, { name: 'login' })
@reduxForm({ form: 'login', validate: validateForm })
class LoginPage extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    formValues: PropTypes.shape({
      email: PropTypes.string,
    }),
    handleSubmit: PropTypes.func,
    login: PropTypes.func,
    resendToken: PropTypes.func,
    role: PropTypes.string,
    setUser: PropTypes.func,
    success: PropTypes.bool,
  };

  state = {
    loading: false,
    sendingToken: false,
    errors: null,
  }

  componentWillMount() {
    const { authenticated, history, role } = this.props;
    const { defaultPage } = roleAccess;

    if (authenticated) {
      history.push(defaultPage[role] || '/');
    }
  }

  onSubmit = ({ email, password }) => {
    const { history, login, setUser } = this.props;

    this.setState({ loading: true });

    login({ variables: { input: { email, password } } })
      .then(({ data: { session: { user, token } } }) => {
        const { defaultPage } = roleAccess;
        const { role } = user;

        setUser(user, token);
        history.push(defaultPage[role] || '/');
      })
      .catch(({ graphQLErrors }) => {
        const [errors] = (graphQLErrors || []);
        this.setState({
          errors,
          loading: false,
        });
      });
  };

  resendToken = () => {
    const { resendToken, formValues: { email } } = this.props;

    this.setState({ sendingToken: true });

    resendToken(email).then(() => {
      this.setState({ sendingToken: false });
    });
  };

  render() {
    const { success, handleSubmit } = this.props;
    const { errors, loading, sendingToken } = this.state;

    return (
      <Page id="login-page" styleName="login-page">
        <Helmet>
          <title>Iniciar sesión</title>
        </Helmet>

        <div styleName="form">
          <Title color="primary">Iniciar Sesión</Title>

          <Form method="post" onSubmit={handleSubmit(this.onSubmit)}>
            {errors && <ErrorMessage id="login-error" type="span" error={errors} />}

            {errors &&
              errors.code === 104 && (
                <Button id="btn-resend-token" className="btn-link" onClick={this.resendToken} spinner={sendingToken}>
                  Reenviar mensaje de verificación
                </Button>
              )}

            {success && (
              <SuccessMessage
                id="resend-token-success"
                message="Ahora revisa la bandeja de tu correo y verifica tu cuenta"
              />
            )}

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

            <div styleName="password">
              <label htmlFor="password">Contraseña</label>
              <div id="forgot-password" styleName="forgot-password">
                <Link to="/recover-password">Olvidé mi contraseña</Link>
              </div>
            </div>
            <div className="row">
              <Field
                id="password"
                name="password"
                type="password"
                errorText="Contraseña inválida."
                component={TextField}
              />
            </div>
            <div className="row">
              <Button id="button-login" color="success" type="submit" disabled={loading} spinner={loading}>
                Iniciar Sesión
              </Button>
            </div>
          </Form>

          <div id="sign-up" styleName="link">
            <p>¿No tienes una cuenta? <Link to="/sign-up">¡Regiztrate aquí!</Link></p>
            <div styleName="privacy">
              <a href="/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">
                <span>Política de Privacidad y Términos de Uso.</span>
              </a>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default LoginPage;
