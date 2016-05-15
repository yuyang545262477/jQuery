(function ($) {
//    defaults;
    var defaults = {
        'container': '#container',
        'sections': '.section',
        'easing': 'ease',
        'duration': 300,
        'pagination': true,
        'loop': true,
        'keyboard': true,
        'direction': 'vertical',
        'onpageSwitch': function () {
            
        }
    };
    var win = $(window),
        container,
        sections,
        opts = {},
        canScroll = true,
        iIndex = 0,
        arrElement = [];
    
    
    var SP = $.fn.fullPage = function (options) {
        opts = $.extend({}, defaults, options || {});
        
        container = $(opts.container);
        sections = container.find(opts.sections);
        
        sections.each(function () {
            arrElement.push($(this));
        });
        
        return this.each(function () {
            if (opts.direction == 'horizontal') {
                initLayout();
            }
            if (opts.pagination) {
                initPagination();
            }
            if (opts.keyboard) {
                KeyDown();
            }
        });
        
    };


//    滚轮向上滑动事件
    SP.moveSectionUp = function () {
        if (iIndex) {
            iIndex--;
        } else if (opts.loop) {
            iIndex = arrElement.length - 1;
        }
        scrollPage(arrElement[iIndex]);
    };

//    滚轮向下滑动事件
    SP.moveSectionDown = function () {
        if (iIndex < (arrElement.length - 1)) {
            iIndex++;
        } else if (opts.loop) {
            iIndex = 0;
        }
        
        scrollPage(arrElement[iIndex]);
    };

//    页面滚动事件
    function scrollPage(element) {
        var dest = element.position();
        if (typeof dest !== 'undefined') {
            initEffects(dest, element);
        }
    }

//    重写鼠标滑动事件
    
    $(document).on('mousewheel DOMMouseScroll', MouseWheelHandler);
    
    
    /**
     * @return {boolean}
     */
    function MouseWheelHandler(e) {
        e.preventDefault();
        var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        var delta = Math.max(-1, Math.min(1, value));
        if (canScroll) {
            if (delta < 0) {
                SP.moveSectionDown();
            } else {
                SP.moveSectionUp();
            }
        }
        return false;
    }

//    横向布局初始化
    
    function initLayout() {
        var length = sections.length,
            width = (length * 100) + '%',
            cellWidth = (100 / length).toFixed(2) + '%';
        container.width(width).addClass('left');
        sections.width(cellWidth).addClass('left');
    }

//    初始化分页
    function initPagination() {
        var length = sections.length;
        var pageHtml = '<ul id="pages"><li class = "active"></li>';
        for (var i = 1; i < length; i++) {
            pageHtml += '<li></li>';
        }
        pageHtml += '</ul>';
        $('body').append(pageHtml);
    }

//    分页事件
    function paginationHandler() {
        var pages = $('#pages').find('li');
        pages.eq(iIndex).addClass('active').siblings().removeClass('active');
    }

//    是否支持css
    function isSuportCss(property) {
        var body = $('body')[0];
        for (var i = 0; i < property.length; i++) {
            if (property[i] in body.style) {
                return true;
            }
        }
        return false;
    }

//    渲染效果
    function initEffects(dest, element) {
        var transform = [
            '-webkit-transform', '-ms-transform', '-moz-transform', 'transform'
        ];
        var transition = ['-webkit-transition', '-ms-transition',
            '-moz-transition',
            'transition'];
        var canScroll = false;
        
        if (isSuportCss(transform) && isSuportCss(transition)) {
            var translate = '';
            if (opts.direction == 'horizontal') {
                translate = '-' + dest.left + 'px,0px,0px';
            } else {
                translate = '0px,-' + dest.top + 'px,0px';
            }
            container.css({
                'transition': 'all ' + opts.duration + 'ms ' + opts.easing,
                'transform': 'translate3d(' + translate + ')'
            });
            container.on('webkitTransitionEnd msTransitionend mozTransitionend transitionend', function () {
                canScroll = true;
            });
        } else {
            var cssObj = (opts.direction == 'horizontal') ? {left: -dest.left} : {top: -dest.top};
            container.animate(cssObj, opts.duration, function () {
                canScroll = true;
            });
        }
        element.addClass('active').siblings().removeClass('active');
        if (opts.pagination) {
            paginationHandler();
        }
        
    }

//    窗口的resize
    var resizeId;
    win.resize(function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(function () {
            reBuild();
        }, 20);
    });
    
    function reBuild() {
        var currentHeight = win.height(),
            currentWidth = win.width();
        
        var element = arrElement[iIndex];
        if (opts.direction == 'horizontal') {
            var offsetLeft = element.offset().left;
            if (Math.abs(offsetLeft) > currentWidth / 2 && iIndex < (arrElement.length - 1)) {
                iIndex++;
            }
            else {
                var offsetTop = element.offset().top;
                if (Math.abs(offsetTop) > currentHeight / 2 && iIndex < (arrElement.length - 1)) {
                    iIndex++;
                }
            }
        }
        if (iIndex) {
            paginationHandler();
            var currentElement = arrElement[iIndex],
                dest = currentElement.position();
            initEffects(dest, currentElement);
            
        }
        
    }

//    增加键盘事件
    function KeyDown() {
        var keydownId;
        win.keydown(function (e) {
            clearTimeout(keydownId);
            keydownId = setTimeout(function () {
                var KeyCode = e.keyCode;
                if (KeyCode == 37 || KeyCode == 38) {
                    SP.moveSectionUp();
                } else if (KeyCode == 39 || KeyCode == 40) {
                    SP.moveSectionDown();
                }
            }, 150);
        });
    }
    
    
})(jQuery);