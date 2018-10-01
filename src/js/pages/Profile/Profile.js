import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form, reset } from 'redux-form';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { Helmet, ErrorMessage, SuccessMessage, FormFooter, FormHeader, Icon, Button, TextField, Panel, PanelBody } from '@/components';

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as apollo from './apollo';
import { validateForm } from './validate';
import mapStateToProps from './mapStateToProps';
import './style.scss';

@connect(mapStateToProps, { })
@graphql(queries.tenantDetail, {
  name: 'tenantData',
  options: apollo.tenantDetailOptions,
  props: apollo.mapDetailTenantProps,
})
@graphql(mutations.updatePassword, { name: 'updatePassword' })
@graphql(mutations.updateTenant, { name: 'updateTenant' })
@reduxForm({ form: 'changePassword', validate: validateForm, enableReinitialize: true })
class UserProfile extends Component {
  static propTypes = {
    hideMenu: PropTypes.func,
    pristine: PropTypes.bool,
    updatePassword: PropTypes.func,
  };

  state = {
    loading: false,
    errors: null,
    success: false,
    showPasswordForm: false,
    changedLogo: false,
  };

  componentWillMount() {
    const { hideMenu } = this.props;
    hideMenu();
  }

  onClickShowPwd = () => {
    const { showPasswordForm } = this.state;
    this.setState({
      showPasswordForm: !showPasswordForm,
    });
  };

  onSubmit = (values, dispatch) => {
    const { updatePassword } = this.props;

    this.setState({ loading: true, errors: null });

    updatePassword({
      variables: {
        input: {
          new_password: values.new_password,
          old_password: values.current_password,
          confirmation_password: values.new_password, // TODO: Update the API not to receive confirmation_password
        },
      },
    })
      .then(() => {
        this.setState({ loading: false, errors: null, success: true, showPasswordForm: false, changedLogo: false });
        dispatch(reset('changePassword'));
      })
      .catch(e => {
        this.setState({ loading: false, errors: e.graphQLErrors[0], success: false });
      });
  };

  render() {
    const { handleSubmit, pristine, invalid } = this.props;
    const { errors, success, loading, showPasswordForm, changedLogo, textCurrentPassword, textNewPassword } = this.state;
    const invalidForm = (pristine && changedLogo === false) || invalid;

    return (
      <div id="profile-container" styleName="profile-container">
        <Helmet>
          <title>Perfil de Usuario</title>
        </Helmet>

        <Form method="post" onSubmit={handleSubmit(this.onSubmit)} autoComplete="off">
          <FormHeader title="Mi Perfil" invalidForm={invalidForm} loading={loading} />
          {errors && <ErrorMessage id="account-error" error={errors} />}
          {success && (
            <SuccessMessage id="account-success" type="alert" message="Se han actualizado tus datos correctamente" />
          )}

          <Panel id="account-info" title="Información de la cuenta">
            <PanelBody>
              <div className="row">
                <TextField id="email" name="email" className="col-4" labelText="Correo electrónico" disabled />
                <Button
                  id="show_password"
                  name="show_password"
                  className="col-4"
                  type="button"
                  color="primary-outline"
                  onClick={this.onClickShowPwd}
                >
                  Cambiar contraseña
                </Button>
              </div>

              {showPasswordForm && (
                <div id="form-change-pwd">
                  <TextField
                    id="current_password"
                    name="current_password"
                    className="row col-4"
                    type={textCurrentPassword ? 'text' : 'password'}
                    labelText="Contraseña actual"
                    rightIcon={<Icon type="view" onClick={this.showCurrentPassword} />}
                  />
                  <TextField
                    id="new_password"
                    name="new_password"
                    className="row col-4"
                    type={textNewPassword ? 'text' : 'password'}
                    labelText="Nueva contraseña"
                    rightIcon={<Icon type="view" onClick={this.showNewPassword} />}
                  />
                </div>
              )}
            </PanelBody>
          </Panel>
          <FormFooter invalidForm={invalidForm} loading={loading} />
        </Form>
      </div>
    );
  }
}

export default UserProfile;
