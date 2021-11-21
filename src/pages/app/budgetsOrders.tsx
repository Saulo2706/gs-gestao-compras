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

export default function budgetsOrders() {

    useEffect(() => {
        $(document).ready(function () {
            var table = instance("/api/budget_request/provider/" + localStorage.getItem('company'), "GET", "budgetsOrders",
                [
                    { data: "id" },
                    { data: "description" },
                    { data: "expiresOn" }
                ], "")

            $('#budgetsOrders tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('#remove').attr("disabled", true);
                    $('#datail').attr("disabled", true);
                } else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#remove').removeAttr('disabled');
                    $('#datail').removeAttr('disabled');
                }
            });

            /*$('#datail').on('click', function () {
                let idBudget = table.row('.selected').child(1).data();
                //console.log(idBudget.id)
                Router.push('/app/budget/' + idBudget.id)

            });

            $('#remove').on('click', function () {
                let idBudget = table.row('.selected').child(1).data();
                api.delete('api/budget_request/my/company/' + localStorage.getItem('company') + '/budget/' + idBudget.id).then(
                    res => {
                        if (res.status == 200) {
                            showNotify("Sucesso", "Orçamento cancelado :)", "success")
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

            });*/

        });
    }, [])

    return (
        <>
            <Head>
                <title>Orçamentos</title>
            </Head>
            <Layout>
                <div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Orçamentos Recebidos</h2>
                    </div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-sm dark:text-gray-800">
                        <div className="grid grid-cols-12 gap-4 p-2">
                            <div className="col-span-6">
                            </div>
                            <div className="col-span-4 text-right">
                                <button id="remove" disabled className="bg-red-500 hover:bg-red-700 btn btn-sm">remove</button>
                            </div>
                            <div className="col-span-2 text-right mr-1">
                                <button id="datail" disabled className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Detalhar</button>
                            </div>
                        </div>
                        <DataTable id="budgetsOrders">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Descrição do Orçamento</th>
                                    <th>Validade do Orçamento</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
            </Layout>
        </>
    )
}
