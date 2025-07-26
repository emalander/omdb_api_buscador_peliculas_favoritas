

import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';

const MovieCard = ({ title, year, poster, imdbId, showDetail, onToggleFavorite, isFavorite  }) => {

  const handleIconDetailClick = () => {
    if (showDetail) {
      showDetail(imdbId);
    }
  };

  const handleIconShareClick = () => {
    console.log("compartir")
  }

  const handleIconLikeClick = (imdbId) => {
    console.log("elegir");
    onToggleFavorite(imdbId);
  };
  return (
    <Box 
      sx={{
        background: 'linear-gradient(35deg, #94a3b8, #cffafe, #ecfeff, #94a3b8)', // from-red-400 via-yellow-400 to-green-400
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden',
      }}
    >
      <img
        src={poster}
        alt={title}
        className="w-full h-80 object-contain mt-2 rounded-lg"
      />
      <div className="p-2">
        <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">{title}</h3>
        <p className="text-gray-600 text-sm pb-1">Año: {year}</p>
        <div className='bg-cyan-150 rounded-lg flex space-x-3'>
          <IconButton aria-label="añadir/quitar de favoritos" onClick={handleIconDetailClick}>
            <VisibilityIcon/>
          </IconButton>
          <IconButton aria-label="añadir/quitar de favoritos" onClick={()=>handleIconLikeClick(imdbId)}>
            {isFavorite ? 
              <FavoriteIcon color="error" /> 
              : 
              <FavoriteBorderIcon /> 
            }
          </IconButton>
          <IconButton aria-label="añadir/quitar de favoritos" onClick={()=>handleIconShareClick}>
            <ShareIcon/>
          </IconButton>
        </div> 
      </div>
    </Box>
  );
};

export default MovieCard;