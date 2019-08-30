import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Form from "../Add/Form"
import SecondStep from "../Add/SecondStep";
import { Link } from "react-router-dom";
import { logout } from "../../actions/securityActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";


class DesignAddStep2 extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }
  render() {
    const { validToken, user } = this.props.security;
    return (
      <body>
      <aside id="left-panel" class="left-panel">
        <nav class="navbar navbar-expand-sm navbar-default">
          <div class="navbar-header">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main-menu"
              aria-controls="main-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fa fa-bars"></i>
            </button>
            <a class="navbar-brand" href="./">
              <img src="imagesTraitement/logoo.png" alt="Logo" />
            </a>
          </div>
          <br />
          <br />
          <div id="main-menu" class="main-menu collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <h3 class="menu-title">Home</h3>
              <li>
               <Link to="/ListAll">
                  <i class="menu-icon fa fa-dashboard"></i>{user.username}
                  </Link>
              </li>
              <h3 class="menu-title">Managing Requests</h3>
              <li>
               <Link to="/AddDemande">
                  <i class="menu-icon fa fa-plus"></i>Add Request
                  </Link>
              </li>
              <li>
               <Link to="/List">
               <i class="menu-icon fa fa-list"></i>Display Requests
               </Link>
                
              </li> 

            
              <ul class="nav navbar-nav">
                <h3 class="menu-title">LOG OUT</h3>
                <li>
                 <Link to="/Logout" 
                  onClick={this.logout.bind(this)}>
                    <i class="menu-icon fa fa-power-off"></i> Logout
                    </Link>
                </li>
                </ul>

            </ul>
          </div>
        </nav>
      </aside>

      <div id="right-panel" class="right-panel">
        <header id="header" class="header">
          <div class="header-menu">
            <div class="col-sm-7">
              <a id="menuToggle" class="menutoggle pull-left">
                <i class="fa fa fa-tasks"></i>
              </a>
            </div>

            <div class="col-sm-5">
              <div class="user-area dropdown float-right">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    class="user-avatar rounded-circle"
                    src="imagesTraitement/admin.png"
                    alt="User Avatar"
                  />
                </a>

                <div class="user-menu dropdown-menu">
                 
                <Link to="/Logout" 
                  onClick={this.logout.bind(this)}>
                    <i class="fa fa-power-off"></i> Logout
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
          <SecondStep  id={this.props.match.params.id}/>
        </div>
      </body>
    );
  }
}
DesignAddStep2.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { logout }
)(DesignAddStep2);

