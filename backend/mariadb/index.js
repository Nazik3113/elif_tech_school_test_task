import mariadb from "mariadb";

const pool = mariadb.createPool({
    host: process.env.MARIADB_HOST,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DB_NAME,
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