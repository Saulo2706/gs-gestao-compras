import { createContext, useState } from "react";
import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
import { showNotify } from "../../functions/showNotify";
import Router from "next/router";

interface User {
    firstName: any;
    email: any;
    profileImage: any;
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
    const [user, setUser] = useState<User | null>()
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInData){
        await api.post('auth/signin', { email, password }, { withCredentials: true }).then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Login realizado com sucesso :)", "success")
                    const payload = {firstName: res.data.firstName, email: res.data.email, profileImage: res.data.profileImage}
                    setUser(payload)
                    console.log(user)
                    //Router.push('/');
                } else {
                    showNotify("Alerta", res.data.message + " Codigo: " + res.status, "warning")
                }
            }
        ).catch((error) => {
            console.log(error)
            validateResponse(error)
        });
    }

    function logout(){
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}