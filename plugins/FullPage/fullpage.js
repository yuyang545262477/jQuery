(function ($) {
    var defaults = {
        click: true,
        loop: false,
        vertical: false,
        duration: 500,
        keyboard: false
    };
    
    function Model(options) {
        this.setting = $.extend({}, defaults, options || {});
        
        //    获取container,contents数组
        this.container = $('#container');
        this.contents = this.container.find('.content');
        
        
    }
    
    //点击事件
    Model.prototype.click = function () {
        //    存储数组
        var contents = this.contents;
        var settings = this.setting;
        //捕捉点击事件
        contents.click(function () {
            var element = this;
            var index = GetIndex(element);
            //判断序列号,做出对应的动作。
            if (index !== contents.length - 1) {
                $(element).animate({height: 0}, settings.duration);
            }
            if (index == contents.length - 1 && settings.loop) {
                index = 0;
                contents.eq(index).animate({height: 100 + '%'}, settings.duration);
                setTimeout(function () {
                    contents.each(function (index, item) {
                        $(item).css({height: 100 + '%'});
                    })
                }, settings.duration);
            }
            
            
        });
        //返回序列号
        function GetIndex(element) {
            return contents.index(element);
        }
        
    };
    //键盘事件
    Model.prototype.keyboard = function () {
        //   从构造函数获取数据
        var settings = this.setting;
        var contents = this.contents;
        //  设置锁
        var canScroll = true;
        
        $(window).keydown(function (e) {
            if (canScroll) {
                canScroll = false;
                //    获取序列
                /**
                 * @return {number}
                 */
                
                var index = GetIndex();
                // ChangeClass(index);
                //    height:0;增加class。
                if (index !== contents.length - 1) {
                    contents.eq(index).animate({height: 0}, settings.duration, function () {
                        ChangeClass(index);
                        canScroll = true;
                    })
                }
                if (index == contents.length - 1 && settings.loop) {
                    contents.eq(0).animate({height: 100 + '%'}, settings.duration);
                    setTimeout(function () {
                        contents.each(function (index) {
                            contents.eq(index).css({height: 100 + '%'});
                        });
                        canScroll = true;
                        ChangeClass();
                    }, settings.duration);
                }
            }
            //    
        });
        /**
         * @return {number}
         */
        var GetIndex = function () {
            for (var i = 0; i < contents.length; i++) {
                if (contents.eq(i).hasClass('active')) {
                    return i;
                }
            }
        };
        
        var ChangeClass = function (index) {
            if ($.isNumeric(index)) {
                contents.eq(index).removeClass('active');
                contents.eq(index + 1).addClass('active');
            }
            else {
                contents.eq(contents.length - 1).removeClass('active');
                contents.eq(0).addClass('active');
            }
            
        }
        
        
    };
    
    
    $.fn.Fullpage = function (options) {
        var model = new Model(options);
        if (model.setting.click) {
            model.click();
        }
        if (model.setting.keyboard) {
            model.keyboard();
        }
        return model;
    }
})(jQuery);