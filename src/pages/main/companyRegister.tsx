import Layout from "../../components/template/Layout";
import Head from 'next/head'
export default function companyBuyerRegister() {

    return (
        <>
            <Head>
                <title>Cadastro de Empresa - Comprador</title>
            </Head>
            <Layout>
                    <div className="m-auto">
                        <div className={`flex flex-col items-center justify-center`}>
                            <h2 className="text-center text-3xl font-extrabold">Cadastrar empresa - Comprador</h2>
                        </div>
                        <form className="mt-8">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label>Nome da Empresa:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nome da Empresa"
                                        id="companyName"
                                        name="companyName"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label>CNPJ da Empresa:</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="CNPJ da Empresa"
                                        id="companyCNPJ"
                                        name="companyCNPJ"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div className="flex flex-col mt-4">
                                    <label>Data de fundação:</label>
                                    <input
                                        type="date"
                                        required
                                        placeholder="Data de fundação"
                                        id="companyFoundation"
                                        name="companyFoundation"
                                        className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cadastrar Empresa
                                </button>
                            </div>
                        </form>
                    </div>                
            </Layout>
        </>
    )
}
