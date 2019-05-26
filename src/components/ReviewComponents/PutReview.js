import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

import "./PutReview.scss";

import { toggleEditReview, putReview } from "../../actions/reviewActions";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";

class PutReview extends React.PureComponent {
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
      <div className={classnames("PutReview", this.props.className)}>
        <Modal
          show={editReview}
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

PutReview.propTypes = {
  className: PropTypes.string,
  locationId: PropTypes.string.isRequired,
  reviewId: PropTypes.string.isRequired,
  editReview: PropTypes.bool.isRequired,
  getUserData: PropTypes.object.isRequired,
  toggleEditReview: PropTypes.func.isRequired,
  putReview: PropTypes.func.isRequired
};

PutReview.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    toggleEditReview: bool => dispatch(toggleEditReview(bool)),
    putReview: data => dispatch(putReview(data))
  };
};

const mapStateToProps = state => {
  return {
    editReview: state.ReviewReducer.showEditModal,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PutReview);
