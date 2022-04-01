import { combineReducers } from "redux";
import  bookSlice  from "../features/todoSlide/todoSlide";
import studentSlice from "../features/StudentSlice/StudentSlice";
import userSlice from "../features/UserSlice/UserSilce";
const rootReducer = combineReducers(
    {
    books: bookSlice.reducer,
    students:studentSlice,
    users:userSlice
});
export default rootReducer;