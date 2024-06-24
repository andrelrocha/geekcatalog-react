import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '../../utils/colors';

const footerBackground = require('../../assets/images/background-footer.jpg');

const Footer = () => {
    const styles = {
        footer: {
            backgroundImage: `url(${footerBackground})`,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr',
            gap: '0px 0px',
            gridTemplateAreas: `"copyright-text LogoRodape ."`,
            alignItems: 'center',
            padding: '1rem 2rem',
            '@media (max-width: 768px)': {
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: '1rem',
            },
        },
        copyrightText: {
            justifySelf: 'center',
            gridArea: 'copyright-text',
            color: colors.whiteSmoke,
        },
        containerFooter: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginLeft: '2.5rem',
        },
        responsiveText: {
            '@media (max-width: 430px)': {
                fontSize: '0.7rem',
                width: '85%'
            },
        },
    };

    return (
        <footer>
            <Box sx={styles.footer}>
                <Box sx={styles.containerFooter}>
                    <Typography variant="body2" sx={[styles.responsiveText, styles.copyrightText]}>
                        &copy; 2024. Geek Catalog done by André Rocha
                    </Typography>
                    <Typography variant="body2" color="white" sx={styles.responsiveText}>
                        &copy; React &copy; Springboot &copy; React Native
                    </Typography>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
