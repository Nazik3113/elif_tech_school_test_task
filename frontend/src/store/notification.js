const initialState = {
    showNotification: false,
    notificationMessage: null
};

const reducer = (state = initialState, action) => {
    if (action.type === "NOTIFICATION/SHOW_NOTIFICATION") {
        return {showNotification: true, notificationMessage: action.data}
    }

    if (action.type === "NOTIFICATION/HIDE_NOTIFICATION") {
        if (state.showNotification === true) {
            return {...state, showNotification: false};
        }
        
        return {...state};
    }

    return state;
};

export default reducer;