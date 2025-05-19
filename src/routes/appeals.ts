import express from "express";
import {
  cancelAllInWork,
  cancelAppeal,
  completeAppeal,
  createAppeal,
  listAppeals,
  takeInWork,
} from "../controllers/appeals.controller";

const router = express.Router();

router.post("/", createAppeal);
router.patch("/:id/take", takeInWork);
router.patch("/:id/complete", completeAppeal);
router.patch("/:id/cancel", cancelAppeal);
router.get("/", listAppeals);
router.patch("/cancel-in-work/all", cancelAllInWork);

export default router;
