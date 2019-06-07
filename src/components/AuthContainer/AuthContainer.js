import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import "./AuthContainer.scss";

import { signInSuccess } from "../../actions/signInActions";

import SignInForm from "../SignInForm/SignInForm";
import MapContainer from "../MapContainer/MapContainer";
import GroupLanding from "../GroupLanding/GroupLanding";

class AuthContainer extends React.PureComponent {
  render() {
    const { signInStatus, getUserData } = this.props;

    return (
      <div className={classnames("AuthContainer", this.props.className)}>
        {signInStatus ? (
          getUserData.userGroups ? (
            getUserData.userGroups && getUserData.userGroups.length !== 0 ? (
              <MapContainer />
            ) : (
              <GroupLanding />
            )
          ) : (
            <div className="loading">Loading User</div>
          )
        ) : (
          <SignInForm />
        )}
      </div>
    );
  }
}

AuthContainer.propTypes = {
  className: PropTypes.string,
  signInStatus: PropTypes.bool.isRequired,
  getUserData: PropTypes.object.isRequired,
  signInSuccess: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    signInSuccess: bool => dispatch(signInSuccess(bool))
  };
};

const mapStateToProps = state => {
  return {
    signInStatus: state.signInReducer.status,
    getUserData: state.signInReducer.userData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);
