import axios from "axios";

function index() {
    return axios.get(`http://localhost:8088/shops`);
}

export {index};