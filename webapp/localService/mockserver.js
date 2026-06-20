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
                rootUri: "/sap/opu/odata/sap/ZUI_FEDEX_SERVICE_BIND1/"
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