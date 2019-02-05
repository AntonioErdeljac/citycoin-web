import PropTypes from 'prop-types';
import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import selectors from './selectors';

import { SubmitButton, Empty, Loading } from '../../common/components';

import actions from '../../../actions';
import { paths } from '../../../../../common/constants';

const Box = posed.div({
  enter: { opacity: 1, y: '0%', delay: ({ i }) => (i * 100) + 200 },
  exit: { opacity: 0, y: '-100%' },
});

const Title = posed.div({
  visible: {
    y: '0%',
    opacity: 1,
    delay: 200,
  },
  hidden: { opacity: 0, y: '-100%' },
});

class CitiesList extends React.Component {
  constructor() {
    super();

    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    const { getCities } = this.props;

    getCities({ isBusiness: true });

    this.setState({
      hasMounted: true,
    });
  }

  componentWillUnmount() {
    const { clearCitiesState } = this.props;

    clearCitiesState();
  }

  render() {
    const { isLoading, hasFailedToLoad, cities } = this.props;
    const { hasMounted } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading && isEmpty(cities)) {
      content = <Empty />;
    }

    if (!hasFailedToLoad && !isLoading && !isEmpty(cities)) {
      content = (
        <div className="row px-0">
          <PoseGroup>
            {cities.map((city, i) => (
              <Box i={i} initialPose="exit" preEnterPose="exit" key={city._id} className="col-4 px-0">
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
              </Box>
            ))}
          </PoseGroup>
        </div>
      );
    }

    return (
      <React.Fragment>
        <div className="container cc-h-100 cc-content-inner px-0">
          <Title pose={hasMounted ? 'visible' : 'hidden'} className="cc-content-title justify-content-between cc-box-shadow">
            <div className="d-flex">
              <i className="fas fa-city" />
              <h1>Gradovi</h1>
            </div>
            <div>
              <Link to={paths.client.CITIES_NEW}>
                <SubmitButton label="Dodaj" />
              </Link>
            </div>
          </Title>
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
  clearCitiesState: PropTypes.func.isRequired,
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
