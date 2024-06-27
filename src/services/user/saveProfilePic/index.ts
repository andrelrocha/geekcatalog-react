import { getToken } from '../../../modules/auth.module';
import { ApiManager } from '../../../utils/API-axios/ApiManager';

type HandleSaveProfilePicProps = {
    uri: string;
    userId: any;
};

export const saveProfilePic = async (props: HandleSaveProfilePicProps) => {
    try {
        const token = await getToken();
        
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        
        const endpoint = `/profilepic/create/${props.userId}`;

        const response = await fetch(props.uri);
        const blob = await response.blob();
        const file = new File([blob], 'profilepic.jpg', { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('file', file);

        const apiResponse = await ApiManager.post(endpoint, formData, { headers })
            .then((response) => {
                if (response.data.id === props.userId) {
                    console.log('Image saved successfully');
                } else {
                    throw new Error('Error saving profile image');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log('Error saving profile image: ', error.response.data);
                } else {
                    console.log('Error saving profile image: ', error);
                }
            });

        return apiResponse;
    }
    catch (error) {
        console.log('Error in the process of saving the profile image: ', error);
        return;
    }
};
