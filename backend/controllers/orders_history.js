import pool from "../mariadb/index.js";

const showBySessionId = async (req, res) => {
    try {
        const session_id = req.params.id;
        const getOrdersQuery = "select * from elif_tech_school_test_tack_db.orders where session_id = ?;";
        const getOrdersResult = await pool.query(getOrdersQuery, [session_id]);

        if (getOrdersResult.length === 0) {
            return res.status(200).json({});   
        }

        const ordersIds = getOrdersResult.reduce((ordersIdsArray, order) => {
            return [...ordersIdsArray, order.id];
        }, []);

        const getOrdersItemsQuery = "\
            select \
                oi.id, \
                oi.order_id, \
                oi.amount, \
                si.name as store_item_name, \
                si.image, \
                si.price, \
                s.name as store_name \
            from elif_tech_school_test_tack_db.order_items oi \
            join elif_tech_school_test_tack_db.shops_items si \
                on oi.shop_item_id = si.id \
            join elif_tech_school_test_tack_db.shops s \
                on oi.shop_id = s.id \
            where \
                oi.order_id in (" + "?,".repeat(getOrdersResult.length).slice(0, -1) + ");";

        const getOrdersItemsResult = await pool.query(getOrdersItemsQuery, ordersIds);

        getOrdersResult.map((order) => {
            order.items = getOrdersItemsResult.filter((orders_item) => {
                if (orders_item.order_id === order.id) {
                    return true;
                }

                return false;
            });
        });

        res.status(200).json(getOrdersResult);   
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export { showBySessionId };