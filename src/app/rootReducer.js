import { combineReducers } from "redux";
import cumpusSlice from "../features/cumpusSlice/cumpusSlice";
import authSlice from "../features/authSlice/authSlice";
import studentSlice from "../features/StudentSlice/StudentSlice";
import userSlice from "../features/UserSlice/UserSilce";
import specializationSlice from "../features/specializationSlice/specializationSlice";
import managerSlice from "../features/managerSlice/managerSlice";
import reviewerSlice from "../features/reviewerStudent/reviewerSlice";
import timeDateSlice from "../features/timeDateSlice/timeDateSlice";
import businessSlice from "../features/businessSlice.js/businessSlice";
const rootReducer = combineReducers(
    {
    students:studentSlice,
    users:userSlice,
    auth: authSlice,
    cumpus:cumpusSlice,
    specialization:specializationSlice,
    manager: managerSlice,
    reviewer:reviewerSlice,
    time: timeDateSlice,
    business: businessSlice
});
export default rootReducer;