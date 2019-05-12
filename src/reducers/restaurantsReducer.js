import keys from '../data/key';

export const restaurantDetailReducer = (state = [], action) => {
  switch (action.type) {
    case keys.RESTAURANT_DETAILS:
      return action;
    default:
      return state;
  }
};
