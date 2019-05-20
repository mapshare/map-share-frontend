import keys from "../data/key";

const initToggleState = {
  showModal: false
};

const initReviewState = {
  restaurantReviews: []
};

const initReviewReducerState = {
  restaurantReviews: [],
  showAddModal: false,
  showEditModal: false
};

export const ReviewReducer = (state = initReviewReducerState, action) => {
  switch (action.type) {
    case keys.TOGGLE_ADD_REVIEW:
      return {
        ...state,
        showAddModal: action.showModal
      };
    case keys.TOGGLE_EDIT_REVIEW:
      return {
        ...state,
        showEditModal: action.showModal
      };
    case keys.REVIEWS_CONTENTS:
      return {
        ...state,
        restaurantReviews: action.data
      };
    case keys.ADD_REVIEW:
      return {
        ...state,
        restaurantReviews: state.restaurantReviews.concat(action.data)
      };
    default:
      return state;
  }
};

export const addReviewReducer = (state = initToggleState.showModal, action) => {
  switch (action.type) {
    case keys.TOGGLE_ADD_REVIEW:
      return action.showModal;
    default:
      return state;
  }
};

export const editReviewReducer = (
  state = initToggleState.showModal,
  action
) => {
  switch (action.type) {
    case keys.TOGGLE_EDIT_REVIEW:
      return action.showModal;
    default:
      return state;
  }
};

export const reviewsContentReducer = (
  state = initReviewState.restaurantReviews,
  action
) => {
  switch (action.type) {
    case keys.REVIEWS_CONTENTS:
      return action.data;
    case keys.ADD_REVIEW:
      return state.concat(action.data);
    default:
      return state;
  }
};
