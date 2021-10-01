import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { validateResponse } from "../functions/validateResponse";
import { showNotify } from "../functions/showNotify";
import Head from 'next/head'
import api from '../services/api';

export default function SignUp() {
    const { register, handleSubmit } = useForm();

    function handleSignUp(data) {
        console.log(data)
        if(data.email != data.re_email){
            showNotify("Erro", "Emails não conferem!" , "danger")
        }else if(data.password != data.re_password){
            showNotify("Erro", "Senhas não conferem!" , "danger")
        }else if(data.password.length < 8){
            showNotify("Erro", "Senha não atinge os criterios minimos!" , "danger")
        }else{
            const user = {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                birthday: data.birthday + "T03:00:00Z",
                gender: data.gender,
                password: data.password
            };
            api.post('auth/signup', user, {withCredentials: true}).then(
                res => {
                    if(res.status == 200){
                      showNotify("Sucesso", "Cadastro realizado com sucesso :)", "success")
                    }else{
                        showNotify("Alerta", res.data.message +" Codigo: " + res.status , "warning")
                    }
                }
            ).catch((error) => {
                if (error.response) {
                    validateResponse(error.response.data.message)
                }
            });
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>Registrar-se</title>
            </Head>
            <div className="max-w-sm w-full space-y-8">
                <div className={`flex flex-col items-center justify-center`}>
                    <Image src="/img/logo.png" alt="Logo" width="100px" height="100px" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrar-se!</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="flex flex-col mt-4">
                            <label>Primeiro Nome:</label>
                            <input
                                {...register('firstname')}
                                type="text"
                                required
                                placeholder="Primeiro Nome"
                                id="firstname"
                                name="firstname"
                                autoComplete="given-name"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label>Sobrenome:</label>
                            <input
                                {...register('lastname')}
                                type="text"
                                required
                                placeholder="Sobrenome"
                                id="lastname"
                                name="lastname"
                                autoComplete="family-name"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label>Data de Nascimento:</label>
                            <input
                                {...register('birthday')}
                                type="date"
                                required
                                placeholder="Dt. Nascumento"
                                id="birthday"
                                name="birthday"
                                autoComplete="bday"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label>Genero:</label>
                            <select
                                {...register('gender')}
                                required
                                placeholder="Dt. Nascumento"
                                id="gender"
                                name="gender"
                                autoComplete="sex"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            >
                                <option value="">Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="O">Outro</option>
                            </select>
                        </div>
                        <div className="flex flex-col mt-4">
                            <label>Email:</label>
                            <input
                                {...register('email')}
                                type="email"
                                required
                                placeholder="Email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label>Confirmação de Email:</label>
                            <input
                                {...register('re_email')}
                                type="email"
                                required
                                placeholder="Confirmação de Email"
                                id="re_email"
                                name="re_email"
                                autoComplete="email"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            />
                        </div>
                        
                        <div className="flex flex-col mt-4">
                            <label>Senha:</label>
                            <input
                                {...register('password')}
                                type="password"
                                required
                                placeholder="Senha"
                                id="password"
                                name="password"
                                autoComplete="password"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label>Confirmação de Senha:</label>
                            <input
                                {...register('re_password')}
                                type="password"
                                required
                                placeholder="Confirmação de Senha"
                                id="re_password"
                                name="re_password"
                                autoComplete="password"
                                className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Registrar-se
                        </button>
                    </div>
                </form>
                <div>
                    <a href="signIn" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Ja tem uma conta? Entre aqui!
                    </a>
                </div>
            </div>
        </div>
    )
}