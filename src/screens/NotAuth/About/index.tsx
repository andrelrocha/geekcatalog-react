import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { fontSize, lineHeight, padding, textAlign, width } from "@mui/system";
import { Heading } from "../../../components";

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
        </Box>
    );
}
