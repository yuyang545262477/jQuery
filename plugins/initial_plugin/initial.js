/*
 * one of the OOP jQuery plugins
 * */


//defined function


//defined constructor
(function ($,window) {

    var beautifier = function (ele, opt) {
        this.$element = ele;
        this.defaults = {
            'color': 'red',
            'fontSize': '50px',
            'textDecoration': 'none'
        };
        this.options = $.extend({}, this.defaults, opt);
    };
    beautifier.prototype.beautify = function () {
        return this.$element.css({
            'color': this.options.color,
            'fontSize': this.options.fontSize,
            'textDecoration': this.options.textDecoration
        });
    };

//instantiation
    $.fn.yu = function (options) {
        var beauti = new beautifier(this, options);
        return beauti.beautify();
    };

})(jQuery,window);
