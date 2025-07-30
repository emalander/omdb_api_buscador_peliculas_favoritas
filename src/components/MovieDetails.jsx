//import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useMovieDetail} from '../features/movies/hooks/useMovies';

const MovieDetails = ({ imdbID, open, onClose, onToggleFavorite =() => {}, favoriteMovies = [] }) => {
  
  const { movieDetail, loading, error } = useMovieDetail(imdbID);

  const isFavorite = movieDetail ? favoriteMovies.some(favMovie => favMovie.imdbID === movieDetail.imdbID) : false;

  const handleToggleFavoriteClick = () => {
    if (movieDetail && onToggleFavorite) { // Aseguramos que movieDetail existe y la prop onToggleFavorite fue pasada
      onToggleFavorite(movieDetail); // Pasamos el objeto completo de la película
    }
  };

  return (
    
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, background: 'linear-gradient(35deg, #94a3b8, #cffafe, #ecfeff, #94a3b8)'}}>
        {loading ? "Cargando..." : "Detalles de la película"}
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
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" sx={{ p: 4, textAlign: 'center' }}>
            Error al cargar detalles: {error.message}
          </Typography>
        )}
        {movieDetail && !loading && !error && (
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ flexShrink: 0 }}>
              <img
                src={movieDetail.Poster !== 'N/A' ? movieDetail.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                alt={movieDetail.Title}
                style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
            <Box>
              <Typography variant="h5" component="h2" gutterBottom>
                <div className="text-center p-2 bg-slate-500 text-white rounded-lg">{movieDetail.Title} ({movieDetail.Year})</div>
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                  Sinopsis:
                </Typography>
                <Typography variant="body1" component="p">
                  {movieDetail.Plot !== 'N/A' ? movieDetail.Plot : 'Sinopsis no disponible.'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline'}}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                  Género:
                </Typography>
                <Typography variant="body1" component="span" className="p-1">
                  {movieDetail.Genre}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline'}}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                  Director:
                </Typography>
                <Typography variant="body1" component="span" className="p-1">
                  {movieDetail.Director}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline'}}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                  Actores:
                </Typography>
                <Typography variant="body1" component="span" className="p-1">
                  {movieDetail.Actors}
                </Typography>
              </Box>
              {movieDetail.imdbRating && movieDetail.imdbRating !== 'N/A' && (
                <Box sx={{ display: 'flex', alignItems: 'baseline'}}>
                  <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
                    IMDb Rating:
                  </Typography>
                  <Typography variant="body1" component="span" className="p-1">
                    {movieDetail.imdbRating} ({movieDetail.imdbVotes} votos)
                  </Typography>
                </Box>
              )}
              {favoriteMovies.length > 0 && (
                <Button
                  variant="contained"
                  onClick={handleToggleFavoriteClick}
                  startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  sx={{
                    mt: 2,
                    backgroundColor: isFavorite ? 'rgb(220 38 38)' : 'rgb(100 116 139)', // Rojo si es favorito, gris si no
                    '&:hover': {
                      backgroundColor: isFavorite ? 'rgb(185 28 28)' : 'rgb(71 85 105)',
                    },
                    textTransform: 'none',
                  }}
                >
                  {isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
                </Button>
              )}

            </Box>
          </Box>
        )}
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
  );
}

export default MovieDetails;