(function ($) {
  $.fn.yu = function (option) {
    //定义默认项目
    var moren = {
      'color': 'red',
      'fontSize': '50px'
    };
    //  设置,如果option有值,就将option的值代替默认值.
    var settings = $.extend(moren, option);

    return this.css({
      'color': settings.color,
      'fontSize': settings.fontSize
    });
  };
})(jQuery);
