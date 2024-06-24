import React from 'react';
import { Box } from '@mui/material';
import { ButtonNavigation, Heading } from '../../components';
import { colors } from '../../utils/colors';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '80%',
        height: '40vw', 
        margin: 'auto',
    },
    responsiveContainer: {
        '@media (max-width: 800px)': {
            height: '150vw',
            marginBottom: '2rem',
        },
    }
  };

const NotFoundPage = () => {
  return (
    <Box sx={[styles.responsiveContainer, styles.container]}>
      <Heading>No content was found, please go back to home page</Heading>
      <ButtonNavigation to='/home' p={0.5} fs={18} h={3.5} textColor={colors.black} mt={2} w={10}>
        Go to Home
      </ButtonNavigation>
    </Box>
  );
};

export default NotFoundPage;
