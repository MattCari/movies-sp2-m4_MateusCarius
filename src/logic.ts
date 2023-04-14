import { Request, Response } from "express";
import format from "pg-format";
import { client } from "./database";
import { IMoviesRequest, MovieResult } from "./interfaces";

const registerMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: IMoviesRequest = req.body;
  const queryString = format(
    `
        INSERT INTO movies(%I)
        VALUES(%L)
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: MovieResult = await client.query(queryString);
  const createdMovie = queryResult.rows[0];

  return res.status(201).json(createdMovie);
};
const getMovies = async (req: Request, res: Response): Promise<Response> => {
  const { category } = req.query;
  let queryString;

  if (category) {
    queryString = format(
      `
      SELECT * FROM movies
      WHERE category = %L;
    `,
      category
    );
  } else {
    queryString = `
    SELECT * FROM movies;
`;
  }
  const queryResult: MovieResult = await client.query(queryString);
  const allMovies = queryResult.rows;

  return res.status(200).json(allMovies);
};
const getMovieById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const queryString = format(
    `
        SELECT * FROM movies
        WHERE id = %L;
    `,
    id
  );
  const queryResult: MovieResult = await client.query(queryString);
  const movie = queryResult.rows[0];

  return res.status(200).json(movie);
};
const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const payload: IMoviesRequest = req.body;

  const queryString = format(
    `
        UPDATE movies
        SET(%I) = ROW(%L)
        WHERE id = %L
        RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload),
    id
  );

  const queryResult: MovieResult = await client.query(queryString);
  const updatedMovie = queryResult.rows[0];

  return res.status(200).json(updatedMovie);
};
const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  const queryString = format(
    `
        DELETE from movies
        WHERE id = %L
    `,
    id
  );

  client.query(queryString);
  return res.status(204).json();
};

export { registerMovie, getMovies, getMovieById, updateMovie, deleteMovie };
