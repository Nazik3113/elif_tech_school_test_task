import mariadb from "mariadb";

const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST || "127.0.0.1",
    user: process.env.MARIADB_USER || "sepersecuremariadbuser",
    password: process.env.MARIADB_PASSWORD || "supersecuremariadbpassword",
    database: process.env.MARIADB_DB_NAME || "elif_tech_school_test_tack_db",
    connectionLimit: 5
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);
    }

    if (connection) connection.release();

    return;
});

export default pool;