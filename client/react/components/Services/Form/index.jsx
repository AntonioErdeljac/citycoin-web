import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import cn from 'classnames';
import posed, { PoseGroup } from 'react-pose';
import { Formik, FieldArray } from 'formik';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

import schema from './schema';
import selectors from './selectors';

import { SubmitButton, Input, Button, Select, Loading } from '../../common/components';

import actions from '../../../actions';

import { servicesIcons, paths } from '../../../../../common/constants';

const Box = posed.div({
  enter: { opacity: 1, y: '0%', delay: ({ i }) => (i * 50) },
  exit: { opacity: 0, y: '-50%' },
});

const FormBox = posed.div({
  visible: { opacity: 1, y: '0%', delay: 300 },
  hidden: { opacity: 0, y: '-20%' },
});

const Title = posed.div({
  visible: {
    opacity: 1,
    y: '0%',
    delay: 200,
  },
  hidden: { opacity: 0, y: '-50%' },
});

class ServicesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isNewService: true,
      serviceId: undefined,
      hasFormLoaded: false,
      showModal: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, getService, getSubscriptions } = this.props;

    if (id) {
      getService(id);
    }

    getSubscriptions({ isBusiness: true });
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } }, getService, isLoading } = this.props;
    const newId = get(nextProps, 'match.params.id');

    if (nextProps.isLoading) {
      this.setState({
        hasFormLoaded: false,
      });
    }

    if ((!nextProps.isLoading && !nextProps.hasFailedToLoad) && (isLoading || !id)) {
      this.setState({
        hasFormLoaded: true,
      });
    }

    if (newId !== id && newId) {
      getService(newId);
    }

    this.setState({
      isNewService: !newId,
      serviceId: newId,
    });
  }

  componentWillUnmount() {
    const { clearServiceState, clearSubscriptionsState } = this.props;

    clearServiceState();
    clearSubscriptionsState();
  }

  handleSubmit = (values) => {
    const { createService, updateService, history } = this.props;
    const { serviceId } = this.state;

    if (serviceId) {
      return updateService(values, serviceId)
        .then(() => history.push(paths.client.SERVICES));
    }

    return createService(values)
      .then(() => history.push(paths.client.SERVICES));
  }

  handleTriggerDeleteModal = () => {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal,
    });
  }

  handleDeleteService = () => {
    const { match: { params: { id } }, removeService, history } = this.props;

    removeService(id)
      .then(() => {
        this.handleTriggerDeleteModal();
        history.push(paths.client.SERVICES);
      });
  }

  render() {
    const { isSubmitting, hasFailedToSubmit, service, isLoading, hasFailedToLoad, servicesTypesOptions, subscriptionsOptions } = this.props;
    const { isNewService, hasFormLoaded, showModal } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading) {
      content = (
        <Formik
          initialValues={isEmpty(service) ? schema.initialValues() : schema.initialValues(service)}
          validationSchema={schema.validations}
          onSubmit={this.handleSubmit}
          render={formProps => (
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <Title initialPose="hidden" pose={hasFormLoaded ? 'visible' : 'hidden'} className="cc-content-title justify-content-between cc-box-shadow">
                <div className="d-flex align-items-center">
                  <i className={`fas fa-${servicesIcons[service.type] ? servicesIcons[service.type].icon : 'hand-holding-usd'}`} />
                  <h1>{isEmpty(service) ? 'Nova usluga' : service.general.name}</h1>
                </div>
                <div className="d-flex">
                  {!isNewService && <Button onClick={this.handleTriggerDeleteModal} className="mx-3 cc-button-danger" disabled={isSubmitting} label="Izbriši" />}
                  <SubmitButton disabled={isSubmitting} label={isNewService ? 'Stvori' : 'Spremi'} />
                </div>
              </Title>
              <FormBox pose={hasFormLoaded ? 'visible' : 'hidden'} initialPose="hidden" className="cc-content-form cc-h-100">
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
                <div className="cc-form-divider" />
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
                <div className="cc-form-divider" />
                <h1>Ostalo</h1>
                <div className="row mt-3">
                  <Select
                    options={servicesTypesOptions}
                    className="col-6"
                    {...formProps}
                    name="type"
                    disabled={isSubmitting}
                    placeholder="labels.type"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <div className="cc-form-divider" />
                <h1>Pretplate</h1>
                <div className="row mt-3">
                  <FieldArray
                    name="subscriptions"
                    render={arrayHelpers => (
                      <React.Fragment>
                        <PoseGroup>
                          {formProps.values.subscriptions.map((subscription, index) => (
                            <Box i={index} key={index} initialPose="hidden" className={cn('col-12', { 'd-flex': index !== 0 })}>
                              <Select
                                options={subscriptionsOptions}
                                {...formProps}
                                name={`subscriptions[${index}]`}
                                disabled={isSubmitting}
                                className={cn({ 'cc-content-form-array-field': index !== 0 })}
                                placeholder="labels.subscription"
                                hasFailedToSubmit={hasFailedToSubmit}
                              />
                              {index !== 0 && <Button className="cc-button-danger ml-3" label="Izbriši" onClick={() => arrayHelpers.remove(index)} />}
                            </Box>
                          ))}
                        </PoseGroup>
                        <div className="col-4 mt-3">
                          <Button
                            type="button"
                            label="Dodaj pretplatu"
                            onClick={() => arrayHelpers.push(undefined)}
                          />
                        </div>
                      </React.Fragment>
                    )}
                  />
                </div>
              </FormBox>
            </form>
          )}
        />
      );
    }

    return (
      <React.Fragment>
        <div className="container cc-content-inner px-0">
          <ReactModal
            ariaHideApp={false}
            isOpen={showModal}
            closeTimeoutMS={200}
            className="cc-modal"
            onRequestClose={this.handleTriggerDeleteModal}
            overlayClassName="cc-modal-overlay"
          >
            <p>Jeste li sigurni?</p>
            <div className="container-fluid">
              <div className="row mt-3">
                <div className="col-6">
                  <Button onClick={this.handleDeleteService} disabled={isLoading} label="Da" />
                </div>
                <div className="col-6">
                  <Button disabled={isLoading} onClick={this.handleTriggerDeleteModal} label="Ne" />
                </div>
              </div>
            </div>
          </ReactModal>
          {content}
        </div>
      </React.Fragment>
    );
  }
}

ServicesForm.propTypes = {
  getSubscriptions: PropTypes.func.isRequired,
  clearSubscriptionsState: PropTypes.func.isRequired,
  createService: PropTypes.func.isRequired,
  getService: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeService: PropTypes.func.isRequired,
  servicesTypesOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subscriptionsOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateService: PropTypes.func.isRequired,
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
    ...actions.subscriptions,
  },
)(ServicesForm);
