import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat', // El nombre de la fuente que cargaste de Google Fonts
      'Roboto',     // Un fallback si Montserrat no carga (MUI lo usa por defecto)
      'Arial',      // Otro fallback genérico
      'sans-serif', // Último recurso
    ].join(','),
    // Opcional: Puedes personalizar tamaños de fuente específicos si lo necesitas
    // h1: {
    //   fontSize: '3.5rem',
    //   fontWeight: 700,
    // },
    // body1: {
    //   fontSize: '1rem',
    // },
  },
  // ...otras configuraciones de tu tema (paleta de colores, etc.)
});

export default theme;