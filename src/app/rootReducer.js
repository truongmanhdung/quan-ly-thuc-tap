import { combineReducers } from "redux";
import  bookSlice  from "../features/todoSlide/todoSlide";
const rootReducer = combineReducers({
    books: bookSlice.reducer
});
export default rootReducer;