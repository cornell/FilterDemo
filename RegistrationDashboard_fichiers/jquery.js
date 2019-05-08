$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});

var ajaxLoadTimeout;
var ajaxTimeOutDuration = 500;
$(document).ajaxStart(function () {
    if ($(".js-ajaxLoading")) {
        ajaxLoadTimeout = setTimeout(function() { 
                $(".js-ajaxLoading").show();
        }, ajaxTimeOutDuration);
    }
});

$(document).ajaxStop(function () {
    if ($(".js-ajaxLoading")) {
        clearTimeout(ajaxLoadTimeout);
        $(".js-ajaxLoading").hide();
    }
});