/**
 * Created by fan on 2017/6/13.
 */
$(function(){

    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        $('input[placeholder],textarea[placeholder]').each(function () {
            var that = $(this),
                text = that.attr('placeholder');
            if (that.val() === "") {
                that.val(text).css({"color":"#aaa"}).addClass('placeholder');
            }
            that.focus(function () {
                if (that.val() === text) {
                    that.val("").css({"color":"#000"}).removeClass('placeholder');
                }
            }).blur(function () {
                if (that.val() === "") {
                    that.val(text).css({"color":"#aaa"}).addClass('placeholder');
                }
            })
                .closest('form').submit(function () {
                if (that.val() === text) {
                    that.val('');
                }
            });
        });
    }else {
        $('input[placeholder],textarea[placeholder]').each(function (index,item) {
            var $place=$(item).context.placeholder;
            $(this).focus(function () {
                $(this).removeAttr('placeholder');
            }).blur(function () {
                $(this).attr('placeholder',$place);
            })
        })
    }
    $('select').click(function () {
        $(this).css('color','#000')
    })
});