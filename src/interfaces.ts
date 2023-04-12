import { QueryResult } from "pg"

interface IMovies {
    id: number
    name: string
    category: string
    duration: number
    price: number
}

type IMoviesRequest = Omit<IMovies, "id">

type MovieResult = QueryResult<IMovies>

export{IMovies, IMoviesRequest, MovieResult}