import { combineReducers } from "redux";
import authSlice from "../features/slice/authSlice";
import studentReducer from '../features/todoSlide/studentModel'

const rootReducer = combineReducers({
    auth:authSlice,
    student: studentReducer
});
export default rootReducer;