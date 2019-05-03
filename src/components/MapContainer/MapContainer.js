import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { marksFetchData } from "../../actions/marksActions";
import { userLogout } from "../../actions/signInActions";
import { GoogleLogout } from "react-google-login";

import "./MapContainer.scss";

import MapBoxContainer from "../MapBoxContainer/MapBoxContainer";
import RestaurantDetails from "../RestaurantComponents/RestaurantDetails";

export class MapContainer extends Component {
  // componentWillMount() {
  //   // let data = {
  //   //   userId: '5c7015b00b10a5189ccc07e2',
  //   //   groupId: '5c7016010b10a5189ccc07e3'
  //   // }

  //   // this.props.getUserData(data)
  //   this.props.marksFetchData("https://map-share-dev-api.herokuapp.com/api/marks?");
  // }
  groupId = this.props.getUserData.userGroups[
    this.props.getUserData.userGroups.length - 1
  ];
  componentDidMount() {
    console.log("fetch first time");
    this.props.marksFetchData(
      "https://map-share-dev-api.herokuapp.com/api/marks?groupId=" +
        this.groupId
    );
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevProps.getUserData !== this.props.getUserData //&&
  //     //this.props.signInStatus === true
  //   ) {
  //     let groupId = this.props.getUserData.userGroups[
  //       this.props.getUserData.userGroups.length - 1
  //     ];
  //     console.log('fetch second time')
  //     this.props.marksFetchData(
  //       "https://map-share-dev-api.herokuapp.com/api/marks?groupId=" + groupId
  //     );
  //   }
  // }

  logout = () => {
    console.log("firing logout");
    this.props.userLogout();
    //this.props.signInSuccess(false);
  };

  render() {
    const { toggleMarks, signInStatus } = this.props;

    return (
      <div className="MapContainer">
        {console.log("RENDERING MAPCOMPONENT")}
        <MapBoxContainer />
        <div className="box-btn-GoogleLogOut">
          <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            className="btn-GoogleLogOut"
          />
          <div className="group-id">Group ID - {this.groupId}</div>
        </div>

        {toggleMarks.status ? (
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

const mapDispatchToProps = dispatch => {
  return {
    marksFetchData: url => dispatch(marksFetchData(url)),
    userLogout: () => dispatch(userLogout())
    //signInSuccess: bool => dispatch(signInSuccess(bool))
  };
};

const mapStateToProps = state => {
  return {
    toggleMarks: state.marksToggleReducer,
    //signInStatus: state.signInStatusReducer,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
