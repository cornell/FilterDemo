var syfadis = window.syfadis || {};

syfadis.chartJS = syfadis.chartJS || {};


syfadis.chartJS.utils = {
    GetRGBAForIndex: function (idx, alpha) {
        var className = 'Chart-primaryColor';

        if (idx > 0)
            className += idx;
        var color = syfadis.tools.getCssColor(className);
        return syfadis.tools.rgb2rgba(color, alpha);
    }
};