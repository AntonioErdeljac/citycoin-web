import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import posed from 'react-pose';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

import schema from './schema';
import selectors from './selectors';

import { SubmitButton, Input, Button, Loading, Select } from '../../common/components';

import actions from '../../../actions';

import { paths } from '../../../../../common/constants';

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

class SubscriptionsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isNewSubscription: true,
      subscriptionId: undefined,
      hasFormLoaded: false,
      showModal: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, getSubscription } = this.props;

    if (id) {
      getSubscription(id)
        .then(() => {
          this.setState({
            hasFormLoaded: true,
          });
        });
    } else {
      this.setState({
        hasFormLoaded: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } }, getSubscription, isLoading } = this.props;
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
      getSubscription(newId);
    }

    this.setState({
      isNewSubscription: !newId,
      subscriptionId: newId,
    });
  }

  componentWillUnmount() {
    const { clearSubscriptionState } = this.props;

    clearSubscriptionState();
  }

  handleTriggerDeleteModal = () => {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal,
    });
  }

  handleSubmit = (values) => {
    const { createSubscription, updateSubscription, history } = this.props;
    const { subscriptionId } = this.state;

    if (subscriptionId) {
      return updateSubscription(values, subscriptionId)
        .then(() => history.push(paths.client.SUBSCRIPTIONS));
    }

    return createSubscription(values)
      .then(() => history.push(paths.client.SUBSCRIPTIONS));
  }

  handleDeleteSubscription = () => {
    const { match: { params: { id } }, removeSubscription, history } = this.props;

    removeSubscription(id)
      .then(() => {
        this.handleTriggerDeleteModal();
        history.push(paths.client.SUBSCRIPTIONS);
      });
  }

  render() {
    const { isSubmitting, hasFailedToSubmit, subscription, isLoading, hasFailedToLoad, durationUnitTypesOptions } = this.props;
    const { isNewSubscription, hasFormLoaded, showModal } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading) {
      content = (
        <Formik
          initialValues={isEmpty(subscription) ? schema.initialValues() : schema.initialValues(subscription)}
          validationSchema={schema.validations}
          onSubmit={this.handleSubmit}
          render={formProps => (
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <Title pose={hasFormLoaded ? 'visible' : 'hidden'} initialPose="hidden" className="cc-content-title justify-content-between cc-box-shadow">
                <div className="d-flex align-items-center">
                  <i className="fas fa-ticket-alt" />
                  <h1>{isEmpty(subscription) ? 'Nova Pretplata' : subscription.general.name}</h1>
                </div>
                <div className="d-flex">
                  {!isNewSubscription && <Button onClick={this.handleTriggerDeleteModal} className="mx-3 cc-button-danger" disabled={isSubmitting} label="Izbriši" />}
                  <SubmitButton disabled={isSubmitting} label={isNewSubscription ? 'Stvori' : 'Spremi'} />
                </div>
              </Title>
              <FormBox initialPose="hidden" pose={hasFormLoaded ? 'visible' : 'hidden'} className="cc-content-form cc-h-100 mb-3">
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
                  <Input
                    className="col-6"
                    {...formProps}
                    disabled={isSubmitting}
                    name="general.price"
                    placeholder="labels.price"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                  <Input
                    className="col-6"
                    {...formProps}
                    disabled={isSubmitting}
                    name="general.duration"
                    placeholder="labels.duration"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                  <Select
                    className="col-6"
                    options={durationUnitTypesOptions}
                    {...formProps}
                    disabled={isSubmitting}
                    name="general.durationUnit"
                    placeholder="labels.durationUnit"
                    hasFailedToSubmit={hasFailedToSubmit}
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
                <Button onClick={this.handleDeleteSubscription} disabled={isLoading} label="Da" />
              </div>
              <div className="col-6">
                <Button disabled={isLoading} onClick={this.handleTriggerDeleteModal} label="Ne" />
              </div>
            </div>
          </div>
        </ReactModal>
        <div className="container cc-content-inner px-0">
          {content}
        </div>
      </React.Fragment>
    );
  }
}

SubscriptionsForm.propTypes = {
  createSubscription: PropTypes.func.isRequired,
  getSubscription: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeSubscription: PropTypes.func.isRequired,
  durationUnitTypesOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateSubscription: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  subscription: PropTypes.shape({}).isRequired,
  clearSubscriptionState: PropTypes.func.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.subscription,
  },
)(SubscriptionsForm);
