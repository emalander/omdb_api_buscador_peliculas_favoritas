import {useState, useEffect} from 'react';
import { searchMovies } from '../api/moviesApi';
import { searchMovieDetails } from '../api/moviesApi';

export const useMovieSearch = (query, page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);


  useEffect(() => {
    if(!query){
      setMovies([]);
      setLoading(false);
      setTotalResults(0); 
      return;
    }
    const fetchMovies = async()=> {
      setLoading(true);
      setError(null);
      try {
        const responseData = await searchMovies(query, page);
        console.log("OMDb API Response:", responseData);

        // OMDb devuelve { Search: [...], totalResults: "X", Response: "True" }
        if (responseData.Response === "True" && responseData.Search) {
          setMovies(responseData.Search);
          setTotalResults(parseInt(responseData.totalResults, 10) || 0);
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(new Error(responseData.Error || "No se encontraron películas."));
        }
      } catch (error) {
        setError(error);
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounceTimeout);

  }, [query, page])
  return {movies, loading , error, totalResults};
}

export const useMovieDetail=(imdbId) => {

  const [movieDetail, setMovieDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(imdbId, "---------- useMovies -- imdbId")

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!imdbId) {
        setMovieDetail(null);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const responseData = await searchMovieDetails(imdbId);
        console.log("OMDb API Response:", responseData);

        if (responseData && responseData.Response === "True") {
          setMovieDetail(responseData);
        } else {
          setMovieDetail(null);
          setError(new Error(responseData.Error || "No movie details found."));
        }
      } catch (error) {
        setError(error);
        setMovieDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbId]);

  return {movieDetail, loading , error};

}