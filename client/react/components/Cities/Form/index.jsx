import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Formik, withFormik } from 'formik';
import { isEmpty, get } from 'lodash';

import schema from './schema';
import selectors from './selectors';

import { SubmitButton, Input } from '../../common/components';

import actions from '../../../actions';

class CitiesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isNewCity: true,
      cityId: undefined,
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, getCity } = this.props;

    if (id) {
      getCity(id);
    }
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
    const { clearCityState } = this.props;

    clearCityState();
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
    const { isSubmitting, hasFailedToSubmit, city, isLoading, hasFailedToLoad } = this.props;
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
                    name="info.iata"
                    disabled={isSubmitting}
                    placeholder="labels.iata"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <div className="row mt-3">
                  <Input
                    className="col-6"
                    {...formProps}
                    name="info.countryCode"
                    disabled={isSubmitting}
                    placeholder="labels.countryCode"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                  <Input
                    className="col-6"
                    {...formProps}
                    name="general.status"
                    disabled={isSubmitting}
                    placeholder="labels.status"
                    hasFailedToSubmit={hasFailedToSubmit}
                  />
                </div>
                <div className="row mt-3">
                  <Input
                    className="col-6"
                    {...formProps}
                    name="services"
                    disabled={isSubmitting}
                    placeholder="labels.service"
                    hasFailedToSubmit={hasFailedToSubmit}
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
  isLoading: PropTypes.bool.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  updateCity: PropTypes.func.isRequired,
  createCity: PropTypes.func.isRequired,
  hasFailedToSubmit: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  getCity: PropTypes.func.isRequired,
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
  },
)(withFormik({ enableReinitialize: true })(CitiesForm));
