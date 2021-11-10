/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import useAppData from "../../data/hook/useAppData";
import api from '../../services/api';
import { useEffect } from "react";
import DataTable from "../../components/template/DataTable";
import { showNotify } from "../../functions/showNotify";
import Router from "next/router";
import { validateResponse } from "../../functions/validateResponse";
import React from "react";
export default function partnersProviders() {

    const { baseUrl } = useAppData()

    function Tabs() {
        const [openTab, setOpenTab] = React.useState(1);
        return (
            <>
                <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? "text-white bg-gray-600"
                                    : "text-black bg-white")
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
                                    ? "text-white bg-gray-600"
                                    : "text-black bg-white")
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
                                    ? "text-white bg-gray-600"
                                    : "text-black bg-white")
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



    useEffect(() => {
        $(document).ready(function () {
            var tableReceived;
            var tableSended;
            var id2 = 0;
            var id3 = 0;

            if (localStorage.getItem('company') != null) {
                var table = $('#partners').DataTable({
                    destroy: true,
                    //processing: true,
                    //serverSide: true,
                    ajax: {
                        url: baseUrl + "/api/company_partner/company/" + localStorage.getItem('company'),
                        cache: true,
                        type: "GET",
                        dataSrc: "",
                        xhrFields: {
                            withCredentials: true
                        },
                        error: function (xhr) {
                            console.log("Erro " + xhr.status, xhr.responseText, true);
                        }
                    },
                    language: {
                        "url": '../api/dataTableTranslate'
                    },
                    aLengthMenu: [
                        [25, 50, 100],
                        [25, 50, 100]
                    ],
                    iDisplayLength: 25,
                    columns: [
                        { data: "toCompanyId" },
                        { data: "toCompanyName" },
                        { data: "isAccepted", visible: false },
                    ],
                    scrollY: "300px",
                    stateSave: true,
                });

                var add = $('#add').DataTable({
                    destroy: true,
                    //processing: true,
                    //serverSide: true,
                    ajax: {
                        url: baseUrl + "/api/company_partner/company/" + localStorage.getItem('company') + "/excepts_my",
                        cache: true,
                        type: "GET",
                        dataSrc: "",
                        xhrFields: {
                            withCredentials: true
                        },
                        error: function (xhr) {
                            console.log("Erro " + xhr.status, xhr.responseText, true);
                        }
                    },
                    language: {
                        "url": '../api/dataTableTranslate'
                    },
                    aLengthMenu: [
                        [25, 50, 100],
                        [25, 50, 100]
                    ],
                    iDisplayLength: 25,
                    columns: [
                        { data: "toCompanyId" },
                        { data: "toCompanyName" },
                        { data: "isAccepted", visible: false },
                    ],
                    scrollY: "300px",
                    stateSave: true,
                });
            } else {
                var table = $('#partners').DataTable({
                    destroy: true,
                    language: {
                        "url": '../api/dataTableTranslate'
                    },
                    aLengthMenu: [
                        [25, 50, 100],
                        [25, 50, 100]
                    ],
                    iDisplayLength: 25,

                    scrollY: "300px",
                    stateSave: true,
                });
                var add = $('#add').DataTable({
                    destroy: true,
                    language: {
                        "url": '../api/dataTableTranslate'
                    },
                    aLengthMenu: [
                        [25, 50, 100],
                        [25, 50, 100]
                    ],
                    iDisplayLength: 25,

                    scrollY: "300px",
                    stateSave: true,
                });
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
                api.post('api/company_partner/company/' + localStorage.getItem('company') + '/to/' + partner.toCompanyId).then(
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
                api.delete('api/company_partner/company/' + localStorage.getItem('company') + '/to/' + partner.toCompanyId).then(
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
                api.post('api/company_partner/company/' + partner.toCompanyId + '/to/' + localStorage.getItem('company') + "/accept").then(
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
                api.delete('api/company_partner/company/' + partner.toCompanyId + '/to/' + localStorage.getItem('company')).then(
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
                        tableReceived = $('#received').DataTable({
                            destroy: true,
                            //processing: true,
                            //serverSide: true,
                            ajax: {
                                url: baseUrl + "/api/company_partner/company/" + localStorage.getItem('company') + "/pending_for_me",
                                cache: true,
                                type: "GET",
                                dataSrc: "",
                                xhrFields: {
                                    withCredentials: true
                                },
                                error: function (xhr) {
                                    console.log("Erro " + xhr.status, xhr.responseText, true);
                                }
                            },
                            language: {
                                "url": '../api/dataTableTranslate'
                            },
                            aLengthMenu: [
                                [25, 50, 100],
                                [25, 50, 100]
                            ],
                            iDisplayLength: 25,
                            columns: [
                                { data: "toCompanyId" },
                                { data: "toCompanyName" }
                            ],
                            scrollY: "300px",
                            stateSave: true,
                        });

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
                        tableReceived = $('#received').DataTable({
                            destroy: true,
                            language: {
                                "url": '../api/dataTableTranslate'
                            },
                            aLengthMenu: [
                                [25, 50, 100],
                                [25, 50, 100]
                            ],
                            iDisplayLength: 25,
                            scrollY: "300px",
                            stateSave: true,
                        });

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
                        tableSended = $('#sended').DataTable({
                            destroy: true,
                            //processing: true,
                            //serverSide: true,
                            ajax: {
                                url: baseUrl + "/api/company_partner/company/" + localStorage.getItem('company') + "/pending",
                                cache: true,
                                type: "GET",
                                dataSrc: "",
                                xhrFields: {
                                    withCredentials: true
                                },
                                error: function (xhr) {
                                    console.log("Erro " + xhr.status, xhr.responseText, true);
                                }
                            },
                            language: {
                                "url": '../api/dataTableTranslate'
                            },
                            aLengthMenu: [
                                [25, 50, 100],
                                [25, 50, 100]
                            ],
                            iDisplayLength: 25,
                            columns: [
                                { data: "toCompanyId" },
                                { data: "toCompanyName" }
                            ],
                            scrollY: "300px",
                            stateSave: true,
                        });

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
                        tableSended = $('#sended').DataTable({
                            destroy: true,

                            language: {
                                "url": '../api/dataTableTranslate'
                            },
                            aLengthMenu: [
                                [25, 50, 100],
                                [25, 50, 100]
                            ],
                            iDisplayLength: 25,
                            scrollY: "300px",
                            stateSave: true,
                        });
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
    }, [])

    return (
        <>
            <Head>
                <title>Parceiros</title>
            </Head>
            <Layout>
                <div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-md dark:text-gray-800">
                        <Tabs/>
                    </div>
                </div>

                <input type="checkbox" id="modalAddPartner" className="modal-toggle" />
                <div className="modal">
                    <div className="bg-white p-2 rounded-md">
                        <div className="dark:text-gray-800">
                            <div className="grid grid-cols-12 gap-4 p-2">
                                <div className="col-span-6">
                                    <h2 className="text-left font-extrabold">Adicionar Parceiro</h2>
                                </div>
                                <div className="col-span-4 text-right">
                                    <label htmlFor="modalAddPartner" className="cursor-pointer bg-red-500 hover:bg-red-700 btn btn-sm">Fehar</label>
                                </div>
                                <div className="col-span-2 text-right mr-1">
                                    <button id="sendInvite" disabled className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</button>
                                </div>
                            </div>
                            <DataTable id="add">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Empresa</th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
