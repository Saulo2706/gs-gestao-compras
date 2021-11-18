/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import { QuestionIcon } from "../../components/icons";
import { default as FormData } from "form-data";

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import { initialJquery} from "../../functions/tableProduct";
import api from '../../services/api';
import { validateResponse } from "../../functions/validateResponse";
import { useEffect, useState } from "react";

import { showNotify } from "../../functions/showNotify";
import { useForm } from 'react-hook-form'
import Router from "next/router";
import DataTable from "../../components/template/DataTable";

interface IUnitMeasures {
    name: string;
    description: string;
    onlyInteger: string;
    id: string;
}

export default function productManagement() {

    const [unitMeasures, setUnitMeasures] = useState<IUnitMeasures[]>([]);
    const { register, handleSubmit } = useForm();

    function handleProductRegister(data) {//POST REGISTRO DE PRODUTO
        const formData = new FormData();
        formData.append("name", data.productName)
        formData.append("description", data.productDescription)
        formData.append("price", data.priceDefault)
        formData.append("companyId", localStorage.getItem('company'))
        formData.append("unitMeasureId", data.productUnMedida)
        for (var i = 0; i < data.productPhotos.length; i++) {
            formData.append("images[" + i + "]", data.productPhotos[i])
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        api.post('api/product/my', formData, config).then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Cadastro realizado com sucesso :)", "success")
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

    }

    function handleProductEdit(data) {//PUT EDITAR DE PRODUTO

        const formData = new FormData();
        formData.append("name", (document.getElementById("productNameEdit") as HTMLInputElement).value)
        formData.append("description", (document.getElementById("productDescriptionEdit") as HTMLInputElement).value)
        formData.append("price", (document.getElementById("priceDefaultEdit") as HTMLInputElement).value)
        formData.append("companyId", localStorage.getItem('company'))
        formData.append("unitMeasureId", (document.getElementById("unMedidaEdit") as HTMLInputElement).value)

        const put = {
            name: (document.getElementById("productNameEdit") as HTMLInputElement).value,
            description: (document.getElementById("productDescriptionEdit") as HTMLInputElement).value,
            price: (document.getElementById("priceDefaultEdit") as HTMLInputElement).value,
            unitMeasureId: (document.getElementById("unMedidaEdit") as HTMLInputElement).value,
            companyId: localStorage.getItem('company')
        }

        const productId = (document.getElementById("idProductEdit") as HTMLInputElement).value

        api.put('api/product/my/' + productId, formData).then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Atualizado realizado com sucesso :)", "success")
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

    }

    function handleProductDelete(data) {//PUT EDITAR DE PRODUTO

        const productId = (document.getElementById("id_Remove") as HTMLInputElement).value

        api.delete('api/product/my/' + productId).then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Deltado realizado com sucesso :)", "success")
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

    }

    useEffect(() => {
       
        initialJquery()

        async function loadUnitMeasure() {
            try {
                const { data: unitMeasure } = await api.get('api/product/unit_measure')
                setUnitMeasures(unitMeasure)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadUnitMeasure()
    }, [])

    function renderUnitMeaseure() {
        return (
            <>
                {unitMeasures.map(el => {
                    return (
                        <option key={`unitMeaseures${el.id}`} value={el.id}>{el.name} - {el.description}</option>
                    )
                })}
            </>
        )
    }
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
                                    <th>Descrição</th>
                                    <th>Preço padrão</th>
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
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleProductRegister)}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Nome do Produto:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nome do Produto"
                                        {...register('productName')}
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
                                        {...register('productDescription')}
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
                                        {...register('productUnMedida')}
                                        id="productUnMedida"
                                        name="productUnMedida"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    >
                                        <option value="">Selecione...</option>
                                        {renderUnitMeaseure()}
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
                                        {...register('priceDefault')}
                                        type="number"
                                        placeholder="Valor Padrão"
                                        min="0"
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
                                        {...register('productPhotos')}
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
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleProductEdit)}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <input type="hidden" name="idProductEdit" id="idProductEdit" {...register('idProductEdit')} />

                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label className={`text-black`}>Nome do Produto:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nome do Produto"
                                        {...register('productNameEdit')}
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
                                        {...register('productDescriptionEdit')}
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
                                        {...register('unMedidaEdit')}
                                        id="unMedidaEdit"
                                        name="unMedidaEdit"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    >
                                        <option value="">Selecione...</option>
                                        {renderUnitMeaseure()}
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
                                        {...register('priceDefaultEdit')}
                                        name="priceDefaultEdit"
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
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleProductDelete)}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <input type="hidden" name="id_Remove" id="id_Remove" />

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


