var publicMethod = {
    //将字符串转换成带标记的数组，用于匹配搜索关键字标红显示
    strToMarkedArr: function (str, substr) {
        var markedArr = [];
        if (!substr) {
            for (var i = 0; i < str.length; i++) {
                markedArr.push({char: str[i], mark: false});
            }
            return markedArr;
        }
        var x = 0;
        for (var i = 0; i < str.length; i = x + substr.length) {
            x = str.indexOf(substr, i);
            if (x == -1) {
                for (var j = i; j < str.length; j++) {
                    markedArr.push({char: str[j], mark: false});
                }
                return markedArr;
            } else {
                for (var j = i; j < x; j++) {
                    markedArr.push({char: str[j], mark: false});
                }
                for (var j = x; j < x + substr.length; j++) {
                    markedArr.push({char: str[j], mark: true});
                }
            }
        }
        return markedArr;
    },

    //处理搜索的对象结果集
    dealSearchedObjects: function (data, modelName) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.obj_name) item.obj_name_arr = this.strToMarkedArr(item.obj_name, value);
            if (item.parents) {
                for (var j = 0; j < item.parents.length; j++) {
                    var item1 = item.parents[j];

                    item1.linked_names = item1.parent_names.join('>');
                    if (item1.linked_names) item1.linked_names_arr = this.strToMarkedArr(item1.linked_names, value);
                }
            }
        }
        [modelName].curLevelList = data;
        [modelName].curObjType = 'search';
    },

    //设置当前弹窗
    setCurPop: function (index, popType) {
        commonData.checkedObjs = [];

        var jqTextareaDiv = commonData.editingJqTextwrap.parents(".textarea-div");
        jqTextareaDiv.find(".textarea-prop").show();

        var jqPopDataDivs = jqTextareaDiv.find(".free-aite-pops").children();
        var curJqPopDataDiv = $(jqPopDataDivs[index]);
        jqPopDataDivs.hide();
        //jqTextareaDiv.find('.aite-bubble').hide();

        var hashtagDiv = jqTextareaDiv.find(".hashtag-bubble");
        //$(".hashtag-bubble").hide();

        if (popType == 'obj') {     //@对象弹框
            $(".hashtag-bubble").hide();
            jqTextareaDiv.find('.aite-bubble').show();
            curJqPopDataDiv.show();
            publicMethod.locationPop(commonData.curMatterContent, commonData.types[0]);
        } else {        //#SOP弹框
            jqTextareaDiv.find('.aite-bubble').hide();
            hashtagDiv.show();
        }
    },

    //设置当前弹窗位置
    locationPop: function (model, type) {
        var textwrap = commonData.editingJqTextwrap;
        var textpdiv = commonData.editingJqTextwrap.parents(".textarea-div")
        var textdiv = $(textwrap).siblings(".textareadiv");
        var textareapop = $(textwrap).siblings(".textarea-prop");

        //var value = model.description ? model.description : myWorkOrderModel.workContent.content;     //取值方法统一如下

        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        var value = contentData.content[attrName1];

        var focusIndex = textwrap[0].selectionStart;
        var firstPartStr = value.substring(0, focusIndex);
        var secondPartStr = value.substring(focusIndex);
        var lastQuanIndex = firstPartStr.lastIndexOf('@');
        var lastJingIndex = firstPartStr.lastIndexOf('#');
        var lastQuanjingIndex = Math.max(lastQuanIndex, lastJingIndex);
        var lastSpaceIndex = firstPartStr.lastIndexOf(' ');
        if (lastQuanjingIndex != -1) {
            var h1 = '<span>' + firstPartStr.substring(0, lastQuanjingIndex) + '</span>';
            var h2 = '<span>' + firstPartStr.substr(lastQuanjingIndex, 1) + '</span>';
            var htmlValue = h1 + h2;
            htmlValue = htmlValue.replace(/\n/g, '<br/>');
            htmlValue = htmlValue.replace(/\s/g, '&nbsp;');
            textdiv[0].innerHTML = htmlValue;
            textdiv[0].scrollTop = textwrap.scrollTop;
            var span = $(textdiv).find('span:last');
            var divpos = $(textpdiv).offset();
            var pos = span.offset();
            var left = pos.left - divpos.left + 18;
            var top = pos.top - divpos.top + 25;
            $(textareapop).css({left: left + 'px', top: top + 'px'}).show();
        }
    },

    //隐藏当前弹框
    hideCurPop: function () {
        commonData.editingJqTextwrap.parents(".textarea-div").find(".textarea-prop").hide();
    },

    confirmCheckedMatterObjs: function () {
        var work_c = $(event.currentTarget).parents(".import-box")[0]
        if (work_c) {
            publicMethod.confirmCheckedObjs(commonData.types[1]);
        } else {
            publicMethod.confirmCheckedObjs(commonData.types[0]);
        }
    },

    //确认勾选的对象
    confirmCheckedObjs: function (type) {
        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        var attrName2 = contentData.attrName2;
        var content = contentData.content;
        var content_objs = contentData.content_objs;
        var symbol = type == commonData.types[0] ? '@' : '#';
        //var checkedItems = type == commonData.types[0] ? commonData.checkedObjs : commonData.checkedSops;

        var deletedObjs = commonData.maybeDeletedObjs;
        console.log('deletedObjs为: ' + JSON.stringify(deletedObjs));
        //筛选出增加的对象
        var addedObjs = [];

        for (var i = 0; i < commonData.checkedObjs.length; i++) {
            var checkedObj = commonData.checkedObjs[i];
            var newAdded = true;
            for (var j = 0; j < content_objs.length; j++) {
                var initialObj = content_objs[j];
                if (checkedObj[type + '_id'] == initialObj[type + '_id']) {
                    newAdded = false;
                    break;
                }
            }
            if (newAdded) {
                checkedObj.obj_type = myWorkOrderModel.curObjType;
                addedObjs.push(checkedObj);
            }
        }
        console.log('addedObjs为: ' + JSON.stringify(addedObjs));

        //删除被替代的对象
        if (!commonData.matchExistingObj[type + '_id']) {
            var replacedObjName = commonData.text1.slice(commonData.text1.lastIndexOf(symbol) + 1) + commonData.text2.slice(0, commonData.text2.indexOf(' '));
            if (content[attrName2]) {
                for (var i = 0; i < content[attrName2].length; i++) {
                    if (content[attrName2][i][type + '_name'] == replacedObjName) {
                        content[attrName2].splice(i, 1);
                    }
                }
            }
        }
        content[attrName2] = content_objs.concat(addedObjs);
        //  添加新选择的对象内容
        var addedText = '';
        for (var i = 0; i < addedObjs.length; i++) {
            var name = addedObjs[i][type + '_name'];
            var prefix = symbol;
            addedText += prefix + name + ' ';
        }

        //设置数据content.content
        if (commonData.notReplaceObj) {     //普通文本中输入@, 不替代对象
            content[attrName1] = commonData.text1.slice(0, commonData.text1.lastIndexOf(symbol)) + addedText + commonData.text2;
        } else if (!commonData.matchExistingObj[type + '_id']) {       //当前输入对象未匹配搜索结果时，删除当前输入的对象，并在该位置加上新增的对象
            content[attrName1] = commonData.text1.slice(0, commonData.text1.lastIndexOf(symbol)) + addedText + commonData.text2.slice(commonData.text2.indexOf(' ') + 1);
        } else {
            content[attrName1] = commonData.text1 + commonData.text2.slice(0, commonData.text2.indexOf(' ') + 1) + addedText + commonData.text2.slice(commonData.text2.indexOf(' ') + 1);
        }
        //删除取消选择的对象内容
        for (var i = 0; i < deletedObjs.length; i++) {
            var name = deletedObjs[i][type + '_name'];
            var deletedText = symbol + name + ' ';
            content[attrName1] = content[attrName1].replace(deletedText, '');
        }

        if (type != commonData.types[0]) {      //To Confirm
            myWorkOrderModel.workContent.content += content[attrName1]
            myWorkOrderModel.workContent.content_objs.push(content[attrName2])
        }

        //关闭弹窗
        //左侧有级别树时恢复初始
        //$('#leftLevelTree' + commonData.contentIndex).precover();     TODO
        //$("#textarea-pop").hide();
        publicMethod.hideCurPop();

        if (type == commonData.types[0] || type == commonData.types[1]) {
            myWorkOrderModel.allMatters[commonData.curMatterIndex][attrName1] = content[attrName1];
        }
        //console.log('1、allMatters: ' + JSON.stringify(myWorkOrderModel.allMatters));
        publicMethod.updateObjs(null, null, type);      //更新当前修改的对象，可能被替代
    },

    //更新已选择的对象数据
    updateObjs: function (index, keyword, type) {
        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        var attrName2 = contentData.attrName2;
        var content = contentData.content;
        var content_objs = contentData.content_objs;
        var originalSelected;
        var symbol = type == commonData.types[0] ? '@' : '#';
        //搜索状态下不将当前可能被替换的对象更新至content.content_objs
        if (index === 0) {
            var searchedText = keyword ? keyword : commonData.text1.slice(commonData.text1.lastIndexOf(symbol) + 1) + commonData.text2.slice(0, commonData.text2.indexOf(' '));
            publicMethod.isMatchExistingObj(searchedText, myWorkOrderModel.curLevelList, type);
            if (commonData.matchExistingObj[type + '_id']) {
                originalSelected = false;
                for (var i = 0; i < content_objs.length; i++) {
                    if (content_objs[i][type + '_name'] == commonData.matchExistingObj[type + '_name']) {
                        originalSelected = true;
                        break;
                    }
                }
                if (!originalSelected) {
                    content_objs.push(JSON.parse(JSON.stringify(commonData.matchExistingObj)));
                }
            }
        }
        //获取当前文本框中的对象
        var text = content[attrName1];
        var textArr = text ? text.split(symbol) : [];
        var objArr = [];
        var i = !text || text.length && text[0] == symbol ? 0 : 1;      //第一项可能为非@的情况
        for (i; i < textArr.length; i++) {
            if (textArr[i]) {
                var obj_name = textArr[i].slice(0, textArr[i].indexOf(' '));
                objArr.push(obj_name);
            }
        }

        var content_objsCopy = content_objs ? JSON.parse(JSON.stringify(content_objs)) : [];

        if (content_objs) {
            for (var i = 0; i < content_objs.length; i++) {
                var deleted = true;
                for (var j = 0; j < objArr.length; j++) {
                    if (content_objs[i][type + '_name'] == objArr[j]) {
                        deleted = false;
                        break;
                    }
                }
                if (deleted) {
                    content_objs[i].toDeleted = true;
                    //content_objs.splice(i, 1);
                    //content_objs2.splice(i, 1);
                }
            }

            for (var i = 0; i < content_objs.length; i++) {
                if (content_objs[i].toDeleted) {
                    content_objs.splice(i, 1);
                    i = -1;
                }
            }
        }

        for (var i = 0; i < objArr.length; i++) {
            originalSelected = false;
            for (var j = 0; j < content_objsCopy.length; j++) {
                if (objArr[i] == content_objsCopy[j][type + '_name']) {
                    originalSelected = true;
                    break;
                }
            }
            if (!originalSelected/* && (index !== 0 || obj_name !== searchedText)*/) {
                var tempObj = {};
                tempObj[type + '_name'] = objArr[i];
                tempObj['obj_type'] = "other";
                content_objs.push(tempObj);
            }
        }

        if (type == commonData.types[0] || type == commonData.types[1]) {
            myWorkOrderModel.allMatters[commonData.curMatterIndex][attrName2] = content_objs;
        }
        //console.log('2、allMatters: ' + JSON.stringify(myWorkOrderModel.allMatters));
        publicMethod.markInitialSelectedObjs(type);
    },

    //获取文本框相关数据
    getContentData: function (type) {
        var types = commonData.types;
        var attrName1 = type == types[0] || type == types[1] ? 'description' : 'content';
        var attrName2 = type == types[0] ? 'desc_objs' : type == types[1] ? 'desc_sops' : 'content_objs';
        var content = publicMethod.getCurDataObj(type);
        if (!content[attrName2]) content[attrName2] = [];
        var content_objs = content[attrName2];
        return {content: content, content_objs: content_objs, attrName1: attrName1, attrName2: attrName2};
    },

    //获取当前文本框中操作的数据对象
    getCurDataObj: function (type) {
        if (type == commonData.types[0]) {
            if (!myWorkOrderModel.allMatters[commonData.curMatterIndex]) myWorkOrderModel.allMatters[commonData.curMatterIndex] = {};
            return myWorkOrderModel.allMatters[commonData.curMatterIndex];
        } else {
            if (!myWorkOrderModel.curContent) myWorkOrderModel.curContent = {};
            return myWorkOrderModel.curContent;
        }
    },

    //获取当前步骤中的当前工作内容
    getCurMatter: function () {     //To Replaced By getCurDataObj
        return myWorkOrderModel.allMatters[commonData.curMatterIndex];
    },

    //获取当前步骤中的当前工作内容
    getCurContent: function () {     //To Replaced By getCurDataObj
        return myWorkOrderModel.curContent ? myWorkOrderModel.curContent : {};
    },

    //判断输入的对象是否能匹配搜索结果列表中的某个对象
    isMatchExistingObj: function (keyword, data, type) {
        commonData.matchExistingObj = {};
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (keyword == item[type + '_name']) {
                //item.checked = true;
                commonData.matchExistingObj = item;
                break;
            }
        }
        //如果能匹配搜索结果列表中的某个对象，则将该对象推入content.content_objs中
        if (commonData.matchExistingObj[type + '_id']) {
            var contentData = publicMethod.getContentData(type);
            var content_objs = contentData.content_objs;
            content_objs.push(JSON.parse(JSON.stringify(commonData.matchExistingObj)));
        }
    },

    //标记初始已选的对象
    markInitialSelectedObjs: function (type) {
        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        var attrName2 = contentData.attrName2;
        var content = contentData.content;
        var content_objs = contentData.content_objs;
        for (var i = 0; i < content_objs.length; i++) {
            content_objs[i].initialChecked = true;
        }


        if (type == commonData.types[0] || type == commonData.types[1]) {
            myWorkOrderModel.allMatters = JSON.parse(JSON.stringify(myWorkOrderModel.allMatters));
        }

        //console.log('3、allMatters: ' + JSON.stringify(myWorkOrderModel.allMatters));
    },

    //判断是否是已选对象
    isSelectedObj: function (model, type) {
        //var content = publicMethod.getCurMatter();
        var contentData = publicMethod.getContentData(type);
        var content_objs = contentData.content_objs;
        for (var i = 0; i < myWorkOrderModel.curLevelList.length; i++) {
            var item = myWorkOrderModel.curLevelList[i];
            var isSelectedObj = false;
            //if (content.content_objs) {
            for (var j = 0; j < /*content.*/content_objs.length; j++) {
                if (item[type + '_id'] == /*content.*/content_objs[j][type + '_id']) {
                    isSelectedObj = true;
                    break;
                }
            }
            //}
            if (isSelectedObj) {
                item.checked = true;
            }
        }
        if (model) model.notFirstClick = true;
        myWorkOrderModel.curLevelList = JSON.parse(JSON.stringify(myWorkOrderModel.curLevelList));
    },

    //查询可供选择的sop前的参数处理
    toQuerySopListForSel: function (isInit, copyOrQuote) {
        //if (isInit) $('#delaySearch input').val('');      //To Modify
        if (copyOrQuote) commonData.copyOrQuote = copyOrQuote;
        var obj = {
            need_return_criteria: true
        };
        //var searchedText = $('#delaySearch input').val();       //To Add
        //if (searchedText) obj.sop_name = searchedText;
        if (!isInit) {
            if (commonData.selectedBrands.length) obj.brands = commonData.selectedBrands;
            if (commonData.selectedOrder_type.length) obj.order_type = commonData.selectedOrder_type;
            if (commonData.selectedFit_objs.length) obj.fit_obj_ids = commonData.selectedFit_objs;
            if (commonData.selectedLabels.length) obj.labels = commonData.selectedLabels;
        }
        controller.querySopListForSel(obj);
        //method_yn.scrollLoad();       //To Add
    },

    //选择SOPcheckedObjs
    /*
     checkSop: function (model, event) {
     var state = event.pEventAttr.state;
     var sop_id = model.sop_id;
     if (state) {
     var indexStr = $(event.target).parents('.aite-list').attr('index');
     var index = parseInt(indexStr);
     model.index = index;
     commonData.checkedSops.push(model);
     } else {
     for (var i = 0; i < commonData.checkedSops.length; i++) {
     if (commonData.checkedSops[i].sop_id == sop_id) {
     commonData.checkedSops.splice(i, 1);
     break;
     }
     }
     }
     },
     */

    //确认选择SOP
    confirmCheckSops: function () {
        publicMethod.confirmCheckedObjs(commonData.types[1]);
    },

    //比较方法，用于排序
    compare: function (property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },

    //初始化供选择的sop的模态框
    initSopModal: function () {
        //$('.filter-close-btn').hide();
        //$('.filterBtn')[0].style.display = "inline-block";
        //$("#search-filter-box").hide();
        //$(".search-filter")[0].style.width = "470px";
        publicMethod.selAllTags();
        commonData.firstSetMore = true;
    },

    //选中所有"全部"标签locationPop
    selAllTags: function () {
        // event.stopPropagation();
        $('.sel-all').addClass('sel-span');
        myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.brandsArr, 'selectedBrands', false);
        myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.order_type, 'selectedOrder_type', false, 'code');
        myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.fit_objs, 'selectedFit_objs', false, 'obj_id');
        myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.labelsArr, 'selectedLabels', false);
    },


}

var commonData = {
    types: ['obj', 'sop', 'content'],
    copyOrQuote: null,      //1复制，2引用
    curMatterIndex: 0,      //当前事项索引

    deletedChar: '',        //文本框被删除的字符

    user_id: '',
    project_id: '',

    //对象类
    objClass: {
        system_class: '通用系统类',
        equip_class: '通用设备类',
        build: '建筑体',
        floor: '楼层',
        space: '空间',
        system: '系统',
        equip: '设备',
        component: '部件',
        tool: '工具',
    },

    contentItemAttrNames: ['pre_conform', 'content', 'notice', 'confirm_result', 'domain'],

    checkedSops: [],     //页面选择的SOP
    selectedBrands: [],     //选择的品牌
    selectedLabels: [],     //选择的自定义标签
    selectedOrder_type: [],     //选择的工单类型
    selectedFit_objs: [],     //选择的适用对象
    firstSetMore: true,      //是否为第一次设置'更多'显示
    beforeCheckedSteps: 0,      //选择复制/引用sop之前页面步骤数
    checkedSopsSteps: 0,        //复制/引用sop的步骤数

    //curObjType: 'init',     //当前对象类型

    maybeDeletedContent: {},        //可能被删除的工作内容
    maybeDeletedContentIndex: null,         //可能被删除的工作内容在当前步骤下的索引

    beforeLen: null,        //keydown时文本长度

    editingContentObjs: [],     //编辑中的操作内容涉及的对象列表
    editingJqTextwrap: null,      //编辑的文本框dom节点对应的jquery对象

    buildList: [],      //建筑体列表
    tempObjectList: [],      //工具/部件列表
    equip: [],      //设备
    equipClass: [],      //设备实例

    contentIndex: 0,        //当前工作内容索引

    initialSelectedObjs: [],       //操作内容中初始已选择的对象
    otherSelectedObjs: [],      //操作内容中其他类别已选择的对象
    selectedObjs: [],       //所有选择的对象
    initialCheckedObjs: [],        //操作内容中当前类别初始选择的对象
    checkedObjs: [],        //弹框页面check的对象

    maybeDeletedObjs: [],       //可能被删除的已选对象数组

    contentObjsCopy: [],       //当前内容中的对象
    // 副本

    focusContent: false,        //是否聚焦操作内容输入框

    jqTarget: null,
    textwrap: null,
    textdiv: null,
    textareapop: null,
    text: '',
    text1: '',
    text2: '',


    infoPoint_obj: {},        //信息点所属的对象
    info_pointsCopy: [],        //修改前的信息点

    jqInfoPointPop: null,       //选择信息点弹框
    jqPopDataDivs2: [],       //信息点弹框
    belongChoosedObj: false,         //信息点是否属于已选择的对象

    controlName: '普通文本',        //选择的控件名称

    selectedTools2Copy: [],     //新建/编辑SOP 下一步页面中所选的工具列表 副本

    matchExistingObj: {},       //自定义对象时匹配的已存在的对象

    composing: false,        //输入框中是否为 非单个字符输入状态
    notReplaceObj: false,       //在普通文本中间添加对象时不替代文本

}
