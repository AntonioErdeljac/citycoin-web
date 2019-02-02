import PropTypes from 'prop-types';
import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import schema from './schema';
import selectors from './selectors';

import { Input, SubmitButton } from '../../common/components';

import actions from '../../../actions';

class Login extends React.Component {
  handleSubmit = (values) => {
    const { login } = this.props;

    login(values);
  };

  render() {
    const { isSubmitting, hasFailedToSubmit } = this.props;

    return (
      <div className="container-fluid cc-h-100">
        <div className="row cc-h-100">
          <div className="col-6 cc-login-big">
            <h1>CityCoin</h1>
          </div>
          <div className="col-6 cc-h-100 cc-login-form">
            <Formik
              initialValues={schema.initialValues}
              validationSchema={schema.validations}
              onSubmit={this.handleSubmit}
              render={formProps => (
                <div className="col-6 text-center">
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
                  </form>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.authentication,
  },
)(Login);
