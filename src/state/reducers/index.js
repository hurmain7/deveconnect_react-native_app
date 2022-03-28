import { combineReducers } from "redux";
import { AuthReducer } from "./auth";
import { ProfileReducer } from "./profile.js";
import { dummyReducer } from './dummy';
import { ErrorReducer } from "./error";

const rootReducer = combineReducers({
    Auth: AuthReducer,
    profile: ProfileReducer
});

export default rootReducer;