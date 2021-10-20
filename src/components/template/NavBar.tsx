/* eslint-disable @next/next/no-html-link-for-pages */
import useAppData from "../../data/hook/useAppData";
import AvatarUser from "./AvatarUser";
import { useEffect } from "react";
import NavItem from "./NavItem";
import Logo from "./Logo";
import ButtonAlterTheme from "./ButtonAlterTheme";
import { SearchIcon, MenuIcon } from "../icons";

import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

export default function NavBar(props) {
    const { theme, alterTheme } = useAppData()

    useEffect(() => {
        $(document).ready(function () {
            $("#button_open_drawer").hide();

            $("#button_open_drawer").click(function () {
                $("#drawer-menu").show();
                $("#button_open_drawer").hide();
                $("#button_close_drawer").show();
            });

            $("#button_close_drawer").click(function () {
                $("#drawer-menu").hide();
                $("#button_open_drawer").show();
                $("#button_close_drawer").hide();
            });

        });
    }, [])

    return (
        <>
            <div className="navbar shadow-lg bg-neutral text-neutral-content">
                <div className="px-2 mx-2 navbar-start">
                    <div className="flex-none hidden xl:flex mr-2">
                        <label id="button_open_drawer" className="btn btn-square btn-ghost">{MenuIcon}</label>
                        <label id="button_close_drawer" className="btn btn-square btn-ghost">{MenuIcon}</label>
                    </div>
                    <Logo />
                    <div className="flex-initial px-2 mx-2 lg:flex">
                        <span className="text-lg font-bold">
                            B2B
                        </span>
                    </div>
                </div>
                {/*<div className="hidden px-2 mx-2 navbar-center lg:flex">
                <div className="flex items-stretch">
                    <NavItem href="/main" texto="Inicio" />
                </div>
            </div>*/}
                <div className="navbar-end">
                    <div>
                        <input type="text" placeholder="Buscar" className="input input-ghost w-full" />
                    </div>
                    <button className="btn btn-square btn-ghost mr-3">
                        {SearchIcon}
                    </button>
                    <ButtonAlterTheme theme={theme} alterTheme={alterTheme} />
                    <AvatarUser className="ml-4 mr-4" />
                </div>
            </div >
            

        </>
    )
}