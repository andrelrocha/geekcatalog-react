
import React, { useContext } from 'react';
import { Control, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../../utils/colors';
import { Heading, InputPassword, ButtonLoading, InputEmail, ButtonNavigation } from '../../../../components';
import { UserLogin } from '../../../../types/user/userLoginDTO';
import AuthContext from '../../../../context/auth.context';

const backgroundImage = require('../../../../assets/images/background-footer.jpg');

const DEFAULT_FORM_VALUES = { email: "", password: "" };

type FormData = {
  email: string;
  password: string;
};

const styles = {
  container: {
      display: 'flex' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
  },
  signInContainer: {
      display: 'flex' as const,
      flexDirection: 'column' as const,
      alignItems: 'center' as const,
      border: '1px solid',
      borderColor: colors.gray,
      borderRadius: 10,
      padding: '3rem 2rem',
      width: '25rem',
      backgroundColor: colors.whiteSmoke,
  },
  buttonContainer: {
      display: 'flex',
      flexDirection: 'column', 
      width: '90%',
      gap: '1rem',
  },
  responsiveSignInContainer: {
      '@media (max-width: 650px)': {
          width: '100%',
          height: '100%',
          marginTop: '3rem',
      },
  },
};

const Login = () => {
    const { isLoading: isLoggingIn, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        control,
        formState: { isValid },
        handleSubmit,
    } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" });

  
    const handleLogin = async (control: Control<FormData>) => {
        const  { email, password } = control._formValues;

        const userData: UserLogin = {
            login: email,
            password
        };

        await login(userData, () => navigate('/homeauth'));
    };

  const forgotPasswordAnchor = (
    <a href="/">
      Forgot Password?
    </a> );

    return (
      <Box sx={styles.container}>
        <Box sx={[styles.responsiveSignInContainer, styles.signInContainer]}>
            <Heading style={{ marginBottom: 2 }}>Sign In</Heading>
                <InputEmail
                    control={control}
                    name="email"
                    placeholder="Enter your e-mail"
                    rules={{ required: true }}
                    label='E-mail'
                />
            
                <InputPassword
                    control={control}
                    name="password"
                    placeholder="Enter your password"
                    rules={{ required: true }}
                    visibleValidation={false}
                    label='Password'
                    downComponent={forgotPasswordAnchor}
                />

                <Box sx={styles.buttonContainer}>
                    <ButtonLoading
                        disabled={!isValid}
                        isLoading={isLoggingIn}
                        onClick={handleSubmit(async () => 
                          handleLogin(control)
                        )}
                        backgroundColor={colors.buttonBlue}
                        >Login
                    </ButtonLoading>

                    <ButtonNavigation to='/signup' backgroundColor={colors.greenStrong}>Sign Up</ButtonNavigation>
                </Box>
        </Box>
      </Box>
  );
};

export default Login;
