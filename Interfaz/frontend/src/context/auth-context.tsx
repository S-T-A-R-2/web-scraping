import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

interface AuthContextType {
    signUp: (userData : UserData) => Promise<void>;
    signIn: (userData : {username : string, password : string}) => Promise<void>;
    logout: () => void;
    loading: boolean;
    user: UserData | null;
    isAuthenticated: boolean;
    errors: string[];
}
//export const AuthContext = createContext();
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

type UserData = {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    rol: string;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const signUp = async (userData : UserData) => {
        try {
            //const res = await axios.post(`/register`, userData);
            const res = await registerRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.messages);
                console.log(error.response.data);
            } else {
                setErrors(['An unexpected error occurred. Please try again.']);
                console.log(error.message);
            }
        }
    };

    const signIn = async (userData : {username : string, password : string}) => {
        try {
            const res = await loginRequest(userData);
            const user : UserData = {
                username: res.data.username,
                name: res.data.name,
                phone: res.data.phone,
                email: res.data.email,
                password: res.data.password,
                rol: res.data.rol
            };
            setUser(user);
            setIsAuthenticated(true);
            setErrors([]);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.messages);
            } else {
                setErrors(['An unexpected error occurred. Please try again.']);
            }
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    }

    // Clear errors after 5 seconds
    useEffect(() => {
        if (errors && errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors])

    // Check if user is already logged in
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
                try {
                    const res = await verifyTokenRequest();
                    if (!res.data) {
                        setIsAuthenticated(false);
                        setLoading(false);
                        return
                    }

                    const user = res.data[0];
                    const userData = {
                        username: user.username,
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        password: user.password,
                        rol: user.rol
                    }

                    setIsAuthenticated(true);
                    setUser(userData);
                    setLoading(false);

                } catch (error) {
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);
                }
            }
        checkLogin();
    }, [])

    return (
        <AuthContext.Provider value={{
            signUp,
            signIn,
            logout,
            loading,
            user,
            isAuthenticated,
            errors,
        }}>
            {children}
        </AuthContext.Provider>
    );
};