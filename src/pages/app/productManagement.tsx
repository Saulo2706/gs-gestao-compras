/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import { QuestionIcon } from "../../components/icons";
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

export default function productManagement() {

    useEffect(() => {
        $(document).ready(function () {
            $('#products').DataTable({
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

    }, [])

    return (
        <>
            <Head>
                <title>Registro de Produto</title>
            </Head>
            <Layout>
                <div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-md dark:text-gray-800">
                        <div className="grid grid-cols-12 gap-4 p-2">
                            <div className="col-span-8">
                                <h2 className="text-left text-2xl font-extrabold">Produto</h2>
                            </div>
                            <div className="col-span-4 text-right">
                                <label htmlFor="modalAddProduct" className="bg-blue-500 hover:bg-blue-700 btn modal-button">Adicionar Produto</label>
                            </div>
                        </div>
                        <DataTable id="products">
                            
                        </DataTable>
                    </div>
                </div>

                {/* MODAL ADD */}
                <input type="checkbox" id="modalAddProduct" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box bg-white">
                        <div className={`flex flex-col items-center justify-center`}>
                            <h2 className="text-center text-3xl font-extrabold">Cadastro de produto</h2>
                        </div>
                        <form className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label>Nome do Produto:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nome do Produto"
                                        id="productName"
                                        name="productName"
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
                                    <label>Descrição do Produto:</label>
                                    <textarea
                                        required
                                        placeholder="Descrição do Produto:"
                                        id="productDescription"
                                        name="productDescription"
                                        rows={4}
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
                                    <label>Un Medida:</label>
                                    <select
                                        required
                                        placeholder="Un Medida"
                                        id="unMedida"
                                        name="unMedida"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Un">Un</option>
                                        <option value="M">M</option>
                                        <option value="cm">cm</option>
                                    </select>
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <div className="flex-none flex">
                                        Valor padrão:
                                        <div data-tip="É O PREÇO PADRÃO DE SEU PRODUTO!" className="tooltip tooltip-SECONDARY tooltip-right ml-2">
                                            {QuestionIcon}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Valor Padrão"
                                        required
                                        id="priceDefault"
                                        name="priceDefault"
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
                                    <label>Fotos do Produto:</label>
                                    <input
                                        type="file"
                                        multiple={true}
                                        required
                                        placeholder="Foto do Produto:"
                                        id="productPhotos"
                                        name="productPhotos"
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
                                    Cadastrar Produto
                                </button>
                                <label htmlFor="modalAddProduct" className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3">Cancelar</label>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
