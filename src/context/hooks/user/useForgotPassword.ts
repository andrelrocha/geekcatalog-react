import { useState } from "react";
import { forgotPassword } from "../../../services/user/forgotPassword";

interface ForgotPassword {
    email: string;
}

export default function useForgotPassword() {
    const [isEmailSending, setIsEmailSending] = useState(false);
    
    const handleForgotPassword = async (credentials: ForgotPassword, navigate: () => void) => {
        setIsEmailSending(true);
        try {
            await forgotPassword(credentials);
            alert('Success! Email sent successfully, check your inbox for the token to reset your password');
            navigate();
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to send email for password recovery";
            alert('Error sending email for password recovery: ' + errorMessage);
        } finally {
            setIsEmailSending(false);
        }
    };    
    
    return {
        isEmailSending,
        handleForgotPassword,
    };
}