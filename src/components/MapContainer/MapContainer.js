import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { GoogleLogout } from "react-google-login";

import { marksFetchData } from "../../actions/marksActions";
import { userLogout } from "../../actions/signInActions";

import "./MapContainer.scss";

import MapBoxContainer from "../MapBoxContainer/MapBoxContainer";
import RestaurantDetails from "../RestaurantComponents/RestaurantDetails";

class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    // get user last joined group
    this.groupId = this.props.getUserData.userGroups[
      this.props.getUserData.userGroups.length - 1
    ];
  }

  componentDidMount() {
    //fetch user's group id marks
    this.props.marksFetchData(
      "https://map-share-dev-api.herokuapp.com/api/marks?groupId=" +
        this.groupId
    );
  }

  logout = () => {
    this.props.userLogout();
  };

  render() {
    const { toggleMarks } = this.props;

    return (
      <div className={classnames("MapContainer", this.props.className)}>
        <MapBoxContainer />
        <div className="box-btn-GoogleLogOut">
          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            className="btn-GoogleLogOut"
          />
          <div className="group-id">Group ID - {this.groupId}</div>
        </div>

        {toggleMarks ? (
          <div className="detailsContainer container-fluid">
            <RestaurantDetails />
          </div>
        ) : (
          <div className="slideOut" />
        )}
      </div>
    );
  }
}

MapContainer.propTypes = {
  className: PropTypes.string,
  toggleMarks: PropTypes.bool.isRequired,
  getUserData: PropTypes.object.isRequired,
  marksFetchData: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired
};

MapContainer.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    marksFetchData: url => dispatch(marksFetchData(url)),
    userLogout: () => dispatch(userLogout())
  };
};

const mapStateToProps = state => {
  return {
    toggleMarks: state.marksReducer.status,
    getUserData: state.signInReducer.userData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
