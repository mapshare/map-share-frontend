import keys from "../data/key";

const INITIAL_MARKS_STATE = {
  status: false,
  showModal: false,
  marks: []
};

export const marksReducer = (state = INITIAL_MARKS_STATE, action) => {
    switch (action.type) {
      case keys.MARKS_FETCH_DATA_SUCCESS:
        return {
          ...state,
          marks: action.marks
        }
      case keys.MARK_ADD_DATA_SUCCESS:
        return {
          ...state,
          marks: state.marks.concat(action.marks)
        }
      case keys.TOGGLE_MARKER:
        return {
          ...state,
          status: action.status
        }        
      case keys.ADD_MARKER:
        return {
          ...state,
          showModal: action.showModal
        }
      default:
        return state;
    }
};