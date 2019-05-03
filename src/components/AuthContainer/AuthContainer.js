import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { GoogleApiWrapper, InfoWindow } from "google-maps-react";
import classnames from "classnames";

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
            getUserData.userGroups && getUserData.userGroups.length != 0 ? (
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

const mapDispatchToProps = dispatch => {
  return {
    signInSuccess: bool => dispatch(signInSuccess(bool))
  };
};

const mapStateToProps = state => {
  return {
    signInStatus: state.signInStatusReducer,
    getUserData: state.userFetchReducer
  };
};

AuthContainer.propTypes = {
  className: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthContainer);
