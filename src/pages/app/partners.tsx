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

    const Tabs = ({ color }) => {
        const [openTab, setOpenTab] = React.useState(1);
        return (
            <>
                <div className="flex flex-wrap">
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
                                            ? "text-white bg-" + color + "-600"
                                            : "text-" + color + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
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
                                            ? "text-white bg-" + color + "-600"
                                            : "text-" + color + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
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
                                            ? "text-white bg-" + color + "-600"
                                            : "text-" + color + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    Enviados
                                </a>
                            </li>
                        </ul>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                            <div className="px-4 py-5 flex-auto">
                                <div className="tab-content tab-space">
                                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                        <div className="grid grid-cols-12 gap-4 p-2">
                                            <div className="col-span-6">
                                            </div>
                                            <div className="col-span-4 text-right">

                                            </div>
                                            <div className="col-span-2 text-right mr-1">
                                                <button id="addPartnerParce" className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</button>
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
                                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                        <div className="grid grid-cols-12 gap-4 p-2">
                                            <div className="col-span-6">
                                            </div>
                                            <div className="col-span-4 text-right">
                                                <button id="remPartner" disabled className="bg-red-500 hover:bg-red-700 btn btn-sm ">Remover</button>
                                            </div>
                                            <div className="col-span-2 text-right mr-1">
                                                <button id="addPartner" className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</button>
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
                                    <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                        <div className="grid grid-cols-12 gap-4 p-2">
                                            <div className="col-span-6">
                                            </div>
                                            <div className="col-span-4 text-right">
                                                <button id="remPartnerSended" disabled className="bg-red-500 hover:bg-red-700 btn btn-sm ">Remover</button>
                                            </div>
                                            <div className="col-span-2 text-right mr-1">
                                                <button id="addPartnerSended" className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };


    useEffect(() => {
        $(document).ready(function () {
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

                var tableReceived = $('#received').DataTable({
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

                var tableSended = $('#sended').DataTable({
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

                var tableReceived = $('#received').DataTable({
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

            $('#received tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('#remPartner').attr("disabled", true);
                } else {
                    tableReceived.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#remPartner').removeAttr('disabled');
                }
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

            $('#addPartner').on('click', function () {
                let partner = table.row('.selected').child(1).data();
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

            $('#remPartner').on('click', function () {
                let partner = tableReceived.row('.selected').child(1).data();
                api.delete('api/company_partner/company/' + localStorage.getItem('company') + '/to/' + partner.toCompanyId).then(
                    res => {
                        if (res.status == 200) {
                            showNotify("Sucesso", "Parceiro deletado com sucesso :)", "success")
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
                            showNotify("Sucesso", "Parceiro deletado com sucesso :)", "success")
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
                <title>Parceiros</title>
            </Head>
            <Layout>
                <div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-md dark:text-gray-800">

                        <Tabs color="gray" />

                    </div>
                </div>
            </Layout>
        </>
    )
}
