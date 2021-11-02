/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-html-link-for-pages */
import useAppData from "../../data/hook/useAppData";
import AvatarUser from "./AvatarUser";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { MenuIcon } from "../icons";
import Link from 'next/link'
import 'jquery/dist/jquery.min.js';
import ButtonAlterTheme from "./ButtonAlterTheme";
import ButtonAlterMode from "./ButtonAlterMode";
import ButtonAlterCompany from "./ButtonAlterCompany";

interface ICompanyes {
    createdAt: string;
    document: string;
    foundedAt: string;
    id: string;
    logo: string;
    name: string;

}

export default function NavBar(props) {
    const { theme, alterTheme } = useAppData()
    const { mode, alterMode } = useAppData()

    return (
        <>
            <div id="nav" className="navbar shadow-lg bg-neutral text-neutral-content">
                <div className="px-2 mx-2 navbar-start">
                    <div className="flex-none mr-2">
                        <label htmlFor="main-menu" id="button_open_drawer" className="btn btn-square btn-ghost drawer-button lg:hidden">{MenuIcon}</label>
                    </div>
                    <Link href="/app"><Logo /></Link>
                    <div className="flex-initial px-2 mx-2 lg:flex">
                        <span className="text-lg font-bold">
                            <Link href="/app">B2B</Link>
                        </span>
                    </div>
                </div>
                <div className="navbar-end">
                    <ButtonAlterMode mode={mode} alterMode={alterMode}/>
                    <ButtonAlterTheme theme={theme} alterTheme={alterTheme} />
                    <ButtonAlterCompany/>
                    <AvatarUser className="ml-4 mr-4" />
                </div>
            </div >


        </>
    )
}