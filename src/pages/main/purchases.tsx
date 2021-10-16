/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect } from "react";

export default function purchases() {

    useEffect(() => {
        $(document).ready(function () {
            $('#example').DataTable();
        });
    }, [])

    return (
        <>
            <Head>
                <title>Compras</title>
            </Head>
            <Layout>
                <div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Histórico de Compras</h2>
                    </div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-lg m-auto rounded-sm dark:text-gray-800">
                        <table id="example" className="display">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Data de compra</th>
                                    <th>Quantidade</th>
                                    <th>Valor</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}
