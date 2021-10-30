/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect } from "react";
import DataTable from "../../components/template/DataTable";

export default function purchaseOrders() {

    useEffect(() => {
        $(document).ready(function () {
            $('#purchaseOrders').DataTable({
                language: {
                    "url": '../api/dataTableTranslate'
                },
                aLengthMenu: [
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                iDisplayLength: 25,
                columns: [
                    { title: "Produto" },
                    { title: "Data de compra" },
                    { title: "Quantidade" },
                    { title: "Valor" },
                    { title: "Ação" }
                ],
                scrollY: "300px",
            });
        });
    }, [])

    return (
        <>
            <Head>
                <title>Pedidos</title>
            </Head>
            <Layout>
                <div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Pedidos</h2>
                    </div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-sm dark:text-gray-800">
                        <DataTable id="purchaseOrders">
                            
                        </DataTable>
                    </div>
                </div>
            </Layout>
        </>
    )
}
