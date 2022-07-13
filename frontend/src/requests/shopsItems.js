import axios from "axios";

function show(shopId) {
    return axios.get(`http://${process.env.REACT_APP_API_HOST}:8088/shops-items/${shopId}`);
}

export {show};