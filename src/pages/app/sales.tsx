/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect } from "react";
import DataTable from "../../components/template/DataTable";

export default function sales() {

    useEffect(() => {
        $(document).ready(function () {
            $('#sales').DataTable({
                language: {
                    "url": '../api/dataTableTranslate'
                },
                aLengthMenu: [
                    [25, 50, 100, 200, -1],
                    [25, 50, 100, 200, "todos"]
                ],
                iDisplayLength: 25,
                columns: [
                    { title: "Produto" },
                    { title: "Data de venda" },
                    { title: "Quantidade" },
                    { title: "Valor" },
                    { title: "Ação" }
                ]
            });
        });
    }, [])

    return (
        <>
            <Head>
                <title>Vendas</title>
            </Head>
            <Layout>
                <div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Histórico de Vendas</h2>
                    </div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-lg m-auto rounded-sm dark:text-gray-800">
                        <DataTable id="sales">
                            <tr>
                                <td>Celular</td>
                                <td>10/10/2021</td>
                                <td>1</td>
                                <td>R$ 900,00</td>
                                <td><button
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Detalhes
                                </button></td>
                            </tr>
                            <tr>
                                <td>Caneta</td>
                                <td>14/10/2021</td>
                                <td>5</td>
                                <td>R$ 30,00</td>
                                <td><button
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Detalhes
                                </button></td>
                            </tr>
                        </DataTable>
                    </div>
                </div>
            </Layout>
        </>
    )
}
