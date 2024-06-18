
import React, { useContext } from 'react';
import { Control, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import { colors } from '../../../../utils/colors';
import { Heading, InputPassword, ButtonLoading, InputEmail, InputText } from '../../../../components';
import { UserLogin } from '../../../../types/user/userLoginDTO';
import AuthContext from '../../../../context/auth.context';
import Input from '../../../../components/input/input';

const DEFAULT_FORM_VALUES = { email: "", password: "" };

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
    const { isLoading: isLoggingIn, login } = useContext(AuthContext);

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

        await login(userData, () => console.log('Logged in'));
    };

    return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Heading style={{ marginBottom: 5, marginTop: 10 }}>Sign In</Heading>

            
            <InputEmail
                control={control}
                name="email"
                placeholder="Enter your e-mail"
                rules={{ required: true }}
            />
        
            <InputPassword
                control={control}
                name="password"
                placeholder="Enter your password"
                rules={{ required: true }}
                visibleValidation={false}
            />

        <ButtonLoading
            disabled={!isValid}
            isLoading={isLoggingIn}
            onClick={handleSubmit(async () => 
                handleLogin(control)
            )}
            mt={20}
            backgroundColor={colors.buttonBlue}
        >Login
        </ButtonLoading>

    {/*
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, marginTop: 20 }}>
        <ButtonTouchable
          onPress={() => navigation.navigate('NotAuthStack', { screen: 'SignUp' })}
          mt={4}
          w={150}
          h={40}
          backgroundColor={colors.greenStrong}
        >
          Sign Up
        </ButtonTouchable>

        <ButtonTouchable
          onPress={() => navigation.navigate('NotAuthStack', { screen: 'ForgotPassword' })}
          mt={4}
          w={150}
          h={40}
          backgroundColor={colors.redStrong}
        >
          Forgot Password 
        </ButtonTouchable>
      </div>
    */}
    </div>
  );
};

export default Login;
