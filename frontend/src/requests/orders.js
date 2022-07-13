import axios from "axios";

function create(session_id, name, email, phone, address, sum, items) {
    return axios.post(`http://${process.env.REACT_APP_API_HOST}:8088/orders`, {session_id, name, email, phone, address, price: sum, items});
}

export {create};