import Geosuggest from 'react-geosuggest';
import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { Formik, withFormik, FieldArray } from 'formik';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';

import schema from './schema';
import selectors from './selectors';

import { SubmitButton, Input, Select, Button } from '../../common/components';

import actions from '../../../actions';

import { _t } from '../../../../../common/i18n';

class CitiesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isNewCity: true,
      cityId: undefined,
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, getCity, getServices } = this.props;

    if (id) {
      getCity(id);
    }

    getServices();
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { id } }, getCity } = this.props;
    const newId = get(nextProps, 'match.params.id');

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

  handleSubmit = (values) => {
    const { createCity, updateCity } = this.props;
    const { cityId } = this.state;

    if (cityId) {
      return updateCity(values, cityId);
    }

    return createCity(values);
  }

  render() {
    const { isSubmitting, hasFailedToSubmit, city, isLoading, hasFailedToLoad, countryCodeOptions, servicesOptions } = this.props;
    const { isNewCity } = this.state;

    let content = <p>Loading...</p>;

    if (!hasFailedToLoad && !isLoading) {
      content = (
        <Formik
          initialValues={isEmpty(city) ? schema.initialValues() : schema.initialValues(city)}
          validationSchema={schema.validations}
          onSubmit={this.handleSubmit}
          render={formProps => (
            <form autoComplete="off" onSubmit={formProps.handleSubmit}>
              <div className="cc-content-title justify-content-between cc-box-shadow">
                <div className="d-flex">
                  <i className="fas fa-city" />
                  <h1>{isEmpty(city) ? 'Novi Grad' : city.general.name}</h1>
                </div>
                <div>
                  <SubmitButton label={isNewCity ? 'Spremi' : 'Uredi'} />
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
                <h1>Lokacija</h1>
                <div className="row">
                  <Geosuggest
                    className="col-6"
                    inputClassName={cn('form-control form-control-lg', { 'cc-error': get(formProps.errors, 'location.coordinates') && get(formProps.touched, 'location.coordinates') })}
                    onSuggestSelect={(value) => {
                      if (value) {
                        formProps.setFieldValue('location.coordinates', [value.location.lng, value.location.lat]);
                      }
                    }}
                    onChange={() => formProps.setFieldValue('location.coordinates', [undefined, undefined])}
                    onBlur={() => formProps.setFieldTouched('location.coordinates')}
                    placeholder={_t('labels.location')}
                  />
                </div>
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
                <h1>Usluge</h1>
                <div className="row mt-3">
                  <FieldArray
                    name="services"
                    render={arrayHelpers => (
                      <React.Fragment>
                        {formProps.values.services.map((service, index) => (
                          <Select
                            key={index}
                            options={servicesOptions}
                            className="col-12"
                            {...formProps}
                            name={`services[${index}]`}
                            disabled={isSubmitting}
                            placeholder="labels.service"
                            hasFailedToSubmit={hasFailedToSubmit}
                          />
                        ))}
                        <div className="col-4 mt-3">
                          <Button
                            type="button"
                            label="Dodaj uslugu"
                            onClick={() => arrayHelpers.push(undefined)}
                          />
                        </div>
                      </React.Fragment>
                    )}
                  />
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
  servicesOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateCity: PropTypes.func.isRequired,
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
)(withFormik({ enableReinitialize: true })(CitiesForm));
