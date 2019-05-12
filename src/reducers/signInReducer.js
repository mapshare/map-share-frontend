import keys from '../data/key';

const initSignInState = {
  status: false
};

export const signInStatusReducer = (state = initSignInState.status, action) => {
  switch (action.type) {
    case keys.SIGN_IN_SUCCESS:
      return action.status;
    default:
      return state;
  }
};

export const userFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case keys.USER_FETCH_DATA_SUCCESS:
      return action.data;
    case keys.ADD_GROUP:
      return {...state, userGroups:state.userGroups.concat(action.data)};
    default:
      return state;
  }
};

export const joinGroupErrorReducer = (state = "", action) => {
  switch (action.type) {
    case keys.JOIN_GROUP_ERROR:
      return action.data;
    default:
      return state;
  }
} 