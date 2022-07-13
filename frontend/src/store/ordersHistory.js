const initialState = {
    ordersHistoryItems: [],
};

const reducer = (state = initialState, action) => {
    if (action.type === "ORDERS_HISTORY/PUT_ORDERS_HISTORY") {
        return {...state, ordersHistoryItems: action.data}
    }

    return state;
};

export default reducer;