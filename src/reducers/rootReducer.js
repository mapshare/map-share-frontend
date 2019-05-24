import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  marksReducer
} from "./marksReducer";
import { restaurantDetailReducer } from "./restaurantsReducer";
import {
  reviewerReducer
} from "./reviewReducer";
import {
  signInStatusReducer,
  userFetchReducer,
  joinGroupErrorReducer
} from "./signInReducer";

export default combineReducers({
  marksReducer,
  reviewerReducer,
  restaurantDetailReducer,
  signInStatusReducer,
  userFetchReducer,
  joinGroupErrorReducer,
  form: formReducer
});
