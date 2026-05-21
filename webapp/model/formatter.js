sap.ui.define([], function () {
    "use strict";

    return {
          getTimelineCircleClass: function (sState) {

            switch (sState) {

                case "Complete":
                    return "timelineCircleComplete";

                case "In Progress":
                    return "timelineCircleProgress";

                default:
                    return "timelineCirclePending";
            }
        },

        getTimelineIcon: function (sState) {

            switch (sState) {

                case "Complete":
                    return "sap-icon://accept";

                case "In Progress":
                    return "sap-icon://pending";

                default:
                    return "";
            }
        },

        formatStatusState: function (sStatus) {

            if (!sStatus) {
                return "None";
            }

            switch (sStatus.toUpperCase()) {

                case "SHIPPED/INVOICED":
                    return "Success";

                case "MANIFESTED":
                    return "Information";

                case "CANCELLED":
                    return "Error";

                case "PENDING DISPATCH":
                    return "Warning";

                default:
                    return "None";
            }
        }

    };

});