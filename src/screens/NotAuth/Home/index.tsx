import React from 'react';
import { Box, Button } from '@mui/material';
import { colors } from '../../../utils/colors';
import { Heading } from '../../../components';

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
    button: {
        width:  '100%' as const,
        height: '3rem' as const,
        borderRadius: 12,
        transition: 'width 0.3s ease-in-out',
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
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat', 
        },
    },
}

export default function Home() {
    return (
        <Box sx={[styles.responsiveBackground, styles.container]}>
            <Box sx={styles.headingContainer}>
                <Heading textAlign='flex-start'>Welcome!</Heading>
                <Heading textAlign='flex-start' fs={18}> What about change your gaming experience better managing your backlog? <br/> Join our app!</Heading>
            </Box>


            <Box sx={[styles.responsiveButton, styles.buttonContainer]}>
                <Button variant="contained" sx={[styles.button, { backgroundColor: colors.black, color: colors.whiteSmoke }]}>Sign Up</Button>
                <Button variant="contained" sx={[styles.button, { backgroundColor: colors.darkPurple, color: colors.whiteSmoke }]}>Sign In</Button>
                <Button variant="contained" sx={[styles.button, { backgroundColor: colors.sage, color: colors.black }]}>About</Button>
            </Box>
        </Box>
    );
}

