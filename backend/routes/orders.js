import express from "express";
import { create } from "../controllers/orders.js";

const router = express.Router();

router.post("/", create);

export default router;