$(function () {
    cardPrintLogic.init();
});

var cardPrintEvent = {
    //选项卡切换时展示不同的页面
    mainTabToggleForPage: function () {
        var index = $('#divCardPrintTab').psel();
    },
    //根据选项卡索引获取对应表格的element
    getGridTarget: function () {
        var tabIndex = $("#divCardPrintTab").psel();
        return tabIndex == 0 ? $('#gridCardPrintForEq') : $('#gridCardPrintForSp');
    },
    //下载名片事件
    downEvent: function () {
        cardPrintLogic.downCard();
    },
    //打开设置页面
    openSetPage: function () {
        var tabIndex = $("#divCardPrintTab").psel();
        $('#divCardSetTab').psel(tabIndex);
    },
    //保存名片事件
    saveCardEvent: function () {
        cardPrintLogic.saveCard();
    },
    //input file 改变事件
    fileChangeEvent: function (target) {
        var file = target.files[0];
        cardPrintLogic.uploadLogo(file);
        target.value = '';
    }
};


var printCardObj = {};



// 定制卡片
cardPrintEvent.customMadeCard = function () {
    $("#printCardList").hide();
    $("#printCardDz").show();
};
cardPrintEvent.customMadeCardHide = function () {
    $("#printCardList").show();
    $("#printCardDz").hide();
};
cardPrintEvent.customMadeCardConfirm = function () {

    $("#confirmCardModal").pshow();
};
cardPrintEvent.confirmCardModalQd = function () {

    cardPrintEvent.customMadeCardConfirmHide();
};
cardPrintEvent.customMadeCardConfirmHide = function () {
    $("#confirmCardModal").phide();
};