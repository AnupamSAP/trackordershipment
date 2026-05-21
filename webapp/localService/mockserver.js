sap.ui.define([
    "sap/ui/core/util/MockServer"
], function (MockServer) {
    "use strict";

    return {

        init: function () {

            var sLocalPath = sap.ui.require.toUrl(
                "styker/com/trackordershipment/localService"
            );

            var oMockServer = new MockServer({
                rootUri: "/sap/opu/odata/sap/ZFTS_FEDEX_UNI_CORE_FIORI_CDS/"
            });

            oMockServer.simulate(sLocalPath + "/metadata.xml", {
                sMockdataBaseUrl: sLocalPath + "/mockdata",
                bGenerateMissingMockData: true
            });

            oMockServer.start();

            console.log("Mock server started");
        }
    };
});