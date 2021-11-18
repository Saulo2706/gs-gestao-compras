import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import { instance, simpleInstance } from "../functions/instanceDatatableJq";
export function initialJquery() {
    return (
        $(document).ready(function () {
            instance("/api/company/my", "GET", "companyes", [
                { data: "name" },
                { data: "document" },
                { data: "foundedAt" },
                { data: "createdAt", visible: false },
                { data: "logo", visible: false },
                { data: "id", visible: false }
            ], "")
            /*$('#companyes').DataTable({
                destroy: true,
                ajax: {
                    url: baseUrl + "/api/company/my",
                    dataSrc: "",
                    cache: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    error: function (xhr) {
                        showNotify("Erro " + xhr.status, xhr.responseText, true);
                    }
                },
                language: {
                    "url": '../api/dataTableTranslate'
                },
                aLengthMenu: [
                    [25, 50, 100, 200, -1],
                    [25, 50, 100, 200, "todos"]
                ],
                iDisplayLength: 25,
                columns: [
                    { data: "name" },
                    { data: "document" },
                    { data: "foundedAt" },
                    { data: "createdAt", visible: false },
                    { data: "logo", visible: false },
                    { data: "id", visible: false }
                ],
                scrollY: "300px",
                stateSave: true,

            });*/
        })
    )
}