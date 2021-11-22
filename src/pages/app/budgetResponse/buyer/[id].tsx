/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../../../components/template/Layout";
import Head from 'next/head'
import api from '../../../../services/api';
import { useEffect, useState, useContext } from "react";
import ImageGallery from 'react-image-gallery';
import { showNotify } from "../../../../functions/showNotify";
import { parseISOLocal } from "../../../../functions/parseDate";
import { validateResponse } from "../../../../functions/validateResponse";
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
    unitPrice: string
    description: string
}

interface iSupplier {
    id: number
    name: string
    accepted: string
}

interface iBudget {
    id: number
    supplier: iSupplier
    itens: iItens
    expiresOn: string
    description: string
}


export default function product({ id }) {
    const [budget, setBudget] = useState<iBudget | null>(null);

    useEffect(() => {
        async function loadBudget() {
            try {
                const { data: budget } = await api.get('api/budget_response/buyer/' + localStorage.getItem('company') + '/budget/' + id);
                console.log(budget)
                setBudget(budget)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadBudget()

    }, [])

    function resposeBudget(id_Supplier) {
        
        api.patch('api/budget_response/my/company/'+id_Supplier+'/budget/'+id+'/buy').then(
            res => {
                if (res.status == 200) {
                    showNotify("Sucesso", "Orçamento confirmado com sucesso :)", "success")
                    localStorage.removeItem('products');
                    Router.push('../../../app/budgets')
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

    function render(name, description, qtd, un, price) {
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
                        <b>Preço / {un}</b> <br />
                        R$ {price}
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
                budget?.itens[i].product.unitMeasure?.name, budget?.itens[i].unitPrice))
            val = val + (budget?.itens[i].unitPrice * budget?.itens[i].quantity)
            console.log(val)

        }


        let date

        if (budget != undefined) {
            date = parseISOLocal(budget?.expiresOn)
        }

        return (
            <>
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-4">
                        <b>Fornecedor: </b> <br />
                        {budget?.supplier?.name}
                    </div>
                    <div className="col-span-4">
                    </div>
                    <div className="col-span-4">
                        <b>Orçamento valido até: </b> <br />
                        {((date?.getDate())) + "/" + ((date?.getMonth() + 1)) + "/" + date?.getFullYear()}
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
                    <button id="finishCart" onClick={() => resposeBudget(budget?.supplier?.id)} className="text-center bg-green-500 hover:bg-green-700 btn btn-md">Confirmar Orçamento - Comprar</button>
                </div>
            </Layout>
        </>
    )
}

product.getInitialProps = async ({ query }) => {
    const { id } = query
    return { id }
}
