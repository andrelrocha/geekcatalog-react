import { resetPassword } from "../../../services/user/resetPassword";
import { useState } from "react";

interface ResetPassword {
    login: string;
    tokenMail: string;
    password: string;
}

export default function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (credentials: ResetPassword, navigate: () => void) => {
        setIsLoading(true);
        try {
            await resetPassword(credentials);
            alert('Success: Password reset successfully');
            navigate();
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to reset password";
            alert('Error resetting password: ' + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        handleResetPassword,
    };
}