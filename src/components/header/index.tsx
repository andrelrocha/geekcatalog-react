import React, { useState } from 'react';
import { Box, Dialog, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../utils/colors';
import { ButtonNavigation, Heading } from '../../components';
import { ReactComponent as LogoImg } from '../../assets/images/icon.svg';


const styles = {
  toolbar: {
      backgroundColor: colors.black,
      display: 'flex',
      alignItems: 'center',
      color: colors.whiteSmoke,
      padding: '1rem 6rem',
      '@media (max-width: 768px)': {
        padding: '1rem 4rem',
      },
      '@media (max-width: 576px)': {
        padding: '1rem 2rem',
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
      cursor: 'pointer',
  },
  logoTitle: {
      fontFamily: 'var(--mainFont)',
      fontWeight: 'var(--titleFontWeight)',
      color: colors.whiteSmoke,
  },
  modalContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      height: '100%'
  },
  buttonsContainer: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      '@media (max-width: 700px)': {
          display: 'none',
      },
  },
  tableRowIcon: {
      display: 'none',
      '@media (max-width: 700px)': {
          display: 'block',
      },
  },
  responsiveLogo: {
      '@media (max-width: 700px)': {
          display: 'none',
      },
    },
};

const Header = () => {
  const navigate = useNavigate();
  const [modalNavIsOpen, setModalNavIsOpen] = useState(false);

  return (
    <header>
      <Box sx={styles.toolbar}>
        <Box sx={styles.logoContainer} onClick={() => navigate('/')}>
          <Box sx={styles.responsiveLogo}>
            <LogoImg width="40" height="40"/>
          </Box>
          <Heading fs={22} style={styles.logoTitle}>Geek Catalog</Heading>
        </Box>
        <span style={styles.spacer}></span>
        <Box sx={styles.buttonsContainer} id="buttonsContainer">
          <ButtonNavigation to='/home' variant="outlined" p={0.1} br={0.5} fs={12} h={2.2} textColor={colors.whiteSmoke}>Home</ButtonNavigation>
          <ButtonNavigation to='/about' variant='outlined' p={0.1} br={0.5} fs={12} h={2.2} textColor={colors.whiteSmoke}>About</ButtonNavigation>
          <ButtonNavigation to='/login' variant="outlined" p={0.1} br={0.5} fs={12} h={2.2} backgroundColor={colors.whiteSmoke} textColor={colors.black} >Sign In</ButtonNavigation>
          <ButtonNavigation to='/signup' p={0.1} br={0.5} fs={12} h={2.2} backgroundColor={colors.greenStrong} textColor={colors.whiteSmoke}>Sign Up</ButtonNavigation>
        </Box>
        <TableRowsIcon sx={styles.tableRowIcon} onClick={() => setModalNavIsOpen(!modalNavIsOpen)} />
      </Box>

      <Dialog fullScreen open={modalNavIsOpen} onClose={() => setModalNavIsOpen(false)}>
        <DialogActions>
          <IconButton edge="start" color="inherit" onClick={() => setModalNavIsOpen(false)} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <Box sx={styles.modalContent}>
            <ButtonNavigation to='/home' variant="outlined" p={0.5} br={0.5} fs={18} h={3.5} textColor={colors.black} 
                handleStates={() => setModalNavIsOpen(false)}>
                  Home</ButtonNavigation>
            <ButtonNavigation to='/about' variant='outlined' p={0.5} br={0.5} fs={18} h={3.5} textColor={colors.black}
                handleStates={() => setModalNavIsOpen(false)}>
                  About</ButtonNavigation>
            <ButtonNavigation to='/login' variant="outlined" p={0.5} br={0.5} fs={18} h={3.5} textColor={colors.black}
                handleStates={() => setModalNavIsOpen(false)}>
                  Sign In</ButtonNavigation>
            <ButtonNavigation to='/signup' p={0.5} br={0.5} fs={18} h={3.5} backgroundColor={colors.greenStrong} textColor={colors.whiteSmoke}
              handleStates={() => setModalNavIsOpen(false)}>
                Sign Up</ButtonNavigation>
          </Box>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
