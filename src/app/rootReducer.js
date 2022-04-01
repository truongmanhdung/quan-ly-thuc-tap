import { combineReducers } from "redux";
import authSlice from "../features/slice/authSlice";

console.log("authSlice",authSlice)
const rootReducer = combineReducers({
    auth:authSlice,
});
export default rootReducer;