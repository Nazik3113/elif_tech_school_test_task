import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import shopsRoutes from "./routes/shops.js";
import shopsItemsRoutes from "./routes/shops_items.js";
import ordersRoutes from "./routes/orders.js";
import ordersHistoryRoutes from "./routes/orders_history.js";

const app = express();
const PORT = process.env.PORT || 5000;

const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};
  
app.use(cors(corsOpts));
app.use(bodyParser.json());

app.use("/shops", shopsRoutes);
app.use("/shops-items", shopsItemsRoutes);
app.use("/orders", ordersRoutes);
app.use("/orders-history", ordersHistoryRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:8088`);
});