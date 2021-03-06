import React from "react";
import DataTable from "../components/template/DataTable";
import { instance } from "./instanceDatatableJq";
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import { parseISOLocal } from "./parseDate";
import api from "../services/api";
import { showNotify } from "./showNotify";
import Router from "next/router";
import { validateResponse } from "./validateResponse";

export function initialJquery() {
    $(document).ready(function () {
        var table2
        var table = instance("/api/budget_request/provider/" + localStorage.getItem('company'), "GET", "budgetsOrders",
            [
                { data: "id" },
                { data: "buyer.name" },
                { data: "description" },
                { data: "expiresOn" },
                { data: "respondido" },
            ], function (src) {
                let dst = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
                dst.draw = 1;
                try {
                    src.forEach(el => {
                        let date = parseISOLocal(el.expiresOn)
                        el.expiresOn = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear();
                        if (el.budgetResponseIds.length > 0) {
                            el.respondido = "Sim";
                        } else {
                            el.respondido = "Não";
                        }
                        dst.data.push(el)
                    });
                } catch {
                    dst.data = []
                } console.log(dst.data)
                return dst.data;
            })

        $('#budgetsOrders tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                //$('#response').attr("disabled", true);
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

            /*if (table.row('.selected').child(1).data()?.respondido == "Não") {
                $('#response').removeAttr('disabled');
            } else {
                $('#response').attr("disabled", true);
            }*/

            $('#response').on('click', function () {
                let idTable = table.row('.selected').child(1).data();
                Router.push('/app/budgetResponse/' + idTable.id)
            });


        });
        $('#idlink2').on('click', function () {
            table2 = instance("/api/budget_response/my/company/" + localStorage.getItem('company'), "GET", "budgetsResponses",
                [
                    { data: "id" },
                    { data: "solicitante" },
                    { data: "description" },
                    { data: "expiresOn" }
                ], function (src) {
                    let dst = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
                    dst.draw = 1;
                    try {
                        src.forEach(el => {
                            let date = parseISOLocal(el.expiresOn)
                            el.expiresOn = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear();
                            el.solicitante = el.budgetRequest.buyer.name;
                            el.description = el.budgetRequest.description;
                            dst.data.push(el)
                        });
                    } catch {
                        dst.data = []
                    } console.log(dst.data)
                    return dst.data;
                })
            $('#budgetsResponses tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('#detailResponse').attr("disabled", true);
                    $('#delete').attr("disabled", true);
                } else {
                    table2.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#detailResponse').removeAttr('disabled');
                    $('#delete').removeAttr('disabled');
                }
            });

            $('#delete').on('click', function () {
                let idTable = table2.row('.selected').child(1).data();
                api.delete('api/budget_response/my/company/' + localStorage.getItem('company') + '/budget/' + idTable.id).then(
                    res => {
                        if (res.status == 200) {
                            showNotify("Sucesso", "Resposta cancelada com sucesso :)", "success")
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


    });
}

export function Tabs() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <div className="w-full">
                <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? "text-black bg-white"
                                    : "text-white bg-gray-600")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                            }}
                            data-toggle="tab"
                            id="idlink1"
                            href="#link1"
                            role="tablist"
                        >
                            Recebidos
                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                    ? "text-black bg-white"
                                    : "text-white bg-gray-600")
                            }
                            onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                            }}
                            data-toggle="tab"
                            id="idlink2"
                            href="#link2"
                            role="tablist"
                        >
                            Respondidos
                        </a>
                    </li>
                </ul>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className={openTab === 1 ? "block p-2 text-center" : "hidden p-2 text-center"} id="link1">
                    <div className="grid grid-cols-12 gap-4 p-2">
                        <div className="col-span-6 text-right">

                        </div>
                        <div className="col-span-2 text-right">
                        </div>
                        <div className="col-span-2 text-right">
                        </div>
                        <div className="col-span-2 text-right mr-1">
                            <button id="response" className="bg-green-500 hover:bg-green-700 btn btn-sm">Responder</button>
                        </div>
                    </div>
                    <DataTable id="budgetsOrders">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Solicitante</th>
                                <th>Descrição do Orçamento</th>
                                <th>Data limite para responder</th>
                                <th>Respondido</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
                <div className={openTab === 2 ? "block p-2 text-center" : "hidden p-2 text-center"} id="link2">
                    <div className="grid grid-cols-12 gap-4 p-2">
                        <div className="col-span-6">
                        </div>
                        <div className="col-span-2 text-right">
                            <button id="delete" disabled className="bg-red-500 hover:bg-red-700 btn btn-sm">Cancelar Resposta</button>
                        </div>
                        <div className="col-span-4 text-right mr-1">
                            <button id="detailResponse" disabled className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Detalhar Resposta</button>
                        </div>
                    </div>
                    <DataTable id="budgetsResponses">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Solicitante</th>
                                <th>Descrição do Orçamento</th>
                                <th>Validade da Resposta</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>


        </>
    );
};