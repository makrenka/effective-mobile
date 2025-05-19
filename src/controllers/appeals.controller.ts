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

export const takeInWork = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query(
    "UPDATE appeals SET status = 'in_progress', updated_at = NOW() WHERE id = $1 RETURNING *",
    [id]
  );
  res.json(result.rows[0]);
};

export const completeAppeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { resolution } = req.body;
  const result = await pool.query(
    "UPDATE appeals SET status = 'completed', resolution = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [resolution, id]
  );
  res.json(result.rows[0]);
};

export const cancelAppeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason } = req.body;
  const result = await pool.query(
    "UPDATE appeals SET status = 'cancelled', cancellation_reason = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
    [reason, id]
  );
  res.json(result.rows[0]);
};

export const listAppeals = async (req: Request, res: Response) => {
  const { date, from, to } = req.query;

  let query = "SELECT * FROM appeals WHERE 1=1";
  const values: any[] = [];
  let count = 1;

  if (date) {
    query += ` AND DATE(created_at) = $${count++}`;
    values.push(date);
  }

  if (from && to) {
    query += ` AND created_at BETWEEN $${count++} AND $${count++}`;
    values.push(from, to);
  }

  const result = await pool.query(query, values);
  res.json(result.rows);
};

export const cancelAllInWork = async (_req: Request, res: Response) => {
  const result = await pool.query(
    "UPDATE appeals SET status = 'cancelled', cancellation_reason = 'Auto-cancelled', updated_at = NOW() WHERE status = 'in_progress' RETURNING *"
  );
  res.json(result.rows);
};
