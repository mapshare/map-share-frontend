import keys from "../data/key";

const INITIAL_SIGN_IN_STATE = {
  status: false,
  userData: {},
  userGroups: [],
  groupError: ""
};

export const signInReducer = (state = INITIAL_SIGN_IN_STATE, action) => {
  switch (action.type) {
    case keys.SIGN_IN_SUCCESS:
      return { ...state, status: action.status };
    case keys.USER_FETCH_DATA_SUCCESS:
      return { ...state, userData: action.data };
    case keys.ADD_GROUP: // this action call is for switching group for feature implmentation
      return { ...state, userGroups: state.userGroups.concat(action.data) };
    case keys.JOIN_GROUP_ERROR:
      return { ...state, groupError: action.data };
    default:
      return state;
  }
};
