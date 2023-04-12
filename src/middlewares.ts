import { NextFunction, Request, Response } from "express";
import format from "pg-format";
import { client } from "./database";
import { MovieResult } from "./interfaces";

const ensureIdExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { id } = req.params;
  const queryString = format(`
    SELECT * FROM movies
    WHERE id = %L
    `,id);

    const queryResult: MovieResult = await client.query(queryString)
    if(queryResult.rowCount == 0){
        return res.status(404).json({
            error: "Movie not found!"
        })
    }
    return next()
};

const nameAlreadyExists =  async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {name} =  req.body
    const queryString = format(`
        SELECT name FROM movies
        WHERE name = %L
    `, name)
    const queryResult: MovieResult = await client.query(queryString)
    console.log(queryResult.rows)
    if(queryResult.rowCount > 0){
        return res.status(409).json({
            error: "Name already exists!"
        })
    }else{
        return next()
    }
}

export {ensureIdExists, nameAlreadyExists}