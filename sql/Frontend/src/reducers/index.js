import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import loginredux from "./reducer_login";

const rootReducer = combineReducers({
    login: loginredux,
    form: formReducer
})

export default rootReducer;