$(function () {
    cardPrintLogic.init();
    var height = $($(".printCardConA")[0]).height();
    var heightA = $("#printCardList .printCardCon_pageA").height();
    $("#printCardList .printCardCon_pageB .gridCon").height(height - heightA - 46 - 100);
});

var cardPrintEvent = {
    //选项卡切换时展示不同的页面
    mainTabToggleForPage: function () {
        var index = $('#divCardPrintTab').psel();
        switch (index) {
            case 0:
                $("#downEquipmentWrap").show();
                $("#downSpaceWrap").hide();
                break;
            case 1:
                $("#downEquipmentWrap").hide();
                $("#downSpaceWrap").show();

                if (cardPrintLogic.first === true) {
                    cardPrintLogic.first = false;
                    cardPrintEvent.setSpGridHeight(false);
                }
                break;
        }
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
        $("#printCardList").hide();
        $("#printCardDz").show();
        cardPrintLogic.initDefaultSetInfo();
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
    },
    cardShow: function () {
        var tabIndex = $("#divCardSetTab").psel();
        switch (tabIndex) {
            case 0:
                $("#roomCardW").show();
                $("#equimentCardW").hide();
                break;
            case 1:
                $("#roomCardW").hide();
                $("#equimentCardW").show();
                break;
        }

    },
    customMadeCardHide: function () {
        $("#printCardList").show();
        $("#printCardDz").hide();
    },
    customMadeCardConfirm: function () {

        $("#confirmCardModal").pshow();
    },
    confirmCardModalQd: function () {
        cardPrintEvent.customMadeCardConfirmHide();
        cardPrintLogic.saveCard();
    },
    customMadeCardConfirmHide: function () {
        $("#confirmCardModal").phide();
    },
    /*设置设备名片页面表格的高
    *初始化时 建筑、专业获取完成之后调用；后续每获取一次系统调用一次
    */
    setEqGridHeight: function () {
        Vue.nextTick(function () {
            //此处写设置高的代码
        });
    },
    /*设置空间名片页面表格的高
    *切换到空间名片页面时调用，每获取一次楼层调用一次
    */
    setSpGridHeight: function (isVue) {
        if (isVue) {
            Vue.nextTick(function () {
                set();
            });
        } else set();

        function set() {
            //此处写设置高的代码
        };
    }
};