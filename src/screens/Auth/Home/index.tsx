import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../context/hooks";
import { ButtonNavigation } from "../../../components";
import { getProfilePic } from "../../../services/user/getProfilePic";
import { colors } from "../../../utils/colors";

export default function HomeAuth() {
  const { currentUser, logout } = useAuth();
  const [profilePicUri, setProfilePicUri] = useState("");

  const fetchProfilePic = useCallback(async () => {
    try {
      const response = await getProfilePic({ userId: currentUser?.id || "" });
      if (response) {
        setProfilePicUri(response);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchProfilePic();
    }
  }, [currentUser, fetchProfilePic]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Box sx={styles.profileContainer}>
            <img
                src={profilePicUri}
                alt="Profile"
                style={styles.profileImage}
            />
            <Typography variant="h4" mt={4}>
                Welcome, {currentUser?.name || "User"}!
            </Typography>
            <Typography variant="h6" mt={1} color={colors.buttonBlue}>
                {currentUser?.countryName}
            </Typography>
        </Box>

        <Box sx={styles.buttonContainer}>
            <ButtonNavigation
                mt={2}
                sx={styles.accessInfoButton}
                to="/auth/profile"
            >
                Access your info
            </ButtonNavigation>

            <ButtonNavigation
                mt={1}
                sx={styles.logoutButton}
                backgroundColor={colors.redMid}
                onClick={logout}
                to="/"
            >
                Logout
            </ButtonNavigation>
        </Box>
    </Box>
  );
}

const styles = {
    profileContainer: {
        alignItems: "center",
        textAlign: "center",
    },
    profileImage: {
        borderRadius: 64,
        width: 200,
        height: 200,
        border: `1px solid ${colors.black}`,
    },
    buttonContainer: {
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessInfoButton: {
        backgroundColor: colors.sage,
        color: colors.black,
    },
    logoutButton: {
        backgroundColor: colors.redMid,
        color: colors.black,
    },
};
