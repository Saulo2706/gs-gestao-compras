/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import api from '../../services/api';
import { useEffect, useState } from "react";

interface iProducts {
    id: number;
    name: string;
    description: string;
    company: any;
    images: any;
}

export default function products() {
    const [products, setProducts] = useState<iProducts[]>([]);

    useEffect(() => {

        async function loadProducts() {
            try {
                const { data: products } = await api.get('api/product/company/' + localStorage.getItem('company'))
                setProducts(products)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadProducts()

    }, [])

    function renderProducts() {
        if (products.length > 0) {
            return (
                <>
                    <div className="bg-gray-300 mt-3 p-2 w-screen max-w-screen-lg m-auto rounded-sm dark:text-gray-800">
                        <div className="container my-12 mx-auto px-4 md:px-12">
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                {products.map(el => {
                                    return (
                                        <>
                                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                                                <article className="bg-gray-100 overflow-hidden rounded-lg shadow-lg">
                                                    <a href={`product/${el.id}`}>
                                                        <img alt="productImage" className="h-60 w-96" src={`${process.env.baseURL}/api/product/image/${el.images[0].id}`} />
                                                    </a>
                                                    <header className=" flex items-center justify-between leading-tight p-2 md:p-4">
                                                        <h1 className="text-lg">
                                                            <a className="no-underline hover:underline text-black" href={`product/${el.id}`}>
                                                                {el.name}
                                                            </a>
                                                        </h1>
                                                    </header>
                                                    <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                                        <label className="flex items-center no-underline text-black">
                                                            <p className="text-sm">
                                                                {el.company.toCompanyName} - {el.company.toCompanyId}
                                                            </p>
                                                        </label>
                                                    </footer>
                                                </article>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-bold">Nenhum produto encontrado!</h2>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <Head>
                <title>Produtos</title>
            </Head>
            <Layout>
                <div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Produtos de Parceiros</h2>
                    </div>
                    <br />
                    {renderProducts()}
                </div>
            </Layout>
        </>
    )
}