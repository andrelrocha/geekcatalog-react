import { ApiManager } from "../../../utils/API-axios/ApiManager";

type HandleForgotPasswordProps = {
    email: string;
};

export async function forgotPassword(props: HandleForgotPasswordProps) {
    try {
        const endpoint = '/user/forgot_password';
        const data = { login: props };

        const response = await ApiManager.post(endpoint, data)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw new Error(error.response.data);
            });

        return response;
    } catch (error) {
        throw error;
    }
}