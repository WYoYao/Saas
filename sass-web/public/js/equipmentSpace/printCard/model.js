var cardPrintModal = {
    tabs: [{ name: '下载设备名片' }, { name: '下载空间名片' }],
    setTabs: [{ name: '定制设备名片' }, { name: '定制空间名片' }],
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
    eqCount: 0,                                 //设备总数
    selEqArr: [],                               //选择的设备列表
    spArr: [],                                  //空间列表


    spCount: 0,                                 //空间总数
    selSpArr: [],                                //选择的空间列表
    eqCardInfo: {                               //设备名片信息
        title: '', logoUrl: ''
    },
    eqCardInfoToUpdate: {                               //设备名片信息
        title: '', logoUrl: '', isNewFile: false
    },
    selEqCardTemplateArr: [{
        info_point_code: 'equip_local_name', info_point_name: '设备名称'
    }, {
        info_point_code: 'equip_local_id', info_point_name: '设备编码'
    }],
    eqCardTemplateArr: [],
    spCardInfo: {                               //空间名片信息
        title: '', logoUrl: ''
    },
    spCardInfoUpdate: {                               //空间名片信息
        title: '', logoUrl: '', isNewFile: false
    },
    selSpCardTemplateArr: [{
        info_point_code: 'room_local_name', info_point_name: '空间名称'
    }, {
        info_point_code: 'equip_local_id', info_point_name: '空间编码'
    }],
    spCardTemplateArr: [],

    equipmentType: [{ name: '设备型号' }, { name: '设备类型' }, { name: '安装位置' }, { name: '所属系统' }, { name: '所属部门' }, { name: '设备品牌' }, { name: '投产日期' }, { name: '负责人' }, { name: '使用寿命' }, { name: '维修商' }, { name: '无' }],

    //后面会删除
    gridArr: [{ name: '小王1', age: '18', hobby: '唱歌' }
    , { name: '小王2', age: '18', hobby: '唱歌' }
    , { name: '小王3', age: '18', hobby: '唱歌' }
    , { name: '小王4', age: '18', hobby: '唱歌' }
  
    ],
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
    },
    /*表格的每行复选框的选择事件*/
    gridCheckboxChange: function (model, event) {
        var tabIndex = $("#divCardPrintTab").psel();
        var selArrProName = tabIndex == 0 ? 'selEqArr' : 'selSpArr';
        var oldSelArr = cardPrintModal[selArrProName];
        if (event.pEventAttr.state == true) oldSelArr.push(model);
        else {
            var proName = tabIndex == 0 ? 'equip_id' : 'space_id';
            for (var i = 0; i < oldSelArr.length; i++) {
                if (oldSelArr[proName] == model[proName]) {
                    oldSelArr.splice(i, 1);
                    break;
                }
            }
        }

        cardPrintModal[selArrProName] = oldSelArr;
    },
    /*表格翻页事件*/
    gridPageChange: function (event) {
        var currPageIndex = event.pEventAttr.pageIndex;
        cardPrintLogic.getCardList();
    },
    /*名片设置，下拉列表选择事件*/
    gridCheckboxChange: function (model, event) {
        var tabIndex = $("#divCardPrintTab").psel();
        var proName = tabIndex == 0 ? 'selEqCardTemplateArr' : 'selSpCardTemplateArr';
        var templateItemIndex = model.index;
        cardPrintModal[proName][templateItemIndex] = model;
    },
    /*设置页面tab选项卡选择事件*/
    setTabSel: function () {
        var tabIndex = $("#divCardSetTab").psel();
        var info = cardPrintModal[tabIndex == 0 ? 'eqCardInfo' : 'spCardInfo'];
        var obj = JSON.parse(JSON.stringify(info));
        obj.isNewFile = false;
        cardPrintModal[tabIndex == 0 ? 'eqCardInfoUpdate' : 'spCardInfoUpdate'] = obj;
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
            var arr = dataObj.data || [];
            for (var i = 0; i < arr.length; i++) {
                var curr = arr[i];
                curr.create_time = new Date(curr.create_time).format('y.M.d h:m');
            }
            cardPrintModal[modalProNameForGrid] = arr;
            var count = dataObj.count || 0;
            gridJqTarget.pcount(count);
            tabIndex == 0 ? (cardPrintModal.eqCount = count) : (cardPrintModal.spCount = count);
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
    },
    /*下载名片*/
    downCard: function () {
        var tabIndex = $("#divCardPrintTab").psel();
        var arrProName = tabIndex == 0 ? 'eqArr' : 'spArr';
        var idProName = tabIndex == 0 ? 'equip_id' : 'space_id';
        var idArr = [];
        var list = cardPrintModal[arrProName];
        for (var i = 0; i < list.length; i++) {
            idArr.push(list[i][idProName]);
        }
        tabIndex == 0 ? (cardPrintController.downEqCard(idArr)) : (cardPrintController.downSpCard(idArr));
    },
    /*获取设备名片设置的可选项*/
    getEqCardInfoArr: function () {
        cardPrintController.getEqCardInfoArr(function (data) {
            var source = (data || {}).data || [];
            var tarr = [];
            for (var i = 0; i < 3; i++) {
                var newSourceArr = JSON.parse(JSON.stringify(source));
                for (var j = 0; j < newSourceArr.length; j++) {
                    newSourceArr[j].index = i + 2;
                }
                tarr.push({
                    source: newSourceArr
                });
            }
            cardPrintModal.eqCardTemplateArr = tarr;
        }, function () {
            console.error('getEqCardInfoArr err');
        });
    },
    /*获取空间名片设置的可选项*/
    getSpCardInfoArr: function () {
        cardPrintController.getSpCardInfoArr(function (data) {
            var source = (data || {}).data || [];
            var tarr = [];
            for (var i = 0; i < 3; i++) {
                var newSourceArr = JSON.parse(JSON.stringify(source));
                for (var j = 0; j < newSourceArr.length; j++) {
                    newSourceArr[j].index = i + 2;
                }
                tarr.push({
                    source: newSourceArr
                });
            }
            cardPrintModal.spCardTemplateArr = tarr;
        }, function () {
            console.error('getSpCardInfoArr err');
        });
    },
    /*保存名片设置*/
    saveCard: function () {
        var tabIndex = $("#divCardSetTab").psel();
        var proName = tabIndex == 0 ? 'selEqCardTemplateArr' : 'selSpCardTemplateArr';
        var infoProName = tabIndex == 0 ? 'eqCardInfo' : 'spCardInfo';
        var updateInfo = cardPrintModal[tabIndex == 0 ? 'eqCardInfoUpdate' : 'spCardInfoUpdate'];

        var card_info = cardPrintModal[proName];
        var obj_type = tabIndex == 0 ? 'equip' : 'space';
        var paramObj = {
            title: updateInfo.title,
            card_info: card_info,
            obj_type: obj_type,
            attachments: {
                path: updateInfo.logoUrl,
                toPro: 'logo',
                multiFile: false,
                isNewFile: updateInfo.isNewFile,
                fileType: 1
            }
        };
        cardPrintController.saveCard(paramObj, function () {
            $('#divCardPrintNotice').pshow({ text: '保存成功', state: 'success' });
            cardPrintModal[infoProName] = {
                title: updateInfo.title, logoUrl: updateInfo.logoUrl
            };
        }, function () {
            $('#divCardPrintNotice').pshow({ text: '保存失败', state: 'failure' });
        }, function () {
            $('#divCardPrintLoading').phide();
        });
    },
    /*上传Logo图片*/
    uploadLogo: function (file) {
        $('#divCardPrintLoading').pshow();
        pajax.upload({
            file: file,
            success: function (obj) {
                if (obj.result == 1) {
                    var tabIndex = $("#divCardSetTab").psel();
                    var updateInfo = cardPrintModal[tabIndex == 0 ? 'eqCardInfoUpdate' : 'spCardInfoUpdate'];
                    updateInfo.logoUrl = obj.showUrl;
                    updateInfo.isNewFile = true;
                } else
                    $('#divCardPrintNotice').pshow({ text: 'Logo上传失败', state: 'failure' });
            },
            error: function () {
                $('#divCardPrintNotice').pshow({ text: 'Logo上传失败', state: 'failure' });
            },
            complete: function () {
                $('#divCardPrintLoading').phide();
            }
        });
    }
};