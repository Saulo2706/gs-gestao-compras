import { createContext, useEffect, useState } from "react";
import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
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
                const { data: user } = await api.get('api/profile')
                if (user) setUser(user);
                if (Router.pathname == '/signin' || Router.pathname == '/signup') {
                    Router.push('/app/');
                }
            } catch (error) {
                if (Router.pathname != '/signin' && Router.pathname != '/signup') {
                    Router.push('/signin');
                }
                console.log(error.response)
            }
        }

       loadUser()

    }, [])

    async function signIn({ email, password }: SignInData) {
        try {
            const { data: user } = await api.post('auth/signin', { email, password })
            setUser(user)
            Router.push('/app/');
        } catch (error) {
            console.log(error)
            console.log(error.response)
            if (error.response) {
                validateResponse(error.response.data.message)
            }else{
                validateResponse("erro não identifiado")
            }
        }
    }

    async function signUp({ firstName, lastName, email, birthday, gender, password }: SignUpData) {
        try {
            const { data: user } = await api.post('auth/signup', { firstName, lastName, email, birthday, gender, password })
            setUser(user)
            Router.push('/app/');
        } catch (error) {
            console.log(error)
            console.log(error.response)
            if (error.response) {
                validateResponse(error.response.data.message)
            }else{
                validateResponse("erro não identifiado")
            }
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}