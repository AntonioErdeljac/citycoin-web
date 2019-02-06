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

class SupervisorsList extends React.Component {
  constructor() {
    super();

    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    const { getUsers } = this.props;

    getUsers({ isBusiness: true });

    this.setState({
      hasMounted: true,
    });
  }

  componentWillUnmount() {
    const { clearUsersState } = this.props;

    clearUsersState();
  }

  render() {
    const { isLoading, hasFailedToLoad, users } = this.props;
    const { hasMounted } = this.state;

    let content = <Loading />;

    if (!hasFailedToLoad && !isLoading && isEmpty(users)) {
      content = <Empty />;
    }

    if (!hasFailedToLoad && !isLoading && !isEmpty(users)) {
      content = (
        <div className="row px-0">
          <PoseGroup>
            {users.map((user, i) => (
              <Box i={i} initialPose="exit" preEnterPose="exit" key={user._id} className="col-4 px-0">
                <div className="cc-card cc-box-shadow mr-3 mb-3">
                  <div className="d-flex cc-box-title">
                    <i className="fas fa-id-badge" />
                    <h1>{user.personal.firstName} {user.personal.lastName}</h1>
                  </div>
                  <div className="cc-card-divider" />
                  <div className="d-flex">
                    <div className="d-flex cc-card-service">
                      <i className="fas fa-ticket-alt" />
                      <h1>{user.services.length} Usluga</h1>
                    </div>
                  </div>
                  <div className="cc-card-divider" />
                  <Link to={paths.build(paths.client.SUPERVISORS_ID, user._id)}>
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
            <div className="d-flex align-items-center">
              <i className="fas fa-id-badge" />
              <h1>Kontrolori</h1>
            </div>
            <div>
              <Link to={paths.client.SUPERVISORS_NEW}>
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

SupervisorsList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  clearUsersState: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  hasFailedToLoad: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  selectors,
  {
    ...actions.users,
  },
)(SupervisorsList);
