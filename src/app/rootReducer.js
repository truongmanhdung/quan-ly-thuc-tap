import { combineReducers } from "redux";
import studentReducer from '../features/todoSlide/studentModel'
const rootReducer = combineReducers({
    student: studentReducer
});
export default rootReducer;