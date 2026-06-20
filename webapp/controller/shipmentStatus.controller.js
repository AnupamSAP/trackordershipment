sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "styker/com/trackordershipment/model/formatter"
], function (Controller, UIComponent, History,formatter) {
    "use strict";

    return Controller.extend(
        "styker.com.trackordershipment.controller.shipmentStatus",
        {

             formatter: formatter,
          onInit: function () {

    this.getOwnerComponent()
        .getRouter()
        .getRoute("shipmentStatus")
        .attachPatternMatched(
            this._onObjectMatched,
            this
        );
},
_onObjectMatched: function(oEvent) {

    var sTrackingNum =
        oEvent.getParameter("arguments").trackingNum;

    var oModel = this.getView().getModel();

    var aFilters = [
        new sap.ui.model.Filter(
            "tracking_num",
            sap.ui.model.FilterOperator.EQ,
            sTrackingNum
        )
    ];

    oModel.read("/FedExUnified", {
        filters: aFilters,
        success: function(oData) {

            if (oData.results.length > 0) {

                var oSelectedModel =
                    new sap.ui.model.json.JSONModel(
                        oData.results[0]
                    );

                this.getView().setModel(
                    oSelectedModel,
                    "selectedOrder"
                );
            }

        }.bind(this)
    });
},
           

            onBack: function () {

                const oHistory = History.getInstance();

                const sPreviousHash =
                    oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {

                    window.history.go(-1);

                } else {

                    this.oRouter.navTo(
                        "Routehome",
                        {},
                        true
                    );
                }
            }

        }
    );
});