import { ApiManager } from '../../../utils/API-axios/ApiManager';

export const downloadApk = async () => {
    const endpoint = '/infra/download/apk';

    try {
        const response = await ApiManager.get(endpoint);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}