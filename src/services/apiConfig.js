export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
console.log(OMDB_API_KEY)
export const getOmdbSearchUrl = (query) => `?s=${query}&apikey=${OMDB_API_KEY}`;