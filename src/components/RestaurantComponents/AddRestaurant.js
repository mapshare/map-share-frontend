import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

import "./AddRestaurant.scss";

import { addMarker, saveMark } from "../../actions/marksActions";

import LocationForm from "../Forms/LocationForm/LocationForm";
// import ModalWindow from "../ModalWindow/ModalWindow";

class AddRestaurant extends React.PureComponent {
  handleClose = event => {
    this.modalRef.handleClick = e => {
      e.stopPropagation();
    };
    // event.stopPropagation();
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
        {/* <ModalWindow
          type="location"
          showModal={addMark}
          handleClose={event => this.handleClose(event)}
        /> */}
        <Modal
          show={addMark.showModal}
          onHide={this.handleClose}
          dialogClassName="dialog"
          ref={r => (this.modalRef = r)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Location</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LocationForm onSubmit={this.handleSubmit} />
          </Modal.Body>
        </Modal>
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
