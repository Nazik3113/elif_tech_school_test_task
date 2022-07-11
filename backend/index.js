import express from "express";
import bodyParser from "body-parser";

import shopsRoutes from "./routes/shops.js";
import shopsItemsRoutes from "./routes/shops_items.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/shops", shopsRoutes);
app.use("/shops-items", shopsItemsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: https://localhost:${PORT}`);
});