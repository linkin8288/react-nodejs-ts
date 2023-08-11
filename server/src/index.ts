import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello node")
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});