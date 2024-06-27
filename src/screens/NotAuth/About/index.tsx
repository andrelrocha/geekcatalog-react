import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import AndroidIcon from '@mui/icons-material/Android';
import { ButtonLoading, Heading } from "../../../components";
import { downloadApk } from "../../../services/infra/downloadApk";
import { colors } from "../../../utils/colors";

const myPhoto = require('../../../assets/images/profile.jpg');

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 2,
        marginTop: 2,
    },
    textContainer: {
        width: 400,
        gap: 5,
        alignItems: "center",
    },
    text: {
        fontFamily: 'Poppins',
        textAlign: 'center',
        lineHeight: 1.5,
        fontSize: 16
    },
    button: {
        width: '20%',
        height: '10%',
        marginBottom: 2,
    },
    buttonInnerContent: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        color: colors.black
    },
    responsiveTextContainer: {
        '@media (max-width: 510px)': {
            width: '90%', 
        },
    },
    responsiveText: {
        '@media (max-width: 425px)': {
            fontSize: 12,
        },
    }
}

export default function About() {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const data = await downloadApk();
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'geekcatalog-v.1.0.2.apk');
            document.body.appendChild(link);
            link.click();
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        } catch (error) {
            console.error("Failed to download APK:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={styles.container}>
            <Heading fs={32} mb={2}>About me and the project</Heading>
            
            <Box sx={[styles.responsiveTextContainer, styles.textContainer]}>
                <Typography sx={[styles.responsiveText, styles.text]}>
                    This project was created to study and practice the development of web applications with React.<br/>
                    The project uses a first person API developed by me using Spring Boot.<br/>
                    It has an authentication flow with JWT validation for easy and secure access to the application.<br/>
                    It was also used to present as a Software project in college in "Engenharia de Software" class.<br/>
                    I hope you enjoy the project and feel free to contact me for any questions.
                </Typography>
            </Box>

            <Avatar src={myPhoto} alt="My Photo" sx={{ width: 200, height: 200, borderRadius: '50%', marginTop: 2, marginBottom: 2 }} />

            <Typography sx={styles.text} variant="subtitle1" fontWeight={700} fontSize={16}>Developed by: André Rocha</Typography>
            <Typography sx={styles.text} fontWeight={600}>Fullstack developer</Typography>

            <Box sx={styles.button}>
                <ButtonLoading
                    mt={1}
                    isLoading={isLoading}
                    backgroundColor={colors.sage}
                    onClick={handleDownload}
                    
                    >
                        <Box sx={styles.buttonInnerContent}>
                            Download Mobile App <AndroidIcon />
                        </Box>
                </ButtonLoading>
            </Box>
        </Box>
    );
}
