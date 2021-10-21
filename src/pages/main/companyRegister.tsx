/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'

import { showNotify } from "../../functions/showNotify";
import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
import { useForm } from 'react-hook-form'

export default function companyBuyerRegister() {

    const { register, handleSubmit } = useForm();
    function handleCompanyRegister(data) {
        
        const company = {
            name: data.name,
            document: data.document,
            foundedAt: data.foundedAt
        };

        console.log(company)

        api.post('api/company/my', company).then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Cadastro realizado com sucesso :)", "success")
                } else {
                    showNotify("Alerta", res.data.message + " Codigo: " + res.status, "warning")
                }
            }
        ).catch((error) => {
            console.log(error)
            console.log(error.response)
            if (error.response) {
                validateResponse(error.response.data.message)
            } else {
                validateResponse("erro não identifiado")
            }
        });
    }
    return (
        <>
            <Head>
                <title>Cadastro de Empresa</title>
            </Head>
            <Layout>
                <div className="m-auto">
                    <div className={`flex flex-col items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Cadastrar empresa</h2>
                    </div>
                    <form className="mt-8" onSubmit={handleSubmit(handleCompanyRegister)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <label>Nome da Empresa:</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    required
                                    placeholder="Nome da Empresa"
                                    id="name"
                                    name="name"
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                />
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <label>CNPJ da Empresa:</label>
                                <input
                                    {...register('document')}
                                    type="text"
                                    required
                                    placeholder="CNPJ da Empresa"
                                    id="document"
                                    name="document"
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                />
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <label>Data de fundação:</label>
                                <input
                                    {...register('foundedAt')}
                                    type="date"
                                    required
                                    placeholder="Data de fundação"
                                    id="foundedAt"
                                    name="foundedAt"
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cadastrar Empresa
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}
