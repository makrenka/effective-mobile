import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import appealsRouter from "./routes/appeals";

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(bodyParser.json());
app.use("/appeals", appealsRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
