import { Request, Response } from "express";
import pool from "../db";

export const createAppeal = async (req: Request, res: Response) => {
  try {
    const { subject, message } = req.body;

    const newAppeal = await pool.query(
      "INSERT INTO appeals (subject, message) VALUES ($1, $2) RETURNING *",
      [subject, message]
    );

    res.json(newAppeal.rows[0]);
  } catch (err) {
    console.error("Error creating appeal:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
