/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../../components/template/Layout";
import Head from 'next/head'
import api from '../../../services/api';
import { useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';


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


export default function product({ id }) {
    const [productItem, setProductItem] = useState<iProduct | null>(null);
    const [imagesItem, setImagesItem] = useState<iImagesProduct[]>([])
    const images = [];

    useEffect(() => {
        async function loadProduct() {
            try {
                const { data: productItem } = await api.get('api/product/' + id + '/company/' + localStorage.getItem('company'))
                setProductItem(productItem)
                setImagesItem(productItem.images)
                console.log(productItem)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadProduct()

    }, [])

    function renderImages() {
        if (imagesItem.length > 0) {
            imagesItem.map(el => {
                images.push({
                    original: process.env.baseURL + '/api/product/image/' + el.id,
                    thumbnail: process.env.baseURL + '/api/product/image/' + el.id,
                })
            })
        }
        return <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />;
    }

    function renderProduct() {
        return (
            <>
                <div className={`flex flex-row items-center justify-center`}>
                    <h2 className="text-center text-3xl font-extrabold">
                        {productItem?.name}
                    </h2>
                </div>
                <br />
                <div className="grid grid-cols-12 gap-4 p-2">
                    <div className="col-span-4 w-96 h-96">
                        {renderImages()}
                    </div>
                    <div className="col-span-4">
                        <p>
                            {productItem?.description}
                        </p>
                        <b>Preço padrão: R$ {productItem?.price} / {productItem?.unitMeasure.name}</b>
                    </div>
                    <div className="col-span-2">
                        <b>Quantidade em: </b> {productItem?.unitMeasure.name}
                        <input
                            type="number"
                            placeholder="Quantidade"
                            min="0"
                            required
                            id="qtd"
                            name="qtd"
                            className={`
                                px-1 py-3 rounded-lg bg-gray-200 mb-2 text-black
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                        />
                        <br />
                         <b>Observações: </b>
                        <textarea
                            placeholder="Observações"
                            id="obs"
                            name="obs"
                            rows={4}
                            className={`
                                px-1 py-3 rounded-lg bg-gray-200 mb-2 text-black
                                border focus:border-blue-500 focus:bg-white
                                focus:outline-none
                            `}
                        />
                    </div>
                    <div className="col-span-2 text-right mr-1">
                        <br />
                        <button id="addCart" className="bg-blue-500 hover:bg-blue-700 btn btn-md">Adicionar ao Carrinho</button>
                    </div>

                </div>
            </>
        )
    }


    return (
        <>
            <Head>
                <title>Produto</title>
            </Head>
            <Layout>
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
