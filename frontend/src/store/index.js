import { createStore, combineReducers } from "redux";
import shopsReducer from "./shops";
import shopsItemsReducer from "./shopsItems";
import backetReducer from "./backet";
import errorReducer from "./error";

const store = createStore(
    combineReducers({
        shops: shopsReducer,
        shopsItems: shopsItemsReducer,
        backet: backetReducer,
        error: errorReducer
    })
);

export default store;