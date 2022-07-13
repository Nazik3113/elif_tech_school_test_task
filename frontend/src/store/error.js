const initialState = {
    showError: false,
    errorMessage: null
};

const reducer = (state = initialState, action) => {
    if (action.type === "ERROR/SHOW_ERROR") {
        return {showError: true, errorMessage: action.data}
    }

    if (action.type === "ERROR/HIDE_ERROR") {
        if (state.showError === true) {
            return {...state, showError: false};
        }
        
        return {...state};
    }

    return state;
};

export default reducer;