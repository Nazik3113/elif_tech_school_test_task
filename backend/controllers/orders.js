import pool from "../mariadb/index.js";

const create = async (req, res) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');
        
        if (
            !req.body.hasOwnProperty('session_id') 
            || !req.body.hasOwnProperty('name')
            || !req.body.hasOwnProperty('email')
            || !req.body.hasOwnProperty('phone')
            || !req.body.hasOwnProperty('address')
            || !req.body.hasOwnProperty('price')
            || !req.body.hasOwnProperty('items')
        ) {
            res.status(400).send("Wrong params");
        }

        const { session_id, name, email, phone, address, price, items } = req.body;
        const createOrderQuery = "\
            insert into \
                seper_secure_db.orders(\
                    `session_id`, \
                    `name`, \
                    `email`, \
                    `phone`, \
                    `address`, \
                    `price`) \
                    values (?,?,?,?,?,?); \
        ";

        const createOrderResult = await pool.query(createOrderQuery, [session_id, name, email, phone, address, price]);

        if (createOrderResult.affectedRows !== 1 && !createOrderResult.insertId) {
            res.status(500).send("Database error");
        }   

        const createOrderItemsQuery = "\
            insert into \
                seper_secure_db.order_items(\
                    `order_id`, \
                    `shop_id`, \
                    `shop_item_id`, \
                    `amount`) \
                    values \
        " + "(?,?,?,?),".repeat(items.length).slice(0, -1) + ";";

        const createOrderItemsResult = await pool.query(createOrderItemsQuery, items.reduce((insertArray, item) => {
            return insertArray.concat([createOrderResult.insertId, item.shop_id, item.id, item.amount]);
        }, []));
        
        if (createOrderItemsResult.affectedRows !== items.length) {
            res.status(500).send("Database error");
        }

        res.status(200).json({status: 1, message: "Order created"});   
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export { create };