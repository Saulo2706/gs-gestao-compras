/* eslint-disable react-hooks/rules-of-hooks */
import { CompanyIcon } from "../icons";
import React, { useEffect, useState } from "react";
import api from '../../services/api';
import Router from "next/router";
import $ from 'jquery';

interface ICompanyes {
    createdAt: string;
    document: string;
    foundedAt: string;
    id: string;
    logo: string;
    name: string;

}

export default function ButtonAlterCompany() {

    const [companyes, setCompanyes] = useState<ICompanyes[]>([]);

    useEffect(() => {
        async function loadCompany() {
            try {
                const { data: companyes } = await api.get('api/company/my')
                setCompanyes(companyes)
            } catch (error) {
                console.log(error.response)
            }
        }

        loadCompany()
    }, [])

    function myFunction(newCompany) {
        var old_company = localStorage.getItem('company')
        if (old_company == newCompany) {
            $('#licompany' + newCompany).css("background-color", "rgba(209, 213, 219, var(--tw-bg-opacity))");
        } else {
            localStorage.setItem('company', newCompany)
            $('#licompany' + newCompany).css("background-color", "rgba(209, 213, 219, var(--tw-bg-opacity))");
            $('#licompany' + old_company).css("background-color", "");
            localStorage.removeItem('products');
            if (Router.pathname == "/app/productManagement" || Router.pathname == "/app/partners" || Router.pathname == "/app/products" || Router.pathname == "/app/budgets" || Router.pathname == "/app/cart") {
                Router.reload()
            }else{
                console.log("entrei no else "+ Router.pathname)

            }
        }

    }

    function renderCompanyes() {
        return (
            companyes.map(company => {
                if(company.id == localStorage.getItem('company')){
                    return (
                        <>
                            <li key={`licompany${company.id}`} style={{ backgroundColor: 'rgba(209, 213, 219, var(--tw-bg-opacity))' }} id={`licompany${company.id}`} className="hover:bg-gray-200 rounded-box " onClick={() => myFunction(company.id)} >
                                <a>{company.name}</a>
                            </li>
                        </>
                    )
                }else{
                    return (
                        <>
                            <li key={`licompany${company.id}`} id={`licompany${company.id}`} className="hover:bg-gray-200 rounded-box " onClick={() => myFunction(company.id)} >
                                <a>{company.name}</a>
                            </li>
                        </>
                    )
                }

            })

        )


    }

    return (
        <div tabIndex={0} className="dropdown dropdown-end ml-3">
            <div className={`
                flex items-center justify-center  cursor-pointer
                bg-black text-yellow-300 w-6 h-6 rounded-full
            `}>
                {CompanyIcon(5)}
            </div>
            <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-gray-100 text-gray-700 rounded-box w-52 mt-1">
                {
                    renderCompanyes()
                }
            </ul>
        </div>
    )
}