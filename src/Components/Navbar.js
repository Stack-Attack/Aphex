import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Presentational component for the navbar of the application. Displays the correct information to the user based on whether they have authentication.
 * @author Peter Luft <pwluft@lakeheadu.ca>
 */

class Navbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutClicked: PropTypes.func.isRequired
  };

  render() {
    let content = null;

    if (this.props.isAuthenticated) {
      content = (
        <button onClick={() => this.props.logoutClicked}>Sign Out</button>
      );
    } else {
      content = <Link to="/login">Sign In</Link>;
    }

    return (
      <div>
        <nav>
          <ul>
            <Link to="/">Home</Link>

            <input type="text" />

            <Link to="/upload">Upload</Link>

            <Link to="/account">My Account</Link>

            {content}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
