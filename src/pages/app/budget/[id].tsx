/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../../components/template/Layout";
import Head from 'next/head'
import api from '../../../services/api';
import { useEffect, useState, useContext } from "react";
import ImageGallery from 'react-image-gallery';
import { showNotify } from "../../../functions/showNotify";


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
    length: number;
    id: number
    products: iProduct
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
    //const [productItem, setProductItem] = useState<iProduct | null>(null);
    //const [imagesItem, setImagesItem] = useState<iImagesProduct[]>([])
    const images = [];

    useEffect(() => {
        async function loadBudget() {
            try {
                const { data: budget } = await api.get('api/budget_request/my/company/' + localStorage.getItem('company') + '/budget/' + id)
                //console.log(budget)
                setBudget(budget)
                //setImagesItem(productItem.images)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadBudget()

    }, [])

    function renderImages(id) {
        return (
            <img src={process.env.baseURL + '/api/product/image/' + id} alt="" />
        );
    }

    function render(name, description, qtd, un, descBudget) {
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
                                 budget?.itens[i].product.unitMeasure?.name, budget?.itens[i].description ))
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
                        <b>Expiração: </b> <br />
                        {budget?.expiresOn}
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
            </Layout>
        </>
    )
}

product.getInitialProps = async ({ query }) => {
    const { id } = query
    return { id }
}
