import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Control, useForm } from 'react-hook-form';
import { Box, Paper, Popover, Typography } from '@mui/material';
import { Unstable_Popup as Popup } from '@mui/base';
import { ButtonLoading, Heading, InputEmail, InputText, InputPassword, InputPasswordValidation } from '../../../../components';
import useResetPassword from '../../../../context/hooks/user/useResetPassword';
import { isSamePassword } from '../../../../libs/validators/password';
import { colors } from '../../../../utils/colors';

type FormData = {
    email: string;
    tokenMail: string;
    password: string;
    passwordConfirm: string;
};

const DEFAULT_FORM_VALUES = { email: "", tokenMail: "", password: "", passwordConfirm: "" };

const ResetPassword = () => {
    const navigation = useNavigate();
    const { isLoading, handleResetPassword, popupAnchor, setPopupAnchor } = useResetPassword();
    const [isPasswordClicked, setIsPasswordClicked] = useState(false);

    const {
        control,
        formState: { isValid },
        handleSubmit,
    } = useForm<FormData>({ defaultValues: DEFAULT_FORM_VALUES, mode: 'onChange' });

    const handleResetPasswordControl = async (formData: FormData) => {
        const isEqualPassword = isSamePassword(formData.password, formData.passwordConfirm);
        if (!isEqualPassword) return alert('The passwords do not match');

        const data = {
            login: formData.email,
            tokenMail: formData.tokenMail,
            password: formData.password,
        }
        await handleResetPassword(data, () => navigation('/login'));
    };

    return (
        <Box sx={styles.container}>
            <Heading mt={5} mb={2}>Reset Password</Heading>

            <Box sx={styles.formContainer}>
                <InputEmail
                    control={control}
                    name="email"
                    placeholder="Enter your e-mail"
                    icon={0}
                    rules={{ required: true }}
                />
                <InputText
                    control={control}
                    name="tokenMail"
                    placeholder="Enter your token"
                    rules={{ required: true }}
                />
                <InputPasswordValidation 
                    control={control} 
                    name="password" 
                    placeholder="Password" 
                    rules={{ required: true}} 
                    inputProps={{
                        onFocus: () => setIsPasswordClicked(!isPasswordClicked),
                    }}
                />

                <InputPassword 
                    control={control} 
                    name="passwordConfirm" 
                    placeholder="Confirm Password"
                    rules={{ required: true }}
                    inputProps={{
                        onFocus: () => setIsPasswordClicked(!isPasswordClicked),
                    }}
                />

                <Box sx={styles.buttonContainer}>
                    <ButtonLoading
                        onClick={handleSubmit(handleResetPasswordControl)}
                        isLoading={isLoading}
                        disabled={!isValid}
                        backgroundColor={colors.buttonBlue}
                        mt={1}
                    >
                        Send
                    </ButtonLoading>
                </Box>
            </Box> 

            {/*
            <Popover
                open={!!popupAnchor}
                anchorEl={popupAnchor}
                onClose={() => setPopupAnchor(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Paper sx={{ p: 2 }}>
                    <Typography variant="body1">
                        Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number.
                    </Typography>
                </Paper>
            </Popover>
            */}
        </Box>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        marginBottom: 20,
        '@media (max-width: 425px)': {
            width: '90%',
        }
    },
    buttonContainer: {
        width: '50%',
        margin: 'auto',
    },
};

export default ResetPassword;
