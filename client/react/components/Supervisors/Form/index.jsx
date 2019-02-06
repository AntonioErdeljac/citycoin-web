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

import { SubmitButton, Input, Select, Button, Loading } from '../../common/components';

import actions from '../../../actions';

import { paths } from '../../../../../common/constants';

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

class SupervisorsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isNewUser: true,
      userId: undefined,
      hasFormLoaded: false,
      showModal: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, getUser, getServices } = this.props;

    if (id) {
      getUser(id);
    }

    getServices({ isBusiness: true });
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } }, getUser, isLoading } = this.props;
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
      getUser(newId);
    }

    this.setState({
      isNewUser: !newId,
      userId: newId,
    });
  }

  componentWillUnmount() {
    const { clearUserState, clearServicesState } = this.props;

    clearUserState();
    clearServicesState();
  }

  handleTriggerDeleteModal = () => {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal,
    });
  }

  handleSubmit = (values) => {
    const { createUser, updateUser, history } = this.props;
    const { userId } = this.state;

    if (userId) {
      return updateUser(values, userId)
        .then(() => history.push(paths.client.SUPERVISORS));
    }

    return createUser(values)
      .then(() => history.push(paths.client.SUPERVISORS));
  }

  handleDeleteUser = () => {
    const { match: { params: { id } }, removeUser, history } = this.props;

    removeUser(id)
      .then(() => {
        this.handleTriggerDeleteModal();
        history.push(paths.client.SUPERVISORS);
      });
  }

  render() {
    const { isSubmitting, hasFailedToSubmit, user, isLoading, hasFailedToLoad, servicesOptions } = this.props;
    const { isNewUser, hasFormLoaded, showModal } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading) {
      content = (
        <Formik
          initialValues={isEmpty(user) ? schema.initialValues() : schema.initialValues(user)}
          validationSchema={isEmpty(user) ? schema.validations() : schema.validations(user)}
          onSubmit={this.handleSubmit}
          render={formProps => (
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <Title pose={hasFormLoaded ? 'visible' : 'hidden'} initialPose="hidden" className="cc-content-title justify-content-between cc-box-shadow">
                <div className="d-flex align-items-center">
                  <i className="fas fa-id-badge" />
                  <h1>{isEmpty(user) ? 'Novi Kontrolor' : `${user.personal.firstName} ${user.personal.lastName}`}</h1>
                </div>
                <div className="d-flex">
                  {!isNewUser && <Button onClick={this.handleTriggerDeleteModal} className="mx-3 cc-button-danger" disabled={isSubmitting} label="Izbriši" />}
                  <SubmitButton disabled={isSubmitting} label={isNewUser ? 'Stvori' : 'Spremi'} />
                </div>
              </Title>
              <FormBox initialPose="hidden" pose={hasFormLoaded ? 'visible' : 'hidden'} className="cc-content-form cc-h-100 mb-3">
                <h1>Osobno</h1>
                <div className="row">
                  <Input
                    className="col-6"
                    {...formProps}
                    disabled={isSubmitting}
                    name="personal.firstName"
                    placeholder="labels.firstName"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                  <Input
                    className="col-6"
                    {...formProps}
                    disabled={isSubmitting}
                    name="personal.lastName"
                    placeholder="labels.lastName"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                  <Input
                    className="col-6"
                    {...formProps}
                    disabled={isSubmitting}
                    name="personal.nin"
                    placeholder="labels.nin"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <div className="cc-form-divider" />
                <h1>Kontakt</h1>
                <div className="row">
                  <Input
                    className="col-6"
                    {...formProps}
                    disabled={isSubmitting}
                    name="contact.email"
                    placeholder="labels.email"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <div className="cc-form-divider" />
                <h1>Autentifikacija</h1>
                <div className="row">
                  <Input
                    className="col-6"
                    {...formProps}
                    name="authentication.password"
                    disabled={isSubmitting || !isNewUser}
                    placeholder="labels.password"
                    type="password"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <h1>Usluge</h1>
                <div className="row mt-3">
                  <FieldArray
                    name="services"
                    render={arrayHelpers => (
                      <React.Fragment>
                        <PoseGroup>
                          {formProps.values.services.map((service, index) => (
                            <Box i={index} key={index} initialPose="hidden" className={cn('col-12', { 'd-flex': index !== 0 })}>
                              <Select
                                options={servicesOptions}
                                {...formProps}
                                name={`services[${index}]`}
                                disabled={isSubmitting}
                                className={cn({ 'cc-content-form-array-field': index !== 0 })}
                                placeholder="labels.service"
                                hasFailedToSubmit={hasFailedToSubmit}
                              />
                              {index !== 0 && <Button className="cc-button-danger ml-3" label="Izbriši" onClick={() => arrayHelpers.remove(index)} />}
                            </Box>
                          ))}
                        </PoseGroup>
                        <div className="col-4 mt-3">
                          <Button
                            disabled={isSubmitting}
                            type="button"
                            label="Dodaj uslugu"
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
                <Button onClick={this.handleDeleteUser} disabled={isLoading} label="Da" />
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

SupervisorsForm.propTypes = {
  clearServicesState: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getServices: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeUser: PropTypes.func.isRequired,
  servicesOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateUser: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  clearUserState: PropTypes.func.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.user,
    ...actions.services,
  },
)(SupervisorsForm);
