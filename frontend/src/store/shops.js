const initialState = {
    shops: [], 
    activeShops: [], 
    activeShopId: 0
};

const reducer = (state = initialState, action) => {
    if (action.type === "SHOPS/PUT_SHOPS") {
        return {
            ...state, 
            shops: action.data.shops, 
            activeShops: action.data.shops, 
            activeShopId: action.data.activeShopId
        };
    } 

    if (action.type === "SHOPS/CHANGE_ACTIVE_SHOP_ID") {
        return {...state, activeShopId: action.data};
    }

    if (action.type === "SHOPS/HIDE_UNACTIVE_SHOPS") {
        const activeShopId = action.data;

        return {...state, activeShops: state.shops.filter((shop) => {
            if (shop.id === activeShopId) {
                return true;
            }

            return false;
        })} 
    }

    if (action.type === "SHOPS/UNHIDE_SHOPS") {
        return {...state, activeShops: state.shops};
    }

    return state;
};

export default reducer;