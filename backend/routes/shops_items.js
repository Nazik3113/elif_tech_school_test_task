import express from "express";
import { show } from "../controllers/shops_intems.js";

const router = express.Router();

router.get("/:id", show);

export default router;