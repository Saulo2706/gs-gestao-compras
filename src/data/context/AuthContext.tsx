import { createContext, useEffect, useState } from "react";
import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
import { showNotify } from "../../functions/showNotify";
import Router from "next/router";


interface User {
    email: string;
    firstName: string;
    profileImage: string;
}
interface SignInData {
    email: string;
    password: string
}
interface AuthContextType {
    isAuthenticated: boolean;
    user: User
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>(null)
    const isAuthenticated = !!user;

    useEffect(() => {
        async function loadUser() {
            try {
                const { data: user } = await api.get('api/profile', { withCredentials: true })
                if (user) setUser(user);
            } catch (error) {
                Router.push('/signIn');
                console.log(error.response)
            }
        }

        if(Router.pathname != '/signIn' && Router.pathname != '/signUp'){    
            loadUser()
        }

    }, [])

    async function signIn({ email, password }: SignInData) {
        try {
            const { data: user } = await api.post('auth/signin', { email, password }, { withCredentials: true })
            setUser(user)
            Router.push('/');
        } catch (error) {
            console.log(error)
            console.log(error.response)
            if (error.response) {
                validateResponse(error.response.data.message)
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}