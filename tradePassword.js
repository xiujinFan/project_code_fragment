/**
 * Created by fan on 2017/6/13.
 */
function doPassword() {
    $(".i-text").focus(function () {
        for(var i=0;i<=$(this).val().length;i++){
            $(".sixDigitPassword").find("i").eq(i).addClass("active").siblings("i").removeClass("active");
        }
        $(".guangbiao").css('display','block');
        $(".i-text").unbind("keyup").keyup(function() {
            var inp_v = $(this).val();
            var inp_l = inp_v.length;
            $(".sixDigitPassword").find("i").eq( inp_l ).addClass("active").siblings("i").removeClass("active");
            $(".sixDigitPassword").find("i").eq( inp_l ).prevAll("i").find("b").css({"display":"block"});
            $(".sixDigitPassword").find("i").eq( inp_l - 1 ).nextAll("i").find("b").css({"display":"none"});
            $(".guangbiao").css({"display":"block","left":inp_l * 31});//光标位置
            if( inp_l == 0)
            {
                $(".sixDigitPassword").find("i").eq( 0 ).addClass("active").siblings("i").removeClass("active");
                $(".sixDigitPassword").find("b").css({"display":"none"});
                $(".guangbiao").css({"left":0});

            }
            else if( inp_l == 6)
            {
                $(".sixDigitPassword").find("b").css({"display":"block"});
                $(".sixDigitPassword").find("i").eq( 5 ).addClass("active").siblings("i").removeClass("active");
                $(".guangbiao").css({"left":5 * 31});
                $(this).blur();
            }
        });

    });
    $(".i-text").blur(function () {
        $(".sixDigitPassword").find("i").removeClass("active");
        $(".guangbiao").css('display','none');
        judgeTradePwd();
    })
}
/**
 * 判断支付密码是否正确
 * @returns {Number}
 */
function judgeTradePwd()
{
    var flag=0;
    var accpw=$("#payPassword_rsainput").val();
    if(accpw==""||accpw==undefined||accpw==null)
    {
        layer.msg("支付密码不能为空");
        flag = 0
        return flag;
    }
    if(accpw.length!=6)
    {
        layer.msg("请输入至少6位支付密码");
        flag = 0
        return flag;
    }
    $.ajax({
        data:{accpw:accpw},
        url:"/account/validateTradePwd",
        async:false,
        dataType:"text",
        type:'POST',
        cache:false,
        success : function(data, textStatus){
            data=data.replace( /^\s+|\s+$/g, "" );
            if(data=="0000"){
                flag=1;
            }else{
                layer.msg("支付密码不正确");
                flag=0;
            }
        },
        error:function(data, textStatus){
            layer.msg("服务器请求错误");
            flag=0
        }
    });
    return flag;
}