import axios from "axios";

function showBySessionId(sessionId) {
    return axios.get(`http://${process.env.REACT_APP_API_HOST}:8088/orders-history/session-id/${sessionId}`);
}

export {showBySessionId};