import keys from '../data/key';

const initToggleState = {
  showModal: false
};

const initReviewState = {
  restaurantReviews: []
};

export const addReviewReducer = (state = initToggleState.showModal, action) => {
  switch (action.type) {
    case keys.TOGGLE_ADD_REVIEW:
      return action;
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
      return action;
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
