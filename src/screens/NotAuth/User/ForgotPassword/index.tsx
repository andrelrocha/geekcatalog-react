import { Control, useForm } from 'react-hook-form';
import useForgotPassword from '../../../../context/hooks/user/useForgotPassword';
import { Box } from '@mui/material';
import { ButtonLoading, Heading, InputEmail } from '../../../../components';
import { colors } from '../../../../utils/colors';
import { useNavigate } from 'react-router-dom';

const DEFAULT_FORM_VALUES = { email: ""}

type FormData = {
  email: string;
};

const ForgotPassword = () => {
    const navigation = useNavigate();
    const {
        control,
        formState: { isValid },
        handleSubmit
    } = useForm({ defaultValues: DEFAULT_FORM_VALUES, mode: "onChange" })

    const { 
        isEmailSending,
        handleForgotPassword } = useForgotPassword();

    const handleForgotPasswordControl = async (control: Control<FormData>) => {
        const email = control._formValues.email;
        await handleForgotPassword( email, () => navigation('/resetpassword'));
    }
    
    return (
        <Box>
            <Heading mb={10} mt={10}>Forgot Password</Heading>

            <Box sx={styles.container}>
                <InputEmail
                    control={control}
                    name="email"
                    placeholder="Enter your e-mail"
                    rules={{ required: true }}
                />

                <Box sx={styles.button}>
                    <ButtonLoading
                        onClick={handleSubmit(() => handleForgotPasswordControl(control))}
                        isLoading={isEmailSending}
                        disabled={!isValid}
                        backgroundColor={colors.buttonBlue}
                    >Send
                    </ButtonLoading>
                </Box>
            </Box>
        </Box>
    );
}

const styles = {
    container: {
        width: '40%',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 'auto',
    },
    button: {
        marginTop: '1rem',
        width: '40%'
    }
}

export default ForgotPassword;