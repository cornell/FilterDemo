syfadis.analytics.logHelper = function(objectName) {
    return {
        info: function(functionName, message) {
            if (message) {
                log.info('[' + objectName + '.' + functionName + '] - "' + message + '"');
            } else {
                log.info('[' + objectName + '.' + functionName + ']');
            }
        },

        infoEnter: function(functionName, eventName) {
            if (eventName) {
                log.info('[' + objectName + '.' + functionName + '] - ' + eventName.toUpperCase());
            } else {
                log.info('[' + objectName + '.' + functionName + '] - ENTER');
            }
        },

        warn: function(message) {
            log.warn(message);
        },

        error: function(message) {
            log.error(message);
        }
    };
};
