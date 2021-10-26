/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import { EditIcon, TrashIcon } from "../../components/icons";

import InputMask from 'react-input-mask';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
import { useEffect, useState } from "react";

import { showNotify } from "../../functions/showNotify";
import { useForm } from 'react-hook-form'
import Router from "next/router";
import DataTable from "../../components/template/DataTable";

interface ICompanyes {
    document: string;
    foundedAt: string;
    id: string;
    name: string;

}


export default function companyManagement() {

    const [companyes, setCompanyes] = useState<ICompanyes[]>([]);
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
                    Router.reload()
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

    useEffect(() => {
        async function loadCompany() {
            try {
                const { data: companyes } = await api.get('api/company/my')
                setCompanyes(companyes)

                $(document).ready(function () {
                    $('#companyes').DataTable({
                        language: {
                            "url": '../api/dataTableTranslate'
                        },
                        aLengthMenu: [
                            [25, 50, 100, 200, -1],
                            [25, 50, 100, 200, "todos"]
                        ],
                        iDisplayLength: 25,
                        columns: [
                            { title: "Nome da empresa" },
                            { title: "CNPJ" },
                            { title: "Data de Fundação" },
                            { title: "Ação" }
                        ]
                    });
                });

            } catch (error) {
                console.log(error)
                console.log(error.response)
                $(document).ready(function () {
                    $('#companyes').DataTable({
                        language: {
                            "url": '../api/dataTableTranslate'
                        },
                        aLengthMenu: [
                            [25, 50, 100],
                            [25, 50, 100]
                        ],
                        iDisplayLength: 25,
                        columns: [
                            { title: "Nome da empresa" },
                            { title: "CNPJ" },
                            { title: "Data de Fundação" },
                            { title: "Ação" }
                        ],
                        scrollY: "300px",
                    });
                });
                if (error.response) {
                    validateResponse(error.response.data.message)
                } else {
                    validateResponse("Erro não identifiado")
                }
            }
        }

        loadCompany()
    }, [])

    function renderRows() {
        return (
            companyes.map(company => {
                return (
                    <>
                        <tr key={company.id}>
                            <td className="text-center">{company.name}</td>
                            <td className="text-center">{company.document}</td>
                            <td className="text-center">{company.foundedAt}</td>
                            <td>{
                                <div className="text-center">
                                    <label htmlFor={`modalEditCompany${company.id}`} className="text-yellow-400 mr-5 btn modal-button">{EditIcon}</label>
                                    <label htmlFor={`modalRemCompany${company.id}`} className="text-red-600 btn modal-button">{TrashIcon}</label>
                                </div>
                            }</td>
                        </tr>
                    </>
                )
            })
        )
    }

    return (
        <>
            <Head>
                <title>Gerenciamento de Empresa</title>
            </Head>
            <Layout>
                <div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-md dark:text-gray-800">
                        <div className="grid grid-cols-12 gap-4 p-2">
                            <div className="col-span-8">
                                <h2 className="text-left text-2xl font-extrabold">Empresas</h2>
                            </div>
                            <div className="col-span-4 text-right">
                                <label htmlFor="modalAddCompany" className="bg-blue-500 hover:bg-blue-700 btn modal-button">Adicionar Empresa</label>
                            </div>
                        </div>
                        <DataTable id="companyes">
                            {renderRows()}
                        </DataTable>
                    </div>
                </div>

                {/* MODAL ADD */}
                <input type="checkbox" id="modalAddCompany" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box bg-white">
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
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label>CNPJ da Empresa:</label>
                                    <InputMask mask="99.999.999/9999-99"
                                        {...register('document')}
                                        type="text"
                                        required
                                        placeholder="CNPJ da Empresa"
                                        id="document"
                                        name="document"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
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
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
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
                                <label htmlFor="modalAddCompany" className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3">Cancelar</label>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
