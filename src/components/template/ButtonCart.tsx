/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/rules-of-hooks */
import { CompanyIcon, IconCart } from "../icons";
import React, { useEffect, useState } from "react";
import api from '../../services/api';
import $ from 'jquery';
import Router from "next/router";

export default function ButtonCart() {

    function pushToCart(){
        Router.push('/app/cart')
    }


    return (
        <div onClick={() => pushToCart()} className={`
                        flex items-center justify-center  cursor-pointer
                        bg-black text-yellow-300 w-6 h-6 rounded-full
                        ml-2
                    `}>
            {IconCart(5)}
        </div>
    )
}