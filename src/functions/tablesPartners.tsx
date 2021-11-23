
import { showNotify } from "../functions/showNotify";
import Router from "next/router";
import { validateResponse } from "../functions/validateResponse";
import { instance, simpleInstance } from "../functions/instanceDatatableJq";
import api from '../services/api';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import DataTable from "../components/template/DataTable";
import React from "react";

export function initialJquery() {

    $(document).ready(function () {
        var tableReceived;
        var tableSended;
        var id2 = 0;
        var id3 = 0;

        if (localStorage.getItem('company') != null) {
            var table = instance("/api/company_partner/company/" + localStorage.getItem('company'), "GET", "partners", [{ data: "id" },{data: "name" }], "")
            var add = instance("/api/company_partner/company/" + localStorage.getItem('company') + "/excepts_my", "GET", "add", [{ data: "id" },{data: "name" }], "")

        } else {
            var table = simpleInstance("partners")
            var add = simpleInstance("add")
        }
        $('#add tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
                $('#sendInvite').attr("disabled", true);
            } else {
                add.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                $('#sendInvite').removeAttr('disabled');
            }
        });

        $('#sendInvite').on('click', function () {
            let partner = add.row('.selected').child(1).data();
            api.post('api/company_partner/company/' + localStorage.getItem('company') + '/to/' + partner.id).then(
                res => {
                    if (res.status == 200) {
                        showNotify("Sucesso", "Pedido enviado com sucesso :)", "success")
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

        $('#remPartnerSended').on('click', function () {
            let partner = tableSended.row('.selected').child(1).data();
            api.delete('api/company_partner/company/' + localStorage.getItem('company') + '/to/' + partner.id).then(
                res => {
                    if (res.status == 200) {
                        showNotify("Sucesso", "Pedido cancelado com sucesso :)", "success")
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


        $('#addPartnerReceived').on('click', function () {
            let partner = tableReceived.row('.selected').child(1).data();
            api.post('api/company_partner/company/' + partner.id + '/to/' + localStorage.getItem('company') + "/accept").then(
                res => {
                    if (res.status == 200) {
                        showNotify("Sucesso", "Parceiro adicionado com sucesso :)", "success")
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

        $('#remPartnerReceived').on('click', function () {
            let partner = tableReceived.row('.selected').child(1).data();
            api.delete('api/company_partner/company/' + partner.id + '/to/' + localStorage.getItem('company')).then(
                res => {
                    if (res.status == 200) {
                        showNotify("Sucesso", "Parceiro recusado com sucesso :)", "success")
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

        $('#idlink2').on('click', function () {
            if (localStorage.getItem('company') != null) {
                if (id2 == 0) {
                    id2 = 1;
                    tableReceived = instance("/api/company_partner/company/" + localStorage.getItem('company') + "/pending_for_me", "GET", "received", [{ data: "id" },{data: "name" }], "")

                    $('#received tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                            $('#remPartnerReceived').attr("disabled", true);
                            $('#addPartnerReceived').attr("disabled", true);
                        } else {
                            tableReceived.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            $('#remPartnerReceived').removeAttr('disabled');
                            $('#addPartnerReceived').removeAttr('disabled');
                        }
                    });
                }
            } else {
                if (id2 == 0) {
                    id2 = 1;
                    tableReceived = simpleInstance("received");

                    $('#received tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                            $('#remPartnerReceived').attr("disabled", true);
                            $('#addPartnerReceived').attr("disabled", true);
                        } else {
                            tableReceived.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            $('#remPartnerReceived').removeAttr('disabled');
                            $('#addPartnerReceived').removeAttr('disabled');
                        }
                    });
                }
            }
        });

        $('#idlink3').on('click', function () {
            if (localStorage.getItem('company') != null) {
                if (id3 == 0) {
                    id3 = 1;
                    tableSended = instance("/api/company_partner/company/" + localStorage.getItem('company') + "/pending", "GET", "sended", [{ data: "id" },{data: "name" }], "")

                    $('#sended tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                            $('#remPartnerSended').attr("disabled", true);
                        } else {
                            tableSended.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            $('#remPartnerSended').removeAttr('disabled');
                        }
                    });
                }
            } else {
                if (id3 == 0) {
                    id3 = 1;
                    tableSended = simpleInstance("sended")
                    $('#sended tbody').on('click', 'tr', function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                            $('#remPartnerSended').attr("disabled", true);
                        } else {
                            tableSended.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                            $('#remPartnerSended').removeAttr('disabled');
                        }
                    });
                }
            }
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
                        Parceiros
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
                        Recebidos
                    </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                    <a
                        className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 3
                                ? "text-black bg-white"
                                : "text-white bg-gray-600")
                        }
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(3);
                        }}
                        data-toggle="tab"
                        href="#link3"
                        id="idlink3"
                        role="tablist"
                    >
                        Enviados
                    </a>
                </li>
            </ul>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className={openTab === 1 ? "block p-2" : "hidden p-2"} id="link1">
                    <div className="grid grid-cols-12 gap-4 p-2">
                        <div className="col-span-6">
                        </div>
                        <div className="col-span-4 text-right">
                        </div>
                        <div className="col-span-2 text-right mr-1">
                            <label htmlFor="modalAddPartner" className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</label>
                        </div>
                    </div>
                    <DataTable id="partners">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Empresa</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
                <div className={openTab === 2 ? "block p-2" : "hidden p-2"} id="link2">
                    <div className="grid grid-cols-12 gap-4 p-2">
                        <div className="col-span-6">
                        </div>
                        <div className="col-span-2 text-right">
                            <button id="remPartnerReceived" disabled className="bg-red-500 hover:bg-red-700 btn btn-sm ">Recusar</button>
                        </div>
                        <div className="col-span-2 text-right">
                            <button id="addPartnerReceived" disabled className="bg-green-500 hover:bg-green-700 btn btn-sm ">Aceitar</button>
                        </div>
                        <div className="col-span-2 text-right mr-1">
                            <label htmlFor="modalAddPartner" className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</label>
                        </div>
                    </div>
                    <DataTable id="received">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Empresa</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
                <div className={openTab === 3 ? "block p-2" : "hidden p-2"} id="link3">
                    <div className="grid grid-cols-12 gap-4 p-2">
                        <div className="col-span-6">
                        </div>
                        <div className="col-span-4 text-right">
                            <button id="remPartnerSended" disabled className="bg-red-500 hover:bg-red-700 btn btn-sm ">Cancelar</button>
                        </div>
                        <div className="col-span-2 text-right mr-1">
                            <label htmlFor="modalAddPartner" className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</label>
                        </div>
                    </div>
                    <DataTable id="sended">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Empresa</th>
                            </tr>
                        </thead>
                    </DataTable>
                </div>
            </div>


        </>
    );
};
