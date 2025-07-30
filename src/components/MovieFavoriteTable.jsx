//import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useMovieDetail} from '../features/movies/hooks/useMovies';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import MovieDetails from './MovieDetails';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';


const MovieFavoriteTable = ({open, onClose }) => {

  const [arrayMoviesFromLocalStorage, setArrayMoviesFromLocalStorage] = useState([])
  const [showDetailFavoriteMovie, setShowDetailFavoriteMovie] = useState(false)
  const [movieFavoriteSelected, setMovieFavoriteSelected] = useState('')

  useEffect( () => {
    try {
      // Intenta obtener los datos del localStorage
      const storedData = localStorage.getItem('favoriteMoviesData');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        
        if (Array.isArray(parsedData)) {
          setArrayMoviesFromLocalStorage(parsedData);
          console.log('Películas favoritas recuperadas de localStorage:', parsedData);
        } else {
          console.warn('Los datos recuperados de localStorage no son un array:', parsedData);
        }
      }
    } catch (error) {
      
      console.error('Error al recuperar o parsear los datos de localStorage:', error);
      
    }
  }, [])


  const handleRemoveMovie = (imdbIDToRemove) => {
    // Filtra el array para crear uno nuevo sin la película a eliminar
    const updatedMovies = arrayMoviesFromLocalStorage.filter(
      (movie) => movie.imdbID !== imdbIDToRemove
    );
    // Actualiza el estado, lo que también disparará el useEffect para guardar en localStorage
    setArrayMoviesFromLocalStorage(updatedMovies);
    localStorage.setItem('favoriteMoviesData', JSON.stringify(arrayMoviesFromLocalStorage));
    console.log('movieArrayList actualizado y guardado:', arrayMoviesFromLocalStorage);
    console.log(`Película con ID ${imdbIDToRemove} eliminada.`);
  };

  const handleFavoriteMovie = (movieFavorite) => {

    console.log("handleFavoriteMovie")
    
    setShowDetailFavoriteMovie(true)
    setMovieFavoriteSelected(movieFavorite)

    console.log(movieFavorite)
  }

  const handleCloseDetailFavorite = () => {
    console.log("handleCloseDetailFavorite")
    setShowDetailFavoriteMovie(false)
  }

  return (
    <>
      <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, background: 'linear-gradient(35deg, #94a3b8, #cffafe, #ecfeff, #94a3b8)'}}>
          {"Mi lista de películas favoritas"}
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[800],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table aria-label="lista de películas favoritas">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Año</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody> 
                {arrayMoviesFromLocalStorage.length > 0 ? (
                  arrayMoviesFromLocalStorage.map((movie, index) => (
                    <TableRow key={movie.imdbID || index}> {/* Usamos imdbID como key si está disponible, sino el índice */}
                      <TableCell>{movie.Title}</TableCell>
                      <TableCell>{movie.Year}</TableCell>
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveMovie(movie.imdbID)}
                          disabled={!movie.imdbID}
                        >
                          <NotInterestedIcon />
                        </IconButton>
                        <IconButton
                          variant="outlined"
                          onClick={() => handleFavoriteMovie(movie)}
                          
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No hay películas en la lista.
                    </TableCell>
                  </TableRow>
                )} 
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ m: 0, p: 2, background: 'linear-gradient(35deg, #94a3b8, #cffafe, #ecfeff, #94a3b8)'}}>
          <Button onClick={onClose} sx={{
            textAlign: 'center',
            padding: 0.5,
            backgroundColor: 'rgb(100 116 139)',
            color: 'white',
            borderRadius: '0.25rem',
            '&:hover': { 
              backgroundColor: 'rgb(71 85 105)',
            },
            textTransform: 'none',
          }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
       {showDetailFavoriteMovie && 
      
        <MovieDetails imdbID={movieFavoriteSelected.imdbID }
          open={true}
          onClose={handleCloseDetailFavorite}
        />
      }
      
    </>
  );
}

export default MovieFavoriteTable