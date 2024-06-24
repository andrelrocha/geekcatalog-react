import { resetPassword } from "../../../services/user/resetPassword";
import { useState } from "react";

interface ResetPassword {
    login: string;
    tokenMail: string;
    password: string;
}

export default function useResetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [popupAnchor, setPopupAnchor] = useState<HTMLDivElement | null>(null);


    const handleResetPassword = async (credentials: ResetPassword, navigate: () => void) => {
        setIsLoading(true);
        try {
            await resetPassword(credentials);
            setIsSuccess(true);
            alert('Success: Password reset successfully');
            navigate();
        } catch (error: any) {
            alert('Error resetting password: ' + error?.response.data || 'An error occurred while resetting the password.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isSuccess,
        handleResetPassword,
        popupAnchor,
        setPopupAnchor,
    };
}