import express from "express";
import { showBySessionId } from "../controllers/orders_history.js";

const router = express.Router();

router.get("/session-id/:id", showBySessionId);

export default router;