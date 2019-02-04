import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../../../common/constants';

const Navbar = ({ children }) => {
  const { user } = window.pageData;

  return (
    <React.Fragment>
      <nav className="cc-navbar cc-box-shadow navbar navbar-expand-lg navbar-light container">
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
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="cc-navbar-user nav-item">
              <img className="cc-navbar-user-img" src={user.personal.imageUrl || paths.api.v1.STATIC_USER_PLACEHOLDER} />
              <div className="cc-user-wrapper">
                <div className="cc-navbar-item" href="#">{user.personal.firstName} {user.personal.lastName}</div>
                <div className="cc-navbar-item-lower" href="#">Regular</div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="cc-content cc-h-100">
        {children}
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Navbar;
