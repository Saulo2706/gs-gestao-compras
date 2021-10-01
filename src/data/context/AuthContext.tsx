import { createContext, useState } from "react";
import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
import { showNotify } from "../../functions/showNotify";
import Router from "next/router";

interface SignInData {
    email: string;
    password: string
}

interface AuthContextType {
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    let isAuthenticated = false;

    async function signIn({email,password}:SignInData) {
        await api.post('auth/signin',{email,password}, { withCredentials: true }).then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Login realizado com sucesso :)", "success")
                    isAuthenticated = true;
                    Router.push('/');
                } else {
                    showNotify("Alerta", res.data.message + " Codigo: " + res.status, "warning")
                }
            }
        ).catch((error) => {
            if (error.response) {
                validateResponse(error.response.data.message)
            }
        });
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}