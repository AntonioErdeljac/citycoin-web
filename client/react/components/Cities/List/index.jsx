import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import selectors from './selectors';

import { SubmitButton } from '../../common/components';

import actions from '../../../actions';

class Cities extends React.Component {
  componentDidMount() {
    const { getCities } = this.props;

    getCities({ isBusiness: true });
  }

  render() {
    const { isLoading, hasFailedToLoad, cities } = this.props;

    let content = <p>Loading...</p>;

    if (!hasFailedToLoad && !isLoading) {
      content = cities.map(city => (
        <div className="col-4">
          <div className="cc-card mx-2 cc-box-shadow">
            <div className="d-flex cc-box-title">
              <i className="fas fa-city" />
              <h1>{city.general.name}</h1>
            </div>
            <div className="cc-card-divider" />
            <div className="d-flex">
              <div className="d-flex cc-card-service">
                <i className="fas fa-ticket-alt" />
                <h1>{city.services.length} Usluga</h1>
              </div>
            </div>
            <div className="cc-card-divider" />
            <SubmitButton label="Uredi" />
          </div>
        </div>
      ));
    }

    return (
      <React.Fragment>
        <div className="container cc-content-inner px-0">
          <div className="cc-content-title d-flex justify-center cc-box-shadow">
            <div className="d-flex">
              <i className="fas fa-city" />
              <h1>Gradovi</h1>
            </div>
          </div>
          <div className="cc-content-list row">
            {content}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Cities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getCities: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.cities,
  },
)(Cities);
