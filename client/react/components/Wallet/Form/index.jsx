import Geosuggest from 'react-geosuggest';
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

import { _t } from '../../../../../common/i18n';
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

class CitiesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isNewCity: true,
      cityId: undefined,
      hasFormLoaded: false,
      showModal: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, getCity, getServices } = this.props;

    if (id) {
      getCity(id);
    }

    getServices({ isBusiness: true });
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } }, getCity, isLoading } = this.props;
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
      getCity(newId);
    }

    this.setState({
      isNewCity: !newId,
      cityId: newId,
    });
  }

  componentWillUnmount() {
    const { clearCityState, clearServicesState } = this.props;

    clearCityState();
    clearServicesState();
  }

  handleTriggerDeleteModal = () => {
    const { showModal } = this.state;

    this.setState({
      showModal: !showModal,
    });
  }

  handleSubmit = (values) => {
    const { createCity, updateCity, history } = this.props;
    const { cityId } = this.state;

    if (cityId) {
      return updateCity(values, cityId)
        .then(() => history.push(paths.client.CITIES));
    }

    return createCity(values)
      .then(() => history.push(paths.client.CITIES));
  }

  handleDeleteCity = () => {
    const { match: { params: { id } }, removeCity, history } = this.props;

    removeCity(id)
      .then(() => {
        this.handleTriggerDeleteModal();
        history.push(paths.client.CITIES);
      });
  }

  render() {
    const { isSubmitting, hasFailedToSubmit, city, isLoading, hasFailedToLoad, countryCodeOptions, servicesOptions } = this.props;
    const { isNewCity, hasFormLoaded, showModal } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading) {
      content = (
        <Formik
          initialValues={isEmpty(city) ? schema.initialValues() : schema.initialValues(city)}
          validationSchema={schema.validations}
          onSubmit={this.handleSubmit}
          render={formProps => (
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <Title pose={hasFormLoaded ? 'visible' : 'hidden'} initialPose="hidden" className="cc-content-title justify-content-between cc-box-shadow">
                <div className="d-flex align-items-center">
                  <i className="fas fa-city" />
                  <h1>{isEmpty(city) ? 'Novi Grad' : city.general.name}</h1>
                </div>
                <div className="d-flex">
                  {!isNewCity && <Button onClick={this.handleTriggerDeleteModal} className="mx-3 cc-button-danger" disabled={isSubmitting} label="Izbriši" />}
                  <SubmitButton disabled={isSubmitting} label={isNewCity ? 'Stvori' : 'Spremi'} />
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
                </div>
                <div className="cc-form-divider" />
                <h1>Lokacija</h1>
                <div className="row">
                  <Geosuggest
                    disabled={isSubmitting}
                    className="col-6"
                    inputClassName={cn('form-control form-control-lg', { 'cc-error': get(formProps.errors, 'location.coordinates') && get(formProps.touched, 'location.coordinates') })}
                    onSuggestSelect={(value) => {
                      if (value) {
                        formProps.setFieldValue('location.coordinates', [value.location.lng, value.location.lat]);
                        formProps.setFieldValue('location.locationLabel', value.label);
                      }
                    }}
                    initialValue={get(formProps.values, 'location.locationLabel', undefined)}
                    onChange={() => formProps.setFieldValue('location.coordinates', [undefined, undefined])}
                    onBlur={() => formProps.setFieldTouched('location.coordinates')}
                    placeholder={_t('labels.location')}
                  />
                </div>
                <div className="cc-form-divider" />
                <h1>Informacije</h1>
                <div className="row">
                  <Input
                    className="col-6"
                    {...formProps}
                    name="info.iata"
                    disabled={isSubmitting}
                    placeholder="labels.iata"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                  <Select
                    options={countryCodeOptions}
                    className="col-6"
                    {...formProps}
                    name="info.countryCode"
                    disabled={isSubmitting}
                    placeholder="labels.countryCode"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <div className="cc-form-divider" />
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
                <Button onClick={this.handleDeleteCity} disabled={isLoading} label="Da" />
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

CitiesForm.propTypes = {
  clearServicesState: PropTypes.func.isRequired,
  countryCodeOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  createCity: PropTypes.func.isRequired,
  getCity: PropTypes.func.isRequired,
  getServices: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  removeCity: PropTypes.func.isRequired,
  servicesOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateCity: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  city: PropTypes.shape({}).isRequired,
  clearCityState: PropTypes.func.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.city,
    ...actions.services,
  },
)(CitiesForm);
