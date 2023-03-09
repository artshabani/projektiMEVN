import axios from "axios";
const url = "http://localhost:5000/api/movies";

export default class API {
  //get all movies from server
  static async getAllMovies() {
    const res = await axios.get(url);
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
    return res.data;
  }
  //update movie
  static async updateMovie(id, movie) {
    const res = await axios.patch(`${url}/${id}`, movie);
    return res.data;
  }
  //delete movie
  static async deleteMovie(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}
