import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import { instance, simpleInstance } from "../functions/instanceDatatableJq";
export function initialJquery() {
    return(
        $(document).ready(function () {
            $('#editProduct').hide();
            $('#removeProduct').hide();
            if (localStorage.getItem('company') != null) {
                var table = instance(
                    "/api/product/my/company/" + localStorage.getItem('company'),
                    "GET", "products",
                    [{ data: "id" },
                    { data: "name" },
                    { data: "description" },
                    { data: "price" },
                    { data: "unitMeasureName", visible: false },
                    { data: "unitMeasureId", visible: false }],
                    function (src) {
                        let dst = { draw: 0, recordsTotal: 0, recordsFiltered: 0, data: [] };
                        dst.draw = 1;
                        dst.recordsTotal = src.page.totalElements;
                        dst.recordsFiltered = src.page.totalElements;
                        try {
                            src._embedded.productVOList.forEach(el => {
                                el.unitMeasureName = el.unitMeasure.name;
                                el.unitMeasureId = el.unitMeasure.id;
                                dst.data.push(el)
                            });
                        } catch {
                            dst.data = []
                        }

                        return dst.data;
                    })
            } else {
                var table = simpleInstance("products")
            }


            $('#products tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                    $('#editProduct').hide();
                    $('#removeProduct').hide();
                } else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                    $('#editProduct').show();
                    $('#removeProduct').show();
                }
            });

            $('#editProduct').on('click', function () {
                let product = table.row('.selected').child(1).data();
                $('#productNameEdit').val(product.name);
                $('#productDescriptionEdit').val(product.description);
                $('#priceDefaultEdit').val(product.price);
                $('#unMedidaEdit').val(product.unitMeasureId);
                $('#idProductEdit').val(product.id);

            });

            $('#removeProduct').on('click', function () {
                let product = table.row('.selected').child(1).data();
                $('#id_Remove').val(product.id);
                $("div#remove h2").html("Deseja mesmo remover o produto " + product.name)

            });
        })
    )
}