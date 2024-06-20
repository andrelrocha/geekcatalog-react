import React from 'react';
import { Box, Button } from '@mui/material';
import { colors } from '../../../utils/colors';
import { ButtonNavigation, Heading } from '../../../components';

const gamerImg = require('../../../assets/images/gamer.png');

const styles = {
    container: {
        margin: 'auto',
        width: '70%',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        height: '100vh',
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        marginBottom: 10,
        gap: 5,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        width: '24rem' as const,
    },
    responsiveHeading: {
        '@media (max-width: 430px)': {
            fontSize: '1.5rem',
            textAlign: 'center',
        },
    },
    responsiveButton: {
        '@media (max-width: 510px)': {
            width: '90%', 
        },
    },
    responsiveBackground: {
        '@media (min-width: 1200px)': {
            width: '100%',
            backgroundImage: `url(${gamerImg})`,
            backgroundSize: '20%',
            backgroundPosition: 'calc(100% - 2rem) 95%',
            backgroundRepeat: 'no-repeat', 
        },
    },
}

export default function Home() {
    return (
        <Box sx={[styles.responsiveBackground, styles.container]}>
            <Box sx={[styles.responsiveHeading, styles.headingContainer]}>
                <Heading textAlign='flex-start'>Welcome!</Heading>
                <Heading textAlign='flex-start' fs={18}> What about change your gaming experience better managing your backlog? <br/> Join our app!</Heading>
            </Box>

            <Box sx={[styles.responsiveButton, styles.buttonContainer]}>    
                <ButtonNavigation to='/login' backgroundColor={colors.black} textColor={colors.whiteSmoke}>Sign In</ButtonNavigation>
                <ButtonNavigation to='/signup' backgroundColor={colors.greenStrong} >Sign Up</ButtonNavigation>
                <ButtonNavigation to='/about' backgroundColor={colors.sage} textColor={colors.black}>About</ButtonNavigation>
            </Box>
        </Box>
    );
}

