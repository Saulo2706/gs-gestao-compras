/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { useEffect } from "react";
import DataTable from "../../components/template/DataTable";
import { instance } from "../../functions/instanceDatatableJq";
import { parseISOLocal } from "../../functions/parseDate";
import Router from "next/router";

export default function purchases() {

    useEffect(() => {
        $(document).ready(function () {
            var table = instance("/api/budget_response/buyer/" + localStorage.getItem('company'), "GET", "purchasesTable",
                [
                    { data: "id" },
                    { data: "budgetRequest.description" },
                    { data: "buyedAt" }
                ], function (src) {
                    let dst = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
                    dst.draw = 1;
                    try {
                        src.forEach(el => {
                            if(el.buyedAt != undefined){
                                let date = parseISOLocal(el.buyedAt)
                                el.buyedAt = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear();
                                dst.data.push(el)
                            }
                        });
                    } catch {
                        dst.data = []
                    } console.log(dst.data)
                    return dst.data;
                })

            $('#purchasesTable tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('#detail').attr("disabled", true);
                } else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#detail').removeAttr('disabled');
                }
            });

            $('#detail').on('click', function () {
                let idTable = table.row('.selected').child(1).data();
                Router.push('/app/purchaceOrder/'+idTable.id)
                
            });
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
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-sm dark:text-gray-800">
                        <div className="grid grid-cols-12 gap-4 p-2">
                            <div className="col-span-6 text-right">
                            </div>
                            <div className="col-span-2 text-right">

                            </div>
                            <div className="col-span-2 text-right">
                            </div>
                            <div className="col-span-2 text-right mr-1">
                                <button id="detail" disabled className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Detalhar</button>
                            </div>
                        </div>
                        <DataTable id="purchasesTable">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Descrição</th>
                                    <th>Data de compra</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
            </Layout>
        </>
    )
}
