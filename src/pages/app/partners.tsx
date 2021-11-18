/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../../components/template/Layout";
import Head from 'next/head'
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { useEffect } from "react";
import DataTable from "../../components/template/DataTable";
import { initialJquery, Tabs } from "../../functions/tablesPartners";
export default function partnersProviders() {  
 
    useEffect(() => {
        initialJquery()
    }, [])

    return (
        <>
            <Head>
                <title>Parceiros</title>
            </Head>
            <Layout>
                <div>
                    <br />
                    <div className="bg-gray-200 mt-3 p-2 w-screen max-w-screen-md m-auto rounded-md dark:text-gray-800">
                        <Tabs/>
                    </div>
                </div>
                <input type="checkbox" id="modalAddPartner" className="modal-toggle" />
                <div className="modal">
                    <div className="bg-white p-2 rounded-md">
                        <div className="dark:text-gray-800">
                            <div className="grid grid-cols-12 gap-4 p-2">
                                <div className="col-span-6">
                                    <h2 className="text-left font-extrabold">Adicionar Parceiro</h2>
                                </div>
                                <div className="col-span-4 text-right">
                                    <label htmlFor="modalAddPartner" className="cursor-pointer bg-red-500 hover:bg-red-700 btn btn-sm">Fehar</label>
                                </div>
                                <div className="col-span-2 text-right mr-1">
                                    <button id="sendInvite" disabled className="bg-blue-500 hover:bg-blue-700 btn btn-sm">Adicionar</button>
                                </div>
                            </div>
                            <DataTable id="add">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Empresa</th>
                                    </tr>
                                </thead>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
