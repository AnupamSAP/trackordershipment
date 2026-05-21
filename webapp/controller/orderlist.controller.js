

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "styker/com/trackordershipment/model/formatter",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
], (Controller, UIComponent, formatter, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("styker.com.trackordershipment.controller.orderlist", {
        formatter: formatter,
        onInit() {
            this.oRouter = UIComponent.getRouterFor(this);
        },
       
        press: function (evt) {
            MessageToast.show("The GenericTile is pressed.");
        },
        onStatusFilter: function (oEvent) {

            const sKey = oEvent.getParameter("selectedItem")
                .getKey();

            const oTable = this.byId("ordersTable");

            const oBinding = oTable.getBinding("rows");

            if (sKey === "ALL") {
                oBinding.filter([]);
                return;
            }

            let sStatus = "";

            switch (sKey) {

    case "ALL":
        sStatus = "";
        break;

    case "DELIVERED":
        sStatus = "Pack Complete";
        break;

    case "INPACKING":
        sStatus = "In Packing";
        break;

    case "PRINTED":
        sStatus = "Printed";
        break;

    case "UNSELeCTED":
        sStatus = "Unselected";
        break;

    case "WEIGHED":
        sStatus = "Weighed";
        break;

    case "MANIFESTED":
        sStatus = "Manifested";
        break;

    case "SHIPPED":
        sStatus = "Shipped/Invoiced";
        break;

    case "CANCELLED":
        sStatus = "Cancelled";
        break;

    default:
        sStatus = "";
        break;
}

            const oFilter = new Filter(
                "UNIFIED_STATUS_DESC",
                FilterOperator.Contains,
                sStatus
            );

            oBinding.filter([oFilter]);
        },
        onSearch: function (oEvent) {

            const sQuery = oEvent
                .getParameter("value")
                .trimStart()
                .replace(/\s+/g, " ");

            const oTable = this.byId("ordersTable");

            const oBinding = oTable.getBinding("rows");

            if (!sQuery) {
                oBinding.filter([]);
                return;
            }

            const aFilters = [

                new Filter(
                    "OrderId",
                    FilterOperator.Contains,
                    sQuery
                ),

                new Filter(
                    "CustomerName",
                    FilterOperator.Contains,
                    sQuery
                ),

                new Filter(
                    "Product",
                    FilterOperator.Contains,
                    sQuery
                )

            ];

            const oFilter = new Filter({
                filters: aFilters,
                and: false
            });

            oBinding.filter(oFilter);
        },
        onViewStatus() {
            this.oRouter.navTo("shipmentStatus", {

            });

        },
     onDateChange: function (oEvent) {

    var dFrom = oEvent.getSource().getDateValue();
    var dTo = oEvent.getSource().getSecondDateValue();

    var oTable = this.byId("ordersTable");

    var oBinding = oTable.getBinding("rows");

    var aContexts = oBinding.getContexts(0, oBinding.getLength());

    var aFiltered = [];

    aContexts.forEach(function (oContext) {

        var oData = oContext.getObject();

        var dCurrent = new Date(oData.so_create_dt_T);

        if (dCurrent >= dFrom && dCurrent <= dTo) {
            aFiltered.push(oData);
        }
    });

    var oFilteredModel = new sap.ui.model.json.JSONModel({
        ZFTS_FEDEX_UNI_CORE_FIORI: aFiltered
    });

    oTable.setModel(oFilteredModel);
    oTable.bindRows("/ZFTS_FEDEX_UNI_CORE_FIORI");
}
        // onDateChange: function () {

        //     var oDateRange = this.byId("dateRange");

        //     var dFrom = oDateRange.getDateValue();
        //     var dTo = oDateRange.getSecondDateValue();

        //     if (!dFrom || !dTo) {
        //         return;
        //     }

        //     // Remove time from selected dates
        //     dFrom.setHours(0, 0, 0, 0);
        //     dTo.setHours(0, 0, 0, 0);

        //     var oTable = this.byId("ordersTable");
        //     var oBinding = oTable.getBinding("rows");

        //     var oFilter = new Filter({
        //         path: "so_create_dt_T",

        //         test: function (sValue) {

        //             if (!sValue) {
        //                 return false;
        //             }

        //             // Example:
        //             // 07-05-2026 00:05

        //             var sDateOnly = sValue.split(" ")[0];

        //             var aDate = sDateOnly.split("-");

        //             var oDate = new Date(
        //                 parseInt(aDate[2]), // year
        //                 parseInt(aDate[1]) - 1, // month
        //                 parseInt(aDate[0]) // day
        //             );

        //             oDate.setHours(0, 0, 0, 0);

        //             return oDate >= dFrom && oDate <= dTo;
        //         }
        //     });

        //     oBinding.filter([oFilter]);
        // }
    });
});