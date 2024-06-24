import { useState } from "react";
import { forgotPassword } from "../../../services/user/forgotPassword";

interface ForgotPassword {
    email: string;
}

export default function useForgotPassword() {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);
    
    const handleForgotPassword = async (credentials: ForgotPassword, navigate: () => void) => {
        setIsEmailSending(true);
        try {
            await forgotPassword(credentials);
            setIsEmailSent(true);
            alert('Success! Email sent successfully, check your inbox for the token to reset your password');
            navigate();
        } catch (error: any) {
            alert('Error sending email for password recovery: ' + error);
        } finally {
            setIsEmailSending(false);
        }
    };    
    
    return {
        isEmailSent,
        isEmailSending,
        handleForgotPassword,
    };
}