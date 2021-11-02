/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import { QuestionIcon } from "../../components/icons";
import InputMask from 'react-input-mask';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
import { useEffect, useState } from "react";

import useAppData from "../../data/hook/useAppData";
import { showNotify } from "../../functions/showNotify";
import { useForm } from 'react-hook-form'
import Router from "next/router";
import DataTable from "../../components/template/DataTable";

export default function productManagement() {

    const { baseUrl } = useAppData()



    useEffect(() => {
        $(document).ready(function () {
            $('#editProduct').hide();
            $('#removeProduct').hide();

            var table = $('#products').DataTable({
                destroy: true,
                //processing: true,
                //serverSide: true,
                ajax: {
                    url: baseUrl + "/api/product/my/company/" + localStorage.getItem('company'),
                    cache: true,
                    type: "GET",
                    datatype: 'json',
                    dataSrc: function (src) {
                        let dst = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
                        dst.draw = 1;
                        dst.recordsTotal = src.page.totalElements;
                        dst.recordsFiltered = src.page.totalElements;
                        src._embedded.productVOList.forEach(el => {
                            el.unitMeasure = el.unitMeasure.name;
                            dst.data.push(el)
                        });

                        return dst.data;
                    },
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
                    { data: "id" },
                    { data: "name" },
                    { data: "unitMeasure" },
                ],
                scrollY: "300px",
                stateSave: true,
            });

            $('#products tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('#editProduct').hide();
                    $('#removeProduct').hide();
                } else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#editProduct').show();
                    $('#removeProduct').show();
                }
            });

            $('#editProduct').on('click', function () {
                let product = table.row('.selected').child(1).data();
                $('#productNameEdit').val(product.name);
                $('#unMedidaEdit').val(product.unitMeasure);

            });

            $('#removeProduct').on('click', function () {
                let product = table.row('.selected').child(1).data();
                $('#id_Remove').val(product.name);
                $("div#remove h2").html("Deseja mesmo remover o produto " + product.name)

            });
        });
    }, [])
    return (
        <>
            <Head>
                <title>Registro de Produto</title>
            </Head>
            <Layout>
                <div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-md dark:text-gray-800">
                        <div className="grid grid-cols-12 gap-4 p-2">
                            <div className="col-span-6">
                                <h2 className="text-left text-2xl font-extrabold">Produto</h2>
                            </div>

                            <div className="col-span-2 text-right mr-1">
                                <label htmlFor="modalEditProduct" id="editProduct" className="bg-yellow-500 hover:bg-yellow-700 btn btn-sm">Editar</label>
                            </div>
                            <div className="col-span-2 text-right">
                                <label htmlFor="modalRemProduct" id="removeProduct" className="bg-red-500 hover:bg-red-700 btn btn-sm">Remover</label>
                            </div>
                            <div className="col-span-2 text-right mr-1">
                                <label htmlFor="modalAddProduct" className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</label>
                            </div>
                        </div>
                        <DataTable id="products">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Un Medida</th>
                                </tr>
                            </thead>
                        </DataTable>
                    </div>
                </div>

                {/* MODAL ADD */}
                <input type="checkbox" id="modalAddProduct" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box bg-white">
                        <div className={`flex flex-col items-center justify-center`}>
                            <h2 className="text-center text-3xl font-extrabold text-black">Cadastro de produto</h2>
                        </div>
                        <form className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Nome do Produto:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nome do Produto"
                                        id="productName"
                                        name="productName"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Descrição do Produto:</label>
                                    <textarea
                                        required
                                        placeholder="Descrição do Produto:"
                                        id="productDescription"
                                        name="productDescription"
                                        rows={4}
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Un Medida:</label>
                                    <select
                                        required
                                        placeholder="Un Medida"
                                        id="unMedida"
                                        name="unMedida"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="Un">Un</option>
                                        <option value="M">M</option>
                                        <option value="cm">cm</option>
                                    </select>
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <div className="flex-none flex">
                                        <label className={`text-black`}>Valor padrão:</label>
                                        <div data-tip="É O PREÇO PADRÃO DE SEU PRODUTO!" className="tooltip tooltip-SECONDARY tooltip-right text-black ml-2">
                                            {QuestionIcon}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Valor Padrão"
                                        required
                                        id="priceDefault"
                                        name="priceDefault"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Fotos do Produto:</label>
                                    <input
                                        type="file"
                                        multiple={true}
                                        required
                                        placeholder="Foto do Produto:"
                                        id="productPhotos"
                                        name="productPhotos"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cadastrar Produto
                                </button>
                                <label htmlFor="modalAddProduct" className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3">Cancelar</label>
                            </div>
                        </form>
                    </div>
                </div>

                {/* MODAL EDIT */}
                <input type="checkbox" id="modalEditProduct" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box bg-white">
                        <div className={`flex flex-col items-center justify-center`}>
                            <h2 className="text-center text-3xl font-extrabold text-black">Editar produto</h2>
                        </div>
                        <form className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Nome do Produto:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nome do Produto"
                                        id="productNameEdit"
                                        name="productNameEdit"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Descrição do Produto:</label>
                                    <textarea
                                        required
                                        placeholder="Descrição do Produto:"
                                        id="productDescriptionEdit"
                                        name="productDescriptionEdit"
                                        rows={4}
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Un Medida:</label>
                                    <select
                                        required
                                        placeholder="Un Medida"
                                        id="unMedidaEdit"
                                        name="unMedidaEdit"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    >
                                        <option value="">Selecione...</option>
                                        <option value="UN">Un</option>
                                        <option value="M">M</option>
                                        <option value="cm">cm</option>
                                    </select>
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <div className="flex-none flex">
                                        <label className={`text-black`}>Valor padrão:</label>
                                        <div data-tip="É O PREÇO PADRÃO DE SEU PRODUTO!" className="tooltip tooltip-SECONDARY tooltip-right text-black ml-2">
                                            {QuestionIcon}
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Valor Padrão"
                                        required
                                        id="priceDefaultEdit"
                                        name="unMedidaEdit"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Fotos do Produto:</label>
                                    <input
                                        type="file"
                                        multiple={true}
                                        required
                                        placeholder="Foto do Produto:"
                                        id="productPhotosEdit"
                                        name="productPhotosEdit"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Editar Produto
                                </button>
                                <label htmlFor="modalEditProduct" className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3">Cancelar</label>
                            </div>
                        </form>
                    </div>
                </div>

                {/* MODAL REMOVE */}
                <input type="checkbox" id="modalRemProduct" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box bg-white">
                        <div id="remove" className={`flex flex-col items-center justify-center`}>
                            <h2 className="text-center text-3xl font-extrabold text-black"></h2>
                        </div>
                        <form className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <input type="hidden" name="id_Remove" />

                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Remover Produto
                                </button>
                                <label htmlFor="modalRemProduct" className="cursor-pointer group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3">Cancelar</label>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}


