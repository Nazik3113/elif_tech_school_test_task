import pool from "../mariadb/index.js";

const show = async (req, res) => {
    try {
        const id = req.params.id;
        const sqlQuery = "select * from elif_tech_school_test_tack_db.shops_items where shop_id = ?;";
        const rows = await pool.query(sqlQuery, [id]);
        res.status(200).json(rows);   
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export { show };