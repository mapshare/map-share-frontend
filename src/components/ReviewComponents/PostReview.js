import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

import "./PostReview.scss";

import { toggleAddReview, postReview } from "../../actions/reviewActions";
import ReviewForm from "../Forms/ReviewForm/ReviewForm";

class PostReview extends React.PureComponent {
  handleClose = () => {
    this.props.toggleAddReview(false);
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
      reviewRating: values.rating
    };

    this.props.postReview(data);
  };

  render() {
    const { addReview } = this.props;

    return (
      <div className={classnames("PostReview", this.props.className)}>
        <Modal
          show={addReview}
          onHide={this.handleClose}
          dialogClassName="dialog"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReviewForm onSubmit={this.handleSubmit} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

PostReview.propTypes = {
  className: PropTypes.string,
  locationId: PropTypes.string.isRequired,
  addReview: PropTypes.bool.isRequired,
  getUserData: PropTypes.object.isRequired,
  toggleAddReview: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired
};

PostReview.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    toggleAddReview: bool => dispatch(toggleAddReview(bool)),
    postReview: data => dispatch(postReview(data))
  };
};

const mapStateToProps = state => {
  return {
    addReview: state.reviewerReducer.showAddModal,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostReview);
