import axios from "axios";

function index() {
    return axios.get("http://localhost:5000/shops");
}

export {index};