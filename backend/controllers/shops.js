import pool from "../mariadb/index.js";

const index = async (req, res) => {
    try {
        const sqlQuery = "select * from elif_tech_school_test_tack_db.shops;";
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);   
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export { index };