import React, { createContext, ReactNode, useEffect, useState } from "react";
import { loginUser } from '../services/user/login';
import { createUser } from "../services/user/create";
import { saveProfilePic } from "../services/user/saveProfilePic";
import { verifyJWT } from "../services/user/verifyJWT";
import { getUserByJWT } from "../services/user/getByJWT";
import { UserLogin } from '../types/user/userLoginDTO';
import { UserReturn } from "../types/user/userReturnDTO";
import { UserCreate } from "../types/user/userCreateDTO";
import { UserUpdate } from "../types/user/userUpdateDTO";
import { getToken, removeToken, setToken } from "../modules/auth.module";

type AuthContextData = {
    authState: {
        token: string | null;
        authenticated: boolean;
    };   
    currentUser?: UserReturn;
    isLoading: boolean;
    login: (credentials: UserLogin, navigate: () => void) => any;
    signUp: (data: UserCreate, navigate: () => void) => any;
    logout: () => any;
    //update: (user: UserUpdate) => any;
    //deleteUserAccount: () => any;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({
    authState: {
        token: null,
        authenticated: false,
    },
    currentUser: undefined,
    isLoading: false,
    login: async () => {},
    signUp: async () => {},
    logout: async () => {},
    //update: async () => {},
    //deleteUserAccount: async () => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserReturn | undefined>(undefined);
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean,
    }>({
        token: null,
        authenticated: false,
    });

    useEffect(() => {
      loadStorageData();
    }, []);

    const loadStorageData = async () => {
        const token = await getToken();
        if (token) {
            const response = await verifyJWT(token);
            
            if (response.data === true) {
                setAuthState({
                    token,
                    authenticated: true,
                }); 

                if (!currentUser) {
                    const user = await getUserByJWT(token);
                    setCurrentUser(user);
                }
            } else {
                logout();
            }
        } else {
            logout();
        }
    };

    const login = async (credentials: UserLogin, navigate: () => void) => {
        setIsLoading(true);
        try {
            const tokenJWT = await loginUser(credentials);
            if (!tokenJWT) {
                console.error("Empty or undefined JWT token");
                return;
            }
            setAuthState({
                token: tokenJWT,
                authenticated: true,
            });

            await setToken(tokenJWT);

            await loadStorageData();

            navigate();
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to sign in user";
            alert('An error occurred while logging in: ' + errorMessage);
            await removeToken();
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (data: UserCreate, navigate: () => void) => {
        setIsLoading(true);
        data.phone = data.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');

        try {
            const newUser = await createUser(data);

            if (!newUser) {
                console.error("Error creating user");
                return;
            }
            const tokenJWT = await loginUser({
                login: data.login,
                password: data.password
            });
            if (!tokenJWT) {
                console.error("Empty or undefined JWT token");
                return;
            }

            setAuthState({
                token: tokenJWT,
                authenticated: true,
            });

            await setToken(tokenJWT);

            if (data.uri) {
                await saveProfilePic({ uri: data.uri, userId: newUser?.id as string });
            }

            await loadStorageData();

            alert('Success: User created successfully!');
            
            navigate();
        } catch (error: any) {
            const errorMessage = error.response?.data || error.message || "Failed to sign up user";
            alert('An error occurred while creating your account: ' + errorMessage);
            await removeToken();
            window.location.reload();
        } finally {
            setIsLoading(false);
        }
    };

    /*

    const update = async (user: UserUpdate) => {
        setIsLoading(true);
        try {
            const updatedUser = await updateUserInfo(user);
            if (!updatedUser) {
                console.error("Error updating user");
                return;
            }
            setCurrentUser(updatedUser);

            if (user.uri) {
                await saveProfilePic({ uri: user.uri as string, userId: updatedUser?.id as string });
            }

            await loadStorageData();

            alert('Success: User updated successfully!');
            
            setIsLoading(false);
        } catch (error: any) {
            console.error("Error updating user:", error);
            alert('Error: An error occurred while updating your account.');
        }
    };

    const deleteUserAccount = async () => {
        setIsLoading(true);
        try {
            await deleteUser({ userId: currentUser?.id as string });
            await logout();
            alert('Success: User deleted successfully!');
        } catch (error: any) {
            console.error("Error deleting user:", error);
            alert('Error: An error occurred while deleting your account.');
        } finally {
            setIsLoading(false);
        }
    };
    */
  
    const logout = async () => {
        setAuthState({
            token: null,
            authenticated: false,
        })
        setCurrentUser(undefined);

        await removeToken();
        window.location.href = "/";
    };
  
    const value = {
        authState,
        currentUser,
        isLoading,
        login,
        logout,
        signUp,
        /*
        update,
        deleteUserAccount, */
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
