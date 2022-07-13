const initialState = {
    shopItems: [] 
};

const reducer = (state = initialState, action) => {
    if (action.type === "SHOPS_ITEMS/PUT_SHOP_ITEMS") {
        return {...state, shopItems: action.data};
    }

    return state;
};

export default reducer;