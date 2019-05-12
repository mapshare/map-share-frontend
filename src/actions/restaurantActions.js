import axios from "axios";
import keys from "../data/key"

export const restaurantFetchData = data => {
  return dispatch => {
    axios
      .get(
        "https://map-share-dev-api.herokuapp.com/api/restaurants/" +
          data.locationId
      )
      .then(resRestaurant => {
        let restaurantDetails = {
          locationId: resRestaurant.data.locationId,
          restaurantLocation: resRestaurant.data.restaurantLocation,
          restaurantName: resRestaurant.data.restaurantName,
          priceRange: resRestaurant.data.restaurantPriceRange
        };

        dispatch(currentRestaurant(restaurantDetails));
        dispatch(toggleMarker(true));
      })
      .catch(err => console.log("restaurant get error: ", err.response));
  };
};

export const toggleMarker = bool => {
  return {
    type: keys.TOGGLE_MARKER,
    status: bool
  };
};

export const currentRestaurant = data => {
  return {
    type: keys.RESTAURANT_DETAILS,
    data: data
  };
};
