import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { marksReducer } from "./marksReducer";
import { restaurantDetailReducer } from "./restaurantsReducer";
import { ReviewReducer } from "./reviewReducer";
import {
  signInStatusReducer,
  userFetchReducer,
  joinGroupErrorReducer
} from "./signInReducer";

export default combineReducers({
  marksReducer,
  ReviewReducer,
  restaurantDetailReducer,
  signInStatusReducer,
  userFetchReducer,
  joinGroupErrorReducer,
  form: formReducer
});
