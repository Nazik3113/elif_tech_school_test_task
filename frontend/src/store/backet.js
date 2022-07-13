const initialState = {
    items: [],
    name: "",
    email: "",
    phone: "",
    address: "",
    sum: 0,
};

const reducer = (state = initialState, action) => {
    if (action.type === "BACKET/ADD_ITEM_TO_BACKET") {
        const newState = {...state, items: state.items.concat([action.data])}; 
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    } 

    if (action.type === "BACKET/REMOVE_ITEM_FROM_BACKET") {
        const newState = {...state, items: state.items.filter((item) => {
            if (item.id !== action.data) {
                return true;
            }
            return false;
        })}; 
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    } 

    if (action.type === "BACKET/SET_BACKET") {
        return action.data;
    } 

    if (action.type === "BACKET/SET_NAME") {
        const newState = {...state, name: action.data};
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    } 

    if (action.type === "BACKET/SET_EMAIL") {
        const newState = {...state, email: action.data};
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    }
    
    if (action.type === "BACKET/SET_PHONE") {
        const newState = {...state, phone: action.data};
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    }

    if (action.type === "BACKET/SET_ADDRESS") {
        const newState = {...state, address: action.data};
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    }

    if (action.type === "BACKET/SET_SUM") {
        const newState = {...state, sum: action.data};
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    }

    if (action.type === "BACKET/SET_AMOUNT") {
        const newState = {...state, items: state.items.map((item) => {
            if (item.id === action.data.itemId) {
                item.amount = action.data.amount;
            }
            return item;
        })};
        localStorage.setItem("backet", JSON.stringify(newState));
        return newState;
    }

    return state;
};

export default reducer;