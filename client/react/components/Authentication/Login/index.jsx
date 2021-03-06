import PropTypes from 'prop-types';
import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import schema from './schema';
import selectors from './selectors';

import { Input, SubmitButton } from '../../common/components';

import actions from '../../../actions';

import { paths } from '../../../../../common/constants';
import { _t } from '../../../../../common/i18n';

class Login extends React.Component {
  handleSubmit = (values) => {
    const { login } = this.props;

    login(values, { isBusiness: true });
  };

  purgeForm = () => {
    const { clearAuthenticationState } = this.props;

    clearAuthenticationState();
  }

  logout = () => {
    window.location = paths.client.LOGOUT;
  }

  redirect = () => {
    window.location = paths.client.CITIES;
  }

  render() {
    const { isSubmitting, hasFailedToSubmit, user } = this.props;

    let content = (
      <Formik
        initialValues={schema.initialValues}
        validationSchema={schema.validations}
        onSubmit={this.handleSubmit}
        render={formProps => (
          <div className="col-6 text-center cc-login-inner">
            <h1>Prijava</h1>
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <Input
                {...formProps}
                disabled={isSubmitting}
                name="email"
                type="email"
                placeholder="labels.email"
                hasFailedToSubmit={hasFailedToSubmit}
              />
              <Input
                {...formProps}
                type="password"
                name="password"
                disabled={isSubmitting}
                placeholder="labels.password"
                hasFailedToSubmit={hasFailedToSubmit}
              />
              <SubmitButton isSubmitting={isSubmitting} label="labels.submit" />
              <Link to={paths.client.REGISTER} className="cc-text-button">{_t('labels.needAccount')}</Link>
            </form>
          </div>
        )}
      />
    );

    if (!isEmpty(user)) {
      content = (
        <div className="col-6 cc-login-user cc-login-inner">
          <img src={user.personal.imageUrl || paths.api.v1.STATIC_USER_PLACEHOLDER} />
          <p>{user.personal.businessName}</p>
          <SubmitButton onClick={this.redirect} label="labels.submit" />
          <button onClick={this.logout} type="button" className="cc-text-button">{_t('labels.logout')}</button>
        </div>
      );
    }

    return (
      <div className="container-fluid cc-h-100">
        <div className="row cc-h-100">
          <div className="col-6 cc-login-big">
            <h1>CityCoin</h1>
          </div>
          <div className="col-6 cc-h-100 cc-login-form">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  clearAuthenticationState: PropTypes.func.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default connect(
  selectors,
  {
    ...actions.authentication,
  },
)(Login);
