import keys from "../data/key";

const initToggleState = {
  status: false
};

const initModalState = {
  showModal: false
};

const initMarkerState = {
  marks: []
};

export const marksFetchReducer = (state = initMarkerState.marks, action) => {
  switch (action.type) {
    case keys.MARKS_FETCH_DATA_SUCCESS:
      return action.marks;
    case keys.MARK_ADD_DATA_SUCCESS:
      return state.concat(action.marks);
    default:
      return state;
  }
};

export const marksToggleReducer = (state = initToggleState.status, action) => {
  switch (action.type) {
    case keys.TOGGLE_MARKER:
      return action.status;
    default:
      return state;
  }
};

export const addMarkerReducer = (state = initModalState.showModal, action) => {
  switch (action.type) {
    case keys.ADD_MARKER:
      return action;
    default:
      return state;
  }
};
