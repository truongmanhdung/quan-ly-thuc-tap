import { combineReducers } from "redux";
import authSlice from "../features/slice/authSlice";
const rootReducer = combineReducers({
    auth:authSlice,
});
export default rootReducer;