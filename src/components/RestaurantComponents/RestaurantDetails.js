import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import moment from "moment";

import { toggleMarker } from "../../actions/restaurantActions";
import {
  toggleAddReview,
  reviewFetchData,
  toggleEditReview
} from "../../actions/reviewActions";

import "./RestaurantDetails.scss";

import PostReview from "../ReviewComponents/PostReview";
import PutReview from "../ReviewComponents/PutReview";

class RestaurantDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reviewId: ""
    };
  }

  componentWillMount() {
    this.props.reviewFetchData(this.props.getRestaurant.data.locationId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.getRestaurant !== this.props.getRestaurant) {
      this.props.reviewFetchData(this.props.getRestaurant.data.locationId);
    }
  }

  handleOnClose = () => {
    this.props.toggleMarker(false);
  };

  handleAddReview = () => {
    this.props.toggleAddReview(true);
  };

  handleEditReview = review => {
    if (this.props.getUserData._id === review.reviewUser.userId) {
      this.setState({
        reviewId: review._id
      });

      this.props.toggleEditReview(true);
    }
  };

  getRatingSum = reviews => {
    let rc = 0;
    if (reviews.length > 0) {
      const amount = item => {
        return item.reviewRating;
      };

      const sum = (total, value) => {
        return total + value;
      };

      rc = reviews.map(amount).reduce(sum) / reviews.length;
    }

    return rc;
  };

  render() {
    const { getRestaurant, getReviews } = this.props;
    return (
      <div className={classnames("RestaurantDetails", this.props.className)}>
        <PostReview locationId={getRestaurant.data.locationId} />
        <PutReview
          locationId={getRestaurant.data.locationId}
          reviewId={this.state.reviewId}
        />
        <div className="row">
          <div className="col-12 p-0">
            <img
              className="img-fluid"
              src="https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png"
              alt=""
            />
          </div>
          <div className="btn-custom">
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleOnClose}
            >
              close
            </button>
          </div>
        </div>

        <div className="row preview-info-custom">
          <div className="col-8">{getRestaurant.data.restaurantName}</div>
          <div className="col-4">{getRestaurant.data.priceRange}</div>
          <div className="col-12">{getRestaurant.data.restaurantLocation}</div>
        </div>

        <div className="row rating">
          <div className="col-12">*---- RATING ----*</div>
          <div className="col-12">
            <div className="stars">
              <div className="empty-stars" />
              <div
                className="full-stars"
                style={{
                  width: `calc(100% * ${this.getRatingSum(getReviews) / 5})`
                }}
              />
            </div>
          </div>
        </div>

        <div className="row review">
          <div className="col-12 mb-3">
            <div className="row">
              <div className="col-8">All reviews</div>
              <div className="col-4">
                <button
                  onClick={this.handleAddReview}
                  className="btn btn-primary btn-sm"
                >
                  add review
                </button>
              </div>
            </div>
          </div>

          <div className="col-12">
            {getReviews.length &&
              getReviews.map(review => {
                return (
                  <div
                    className="row"
                    key={review._id}
                    onClick={() => this.handleEditReview(review)}
                  >
                    <div className="col-8">
                      <span>
                        <p className="review-user">
                          {review.reviewUser.userFirstName}{" "}
                          {review.reviewUser.userLastName}
                        </p>
                      </span>
                    </div>
                    <div className="col-4">
                      <p className="review-time">
                        {review.updatedAt
                          ? moment(parseInt(review.updatedAt)).fromNow()
                          : moment(parseInt(review.createdAt)).fromNow()}
                      </p>
                    </div>
                    <div className="col-12">
                      <p>{review.reviewContent}</p>
                    </div>

                    <div className="col-12">
                      <hr className="review-hr" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

RestaurantDetails.propTypes = {
  className: PropTypes.string,
  getRestaurant: PropTypes.object.isRequired,
  getReviews: PropTypes.array.isRequired,
  getUserData: PropTypes.object.isRequired,
  toggleMarker: PropTypes.func.isRequired,
  toggleAddReview: PropTypes.func.isRequired,
  toggleEditReview: PropTypes.func.isRequired,
  ReviewFetchData: PropTypes.func.isRequired
};

RestaurantDetails.defaultProps = {
  ReviewFetchData: () => {}
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMarker: bool => dispatch(toggleMarker(bool)),
    toggleAddReview: bool => dispatch(toggleAddReview(bool)),
    toggleEditReview: bool => dispatch(toggleEditReview(bool)),
    reviewFetchData: data => dispatch(reviewFetchData(data))
  };
};

const mapStateToProps = state => {
  return {
    getRestaurant: state.restaurantDetailReducer,
    getReviews: state.reviewsContentReducer,
    getUserData: state.userFetchReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetails);
