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
                <title>MAIN</title>
            </Head>
            <Layout>
                <h1>MAIN</h1>
                <h1>FirstName: {user?.firstName}</h1>
                <h1>Email: {user?.email}</h1>


            </Layout>
        </>
    )
}
