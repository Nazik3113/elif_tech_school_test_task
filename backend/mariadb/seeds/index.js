import mariadb from "mariadb";
import fs from "fs";

function runSeeds() {
    const connection = mariadb.createConnection({
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DB_NAME,
        connectionLimit: 5,
        multipleStatements: true,
    });

    connection.then(async (conn) => {
        conn.beginTransaction();
    
        try {
            const createShopsTableQuery = fs.readFileSync("./mariadb/seeds/queries/create_shops_table.sql", {
                encoding: "utf-8",
            });
            await conn.query(createShopsTableQuery);  
    
            const fillShopsTableQuery = fs.readFileSync("./mariadb/seeds/queries/fill_shops_table.sql", {
                encoding: "utf-8",
            });
    
            await conn.query(fillShopsTableQuery);  
    
            const createShopsItemsTableQuery = fs.readFileSync("./mariadb/seeds/queries/create_shops_items_table.sql", {
                encoding: "utf-8",
            });
    
            await conn.query(createShopsItemsTableQuery);  
    
            const fillShopsItemsTableQuery = fs.readFileSync("./mariadb/seeds/queries/fill_shop_items_table.sql", {
                encoding: "utf-8",
            });
    
            await conn.query(fillShopsItemsTableQuery); 
            
            const createOrdersTableQuery = fs.readFileSync("./mariadb/seeds/queries/create_orders_table.sql", {
                encoding: "utf-8",
            });
    
            await conn.query(createOrdersTableQuery); 
    
            const createOrdersItemsTableQuery = fs.readFileSync("./mariadb/seeds/queries/create_orders_items_table.sql", {
                encoding: "utf-8",
            });
    
            await conn.query(createOrdersItemsTableQuery); 
    
            conn.commit();
        } catch (error) {
            conn.rollback();
        }
    
        conn.end();
    }).catch(err => {
        setTimeout(() => {
            runSeeds();
        }, 2000);
    });
};

runSeeds();