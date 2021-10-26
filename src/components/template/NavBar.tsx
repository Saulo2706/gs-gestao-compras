/* eslint-disable @next/next/no-html-link-for-pages */
import useAppData from "../../data/hook/useAppData";
import AvatarUser from "./AvatarUser";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ButtonAlterTheme from "./ButtonAlterTheme";
import { MenuIcon } from "../icons";
import api from '../../services/api';

import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

interface ICompanyes {
    createdAt: string;
    document: string;
    foundedAt: string;
    id: string;
    logo: string;
    name: string;

}

function saveCompanyLocalStorage() {
    var company = (document.getElementById("company") as HTMLInputElement).value;
    localStorage.setItem("company", company);
}

export default function NavBar(props) {
    const { theme, alterTheme } = useAppData()
    const [companyes, setCompanyes] = useState<ICompanyes[]>([]);

    useEffect(() => {
        $(document).ready(function () {
            /*let aberto = 1;
            $("#button_open_drawer").click(function () {
                if (aberto == 1) {
                    aberto = 0
                    $("#drawer-menu").hide();
                } else {
                    aberto = 1
                    $("#drawer-menu").show();
                }
            });*/
        });

        async function loadCompany() {
            try {
                const { data: companyes } = await api.get('api/company/my')
                setCompanyes(companyes)
                if (typeof window !== "undefined") {
                    if (localStorage.company) {
                        (document.getElementById('company') as HTMLInputElement).value = localStorage.company;
                    }
                }
            } catch (error) {
                console.log(error.response)
                if (typeof window !== "undefined") {
                    if (localStorage.company) {
                        (document.getElementById('company') as HTMLInputElement).value = localStorage.company;
                    }
                }
            }
        }

        loadCompany()

    }, [])

    return (
        <>
            <div id="nav" className="navbar shadow-lg bg-neutral text-neutral-content">
                <div className="px-2 mx-2 navbar-start">
                    <div className="flex-none mr-2">
                        <label htmlFor="main-menu" id="button_open_drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">{MenuIcon}</label>
                    </div>
                    <Logo />
                    <div className="flex-initial px-2 mx-2 lg:flex">
                        <span className="text-lg font-bold">
                            B2B
                        </span>
                    </div>
                    <div className="ml-5">
                        <select
                            required
                            placeholder="Empresa"
                            id="company"
                            name="company"
                            onChange={saveCompanyLocalStorage}
                            className={`
                                            input input-ghost w-full mr-5 bg-gray-700
                                        `}
                        >
                            <option value="">Selecione...</option>
                            <option value="jorge">teste...</option>
                            {companyes.map(company => {
                                return (
                                    <option key={company.id} id={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="navbar-end">
                    <ButtonAlterTheme theme={theme} alterTheme={alterTheme} />
                    <AvatarUser className="ml-4 mr-4" />
                </div>
            </div >


        </>
    )
}