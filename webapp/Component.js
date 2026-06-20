sap.ui.define([
    "sap/ui/core/UIComponent",
    "styker/com/trackordershipment/model/models",
       "sap/ui/model/odata/v2/ODataModel",
     "./localService/mockserver"
], (UIComponent, models,ODataModel,mockserver) => {
    "use strict";

    return UIComponent.extend("styker.com.trackordershipment.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {

              mockserver.init();

            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

             // THEN create model
            var oModel = new ODataModel(
                "/sap/opu/odata/sap/ZUI_FEDEX_SERVICE_BIND1/",
                {
                    useBatch: false
                }
            );

            this.setModel(oModel);


            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
             
        }
    });
});