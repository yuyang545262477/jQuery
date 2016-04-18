(function ($) {
  $.fn.yu = function (option) {
    //默认值
    var defaults = {
      'color': 'yellow',
      'fontSize': '50px'
    };
    //  合并默认值,与参数.
    var settings = $.extend({}, defaults, option);
    //  将合并之后的值,显示出来.
    return $(this).css({
      'color': settings.color,
      'fontSize': settings.fontSize
    })
  }
})(jQuery);
