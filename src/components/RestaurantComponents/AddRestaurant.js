import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import "./AddRestaurant.scss";

import { addMarker, saveMark } from "../../actions/marksActions";

import ModalWindow from "../ModalWindow/ModalWindow";

class AddRestaurant extends React.PureComponent {
  handleClose = () => {
    this.props.addMarker(false);
  };

  handleSubmit = values => {
    // retrieves the data from the form and call redux actions
    let getGroupId = this.props.getUserData.userGroups[
      this.props.getUserData.userGroups.length - 1
    ];

    let data = {
      ...values,
      geometry: {
        coordinates: [this.props.position.lat, this.props.position.lng]
      },
      userId: this.props.getUserData._id,
      groupId: getGroupId,
      userFirstName: this.props.getUserData.userFirstName,
      userLastName: this.props.getUserData.userLastName
    };

    this.props.saveMark(data);
    this.props.addMarker(false);
  };

  render() {
    const { addMark } = this.props;
    return (
      <div className={classnames("AddRestaurant", this.props.className)}>
        <ModalWindow
          contentType="location"
          showModal={addMark}
          handleCloseByType={this.handleClose}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

AddRestaurant.propTypes = {
  className: PropTypes.string,
  position: PropTypes.object.isRequired,
  addMark: PropTypes.bool.isRequired,
  getUserData: PropTypes.object.isRequired,
  saveMark: PropTypes.func.isRequired,
  addMarker: PropTypes.func.isRequired
};

AddRestaurant.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    saveMark: data => dispatch(saveMark(data)),
    addMarker: bool => dispatch(addMarker(bool))
  };
};

const mapStateToProps = state => {
  return {
    addMark: state.marksReducer.showModal,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRestaurant);
