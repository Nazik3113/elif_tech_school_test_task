import { createStore, combineReducers } from "redux";
import shopsReducer from "./shops";
import shopsItemsReducer from "./shopsItems";
import backetReducer from "./backet";
import errorReducer from "./error";
import notificationReducer from "./notification";
import ordersHistoryReducer from "./ordersHistory";

const store = createStore(
    combineReducers({
        shops: shopsReducer,
        shopsItems: shopsItemsReducer,
        backet: backetReducer,
        error: errorReducer,
        notification: notificationReducer,
        ordersHistory: ordersHistoryReducer
    })
);

export default store;