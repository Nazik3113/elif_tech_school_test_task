import axios from "axios";

function show(shopId) {
    return axios.get(`/shops-items/${shopId}`);
}

export {show};