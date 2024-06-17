import React from 'react';
import { Button } from '@mui/material';
import { colors } from '../../utils/colors';

const gamerImg = require('../../assets/images/gamer.png');


export default function Home() {
    return (
        <div>
            <h1>Welcome!</h1>
            <p> What about change your gaming experience better managing your backlog? Join our app!</p>

            <Button variant="contained" style={{ backgroundColor: colors.black, color: colors.whiteSmoke }}>Sign Up</Button>
            <Button variant="contained" style={{ backgroundColor: colors.darkPurple, color: colors.whiteSmoke }}>Sign In</Button>
            <Button variant="contained" style={{ backgroundColor: colors.sage, color: colors.black }}>About</Button>
            <img src={gamerImg} alt="Gamer" />
            
        </div>
    );
}

