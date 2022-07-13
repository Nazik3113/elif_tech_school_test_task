import axios from "axios";

function showBySessionId(sessionId) {
    return axios.get(`http://localhost:8088/orders-history/session-id/${sessionId}`);
}

export {showBySessionId};