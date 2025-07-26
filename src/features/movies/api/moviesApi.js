import axiosInstance from "../../../services/axiosInstance";
import { OMDB_API_KEY } from "../../../services/apiConfig";

/**
 * Busca películas por un término de búsqueda y página.
 * @param {string} query El término de búsqueda (ej. "Batman").
 * @param {number} page La página de resultados a solicitar (por defecto 1).
 * @returns {Promise<Array>} Un array de objetos de películas.
 * @throws {Error} Si la solicitud falla o la API no devuelve resultados.
 */
console.log("OMDB_API_KEY ", OMDB_API_KEY)

export const searchMovies = async (query, page = 1) => {

  try {
    const response = await axiosInstance.get('/', {
      params: {
        s:query,
        page: page,
        apikey: OMDB_API_KEY,
      }

    })
    if(response.data.Response === "False") {
      throw new Error(response.data.Error||"NO se encontraron...");
    }
    console.log(response.data)
    return response.data;
      
  } catch (error) {
    console.log(`Error searching movies for "${query}" (page ${page}):`, error);
    throw error; 
  }

}

export const searchMovieDetails = async (imdbId) => {
  
  try {
    const response = await axiosInstance.get('/', {
      params: {
        i:imdbId,
        apikey: OMDB_API_KEY,
      }

    })
    if(response.data.Response === "False") {
      throw new Error(response.data.Error||"No se encontraron...");
    }
    console.log(response.data)
    return response.data;
      
  } catch (error) {
    console.log(`Error searching movies for "${imdbId}"`, error);
    throw error; 
  }

}