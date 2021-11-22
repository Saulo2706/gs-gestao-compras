/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../../components/template/Layout";
import Head from 'next/head'
import api from '../../../services/api';
import { useEffect, useState, useContext } from "react";
import ImageGallery from 'react-image-gallery';
import { showNotify } from "../../../functions/showNotify";
import { parseISOLocal } from "../../../functions/parseDate";
import { validateResponse } from "../../../functions/validateResponse";
import Router from "next/router";

interface iProduct {
    id: number;
    name: string;
    unitMeasure: any;
    description: string;
    price: string;
    company: any;
    images: any;
}

interface iImagesProduct {
    id: string;
}

interface iItens {
    forEach: any;
    length: number;
    id: number
    product: iProduct
    quantity: string
    description: string
}

interface iBuyer {
    id: number
    name: string
    accepted: string
}

interface iBudget {
    id: number
    buyer: iBuyer
    itens: iItens
    expiresOn: string
    description: string
}


export default function product({ id }) {
    const [budget, setBudget] = useState<iBudget | null>(null);

    useEffect(() => {
        async function loadBudget() {
            try {
                const { data: budget } = await api.get('api/budget_request/provider/' + localStorage.getItem('company') + '/budget/' + id)
                console.log(budget)
                setBudget(budget)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadBudget()

    }, [])

    function resposeBudget() {
        const supplier = {
            id: localStorage.getItem('company')
        }

        const budgetRequest = {
            id: id
        }
        const itens = []

        budget.itens.forEach(el => {
            itens.push({ product: { id: el.product.id }, reference: { id: el.product.id }, quantity: el.quantity, unitPrice: (document.getElementById(`price${el.product.id}`) as HTMLInputElement).value })
        });

        const response = {
            supplier: supplier,
            budgetRequest: budgetRequest,
            itens: itens,
            expiresOn: (document.getElementById(`expiresOn`) as HTMLInputElement).value + "T00:00:00.000+00:00"
        }

        console.log(response)
        api.post('api/budget_response/my', response).then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Orçamento respondido com sucesso :)", "success")
                    localStorage.removeItem('products');
                    Router.push('../../app/budgetsOrders')
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

    function render(name, description, qtd, un, descBudget, price, productId) {
        return (
            <>
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-4">
                        <b>Nome do produto:</b> <br />
                        {name}
                    </div>
                    <div className="col-span-4">
                        <b>Descrição do produto:</b> <br />
                        {description}
                    </div>
                    <div className="col-span-2">
                        <b>Quantidade:</b> <br />
                        {qtd} / {un}
                    </div>
                    <div className="col-span-2">
                        <b>Preço / {un}</b>
                        <input
                            type="text"
                            required
                            placeholder={`Preço / ${un}`}
                            key={`price${productId}`}
                            id={`price${productId}`}
                            name={`price${productId}`}
                            defaultValue={price}
                            className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `} />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-12">
                        <b>Observações:</b> <br />
                        {descBudget}
                    </div>
                </div>
                <hr></hr>
            </>
        )
    }

    function renderProduct() {
        let products = []

        for (var i = 0; i < budget?.itens.length; i++) {
            products.push(render(budget?.itens[i].product.name, budget?.itens[i].product.description,
                budget?.itens[i].quantity,
                budget?.itens[i].product.unitMeasure?.name, budget?.itens[i].description, budget?.itens[i].product.price, budget?.itens[i].product.id))
        }
        let date

        if (budget != undefined) {
            date = parseISOLocal(budget?.expiresOn)
        }

        return (
            <>
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-4">
                        <b>Solicitante: </b> <br />
                        {budget?.buyer?.name}
                    </div>
                    <div className="col-span-4">
                        <b>Descrição: </b> <br />
                        {budget?.description}
                    </div>
                    <div className="col-span-4">
                        <b>Orçamento valido até: </b> <br />
                        <input
                            type="date"
                            required
                            placeholder="expires"
                            id="expiresOn"
                            name="expiresOn"
                            className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none`}
                        />
                    </div>
                </div>
                <br />
                <hr></hr>
                <div>
                    <h2 className="text-center text-3xl font-extrabold">Produtos</h2>
                </div>
                <br />
                {products}
            </>
        )
    }



    return (
        <>
            <Head>
                <title>Orçamento</title>
            </Head>
            <Layout>
                <div>
                    <h2 className="text-center text-3xl font-extrabold">Orçamento - {id} </h2>
                </div>
                <br />
                <div>
                    {renderProduct()}
                </div>
                <br />
                <div className="flex flex-col items-center justify-center">
                    <button id="finishCart" onClick={() => resposeBudget()} className="text-center bg-green-500 hover:bg-green-700 btn btn-md">Enviar Resposta de Orçamento</button>
                </div>
            </Layout>
        </>
    )
}

product.getInitialProps = async ({ query }) => {
    const { id } = query
    return { id }
}
