import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

import { paths } from '../../../../common/constants';

const NavigationBar = posed.div({
  visible: { opacity: 1, y: '0%' },
  hidden: { opacity: 0, y: '-50%' },
});

class Navbar extends React.Component {
  constructor() {
    super();

    this.state = {
      hasMounted: false,
    };
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  render() {
    const { children } = this.props;
    const { hasMounted } = this.state;
    const { user } = window.pageData;

    return (
      <React.Fragment>
        <NavigationBar pose={hasMounted ? 'visible' : 'hidden'} className="cc-navbar cc-box-shadow navbar navbar-expand-lg navbar-light container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="cc-navbar-brand nav-item">
                <img src="http://localhost:3000/static/logo.png" />
                CityCoin
              </li>
              <div className="cc-navbar-vertical-divider" />
              <li className="cc-navbar-regular-item nav-item">
                <Link to={paths.client.CITIES}>
                  Gradovi
                </Link>
              </li>
              <div className="cc-navbar-vertical-divider" />
              <li className="cc-navbar-regular-item nav-item">
                <Link to={paths.client.SERVICES}>
                  Usluge
                </Link>
              </li>
              <div className="cc-navbar-vertical-divider" />
              <li className="cc-navbar-regular-item nav-item">
                <Link to={paths.client.SUBSCRIPTIONS}>
                  Pretplate
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="cc-navbar-user nav-item">
                <img className="cc-navbar-user-img" src={user.personal.imageUrl || paths.api.v1.STATIC_USER_PLACEHOLDER} />
                <div className="cc-user-wrapper">
                  <div className="cc-navbar-item" href="#">{user.personal.firstName} {user.personal.lastName}</div>
                  <div className="cc-navbar-item-lower" href="#">Regular</div>
                </div>
                <div className="cc-navbar-caret  ml-4">
                  <i className="fas fa-caret-down" />
                </div>
              </li>
            </ul>
          </div>
        </NavigationBar>
        <div className="cc-content">
          {children}
        </div>
      </React.Fragment>
    );
  }
}

Navbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Navbar;
