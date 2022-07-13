import axios from "axios";

function index() {
    return axios.get(`http://${process.env.REACT_APP_API_HOST}:8088/shops`);
}

export {index};