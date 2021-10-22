/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import Head from 'next/head'
import Layout from "../../components/template/Layout";
import { AuthContext } from "../../data/context/AuthContext";

export default function index() {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Head>
                <title>Inicio</title>
            </Head>
            <Layout>
                <div className="m-auto">
                    <div className={`flex flex-col items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Produtos mais vendidos</h2>
                    </div>
                </div>

            </Layout>
        </>
    )
}
