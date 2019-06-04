import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { marksReducer } from "./marksReducer";
import { restaurantDetailReducer } from "./restaurantsReducer";
import { ReviewReducer } from "./reviewReducer";
import { signInReducer } from "./signInReducer";

export default combineReducers({
  marksReducer,
  ReviewReducer,
  restaurantDetailReducer,
  signInReducer,
  form: formReducer
});
