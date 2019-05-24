import keys from '../data/key';

const INITIAL_STATE = {
  showAddModal: false,
  showEditModal: false,
  showModal: false,
  restaurantReviews: []
};

export const reviewerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case keys.TOGGLE_ADD_REVIEW:
      return {
        ...state,
        showAddModal: action.showModal
      }
    case keys.TOGGLE_EDIT_REVIEW:
      return {
        ...state,
        showEditModal: action.showModal
      }
    case keys.REVIEWS_CONTENTS:
      return {
        ...state,
        restaurantReviews: action.data
      }
    case keys.ADD_REVIEW:
      return {
        ...state,
        restaurantReviews: state.restaurantReviews.concat(action.data)
      }
    default:
      return state;
  }
};