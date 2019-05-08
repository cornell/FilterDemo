// SYFADIS UTILS - Namespace JS for Utils
var syfadis = syfadis || {};

syfadis.tools = {
    
    /**
    * Get css color from class
    * 
    * @param   {string}  fromClass      The class on which we want the color
    * @param   {string}  cssRule        OPTIONNAL, specify a rule (color, background-color, etc). By default: color.
    * @return  {string}  cssValue       The css value as a string (result of $.css())
    */
    getCssColor: function (fromClass, cssRule) {

        var $inspector = $("<div>").css('display', 'none').addClass(fromClass);

        // add to DOM, in order to read the CSS property
        $("body").append($inspector);
        try {
            return $inspector.css(cssRule || 'color');
        } finally {
            $inspector.remove(); // and remove from DOM
        }
    },

    /**
    * Converts an RGB color string ('rgb(xxx, yyy, zzz)') to HexRgb ('#aabbcc').
    *
    * @param   {string}  rgb       The rgb string
    * @return  {string}  hexRgb    The Hex RGB string
    */
    rgb2hex: function (rgb) {
        if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(rgb)) return rgb;
        // if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
        if (!/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(rgb)) throw "Incorrect string parameter. Must be a valid hexRgb string";
        try {
            var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                if (parseInt(x) > 255) throw "Incorrect string parameter. Must be a valid hexRgb string";
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return ("#" + hex(match[1]) + hex(match[2]) + hex(match[3])).toUpperCase();
        }
        catch(e){
            throw "Incorrect string parameter.";
        }
    },
    /**
    * Converts an RGB color string ('rgb(xxx, yyy, zzz)') to HexRgb ('#aabbcc').
    *
    * @param   {string}  rgba       The rgba string
    * @return  {string}  hexRgb    The Hex RGB string
    */
    rgba2hex: function (rgba) {
        if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(rgba)) return rgba;
        if (!/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/.test(rgba)) throw "Incorrect string parameter. Must be a valid hexRgb string";
        try {
            var match = rgba.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                if (parseInt(x) > 255) throw "Incorrect string parameter. Must be a valid hexRgb string";
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return ("#" + hex(match[4]*100) + hex(match[1]) + hex(match[2]) + hex(match[3])).toUpperCase();
        }
        catch (e) {
            throw "Incorrect string parameter.";
        }
    },
    /**
    * Converts an RGB color string ('rgb(xxx, yyy, zzz)') to raw HexRgb ('aabbcc').
    *
    * @param   {string}  rgb       The rgb string
    * @return  {string}  hexRgb    The Hex RGB string
    */
    rgb2rawhex: function (rgb) {
        if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(rgb)) return rgb;
        // if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
        if (!/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(rgb)) throw "Incorrect string parameter. Must be a valid hexRgb string";
        try {
            var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                if (parseInt(x) > 255) throw "Incorrect string parameter. Must be a valid hexRgb string";
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return (hex(match[1]) + hex(match[2]) + hex(match[3])).toUpperCase();
        }
        catch (e) {
            throw "Incorrect string parameter.";
        }
    },
    /**
    * Converts an RGB color string ('rgb(xxx, yyy, zzz)') to HexRgb ('#aabbcc').
    *
    * @param   {string}  alpha     The alpha value
    * @param   {string}  rgb       The rgb string
    * @return  {string}  rgba      The rgba sttring
    */
    rgb2rgba: function (rgb, alpha) {
        if (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(rgb))
            return rgb;

        if (!/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(rgb))
            throw "Incorrect string parameter. Must be a valid hexRgb string";
        try {
            var match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return ("rgba(" + match[1] + ',' + match[2] + ',' + match[3] + ',' + alpha + ')');
        }
        catch (e) {
            throw "Incorrect string parameter.";
        }
    },

    /**
    * Converts an RGB color string ('rgb(xxx, yyy, zzz)') to HexRgb ('#aabbcc').
    *
    * @param   {string}  hex       The hex string (# is optionnal)
    * @return  {string}  rgb        The RGB string
    */
    hex2rgb: function hexToRgb(hex) {
        if(/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.test(hex.replace(' ', ''))) return hex;
        if(!/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(hex)) throw "Incorrect string parameter. Must be a valid hexRgb string";
        try {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return 'rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')';
        }
        catch(e){
            throw "Incorrect string parameter.";
        }
    },

    /**
    * Converts an RGB color value to HSL. Conversion formula
    * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes r, g, and b are contained in the set [0, 255] and
    * returns Object {Hue, Saturation, Luminosity} in the set [0, 1].
    *
    *  See: http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    * 
    * @param   {number}  r       The red color value
    * @param   {number}  g       The green color value
    * @param   {number}  b       The blue color value
    * @return  {Object}           The HSL representation
    */
    rgb2hsl: function (r, g, b) {
        if (!r)
            throw "rgbToHsl Needs three or one parameters. First option: r, g and b. Second option: rgbString or hexrgbstring)";
        
        if (r && !g && !b)
        {
            var hex = syfadis.tools.rgb2hex(r);
            r = parseInt(hex.substr(1, 2), 16), g = parseInt(hex.substr(3, 2), 16), b = parseInt(hex.substr(5, 2), 16);
        }

        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            Hue: h,
            Luminosity: l,
            Saturation: s
        };
    },

    /**
    * Converts an HSL color value to RGB. Conversion formula
    * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
    * Assumes h, s, and l are contained in the set [0, 1] and
    * returns rgb string.
    *
    *  See: http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    * 
    * @param   {number}  h       The hue
    * @param   {number}  s       The saturation
    * @param   {number}  l       The lightness
    * @return  {string}          The RGB string representation (ex: rgb(255, 255, 255))
    */
    hsl2rgb: function (h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }


        return 'rgb(' + Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255) + ')';
    },

    fileSizeFormatter:
        {
            fromBytes: function (sizeInBytes) {
                if (!(sizeInBytes > 0))
                    return "0 byte";
                if (sizeInBytes == 1)
                    return "1 byte";//to remove the 's' from byteS
                var i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
                return (sizeInBytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['bytes', "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i];
            }
        },

    /**
    * Check the client device from the browser agent
    * @return  {bool}  true is this is a mobile
    */
    clientDeviceIsMobile: function() {
        var checkDevice = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) checkDevice = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return checkDevice;
    },

    /**
    * Check the client device from the browser agent
    * @return  {bool}  true is this is a mobile or a tablet
    */
    clientDeviceIsMobileOrTablet: function() {
        var checkDevice = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) checkDevice = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return checkDevice;
    },

    delay: (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })(),

    insertIntoIframe: function (jsClassName, content) {
        
        $(jsClassName).ready(function() {
            $(jsClassName).contents().find('body').append(content);
            $(jsClassName).css('width', '100%');
            var height = $(jsClassName).contents().height();
            $(jsClassName).css('height', height + 10);
        });
    },

    MicrosoftDateTimeToJavascript: function (datetime) {
        var re = /-?\d+/;
        var startDate = re.exec(datetime);
        return new Date(parseInt(startDate[0])); 
    },

    getUrlParameter: function (param) {
        var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
        if (results) {
            return decodeURI(results[1]) || 0;
        }
        return null;
    }

};

// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

// String prototype
// ================
// ## format()
// format function for `string`
//
// ### Returns
// - the formatted string
String.prototype.format = function () {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
};