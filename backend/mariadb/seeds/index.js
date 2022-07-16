import mariadb from "mariadb";
import fs from "fs";
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runSeeds() {
    console.log("Setting up connectio with db...");

    const connection = mariadb.createConnection({
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DB_NAME,
        connectionLimit: 5,
        multipleStatements: true,
    });

    connection.then(async (conn) => {
        console.log("Connection to db succesfully created.");

        conn.beginTransaction();
    
        try {
            const createShopsTableQuery = fs.readFileSync(`${__dirname}/queries/create_shops_table.sql`, {
                encoding: "utf-8",
            });
            await conn.query(createShopsTableQuery);  
    
            const fillShopsTableQuery = fs.readFileSync(`${__dirname}/queries/fill_shops_table.sql`, {
                encoding: "utf-8",
            });
    
            await conn.query(fillShopsTableQuery);  
    
            const createShopsItemsTableQuery = fs.readFileSync(`${__dirname}/queries/create_shops_items_table.sql`, {
                encoding: "utf-8",
            });
    
            await conn.query(createShopsItemsTableQuery);  
    
            const fillShopsItemsTableQuery = fs.readFileSync(`${__dirname}/queries/fill_shop_items_table.sql`, {
                encoding: "utf-8",
            });
    
            await conn.query(fillShopsItemsTableQuery); 
            
            const createOrdersTableQuery = fs.readFileSync(`${__dirname}/queries/create_orders_table.sql`, {
                encoding: "utf-8",
            });
    
            await conn.query(createOrdersTableQuery); 
    
            const createOrdersItemsTableQuery = fs.readFileSync(`${__dirname}/queries/create_orders_items_table.sql`, {
                encoding: "utf-8",
            });
    
            await conn.query(createOrdersItemsTableQuery); 

            console.log("Seeds succesfully runned...");
    
            conn.commit();
        } catch (error) {
            console.error(`There's an error with seeds: ${error.message}.`);

            conn.rollback();
        }
    
        conn.end();
    }).catch(err => {
        console.error("Connection failed, creates a new one...");
        setTimeout(() => {
            runSeeds();
        }, 2000);
    });
};

runSeeds();