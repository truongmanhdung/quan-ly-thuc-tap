import { combineReducers } from "redux";
import cumpusSlice from "../features/cumpusSlice/cumpusSlice";
import authSlice from "../features/slice/authSlice";
import studentSlice from "../features/StudentSlice/StudentSlice";
import userSlice from "../features/UserSlice/UserSilce";
const rootReducer = combineReducers(
    {
    students:studentSlice,
    users:userSlice,
    auth: authSlice,
    cumpus:cumpusSlice
});
export default rootReducer;