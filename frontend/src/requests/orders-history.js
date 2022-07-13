import axios from "axios";

function showBySessionId(sessionId) {
    return axios.get(`http://localhost:5000/orders-history/session-id/${sessionId}`);
}

export {showBySessionId};