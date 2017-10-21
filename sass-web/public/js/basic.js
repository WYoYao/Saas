/**
 * Created by SJ on 2017/9/21.
 */
function closePerson(dom) {
    var src = $(dom).attr("src");
    if (src) {
        $(dom).parent().parent().hide();
    } else {
        $(dom).parent().hide();
    }
}
function editableMode(dom) {
    var value = $(dom).prev().text();
    $(dom).parent().hide().next().show().find(".transfer-input").val(value);
    var verify = $(dom).parent().parent().attr("class");
    if (verify == "phone-div") {
        $(dom).parent().next().find(".send-code-countdown span:first-of-type").css({
            "color": "#02a9d1"
        })
    }
}
function uneditableMode(dom, save) {
    $(dom).parents(".able-edit").hide().prev().show();
    if (save) {
        var newValue = $(dom).parent().siblings().find(".transfer-input").val();
        $(dom).parents(".able-edit").prev().find("div").text(newValue)
    }
}
function verifyAble(dom, value) {
    if (value.length == 11) {
        $(dom).next().find("span:first-of-type").css({
            "color": "#02a9d1"
        });
    } else {
        $(dom).next().find("span:first-of-type").css({
            "color": "#b0b0b0"
        });
    }
}
function countDown(dom) {//倒计时
    $(dom).hide().next().show();
    var second = 60;
    var color = $(dom).css("color");
    if (color == "rgb(2, 169, 209)") {
        var s = setInterval(function () {
            if (second > 0) {
                second--;
            }
            $(dom).hide().next().show().find("b").text(second);
            if (second == 0) {
                clearInterval(s)
            }
        }, 1000);
    }

}


