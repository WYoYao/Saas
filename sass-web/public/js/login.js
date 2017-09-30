function logWay(dom, corp) {
    $(dom).css({
        "color": "#02a9d1"
    });
    $(dom).find("em").css({
        "background-color": "#02a9d1"
    });
    if (corp) {
        $(dom).next().css({
            "color": "#b0b0b0"
        });
        $(dom).next().find("em").css({
            "background-color": "white"
        });
        $(".form-person").hide();
        $(".form-company").show();
    } else {
        $(dom).prev().css({
            "color": "#b0b0b0"
        });
        $(dom).prev().find("em").css({
            "background-color": "white"
        });
        $(".form-company").hide();
        $(".form-person").show();

    }
}

function visiblePassword(visible) {
    if (visible) {
        $(".password-div-hidden").hide();
        $(".password-div-visible").show();
    } else {
        $(".password-div-hidden").show();
        $(".password-div-visible").hide();
    }
}

function transferValue(value, visible) {
    if (visible) {
        $(".invisible-password").val(value);
    } else {
        $(".visible-password").val(value);
    }
}

//验证邮箱
function verifyEmail(dom, value) {
    var regx = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/gi;//邮箱
    if (value == "") {
        $(dom).parent().siblings(".error-tip")/*.show()*/.find("span").text("请输入邮箱！");
    } else if (!regx.test(value)) {
        $(dom).parent().siblings(".error-tip")/*.show()*/.find("span").text("该账号不存在，请联系客服！");
    } else {
        $(dom).parent().siblings(".error-tip")/*.hide()*/.find("span").text("");
    }
}

//验证密码
function verifyPassword(dom, value) {
    if (value == "") {
        $(dom).parents(".password-div").siblings(".error-tip")/*.show()*/.find("span").text("请输入密码！");
    } else {
        $(dom).parents(".password-div").siblings(".error-tip")/*.hide()*/.find("span").text("");
    }
}

function verifyAble(dom, value) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号码
    if (value == "") {
        $(dom).next().find("span:first-of-type").css({
            "color": "#b0b0b0"
        });
    } else if (reg.test(value)) {
        $(dom).next().find("span:first-of-type").css({
            "color": "#02a9d1"
        });
        $(dom).parent().siblings(".error-tip")/*.hide()*/.find("span").text("");
    }
}

/*
 function blurVerifyAble(dom, value) {
 var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号码
 if (value == "") {
 $(dom).parent().siblings(".error-tip")/!*.show()*!/.find("span").text("请输入手机号码！");
 } else if (!reg.test(value)) {
 $(dom).parent().siblings(".error-tip")/!*.show()*!/.find("span").text("手机号码格式不正确！");
 } else {
 $(dom).parent().siblings(".error-tip")/!*.hide()*!/.find("span").text("");
 }
 }
 */

//发送验证码
function sendCode(dom) {
    //验证手机号格式是否正确
    var name = $('#cellphoneNumber').val();
    if (!name) {
        $('#cellphoneNumber').addClass('input-error');
        $('#err2').text('请输入手机号');
        return;
    } else {
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if (!reg.test(name)) {
            $('#cellphoneNumber').addClass('input-error');
            $('#err2').text('手机号格式不正确');
            return;
        }
    }

    //发送验证码
    pajax.novalidGet({
        url: 'restUserService/smsSendCode',
        data: {
            phone_num: $('#cellphoneNumber').val()
        },
        success: function (res) {
            console.log(res);
        },
        error: function (error) {
        },
        complete: function () {
        }
    });
    //倒计时
    var color = $(dom).css("color");
    if (color == "rgb(2, 169, 209)") {
        var second = 59;
        var s = setInterval(function () {
            if (second > 0) {
                second--;
            }
            $(dom).hide().next().show().find("b").text(second);
            if (second == 0) {
                clearInterval(s);
                $(dom).show().next().hide();
            }
        }, 1000);
    }
}

//验证输入的验证码是否有效
function verifyCode(dom, value) {
    if (value == "") {
        $(dom).parents(".verify-div").siblings(".error-tip").show().find("span").text("请输入验证码！");
    }/*else if(){
     $(dom).parent().siblings(".error-tip").show().find("span").text("验证码不正确！");
     }*/ else {
        $(dom).parents(".verify-div").siblings(".error-tip").show().find("span").text("");
    }
}

//聚焦取消报错
function inputFocus(id1, id2, errId) {
    $(errId).text('');
    $(id1).removeClass('error-input');
    $(id2).removeClass('error-input');
}

//登录文本框验证
function verifyInputText(id1, id2, errId, flag) {
    var name = $(id1).val();
    var pass = $(id2).val();
    var text1 = flag == 1 ? '账号' : '手机号';
    var text2 = flag == 1 ? '密码' : '验证码';
    var isValid = true;
    if (!name && !pass) {
        $(id1).addClass('error-input');
        $(id2).addClass('error-input');
        $(errId).text('请输入' + text1 + '和' + text2);
        return false;
    }

    if (!name) {
        $(id1).addClass('error-input');
        $(errId).text('请输入' + text1);
        isValid = false;
    } else {
        if (flag == 1) {
            var regx = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/gi;
            if (!regx.test(name)) {
                $(id1).addClass('error-input');
                $(errId).text('邮箱格式不正确');
                return false;
            } else
                $(id1).removeClass('error-input');
        } else {
            var reg = /^1[3|4|5|7|8][0-9]{9}$/;
            if (!reg.test(name)) {
                $(id1).addClass('error-input');
                $(errId).text('手机号格式不正确');
                return false;
            } else
                $(id1).removeClass('error-input');
        }
    }

    if (!pass) {
        $(id2).addClass('error-input');
        $(errId).text('请输入' + text2);
        isValid = false;
    } else
        $(id2).removeClass('error-input');

    return isValid;
}

//企业用户登录
function formCompanyLogin() {
    var isValid = verifyInputText('#email', '#companyPass', '#err1', 1);
    if (isValid) {
        $('#err1').text('');
        document.getElementById('formCompanyLogin').submit();
    }
}

//个人用户登录
function formPersonLogin() {
    var isValid = verifyInputText('#cellphoneNumber', '#code', '#err2', 2);
    if (isValid) {
        $('#err2').text('');
        document.getElementById('formPersonLogin').submit();
    }
}
