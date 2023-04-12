import express, { Application, json } from "express";
import { connectDatabase } from "./database";
import {
  deleteMovie,
  getMovieById,
  getMovies,
  registerMovie,
  updateMovie,
} from "./logic";
import { ensureIdExists, nameAlreadyExists } from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/movies", registerMovie);
app.get("/movies", getMovies);
app.get("/movies/:id", ensureIdExists, getMovieById);
app.patch("/movies/:id", ensureIdExists,nameAlreadyExists, updateMovie);
app.delete("/movies/:id", ensureIdExists, deleteMovie);

const PORT: number = 3000;
const runningMsg = `server is running at http://localhost:${PORT}`;
app.listen(PORT, async () => {
  await connectDatabase();
  console.log(runningMsg);
});
