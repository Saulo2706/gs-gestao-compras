/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { instance, simpleInstance } from "../../functions/instanceDatatableJq";
import { useEffect } from "react";
import DataTable from "../../components/template/DataTable";
import Router from "next/router";
import api from "../../services/api";
import { showNotify } from "../../functions/showNotify";
import { validateResponse } from "../../functions/validateResponse";
import { parseISOLocal } from "../../functions/parseDate";

export default function budgets() {

    useEffect(() => {
        $(document).ready(function () {
            var table = instance("/api/budget_request/my/company/" + localStorage.getItem('company'), "GET", "budgets",
                [
                    { data: "id" },
                    { data: "description" },
                    { data: "expiresOn" },
                    { data: "respondido" },
                    { data: "budgetResponseIds", visible: false }
                ], function (src) {
                    let dst = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
                    dst.draw = 1;
                    try {
                        src.forEach(el => {
                            let date = parseISOLocal(el.expiresOn)
                            el.expiresOn = ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear(); 
                            if(el.budgetResponseIds.length > 0){
                                el.respondido = "Sim";
                            }else{
                                el.respondido = "Não";
                            }

                            dst.data.push(el)
                        });
                    } catch {
                        dst.data = []
                    }

                    console.log(dst.data)
                    return dst.data;
                })

            $('#budgets tbody').on('click', 'tr', function () {
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

            $('#datail').on('click', function () {
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

            });

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
                        <h2 className="text-center text-3xl font-extrabold">Histórico de Orçamentos</h2>
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
                        <DataTable id="budgets">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Descrição do Orçamento</th>
                                    <th>Validade do Orçamento</th>
                                    <th>Respondido</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>
            </Layout>
        </>
    )
}
