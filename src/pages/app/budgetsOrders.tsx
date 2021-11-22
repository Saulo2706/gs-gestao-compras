/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { initialJquery, Tabs } from "../../functions/tableBudgetOrders";
import { useEffect } from "react";

export default function budgetsOrders() {

    useEffect(() => {
        initialJquery()
    }, [])

    return (
        <>
            <Head>
                <title>Orçamentos</title>
            </Head>
            <Layout>
                <div>
                    <div className={`flex flex-row items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Orçamentos</h2>
                    </div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-sm dark:text-gray-800">
                       <Tabs/>
                    </div>
                </div>
            </Layout>
        </>
    )
}
