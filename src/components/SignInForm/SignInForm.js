import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";

import "./SignInForm.scss";

import { signInSuccess, postUser } from "../../actions/signInActions";

import { GOOGLE_LOGIN_TOKEN } from "../../data/constants";

export class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null
    };
  }

  handleSignIn = bool => {
    this.props.signInSuccess(bool);
  };

  responseGoogle = response => {
    if (response.error) {
      this.setState({ errorMessage: response.error });
      this.handleSignIn(false, response.error);
    } else {
      this.handleSignIn(true);
      this.props.postUser(response.w3);
    }
  };

  render() {
    return (
      <div className={classnames("SignInForm", this.props.className)}>
        <div className="container">
          <div className="card text-center rounded">
            <img className="card-img-top" src="" alt="" />
            <div className="card-body">
              <h1 className="card-title">
                Welcome to
                <br />
                Map-Share!
              </h1>
              <p className="card-text">This is the best webapp ever.</p>

              <GoogleLogin
                className="btn"
                clientId={GOOGLE_LOGIN_TOKEN}
                buttonText="Login with Google!"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                isSignedIn={true}
              />
              {this.state.errorMessage && (
                <div className="error-message">
                  Please sign in to use Map-Share
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  className: PropTypes.string,
  signInSuccess: PropTypes.func.isRequired,
  postUser: PropTypes.func.isRequired
};

SignInForm.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    signInSuccess: bool => dispatch(signInSuccess(bool)),
    postUser: data => dispatch(postUser(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
