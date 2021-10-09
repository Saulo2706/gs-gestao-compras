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

interface SignUpData {
    firstName: string,
    lastName: string,
    email: string,
    birthday: string,
    gender: string,
    password: string
}
interface AuthContextType {
    isAuthenticated: boolean;
    user: User
    signIn: (data: SignInData) => Promise<void>
    signUp: (data: SignUpData) => Promise<void>
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
                if(Router.pathname == '/signIn' || Router.pathname == '/signUp'){
                    Router.push('/');
                }
            } catch (error) {
                if(Router.pathname != '/signIn' && Router.pathname != '/signUp'){
                    Router.push('/signIn');
                }
                console.log(error.response)
            }
        }
        
        loadUser()

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

    async function signUp({ firstName,lastName,email,birthday,gender, password }: SignUpData) {
        try {
            const { data: user } = await api.post('auth/signup', { firstName,lastName,email,birthday,gender, password }, { withCredentials: true })
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
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}