import axios from "axios";
import keys from "../data/key";

export const addMarker = bool => {
  return {
    type: keys.ADD_MARKER,
    showModal: bool
  };
};

export const marksFetchDataSuccess = marks => {
  return {
    type: keys.MARKS_FETCH_DATA_SUCCESS,
    marks: marks
  };
};

export const markSaveDataSuccess = marks => {
  return {
    type: keys.MARK_ADD_DATA_SUCCESS,
    marks: marks
  };
};

export const marksFetchData = url => {
  return dispatch => {
    axios.get(url).then(res => {
      dispatch(marksFetchDataSuccess(res.data));
    });
  };
};

export const saveMark = data => {
  let restaurantData = {
    userId: data.userId,
    groupId: data.groupId,
    restaurantName: data.restaurantName,
    restaurantLocation: data.restaurantLocation,
    priceRange: data.priceRange,
    geometry: data.geometry
  };

  return dispatch => {
    axios
      .post(
        "https://map-share-dev-api.herokuapp.com/api/restaurants",
        restaurantData
      )
      .then(res => {
        let markData = {
          locationId: res.data.locationId,
          geometry: data.geometry
        };

        let reviewData = {
          locationId: res.data.locationId,
          reviewContent: data.review,
          reviewRating: data.rating,
          reviewUser: {
            userId: data.userId,
            userFirstName: data.userFirstName,
            userLastName: data.userLastName
          }
        };

        dispatch(markSaveDataSuccess(markData));

        axios
          .post(
            "https://map-share-dev-api.herokuapp.com/api/reviews",
            reviewData
          )
          .catch(err => {
            console.log(err.response);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
