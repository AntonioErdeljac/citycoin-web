import PropTypes from 'prop-types';
import React from 'react';

import { paths } from '../../../../common/constants';

const Navbar = ({ children }) => {
  const { user } = window.pageData;

  return (
    <React.Fragment>
      <nav className="cc-navbar navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="cc-navbar-brand nav-item">
              <img src="static/logo.png" />
              CityCoin
            </li>
            <div className="cc-navbar-vertical-divider" />
            <li className="cc-navbar-regular-item nav-item">
              <i className="fas fa-city mr-3" />
              Gradovi
            </li>
            <div className="cc-navbar-vertical-divider" />
            <li className="cc-navbar-regular-item nav-item">
              <i className="fas fa-ticket-alt mr-3" />
              Usluge
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
      {/* <div className="cc-sidebar bg-light">
        <div className="cc-sidebar-brand">
          <img src="static/logo.png" />
          CityCoin
        </div>
        <div className="cc-sidebar-item">
          <div className="row cc-w-100">
            <div className="col-5 text-right">
              <i className="fas fa-city mr-3" />
            </div>
            <div className="col-7 text-left">
              Gradovi
            </div>
          </div>
        </div>
        <div className="cc-sidebar-item">
          <div className="row cc-w-100">
            <div className="col-5 text-right">
              <i className="fas fa-ticket-alt mr-3" />
            </div>
            <div className="col-7 text-left">
              Usluge
            </div>
          </div>
        </div>
      </div> */}
      <div className="cc-content">
        {children}
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Navbar;
