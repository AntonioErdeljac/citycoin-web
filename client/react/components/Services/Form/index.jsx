import PropTypes from 'prop-types';
import React from 'react';
import uniqid from 'uniqid';
import { Formik, withFormik } from 'formik';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

import schema from './schema';
import selectors from './selectors';

import { SubmitButton, Input, Button } from '../../common/components';

import actions from '../../../actions';

class ServicesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isNewService: true,
      serviceId: undefined,
      subscriptions: [{}],
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, getService } = this.props;

    if (id) {
      getService(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } }, getService } = this.props;
    const newId = get(nextProps, 'match.params.id');

    if (newId !== id && newId) {
      getService(newId);
    }

    this.setState({
      isNewService: !newId,
      serviceId: newId,
    });
  }

  componentWillUnmount() {
    const { clearServiceState } = this.props;

    clearServiceState();
  }

  handleSubmit = (values) => {
    const { createService, updateService } = this.props;
    const { serviceId } = this.state;

    if (serviceId) {
      return updateService(values, serviceId);
    }

    return createService(values);
  }

  render() {
    const { isSubmitting, hasFailedToSubmit, service, isLoading, hasFailedToLoad } = this.props;
    const { isNewService, subscriptions } = this.state;

    let content = <p>Loading...</p>;

    if (!hasFailedToLoad && !isLoading) {
      content = (
        <Formik
          initialValues={isEmpty(service) ? schema.initialValues() : schema.initialValues(service)}
          validationSchema={schema.validations}
          onSubmit={this.handleSubmit}
          render={formProps => (
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <div className="cc-content-title justify-content-between cc-box-shadow">
                <div className="d-flex">
                  <i className="fas fa-ticket-alt" />
                  <h1>{isEmpty(service) ? 'Nova usluga' : service.general.name}</h1>
                </div>
                <div>
                  <SubmitButton label={isNewService ? 'Spremi' : 'Uredi'} />
                </div>
              </div>
              <div className="cc-content-form cc-h-100">
                <h1>Osnovno</h1>
                <div className="row">
                  <Input
                    className="col-6"
                    {...formProps}
                    disabled={isSubmitting}
                    name="general.name"
                    placeholder="labels.name"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <h1>Tvrtka</h1>
                <div className="row mt-3">
                  <Input
                    className="col-6"
                    {...formProps}
                    name="company.name"
                    disabled={isSubmitting}
                    placeholder="labels.companyName"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                  <Input
                    className="col-6"
                    {...formProps}
                    name="company.nin"
                    disabled={isSubmitting}
                    placeholder="labels.companyNin"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <h1>Ostalo</h1>
                <div className="row mt-3">
                  <Input
                    className="col-6"
                    {...formProps}
                    name="type"
                    disabled={isSubmitting}
                    placeholder="labels.type"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <h1>Pretplate</h1>
                <div className="row mt-3">
                  {subscriptions.map((subscription, index) => (
                    <React.Fragment key={uniqid()}>
                      <Input
                        className="col-6"
                        {...formProps}
                        name={`subscriptions[${index}].description`}
                        disabled={isSubmitting}
                        placeholder="labels.subscriptionDescription"
                        hasFailedToSubmit={hasFailedToSubmit}
                      />
                      <Input
                        className="col-6"
                        {...formProps}
                        name={`subscriptions[${index}].price`}
                        disabled={isSubmitting}
                        placeholder="labels.subscriptionPrice"
                        hasFailedToSubmit={hasFailedToSubmit}
                      />
                      <Input
                        className="col-6"
                        {...formProps}
                        name={`subscriptions[${index}].duration`}
                        disabled={isSubmitting}
                        placeholder="labels.subscriptionDuration"
                        hasFailedToSubmit={hasFailedToSubmit}
                      />
                      <Input
                        className="col-6"
                        {...formProps}
                        name={`subscriptions[${index}].durationUnit`}
                        disabled={isSubmitting}
                        placeholder="labels.subscriptionDurationUnit"
                        hasFailedToSubmit={hasFailedToSubmit}
                      />
                      <div className="cc-form-divider" />
                    </React.Fragment>
                  ))}
                </div>
                <div className="row">
                  <div className="col-4">
                    <Button type="button" label="Dodaj pretplatu" onClick={() => this.setState({ subscriptions: subscriptions.concat({}) })} />
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      );
    }

    return (
      <React.Fragment>
        <div className="container cc-content-inner px-0">
          {content}
        </div>
      </React.Fragment>
    );
  }
}

ServicesForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  updateService: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  getService: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  service: PropTypes.shape({}).isRequired,
  clearServiceState: PropTypes.func.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.service,
  },
)(withFormik({ enableReinitialize: true })(ServicesForm));
