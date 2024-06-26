import { useState, useRef } from "react";
import { resetPassword } from "../../../services/user/resetPassword";

interface ResetPassword {
    login: string;
    tokenMail: string;
    password: string;
}

export default function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const alertShownRef = useRef(false);

    const handleResetPassword = async (credentials: ResetPassword, navigate: () => void) => {
        setIsLoading(true);
        try {
            await resetPassword(credentials);
            alert('Success: Password reset successfully');
            navigate();
        } catch (error: any) {
            if (!alertShownRef.current) {
                const errorMessage = error.response?.data || error.message || "Failed to reset password";
                alert('Error resetting password: ' + errorMessage);
                alertShownRef.current = true;
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleResetPassword,
    };
}