/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import api from '../../services/api';
import { useEffect, useState } from "react";
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

export default function cart() {
    const [productItem, setProductItem] = useState<iProduct[]>([]);

    function removeProduct(productId) {
        console.log("to aqui e o ID é:" + productId)
        let storageProducts = JSON.parse(localStorage.getItem('products'));
        let products = storageProducts.filter(product => product.id != productId);
        if(products.length == 0){
            localStorage.removeItem('products');
        }else{
            localStorage.setItem('products', JSON.stringify(products));
        }
        Router.reload()
    }

    const loadProduct = id => [useEffect(() => {
        async function loadProduct(id: number) {
            try {
                const prod = await (await api.get('api/product/' + id + '/company/' + localStorage.getItem('company'))).data
                setProductItem(old => [...old, prod]);
            } catch (error) {
                console.log(error.response)
            }
        }
        loadProduct(id)
    }, [id])]

    function renderImages(id) {
        return (
            <img src={process.env.baseURL + '/api/product/image/' + id} alt="" />
        );
    }

    function renderCart(productItem: iProduct, qtd, obs) {
        return (
            <>
                <div>
                    <div className="grid grid-cols-12 gap-4 p-2">
                        <div className="col-span-1 w-44 h-44">
                        </div>
                        <div className="col-span-2 w-44 h-44">
                            {renderImages(productItem?.images[0].id)}
                            <h2 className="text-center text-2xl font-bold">{productItem?.name}</h2>
                        </div>
                        <div className="col-span-2">
                        </div>
                        <div className="col-span-2">
                            <b>Quantidade em: </b> {productItem?.unitMeasure.name}
                            <input
                                type="number"
                                placeholder="Quantidade"
                                min="0"
                                required
                                id={`qtd${productItem?.id}`}
                                name={`qtd${productItem?.id}`}
                                value={qtd}
                                className={`
                                    px-1 py-3 rounded-lg bg-gray-200 mb-2 text-black
                                    border focus:border-blue-500 focus:bg-white
                                    focus:outline-none
                                `}
                            />
                        </div>
                        <div className="col-span-2">
                            <b>Observações: </b>
                            <textarea
                                placeholder="Observações"
                                id={`obs${productItem?.id}`}
                                name={`obs${productItem?.id}`}
                                value={obs}
                                rows={4}
                                className={`
                                    px-1 py-3 rounded-lg bg-gray-200 mb-2 text-black
                                    border focus:border-blue-500 focus:bg-white
                                    focus:outline-none
                                `}
                            />
                        </div>
                        <div className="col-span-3 text-left mr-1">
                            <br />
                            <button id="addCart" onClick={() => removeProduct(productItem?.id)} className="bg-red-500 hover:bg-red-700 btn btn-md">Remover do Carrinho</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function getItens() {
        if (typeof window !== 'undefined') {
            let products = [];
            if (localStorage.getItem('products')) {
                products = JSON.parse(localStorage.getItem('products'));
                let render = []
                let i = 0;
                products.forEach(el => {
                    loadProduct(products[i].id)
                    if (productItem[i] != undefined) {
                        render.push(renderCart(productItem[i], products[i].qtd, products[i].obs))
                    }
                    i++;
                });
                return (
                    render
                )
            }
        } else {
            return (
                <>
                    <h2 className="text-center text-3xl font-extrabold">Carrinho vazio!</h2>
                </>
            )
        }
    }

    return (
        <>
            <Head>
                <title>Carrinho</title>
            </Head>
            <Layout>
                <div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Carrinho</h2>
                    </div>
                    <br />
                    {getItens()}
                </div>
            </Layout>
        </>
    )
}

