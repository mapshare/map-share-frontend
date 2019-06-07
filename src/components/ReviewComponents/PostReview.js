import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import "./PostReview.scss";

import { toggleAddReview, postReview } from "../../actions/reviewActions";

import ModalWindow from "../ModalWindow/ModalWindow";

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
        <ModalWindow
          modalWindowType="review"
          showModal={addReview}
          handleCloseByType={this.handleClose}
          handleSubmit={this.handleSubmit}
        />
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
    addReview: state.ReviewReducer.showAddModal,
    getUserData: state.signInReducer.userData
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostReview);
