import Layout from "../../components/template/Layout";
import Head from 'next/head'
import { QuestionIcon } from "../../components/icons";
export default function productRegister() {

    return (
        <>
            <Head>
                <title>Registro de Produto</title>
            </Head>
            <Layout>
                <div className="m-auto">
                    <div className={`flex flex-col items-center justify-center`}>
                        <h2 className="text-center text-3xl font-extrabold">Cadastro de produto</h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <label>Nome do Produto:</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Nome do Produto"
                                    id="productName"
                                    name="productName"
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                />
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <label>Descrição do Produto:</label>
                                <textarea
                                    required
                                    placeholder="Descrição do Produto:"
                                    id="productDescription"
                                    name="productDescription"
                                    rows={4}
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                />
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <label>Un Medida:</label>
                                <select
                                    required
                                    placeholder="Un Medida"
                                    id="unMedida"
                                    name="unMedida"
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Un">Un</option>
                                    <option value="M">M</option>
                                    <option value="cm">cm</option>
                                </select>
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <div className="flex-none flex">
                                    Valor padrão:
                                    <div data-tip="É O PREÇO PADRÃO DE SEU PRODUTO!" className="tooltip tooltip-SECONDARY tooltip-right ml-2">
                                        {QuestionIcon}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Valor Padrão"
                                    required
                                    id="priceDefault"
                                    name="priceDefault"
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                />
                            </div>
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="flex flex-col mt-4">
                                <label>Fotos do Produto:</label>
                                <input
                                    type="file"
                                    multiple={true}
                                    required
                                    placeholder="Foto do Produto:"
                                    id="productPhotos"
                                    name="productPhotos"
                                    className={`
                                            px-4 py-3 rounded-lg bg-gray-200 mt-2 text-black
                                            border focus:border-blue-500 focus:bg-white
                                            focus:outline-none
                                        `}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cadastrar Produto
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}
