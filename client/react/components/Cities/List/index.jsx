import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import selectors from './selectors';

import { SubmitButton, Empty } from '../../common/components';

import actions from '../../../actions';
import { paths } from '../../../../../common/constants';

class CitiesList extends React.Component {
  componentDidMount() {
    const { getCities } = this.props;

    getCities({ isBusiness: true });
  }

  render() {
    const { isLoading, hasFailedToLoad, cities } = this.props;

    let content = <p>Loading...</p>;

    if (!hasFailedToLoad && !isLoading && isEmpty(cities)) {
      content = <Empty />;
    }

    if (!hasFailedToLoad && !isLoading && !isEmpty(cities)) {
      content = (
        <div className="row px-0">
          {cities.map(city => (
            <div key={city._id} className="col-4 px-0">
              <div className="cc-card cc-box-shadow mr-3 mb-3">
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
                <Link to={paths.build(paths.client.CITIES_ID, city._id)}>
                  <SubmitButton label="Uredi" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="container cc-h-100 cc-content-inner px-0">
          <div className="cc-content-title justify-content-between cc-box-shadow">
            <div className="d-flex">
              <i className="fas fa-city" />
              <h1>Gradovi</h1>
            </div>
            <div>
              <Link to={paths.client.CITIES_NEW}>
                <SubmitButton label="Dodaj" />
              </Link>
            </div>
          </div>
          <div className="cc-content-list cc-h-100 container">
            {content}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CitiesList.propTypes = {
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
)(CitiesList);
