import _ from "lodash";
import {LOGIN} from "../actions/index";

export default function(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return _.mapKeys(action.payload.data, "username");
        default:
            return state;
    }
}