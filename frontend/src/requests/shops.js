import axios from "axios";

function index() {
    return axios.get(`/shops`);
}

export {index};