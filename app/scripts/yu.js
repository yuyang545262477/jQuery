(function ($) {
  $.fn.keyup = function () {
    this.css('color','red');
    return this.each(function () {
      $(this).append('' +' yuyang ');
    });
  }
})(jQuery);
