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

                this.oRouter = UIComponent.getRouterFor(this);

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