import axios from "axios";

function show(shopId) {
    return axios.get(`http://localhost:5000/shops-items/${shopId}`);
}

export {show};