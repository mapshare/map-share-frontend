import React, { Component } from "react";
import { connect } from "react-redux";

import "./PutReview.scss";
import { Modal } from "react-bootstrap";
import { toggleEditReview, putReview } from "../../actions/reviewActions";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";

export class PutReview extends Component {
  handleClose = () => {
    this.props.toggleEditReview(false);
  };

  handleSubmit = values => {
    let data = {
      locationId: this.props.locationId,
      reviewUser: {
        userId: this.props.getUserData._id,
        userFirstName: this.props.getUserData.userFirstName,
        userLastName: this.props.getUserData.userLastName
      },
      reviewContent: values.review,
      reviewRating: values.rating,
      reviewId: this.props.reviewId
    };
    this.props.putReview(data);
  };

  render() {
    const { editReview } = this.props;
    return (
      <div>
        <Modal
          show={editReview.showModal}
          onHide={this.handleClose}
          dialogClassName="dialog"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm onSubmit={this.handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleEditReview: bool => dispatch(toggleEditReview(bool)),
    putReview: data => dispatch(putReview(data))
  };
};

const mapStateToProps = state => {
  return {
    editReview: state.editReviewReducer,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PutReview);
