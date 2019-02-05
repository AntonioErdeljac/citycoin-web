import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';

import selectors from './selectors';

import { SubmitButton, Empty, Loading } from '../../common/components';

import actions from '../../../actions';
import { paths, servicesIcons } from '../../../../../common/constants';

const Box = posed.div({
  enter: { opacity: 1, y: '0%', delay: ({ i }) => (i * 100) + 200 },
  exit: { opacity: 0, y: '-50%' },
});

const Title = posed.div({
  visible: { y: '0%',
    opacity: 1,
    delay: 200,
  },
  hidden: { opacity: 0, y: '-50%' },
});
class ServicesList extends React.Component {
  constructor() {
    super();

    this.state = {
      hasLoaded: false,
    };
  }

  componentDidMount() {
    const { getServices } = this.props;

    getServices({ isBusiness: true });

    this.setState({
      hasLoaded: true,
    });
  }

  render() {
    const { isLoading, hasFailedToLoad, services } = this.props;
    const { hasLoaded } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading && isEmpty(services)) {
      content = <Empty />;
    }

    if (!hasFailedToLoad && !isLoading && !isEmpty(services)) {
      content = (
        <div className="row px-0">
          <PoseGroup>
            {services.map((service, index) => (
              <Box i={index} initialPose="exit" preEnterPose="exit" key={service._id} className="col-4 px-0">
                <div className="cc-card cc-box-shadow mr-3 mb-3">
                  <div className="d-flex cc-box-title">
                    <i className={`fas fa-${servicesIcons[service.type].icon}`} />
                    <h1>{service.general.name}</h1>
                  </div>
                  <div className="cc-card-divider" />
                  <div className="d-flex">
                    <div className="d-flex cc-card-service">
                      <i className="fas fa-ticket-alt" />
                      <h1>{service.subscriptions.length} Pretplata</h1>
                    </div>
                  </div>
                  <div className="cc-card-divider" />
                  <Link to={paths.build(paths.client.SERVICES_ID, service._id)}>
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
          <Title pose={hasLoaded ? 'visible' : 'hidden'} className="cc-content-title justify-content-between cc-box-shadow">
            <div className="d-flex align-items-center">
              <i className="fas fa-hand-holding-usd" />
              <h1>Usluge</h1>
            </div>
            <div>
              <Link to={paths.client.SERVICES_NEW}>
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

ServicesList.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getServices: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.services,
  },
)(ServicesList);
