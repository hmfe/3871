import axios from "axios";
import config from "../../api/config.json";

export function searchMovie(query) {
  return axios
    .get(`${config.baseUrl}/?apikey=${config.access_key}&s=${query}`)
    .then(result => {
      if (result.data.Error) {
        return {
          type: "error",
          payload: {
            error: result.data.Error
          }
        };
      } else {
        return {
          type: "search",
          payload: {
            movies: result.data.Search || []
          }
        };
      }
    })
    .catch(error => console.log(error));
}
