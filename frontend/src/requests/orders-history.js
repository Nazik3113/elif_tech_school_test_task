import axios from "axios";

function showBySessionId(sessionId) {
    return axios.get(`/orders-history/session-id/${sessionId}`);
}

export {showBySessionId};