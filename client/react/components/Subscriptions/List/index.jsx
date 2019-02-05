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
import { _t } from '../../../../../common/i18n';

const Box = posed.div({
  enter: { opacity: 1, y: '0%', delay: ({ i }) => (i * 100) + 200 },
  exit: { opacity: 0, y: '-50%' },
});

const Title = posed.div({
  visible: {
    y: '0%',
    opacity: 1,
    delay: 200,
  },
  hidden: { opacity: 0, y: '-50%' },
});

class SubscriptionsList extends React.Component {
  constructor() {
    super();

    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    const { getSubscriptions } = this.props;

    getSubscriptions({ isBusiness: true });

    this.setState({
      hasMounted: true,
    });
  }

  componentWillUnmount() {
    const { clearSubscriptionsState } = this.props;

    clearSubscriptionsState();
  }

  render() {
    const { isLoading, hasFailedToLoad, subscriptions } = this.props;
    const { hasMounted } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading && isEmpty(subscriptions)) {
      content = <Empty />;
    }

    if (!hasFailedToLoad && !isLoading && !isEmpty(subscriptions)) {
      content = (
        <div className="row px-0">
          <PoseGroup>
            {subscriptions.map((subscription, i) => (
              <Box i={i} initialPose="exit" preEnterPose="exit" key={subscription._id} className="col-4 px-0">
                <div className="cc-card cc-box-shadow mr-3 mb-3">
                  <div className="d-flex cc-box-title">
                    <i className="fas fa-ticket-alt" />
                    <h1>{subscription.general.name}</h1>
                  </div>
                  <div className="cc-card-divider" />
                  <div className="d-flex">
                    <div className="d-flex cc-card-service">
                      <i className="far fa-clock" />
                      <h1>{subscription.general.duration} {_t(`durationUnits.${subscription.general.durationUnit}`)}</h1>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex cc-card-service">
                      <i className="fas fa-coins" />
                      <h1>${subscription.general.price}</h1>
                    </div>
                  </div>
                  <div className="cc-card-divider" />
                  <Link to={paths.build(paths.client.SUBSCRIPTIONS_ID, subscription._id)}>
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
            <div className="d-flex  align-items-center">
              <i className="fas fa-ticket-alt" />
              <h1>Pretplate</h1>
            </div>
            <div>
              <Link to={paths.client.SUBSCRIPTIONS_NEW}>
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

SubscriptionsList.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  clearSubscriptionsState: PropTypes.func.isRequired,
  getSubscriptions: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.subscriptions,
  },
)(SubscriptionsList);
