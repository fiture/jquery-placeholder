/**
 * jquery.placehoder.js
 *
 * @author fiture (fiture.cn@gmail.com)
 * @date 2014-06-09
 *
 * http://github.com/fiture/jquery-placeholder
 *
 * Usage:
 *
 *   $('input.xx').placeholder(options);
 *   $('textarea.xx').placeholder(options);
 *
 */

;(function($) {
    var defaults = {
        customLeft: 3, // 单位: px
        textColor: '#CCC', // label的颜色: red, #DDD
        cls: '', //placeholderp-simulation
        forceUse: false, //支持placeholder的浏览器，是否强制使用
        focusHide: true //是否聚焦隐藏placeholder
    };


    function Placeholder($el, options) {

        if (!$el.attr('placeholder') || $el.data('noplaceholder')) return;

        this.$el = $el;
        this.opts = options;
        this.$label = $('<label/>');

        //设置父级元素的position，已获取准确的父级元素定位
        this.$el.parent().css({'position': 'relative'});

        return this.init();
    }

    Placeholder.prototype = (function() {

        var uniqueid = 0;

        return {
            init: function() {

                var me = this,
                    $el = me.$el,
                    $elPar = $el.parent(),
                    pos = $el.position(),
                    placeholderText = $el.attr('placeholder'),
                    paddingTop = parseInt($el.css('padding-top'), 10),
                    paddingLeft = parseInt($el.css('padding-left'), 10),
                    whiteSpace = $el.is('input') ? 'nowrap' : 'normal';

                pos = $.extend(pos, {
                    overflow: 'hidden',
                    position: 'absolute',
                    color: me.opts.textColor,
                    width: $el.width(),
                    height: $el.outerHeight(),
                    paddingTop: paddingTop,
                    whiteSpace: whiteSpace,
                    left: pos.left + me.opts.customLeft + paddingLeft + 'px'
                });

                $el.removeAttr('placeholder');

                //如果没有ID生成一个唯一的ID
                !$el[0].id && (function() {
                    $el[0].id = 'J-placeholder-' + me.getUniqueId();
                }());

                //定位模拟placeholder的label
                me.$label
                  .css(pos)
                  .text(placeholderText)
                  .attr('for', $el[0].id)
                  .addClass(me.opts.cls)
                  .appendTo($elPar);
                $el.val() && me.$label.hide();

                me.listen();
            },

            listen: function() {
                var $el = this.$el,
                    $label = this.$label,
                    evtName = this.opts.focusHide ? 'focus' : 'keyup';

                $el.on(evtName, function () {
                    $label.hide();
                });
                $el.on({
                    'blur change': function() {
                        $label.toggle(!this.value);
                    }
                });
            },

            getUniqueId: function() {
                //闭包里面的变量 uniqueid
                return uniqueid++;
            }
        };
    })();

    $.fn.placeholder = function(options) {

        var opts = $.extend({}, defaults, options);

        if ( !opts.forceUse ) {
            if ('placeholder' in $('<input/>')[0]) return;
        }

        this.each(function() {
            new Placeholder($(this), opts);
        });

        return this;
    };
})(jQuery);