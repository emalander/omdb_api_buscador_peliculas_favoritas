
import './styles/App.css'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete, Box, Container, InputAdornment  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useMovieSearch} from './features/movies/hooks/useMovies';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import MovieFavoriteTable  from './components/MovieFavoriteTable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export function Button1() {
  return <Button variant="contained">Hola MUI</Button>;
}

function App() {

  const [searchTerm, setSearchTerm] = useState('batman');
  const [inputValue, setInputValue] = useState(''); 
  const [page, setPage] = useState(1);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openFavoriteListDialog, setOpenFavoriteListDialog] = useState(false);
  const [imdbIDMovie, setImdbIDMovie] = useState('');
  const [movieArrayList, setMovieArrayList] = useState([]);
  const { movies, loading, error, totalResults } = useMovieSearch(searchTerm, page);

  const totalPages = Math.ceil(totalResults / 10);

  const handleToggleFavorite = (movieData) => {
    
    if (!movieData || !movieData.imdbID) {
      console.error("handleToggleFavorite: movieData o imdbID es indefinido.", movieData);
      return;
    }

    if (movieArrayList.some(movie => movie.imdbID === movieData.imdbID)) {
      
      setMovieArrayList(prevList => prevList.filter(movie => movie.imdbID !== movieData.imdbID));
      console.log(`Eliminado de favoritos: ${movieData.Title || movieData.imdbID}`);
    } else {

      setMovieArrayList(prevList => [...prevList, movieData]);
      console.log(`Añadido a favoritos: ${movieData.Title || movieData.imdbID}`);
    }
  };
  
  useEffect(() => {
    
    const storedFavorites = localStorage.getItem('favoriteMoviesData');
    if (storedFavorites) {
      try {
        setMovieArrayList(JSON.parse(storedFavorites));
      } catch (e) {
        console.error("Error al parsear favoritos de localStorage:", e);
        localStorage.removeItem('favoriteMoviesData');
      }
    }
  }, [openFavoriteListDialog]);

  useEffect(() => {
    
    localStorage.setItem('favoriteMoviesData', JSON.stringify(movieArrayList));
    console.log("App.jsx: movieArrayList actualizado y guardado:", movieArrayList);

  }, [movieArrayList]);
  
  const handleInputChange = (event, newInputValue, reason) => {
    
    setInputValue(newInputValue);
    if (reason === 'input' || reason === 'clear') {
        setSearchTerm(newInputValue);
        setPage(1);
    }
  };

  const handleChange = (event, newValue) => {
    
    if (newValue) {
      setSearchTerm(newValue.label);
      setPage(1); 
    } else {
      setSearchTerm(''); 
      setPage(1);
    }
  };

  const arrayFilms = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
  ]

  const handleShowDetail = (imdbID) => {
    
    setOpenDetailDialog(true)
    setImdbIDMovie(imdbID)
  }
  const handleShowFavorites= () => {
    
    setOpenFavoriteListDialog(true)
  }

  const handleCloseDetail =() => {
    setOpenDetailDialog(false)
  }
  const handleCloseFavorites =() => {
    setOpenFavoriteListDialog(false)
  }

  return (
    <>
      <div className="p-1 text-gray-300 text-left">
        <h1 className="p-1 
          text-5xl 
          font-semibold 
          bg-gradient-to-br from-slate-400 via-cyan-100 to-cyan-50 
          bg-clip-text 
          text-transparent 
          text-left">Mi listado de películas</h1>
        <h1 className="p-1 text-3xl font-medium text-gray-300 text-left"><p>
          Buscador de películas por título.
        </p></h1>
      </div>
      <br></br>
      
      <Container maxWidth="lg" sx={{
          padding: 4,
          backgroundColor: '#d1d5db', // Equivalente a 'bg-gray-300' de Tailwind
          textAlign: 'left',
          borderRadius: '0.5rem', 
          width:'250vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center',gap: 3}}>
          <Autocomplete
            disablePortal
            options={arrayFilms}
            sx={{ width: 800}}
            onInputChange={handleInputChange}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Buscar Película" />}
          />
           <TextField
              variant="outlined"
              readOnly
              InputProps={{
                 startAdornment: (
                   <InputAdornment position="start" sx={{gap:4}}>
                    <Chip
                      variant="outlined"
                      label={
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <FavoriteIcon color="error" sx={{ fontSize: '1.2rem' }} />
                          <Typography 
                            variant="body1" 
                            component="span"
                            sx={{ 
                              fontWeight: 'bold', 
                              fontSize: '1.2rem',
                              lineHeight: 1
                            }}
                          >
                            {movieArrayList.length}
                          </Typography>
                          <Tooltip title="Ver mi lista" variant="outlined">
                            <IconButton 
                              size="lg"
                              sx={{ p: 0 }}
                              onClick={handleShowFavorites}
                            >
                              <VisibilityIcon sx={{ fontSize: '1.2rem', ml: 0.5 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                      sx={{
                        backgroundColor: '#ecfeff',
                        color: 'black',
                        '& .MuiChip-label': { 
                          fontWeight: 'bold',
                          fontSize: '1rem',
                        }
                      }}
                    />
                   </InputAdornment>
                 ),
              }}
              sx={{
                width: 200, 
              }}
            />
        </Box>
        {loading && 
          <div className="text-center p-4 text-blue-600">
            Cargando películas...
          </div>
        }
        {error && 
          <div className="text-center p-4 text-red-600">
            Error: {error.message}. Por favor, inténtalo de nuevo.
          </div>
        }
        {!loading && !error && movies.length === 0 && searchTerm && (
          <div className="text-center p-4 text-gray-700">
            No se encontraron películas para "{searchTerm}".
          </div>
        )}
        {!loading && !error && movies.length === 0 && !searchTerm && (
          <div className="text-center p-4 text-gray-700">
            Escribe algo para empezar a buscar películas.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {movies.map((movie) => {
            
            if(movie.Poster === 'N/A' || movie.Type !== "movie") {
              return null;
            } return (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                poster={movie.Poster}
                imdbId={movie.imdbID}
                showDetail={handleShowDetail}
                onToggleFavorite={() => handleToggleFavorite(movie)}
                isFavorite={movieArrayList.some(favMovie => favMovie.imdbID === movie.imdbID)}
              />
            )
          })}
        </div>
      </Container>
      {openDetailDialog && 
        <MovieDetails imdbID={imdbIDMovie}
          open={openDetailDialog}
          onClose={handleCloseDetail}
          onToggleFavorite={handleToggleFavorite}
          favoriteMovies={movieArrayList}
        />
      }
      {openFavoriteListDialog && 
        <MovieFavoriteTable
          onClose={handleCloseFavorites}
        />
      }
    </>
  )
}

export default App
