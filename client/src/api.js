import axios from "axios";
const url = "http://localhost:5000/api/movies";
const logsUrl = "http://localhost:5000/logs";
const url3 = "http://localhost:5000/updateNoImage";
import { logEvent } from "./logEvent";
export default class API {
  //get all movies from server
  static async getAllMovies() {
    const res = await axios.get(url);
    return res.data;
  }
  static async getAllLogs() {
    const res = await axios.get(logsUrl);
    return res.data;
  }
  //get movie by id
  static async getMovieById(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  //create movie
  static async createMovie(movie) {
    const res = await axios.post(url, movie);
    await logEvent("Admin", "Created", movie.title);
    return res.data;
  }
  //update movie
  static async updateMovie(id, movie) {
    const res = await axios.patch(`${url}/${id}`, movie);
    await logEvent("Admin", "Updated", movie.title);
    return res.data;
  }
  //update no image
  static async updateMovieNoImage(id, movie) {
    const res = await axios.patch(`${url3}/${id}`, movie);
    await logEvent("Admin", "Updated", movie.title);
    return res.data;
  }
  //delete movie
  static async deleteMovie(id) {
    const res = await axios.delete(`${url}/${id}`);
    const res2 = await axios.get(`${url}/${id}`);
    await logEvent("Admin", "Deleted", res2.title);
    return res.data;
  }
  //movies by category
  static async moviesByCategory(category) {
    const res = await axios.get(url);
    const movies = res.data;
    const filteredMovies = movies.filter(
      (movie) => movie.category === category
    );
    return filteredMovies;
  }

  //get movie by name
  static async getMovieByTitle(title) {
    const res = await axios.get(url);
    const movies = res.data;
    const movie = movies.find((movie) => movie.title === title);
    return movie;
  }

  //3 most-watched movies
  static async getMostViewedMovies() {
    const res = await axios.get(url);
    const movies = res.data;
    const sortedMovies = movies.sort((a, b) => b.viewcount - a.viewcount);
    return sortedMovies.slice(0, 3);
  }
}
