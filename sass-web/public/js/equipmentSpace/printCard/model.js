var cardPrintModal = {
    tabs: [{ name: '下载设备名片' }, { name: '下载空间名片' }],
    pageEachNumber: 50,
    downTypeArr: ['尚未下载', '全部'],            //设备名片、空间名片，下载类型数据源
    eqSelDownTypeIndex: -1,                      //下载设备名片页面选择的下载类型的索引
    spSelDownTypeIndex: -1,                      //下载空间名片页面选择的下载类型的索引
    buildArr: [],                               //所有的建筑
    selBuildForEq: {},                               //下载设备名片页面选择的建筑
    selBuildForSp: {},                               //下载空间名片页面选择的建筑
    majorArr: [],                               //所有的专业
    selMajor: {},                               //选择的专业
    systemArr: [],                              //某专业下的系统
    selSystem: {},                              //选择的系统
    floorArr: [],                               //某建筑下的楼层
    selFloor: {},                               //选择的楼层
    eqArr: [],                                  //设备列表
    spArr: [],                                  //空间列表
};

var cardPrintVueMethod = {
    /*选项卡的选择事件*/
    tabSel: function (model, event) {
        cardPrintEvent.mainTabToggleForPage();
        var tabIndex = $("#divCardPrintTab").psel();
        var proName = tabIndex == 0 ? 'eqSelDownTypeIndex' : 'spSelDownTypeIndex';
        if (cardPrintModal[proName] == -1) cardPrintModal[proName] = 0;
    },
    /*下载类型的点击事件*/
    downTypeSel: function (model, event) {
        var tabIndex = $("#divCardPrintTab").psel();
        var oldTypeIndex = tabIndex == 0 ? cardPrintModal.eqSelDownTypeIndex : cardPrintModal.spSelDownTypeIndex;
        if (model == cardPrintModal.downTypeArr[oldTypeIndex]) return;
        var newTypeIndex = oldTypeIndex == 0 ? 1 : 0;
        tabIndex == 0 ? (cardPrintModal.eqSelDownTypeIndex = newTypeIndex) : (cardPrintModal.spSelDownTypeIndex = newTypeIndex);
    },
    /*建筑选择事件*/
    buildSel: function (model, event) {
        cardPrintEvent.getGridTarget().precover();
        var tabIndex = $("#divCardPrintTab").psel();
        switch (tabIndex) {
            case 0:
                cardPrintModal.selBuildForEq = model;
                break;
            case 1:
                cardPrintModal.selBuildForSp = model;
                var oldFloorArr = cardPrintModal.floorArr;
                oldFloorArr.splice(1);
                cardPrintModal.floorArr = oldFloorArr;
                cardPrintModal.selFloor = cardPrintModal.floorArr[0];
                if (model.obj_id)
                    cardPrintLogic.getFloorByBuild();
                break;
        }
        cardPrintLogic.getCardList();
    },
    /*专业选择事件*/
    majorSel: function (model, event) {
        cardPrintModal.selMajor = model;
        cardPrintModal.systemArr = [];
        cardPrintModal.selSystem = {};
        if (model.code) cardPrintLogic.getSystemByMajor();
        cardPrintEvent.getGridTarget().precover();
        cardPrintLogic.getCardList();
    },
    /*系统选择事件*/
    systemSel: function (model, event) {
        cardPrintModal.selSystem = model;
        cardPrintEvent.getGridTarget().precover();
        cardPrintLogic.getCardList();
    },
    /*楼层选择事件*/
    floorSel: function (model, event) {
        cardPrintModal.selFloor = model;
        cardPrintEvent.getGridTarget().precover();
        cardPrintLogic.getCardList();
    }
};


var cardPrintLogic = {
    init: function () {
        new Vue({
            el: '#cardPrintWrap',
            data: cardPrintModal,
            methods: cardPrintVueMethod,
            watch: {
                eqSelDownTypeIndex: function (val) {
                    cardPrintLogic.downTypeIndexChangeCall();
                },
                spSelDownTypeIndex: function (val) {
                    cardPrintLogic.downTypeIndexChangeCall();
                }
            }
        });
        Vue.nextTick(function () {
            $("#divCardPrintTab").psel(0);
        });
        cardPrintLogic.getBuild();
        cardPrintLogic.getMajor();
    },
    /*下载类型索引改变回调*/
    downTypeIndexChangeCall: function () {
        var tabIndex = $("#divCardPrintTab").psel();
        switch (tabIndex) {
            case 0:
                cardPrintModal.selBuildForEq = cardPrintModal.buildArr[0];
                cardPrintModal.selMajor = cardPrintModal.majorArr[0];
                cardPrintModal.systemArr = [];
                cardPrintModal.selSystem = {};
                break;
            case 1:
                cardPrintModal.selBuildForSp = cardPrintModal.buildArr[0];
                var oldFloorArr = cardPrintModal.floorArr;
                oldFloorArr.splice(1);
                cardPrintModal.floorArr = oldFloorArr;
                cardPrintModal.selFloor = cardPrintModal.floorArr[0];
                break;
        };
        cardPrintEvent.getGridTarget().precover();
        cardPrintLogic.getCardList();
    },
    /*获取设备名片列表或空间名片列表*/
    getCardList: function () {
        $('#divCardPrintLoading').pshow();
        var tabIndex = $("#divCardPrintTab").psel();
        var typeIndex = tabIndex == 0 ? cardPrintModal.eqSelDownTypeIndex : cardPrintModal.spSelDownTypeIndex;
        var modalProNameForGrid = tabIndex == 0 ? 'eqArr' : 'spArr';
        cardPrintModal[modalProNameForGrid] = [];

        var gridJqTarget = cardPrintEvent.getGridTarget();
        var pageIndex = gridJqTarget.psel();

        var fn;
        var paramObj = {
            page: pageIndex,
            page_size: cardPrintModal.pageEachNumber
        };
        switch (tabIndex) {
            case 0:
                switch (typeIndex) {
                    case 0:
                        fn = 'getNotDownEqArr';
                        break;
                    case 1:
                        fn = 'geEqArrByCriteria';
                        cardPrintModal.selBuildForEq.obj_id ? (paramObj.build_id = cardPrintModal.selBuildForEq.obj_id) : '';
                        cardPrintModal.selMajor.code ? (paramObj.domain_code = cardPrintModal.selMajor.code) : '';
                        cardPrintModal.selSystem.system_id ? (paramObj.system_id = cardPrintModal.selSystem.system_id) : '';
                        break;
                }
                break;
            case 1:
                switch (typeIndex) {
                    case 0:
                        fn = 'getNotDownSpArr';
                        break;
                    case 1:
                        fn = 'geSpArrByCriteria';
                        cardPrintModal.selBuildForSp.obj_id ? (paramObj.build_id = cardPrintModal.selBuildForSp.obj_id) : '';
                        cardPrintModal.selFloor.floor_id ? (paramObj.floor_id = cardPrintModal.selFloor.floor_id) : '';
                        break;
                }
                break;
        };
        cardPrintController[fn](paramObj, function (data) {
            var dataObj = data || {};
            cardPrintModal[modalProNameForGrid] = dataObj.data || [];
            var count = dataObj.count || 0;
            gridJqTarget.pcount(count);
        }, function () {
            console.error('getCardList err');
        }, function () {
            $('#divCardPrintLoading').phide();
        });
    },
    /*获取建筑*/
    getBuild: function () {
        globalController.getBuild(function (data) {
            var dataObj = data || {};
            var arr = dataObj.data || [];
            arr.unshift({
                obj_id: '', obj_name: '全部'
            });
            cardPrintModal.buildArr = arr;
        });
    },
    /*获取某建筑下的楼层*/
    getFloorByBuild: function () {
        cardPrintController.getFloorByBuild(cardPrintModal.selBuildForSp.obj_id, function (data) {
            var dataObj = data || {};
            var arr = dataObj.data || [];
            arr.unshift({
                floor_id: '', floor_local_name: '全部'
            });
            cardPrintModal.floorArr = arr;
        });
    },
    /*获取专业*/
    getMajor: function () {
        globalController.getMajor(function (data) {
            var dataObj = data || {};
            var arr = dataObj.data || [];
            arr.unshift({
                code: '', name: '全部'
            });
            cardPrintModal.majorArr = arr;
        });
    },
    /*获取某专业下的系统*/
    getSystemByMajor: function (majorCode) {
        globalController.getSystemByMajorCode(majorCode, function (data) {
            var dataObj = data || {};
            var arr = dataObj.data || [];
            //arr.unshift({
            //    system_id: '', system_name: '全部'
            //});
            cardPrintModal.systemArr = arr;
        });
    }
};