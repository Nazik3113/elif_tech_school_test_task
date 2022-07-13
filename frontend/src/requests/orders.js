import axios from "axios";

function create(session_id, name, email, phone, address, sum, items) {
    return axios.post("http://localhost:5000/orders", {session_id, name, email, phone, address, price: sum, items});
}

export {create};