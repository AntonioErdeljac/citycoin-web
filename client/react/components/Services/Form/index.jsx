import PropTypes from 'prop-types';
import cn from 'classnames';
import React from 'react';
import { Formik, FieldArray } from 'formik';
import { connect } from 'react-redux';
import posed, { PoseGroup } from 'react-pose';
import { isEmpty, get } from 'lodash';
import ReactModal from 'react-modal';

import schema from './schema';
import selectors from './selectors';

import { SubmitButton, Input, Button, Select, Loading } from '../../common/components';

import actions from '../../../actions';

import { servicesIcons, paths } from '../../../../../common/constants';

const Box = posed.div({
  enter: { opacity: 1, y: '0%', delay: ({ i }) => (i * 50) },
  exit: { opacity: 0, y: '-100%' },
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
  hidden: { opacity: 0, y: '-100%' },
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
    const { match: { params: { id } }, getService } = this.props;

    if (id) {
      getService(id);
    }

    this.setState({
      hasFormLoaded: true,
    });
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
    const { clearServiceState } = this.props;

    clearServiceState();
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
    const { isSubmitting, hasFailedToSubmit, service, isLoading, hasFailedToLoad, servicesTypesOptions, subscriptionsDurationUnitTypesOptions } = this.props;
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
                <div className="d-flex">
                  <i className={`fas fa-${servicesIcons[service.type] ? servicesIcons[service.type].icon : 'ticket-alt'}`} />
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
                <div className="mt-3">
                  <FieldArray
                    name="subscriptions"
                    render={arrayHelpers => (
                      <React.Fragment>
                        <PoseGroup animateOnMount={false}>
                          {formProps.values.subscriptions.map((subscription, index) => (
                            <Box className={cn('row', { 'pt-5': index !== 0 })} style={{ position: 'relative' }} key={index} i={index}>
                              {index !== 0 && <i onClick={() => arrayHelpers.remove(index)} className="fas fa-times" style={{ position: 'absolute', top: 0, right: 10 }} />}
                              <React.Fragment>
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
                                <Select
                                  options={subscriptionsDurationUnitTypesOptions}
                                  className="col-6"
                                  {...formProps}
                                  name={`subscriptions[${index}].durationUnit`}
                                  disabled={isSubmitting}
                                  placeholder="labels.subscriptionDurationUnit"
                                  hasFailedToSubmit={hasFailedToSubmit}
                                />
                                {index + 1 !== formProps.values.subscriptions.length && <div className="cc-form-divider" />}
                              </React.Fragment>
                            </Box>
                          ))}
                        </PoseGroup>
                        <div className="row">
                          <div className="col-4 mt-3">
                            <Button
                              type="button"
                              label="Dodaj pretplatu"
                              onClick={() => arrayHelpers.push({
                                description: '',
                                duration: '',
                                durationUnit: '',
                                price: '',
                              })}
                            />
                          </div>
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
  createService: PropTypes.func.isRequired,
  getService: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeService: PropTypes.func.isRequired,
  servicesTypesOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subscriptionsDurationUnitTypesOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
  },
)(ServicesForm);
