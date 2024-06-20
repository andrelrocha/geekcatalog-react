import React from 'react';
import { Box } from '@mui/material';
import { colors } from '../../utils/colors';
import { ButtonNavigation, Heading } from '../../components';
import { ReactComponent as LogoImg } from '../../assets/images/logo.svg';


const styles = {
  toolbar: {
    backgroundColor: colors.black,
    display: 'flex',
    alignItems: 'center',
    color: colors.whiteSmoke,
    padding: '1rem 6rem',
    '@media (max-width: 768px)': {
      padding: '0 4rem',
    },
    '@media (max-width: 576px)': {
      padding: '0 2rem',
    },
  },
  spacer: {
    flex: 1,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  logoTitle: {
    fontFamily: 'var(--mainFont)',
    fontWeight: 'var(--titleFontWeight)',
    color: colors.whiteSmoke,
  },
  buttonsContainer: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
};

const Header = () => {
  return (
    <header>
      <Box sx={styles.toolbar}>
        <Box sx={styles.logoContainer}>
          <LogoImg width="40" height="40" />
          <Heading fs={22} style={styles.logoTitle}>Geek Catalog</Heading>
        </Box>
        <span style={styles.spacer}></span>
        <Box sx={styles.buttonsContainer} id="buttonsContainer">
          <ButtonNavigation to='/home' variant="outlined" p={0.1} br={0.5} fs={12} h={2.2} textColor={colors.whiteSmoke}>Home</ButtonNavigation>
          <ButtonNavigation to='/about' variant='outlined' p={0.1} br={0.5} fs={12} h={2.2} textColor={colors.whiteSmoke}>About</ButtonNavigation>
          <ButtonNavigation to='/login' variant="outlined" p={0.1} br={0.5} fs={12} h={2.2} backgroundColor={colors.whiteSmoke} textColor={colors.black} >Sign In</ButtonNavigation>
          <ButtonNavigation to='/signup' p={0.1} br={0.5} fs={12} h={2.2} backgroundColor={colors.greenStrong} textColor={colors.whiteSmoke}>Sign Up</ButtonNavigation>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
