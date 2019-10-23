import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

export default class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.setState({});
  }

  logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  render() {
    const openhacklogo = require("../Miscellanous/logo-sq.jpg");
    return (
      <div>
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img
              src={openhacklogo}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            &nbsp; Connectier
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              {/* <li class="nav-item active">
                <a class="nav-link" href="/profile">
                  Profile <span class="sr-only">(current)</span>
                </a>
              </li> */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Influencers
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="/cardAdminHackathon">
                    Manage My Influencers
                  </a>
                  <div class="dropdown-divider" />
                  <a class="dropdown-item" href="/createHackathon">
                    Search Influencers
                  </a>
                </div>
              </li>
              
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="/login"
                  onClick={this.logoutHandler}
                >
                  Logout{" "}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
