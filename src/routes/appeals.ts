import express from "express";
import { createAppeal } from "../controllers/appeals.controller";

const router = express.Router();

router.post("/", createAppeal);

export default router;
