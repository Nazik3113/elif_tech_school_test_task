import axios from "axios";

function show(shopId) {
    return axios.get(`http://localhost:8088/shops-items/${shopId}`);
}

export {show};