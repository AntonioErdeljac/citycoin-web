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

class Register extends React.Component {
  handleSubmit = (values) => {
    const { register } = this.props;

    register(values);
  };

  purgeForm = () => {
    const { clearAuthenticationState } = this.props;

    clearAuthenticationState();
  }

  logout = () => {
    window.location = paths.client.LOGOUT;
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
            <h1>Registracija</h1>
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <Input
                {...formProps}
                disabled={isSubmitting}
                name="personal.businessName"
                placeholder="labels.businessName"
                hasFailedToSubmit={hasFailedToSubmit}
              />
              <Input
                {...formProps}
                disabled={isSubmitting}
                name="personal.nin"
                placeholder="labels.nin"
                hasFailedToSubmit={hasFailedToSubmit}
              />
              <Input
                {...formProps}
                disabled={isSubmitting}
                name="contact.email"
                type="email"
                placeholder="labels.email"
                hasFailedToSubmit={hasFailedToSubmit}
              />
              <Input
                {...formProps}
                type="password"
                name="authentication.password"
                disabled={isSubmitting}
                placeholder="labels.password"
                hasFailedToSubmit={hasFailedToSubmit}
              />
              <SubmitButton isSubmitting={isSubmitting} label="labels.submit" />
              <Link to={paths.client.LOGIN} className="cc-text-button">{_t('labels.haveAccount')}</Link>
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
          <SubmitButton onClick={() => { window.location = paths.client.CITIES; }} label="labels.submit" />
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

Register.propTypes = {
  clearAuthenticationState: PropTypes.func.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default connect(
  selectors,
  {
    ...actions.authentication,
  },
)(Register);
