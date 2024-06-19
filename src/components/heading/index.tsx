import React from 'react';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  mt?: number;
  mb?: number;
  fs?: number;
  color?: string;
  textAlign?: string;
  w?: number;
  style?: React.CSSProperties;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
}

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h3',
          subtitle2: 'span',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});
  

const Heading = (props: HeadingProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant={props.variant || 'h1'}
        sx={{
          fontSize: props.fs || 34,
          textAlign: props.textAlign || 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          marginBottom: props.mb || 0,
          color: props.color || 'black',
          marginTop: props.mt || 0,
          width: props.w || '100%',
          ...(props.style || {}),
        }}
      >
        {props.children}
      </Typography>
    </ThemeProvider>
  );
};

export default Heading;
