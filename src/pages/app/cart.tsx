/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import api from '../../services/api';
import { useEffect, useState } from "react";
import Router from "next/router";
import { Description } from "@headlessui/react/dist/components/description/description";
import { showNotify } from "../../functions/showNotify";
import { validateResponse } from "../../functions/validateResponse";

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
        if (products.length == 0) {
            localStorage.removeItem('products');
        } else {
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
                        <div className="col-span-2 w-44 h-44">
                            {renderImages(productItem?.images[0].id)}
                        </div>
                        <div className="col-span-1 w-44 h-44">
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
                                defaultValue={qtd}
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
                                defaultValue={obs}
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
                    <>
                        {render}
                        <br />
                        <hr />
                        <div>
                            <div className="grid grid-cols-12 gap-4 p-2">
                                <div className="col-span-5">
                                    <b>Observações Gerais: </b>
                                    <br />
                                    <textarea
                                        placeholder="Observações"
                                        id={`description`}
                                        name={`description`}
                                        rows={4}
                                        className={`
                                    w-96 h-44 rounded-lg bg-gray-200 mb-2 text-black
                                    border focus:border-blue-500 focus:bg-white
                                    focus:outline-none
                                `}
                                    />
                                </div>
                                <div className="col-span-4">
                                    <b>Data de expiração: </b>
                                    <br />
                                    <input
                                        type="date"
                                        required
                                        placeholder="expires"
                                        id="expiresOn"
                                        name="expiresOn"
                                        className={`
                                px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `} />
                                </div>
                                <div className="col-span-2 text-left mr-1">
                                    <br />
                                    <button id="finishCart" onClick={() => finishCart()} className="bg-blue-500 hover:bg-blue-700 btn btn-md">Concluir Orçamento</button>
                                </div>
                            </div>
                        </div>
                    </>

                )
            } else {
                return (
                    <>
                        <h2 className="text-center text-3xl font-extrabold">Carrinho vazio!</h2>
                    </>
                )
            }
        }
    }

    function finishCart() {
        if ((document.getElementById(`expiresOn`) as HTMLInputElement).value.trim() != "") {
            let productsStorage = [];
            productsStorage = JSON.parse(localStorage.getItem('products'));
            const itens = []
            productsStorage.forEach(el => {
                itens.push({ product: { id: el.id }, quantity: (document.getElementById(`qtd${el.id}`) as HTMLInputElement).value, description: (document.getElementById(`obs${el.id}`) as HTMLInputElement).value })
            });

            const buyer = {
                id: localStorage.getItem('company')
            }

            const budget = {
                buyer: buyer,
                itens: itens,
                description: (document.getElementById(`description`) as HTMLInputElement).value,
                expiresOn: (document.getElementById(`expiresOn`) as HTMLInputElement).value + "T00:00:00.000+00:00"
            };

            api.post('api/budget_request/my', budget).then(
                res => {
                    if (res.status == 200) {
                        showNotify("Sucesso", "Orçamento realizado com sucesso :)", "success")
                        localStorage.removeItem('products');
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
        }else{
            showNotify("Alerta","Data de expiração do orçamento não pode ficar em branco!", "warning")
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

