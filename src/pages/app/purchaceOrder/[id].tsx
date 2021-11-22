/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../../components/template/Layout";
import Head from 'next/head'
import api from '../../../services/api';
import { useEffect, useState, useContext } from "react";
import ImageGallery from 'react-image-gallery';
import { showNotify } from "../../../functions/showNotify";
import { parseISOLocal } from "../../../functions/parseDate";

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

interface iSupplier {
    id: number
    name: string
    accepted: string
    document: string
}

interface iBuyer {
    id: number
    name: string
    accepted: string
    document: string
}

interface budgetRequest {
    buyer: iBuyer
}

interface iBudget {
    id: number
    supplier: iSupplier
    budgetRequest: budgetRequest
    itens: iItens
    expiresOn: string
    buyedAt: string
    description: string
}


export default function product({ id }) {
    const [budget, setBudget] = useState<iBudget | null>(null);

    useEffect(() => {
        async function loadBudget() {
            try {
                const { data: budget } = await api.get('api/budget_response/buyer/' + localStorage.getItem('company') + '/budget/' + id)
                console.log(budget)
                setBudget(budget)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadBudget()

    }, [])

    function render(name, description, qtd, un, descBudget, price, productId) {
        return (
            <>
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-3">
                        <b>Nome do produto:</b> <br />
                        {name}
                    </div>
                    <div className="col-span-3">
                        <b>Descrição do produto:</b> <br />
                        {description}
                    </div>
                    <div className="col-span-2">
                        <b>Quantidade:</b> <br />
                        {qtd} / {un}
                    </div>
                    <div className="col-span-2">
                        <b>Valor / {un}</b><br />
                        R$ {price}

                    </div>
                    <div className="col-span-2">
                        <b>Total</b><br />
                        R$ {price * qtd}

                    </div>
                </div>
                <hr></hr>
            </>
        )
    }

    function renderProduct() {
        let products = []
        let val = 0
        for (var i = 0; i < budget?.itens.length; i++) {
            products.push(render(budget?.itens[i].product.name, budget?.itens[i].product.description,
                budget?.itens[i].quantity,
                budget?.itens[i].product.unitMeasure?.name, budget?.itens[i].description, budget?.itens[i].product.price, budget?.itens[i].product.id))
            val += (budget?.itens[i].product.price * budget?.itens[i].quantity)
        }
        console.log(val)
        let date

        if (budget != undefined) {
            date = parseISOLocal(budget?.buyedAt)
        }

        return (
            <>
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-4">
                        <b>Emitente: </b> <br />
                        {budget?.supplier?.name}
                    </div>
                    <div className="col-span-4">
                        <b>CNPJ: </b> <br />
                        {budget?.supplier?.document}
                    </div>
                    <div className="col-span-4">
                        <b>Dt. Emissão: </b> <br />
                        {((date?.getDate())) + "/" + ((date?.getMonth() + 1)) + "/" + date?.getFullYear()}
                    </div>
                </div>
                <hr />
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-4">
                        <b>Destinatario: </b> <br />
                        {budget?.budgetRequest?.buyer?.name}
                    </div>
                    <div className="col-span-4">
                        <b>CNPJ: </b> <br />
                        {budget?.budgetRequest?.buyer?.document}
                    </div>
                    <div className="col-span-4">
                    </div>
                </div>
                <br />
                <hr></hr>
                <div>
                    <h2 className="text-center text-3xl font-extrabold">Produtos</h2>
                </div>
                <br />
                {products}
                <br />
                <div className="flex flex-col items-center justify-center">
                    <b>Total: </b> R$ {val}
                </div>
            </>
        )
    }



    return (
        <>
            <Head>
                <title>Compra - NF</title>
            </Head>
            <Layout>
                <div>
                    <h2 className="text-center text-3xl font-extrabold">NF - {id} </h2>
                </div>
                <br />
                <div>
                    {renderProduct()}
                </div>
                <br />

            </Layout>
        </>
    )
}


product.getInitialProps = async ({ query }) => {
    const { id } = query
    return { id }
}
