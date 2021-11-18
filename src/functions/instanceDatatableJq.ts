import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

export function instance(apiURL: string, methodAPI:string, idTable:string, columns, functionCallback){
    return(
        $('#'+idTable).DataTable({
            destroy: true,
            ajax: {
                url: process.env.baseURL+apiURL,
                cache: true,
                type: methodAPI,
                datatype: 'json',
                dataSrc: functionCallback,
                xhrFields: {
                    withCredentials: true
                },
                error: function (xhr) {
                    console.log("Erro " + xhr.status, xhr.responseText, true);
                }
            },
            language: {
                "url": '../api/dataTableTranslate'
            },
            aLengthMenu: [
                [25, 50, 100],
                [25, 50, 100]
            ],
            iDisplayLength: 25,
            columns: columns,
            scrollY: "300px",
            stateSave: true,
        })
    )
}

export function simpleInstance( idTable:string){
    return(
        $('#'+idTable).DataTable({
            destroy: true,
            language: {
                "url": '../api/dataTableTranslate'
            },
            aLengthMenu: [
                [25, 50, 100],
                [25, 50, 100]
            ],
            iDisplayLength: 25,
            scrollY: "300px",
            stateSave: true,
        })
    )
}
