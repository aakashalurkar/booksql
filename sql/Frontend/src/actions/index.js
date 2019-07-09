import axios from "axios";

export const LOGIN = "login_redux";

const ROOT_URL = "http://localhost:3001";

export function login1(){

    const response = axios.get(`${ROOT_URL}/login`);

    console.log("response: ", response);

    return {
        type: LOGIN,
        payload: response
    };
}

export function login2(values, callback) {
    const request = axios
    .post(`${ROOT_URL}/login`, values)
    .then(()=>callback());

    return {
        type: LOGIN,
        payload: request
    };
}