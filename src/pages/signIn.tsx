/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head'
import React, { useContext } from 'react'
import { validateResponse } from "../functions/validateResponse";
import { showNotify } from "../functions/showNotify";
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import api from '../services/api';

export default function signIn() {
    const { register, handleSubmit } = useForm();

    function handleSignIn(data) {
        
        const user = {
            email: data.email,
            password: data.password
        };
        if(user.password.length >= 8){
            api.post('auth/signin', user, { withCredentials: true }).then(
                res => {
                    if(res.status == 200){
                        showNotify("Sucesso", "Login realizado com sucesso :)", "success")
                      }else{
                        showNotify("Alerta", res.data.message +" Codigo: " + res.status , "warning")
                      }
                }
            ).catch((error) => {
                if (error.response) {
                    validateResponse(error.response.data.message)
                }
            });
        }else{
            showNotify("Alerta", "Senha invalida!" , "warning")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Login</title>
            </Head>

            <div className="max-w-sm w-full space-y-8">
                <div className={`flex flex-col items-center justify-center`}>
                    <Image src="/img/logo.png" alt="Logo" width="100px" height="100px" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Entre com sua Conta!</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Endereço de email
                            </label>
                            <input
                                {...register('email')}
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Endereço de email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Senha
                            </label>
                            <input
                                {...register('password')}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Senha"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Lembrar-se
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Esqueceu a sua senha?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Logar-se
                        </button>
                    </div>
                </form>
                <div>
                    <a href="signUp" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Ainda não tem uma conta? Registre-se aqui!
                    </a>
                </div>
            </div>
        </div>
    )
}