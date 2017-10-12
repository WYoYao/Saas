var publicMethod = {
    //事项内容keyup事件
    keyupMatterContent: function (model, index, event) {
        commonData.curMatterIndex = index;
        commonData.curMatterContent = JSON.parse(JSON.stringify(model));
        commonData.publicModel.curMatterIndex = index;
        var code = event.keyCode;
        var jqTarget = $(event.currentTarget);
        var textwrap = jqTarget[0];


        commonData.editingJqTextwrap = jqTarget;

        var focusIndex = textwrap.selectionStart;
        var text = model.description || '';
        var len = text.length;
        var text1 = text.slice(0, focusIndex);
        var text2 = text.slice(focusIndex);
        commonData.text1 = text1;
        commonData.text2 = text2;
        var noLastCharText1 = text1.slice(0, focusIndex - 1);
        var len1 = text1.length;
        var text1Char = text1 + commonData.deletedChar;
        var addedLen = len - commonData.beforeLen;
        var addedStr = text.slice(focusIndex - addedLen, focusIndex);
        if (code == 51) {       //'#'

        } else if (code == 8) {        //退格键删除操作
            if (commonData.deletedChar == ' ') {      //在空格后
                //只有对象或SOP后面允许输入空格的情况下此处加强判断可以去掉，目前没有限制空格在普通文本中的输入
                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') || text1.lastIndexOf(' ') < text1.lastIndexOf('#')) {        //在对象结束空格后      //此处不能发起一次搜索，此时可能的情况：@地源热泵设备类@建筑4
                    console.log('删除了标识对象或SOP结束的空格，这是不允许的');
                    content.content = text1 + ' ' + text2;
                }
            } else if (text1Char.lastIndexOf(' ') < text1Char.lastIndexOf('@') && text2.indexOf(' ') !== -1) {        //在对象@或普通字符后且在空格前
                if (commonData.deletedChar == '@') {     //在对象@后
                    console.log('删除对象@符');
                } else {     //在普通字符后，例如：'@建筑2' —> '@建2' 发起一次搜索
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('删除对象中的普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (searchedText.length) {
                        globalController.searchObject(searchedText, function (result) {
                            var data = result && result.data ? result.data : [];
                            publicMethod.dealSearchedObjects(data, commonData.publicModel);
                            commonData.publicModel.aite = true;
                            if (data.length) {
                                commonData.publicModel.curMatterPopType = 0;
                            } else {
                                commonData.publicModel.curMatterPopType = 3;
                            }
                        });
                    } else {
                        commonData.publicModel.curMatterPopType = 3;
                    }
                }
            }
        } else {        //输入字符或字符串的情况
            if (addedStr == '@') {      //输入@符
                //对象中间不允许输入@
                if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@')) {
                    content.content = text.slice(0, focusIndex - 1) + text.slice(focusIndex, len);
                    console.log('对象中间不允许输入@');
                    return;
                }
                //在如'@工具1'前输入@, '@工具1'前添加上空格
                if (commonData.text2.length && commonData.text2[0] == '@') {
                    commonData.text2 = ' ' + commonData.text2;
                }
                commonData.notReplaceObj = true;
                publicMethod.setCurPop(4, commonData.types[0]);
            } else if (addedStr == '#') {      //输入#符
                //SOP中间不允许输入#
                if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('#')) {
                    content.content = text.slice(0, focusIndex - 1) + text.slice(focusIndex, len);
                    console.log('sop中间不允许输入#');
                    return;
                }
                //在如'#SOP1'前输入#, '#SOP1'前添加上空格
                if (commonData.text2.length && commonData.text2[0] == '#') {
                    commonData.text2 = ' ' + commonData.text2;
                }
                commonData.notReplaceObj = true;
                publicMethod.toQuerySopListForSel(true);
                //myWorkOrderMethod.selAllTags();
                //yn_method.upDownSelect();
            } else {        //输入普通字符
                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2 == '') {
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1);
                    console.log('在@后输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (!commonData.composing) {
                        //createSopController.searchObject(searchedText);
                    }
                }

                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2.indexOf(' ') !== -1) {
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('在对象中输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (!commonData.composing) {
                        //createSopController.searchObject(searchedText);
                    }
                }
                commonData.notReplaceObj = false;
            }
        }
    },

    //事项内容keydown事件
    keydownMatterContent: function (model, index, event) {
        var code = event.keyCode;
        var jqTarget = $(event.currentTarget);
        var textwrap = jqTarget[0];
        var focusIndex = textwrap.selectionStart;
        var text = model.description || '';
        commonData.beforeLen = text.length;
        if (code == 8) {        //删除操作
            var deletedType;
            //判断是否在对象中
            var text1 = text.slice(0, focusIndex);
            var text2 = text.slice(focusIndex);
            var len1 = text1.length;
            var toDeletedChar = text1[len1 - 1];
            commonData.deletedChar = text1[len1 - 1];
        }
    },

    //复选框选择或取消选择对象
    checkObject: function (model, index, type, event) {
        if (event) event.stopPropagation();

        type = type ? type : 'obj'
        model.checked = !model.checked;
        commonData.publicModel.curLevelList = JSON.parse(JSON.stringify(commonData.publicModel.curLevelList));
        var contentData = publicMethod.getContentData(type);
        var content_objs = contentData.content_objs;
        if (model.checked) {
            commonData.checkedObjs.push(model);
            //判断是否为content中已选对象，将其从maybeDeletedObjs中删除
            for (var i = 0; i < content_objs.length; i++) {
                if (content_objs[i][type + '_id'] == model[type + '_id']) {
                    commonData.maybeDeletedObjs.splice(i, 1);
                    break;
                }
            }
        } else {

            for (var i = 0; i < commonData.checkedObjs.length; i++) {
                if (commonData.checkedObjs[i][type + '_id'] == model[type + '_id']) {
                    commonData.checkedObjs.splice(i, 1);
                    break;
                }
            }
            //判断是否为content中已选对象，将其推入maybeDeletedObjs
            for (var i = 0; i < content_objs.length; i++) {
                if (content_objs[i][type + '_id'] == model[type + '_id']) {
                    commonData.maybeDeletedObjs.push(JSON.parse(JSON.stringify(content_objs[i])));
                    break;
                }
            }

        }
    },

    //删除事项
    deleteMatter: function (index) {
        commonData.publicModel.allMatters.splice(index, 1);
    },

    initDatas: function () {
        $('#sopName').pval('');
        commonData.publicModel.allSteps = [];
        commonData.publicModel.isNextStepPage = false;
        commonData.publicModel.curStepIndex = 0;
        commonData.publicModel.curStep = {step_content: []};        //页面显示的当前sop步骤内容
        commonData.publicModel.sopCriteria = {};        //sop列表筛选条件
        commonData.publicModel.sopList = [];      //sop列表;复制、引用sop时用
        //commonData.publicModel.copyOrQuote = null;      //1复制，2引用
        commonData.publicModel.editContent = false;     //是否为编辑内容状态
        commonData.publicModel.notMultiSopSteps = [];     //不是引用的多步骤的SOP的步骤列表

        commonData.publicModel.curObjType = 'init';     //标准作业操作内容-当前对象类型
        commonData.publicModel.curObjType2 = 'init';        //需确认的操作结果-当前对象类型

        commonData.publicModel.curLevelList = [];       //当前有级别列表
        commonData.publicModel.leftLevel = [];      //左侧级别列表

        //createSopModel.domainList = [];     //专业列表
        commonData.publicModel.systemList = [];     //系统列表
        commonData.publicModel.checkedObjs = [];        //弹框页面check的对象

        commonData.publicModel.curSelectedDomain = {};      //当前选择的专业
        commonData.publicModel.curSelectedSystem = {};      //当前选择的系统

        commonData.publicModel.searchedObjectList = [];     //搜索的对象结果列表
        commonData.publicModel.selectedObjType = null;      //选择的对象类别

        commonData.publicModel.infoPointList = [];      //信息点列表
        commonData.publicModel.optionList = [];     //选项列表

        commonData.publicModel.customs = [];        //自定义项列表
        commonData.publicModel.customItem = {items: []};     //自定义项
        commonData.publicModel.isCustomizeBtnAble = false;        //自定义按钮是否able

        commonData.publicModel.sameDomain = false;      //是否所有步骤中的所有工作内容都为相同的专业
        commonData.publicModel.settedDomain = true;        //是否所有步骤中的所有工作内容未设置专业

        commonData.publicModel.selectedTools1 = [];     //新建/编辑SOP step1中所选的工具列表
        commonData.publicModel.selectedTools2 = [];     //新建/编辑SOP 下一步页面中所选的工具列表
        //createSopModel.toolList = [];       //弹框工具列表

        //createSopModel.orderTypeList = [];      //工单类型列表
        commonData.publicModel.brandList = [];      //品牌列表
        commonData.publicModel.labelList = [];      //标签列表

        commonData.publicModel.sop = {
            order_type: [],     //工单类型
            fit_objs: []       //适用对象
        };

        commonData.publicModel.selectedObj = {};        //选择信息点 对象列表已选择的对象

        commonData.publicModel.fitRangeList = [];       //适用范围列表
        commonData.publicModel.fitRangeListCopy = [];       //适用范围列表副本
        commonData.publicModel.linkDataList = [];       //链接资料列表
    },

    //编辑的工作内容某项失焦
    blurContentItem: function (event) {
        event.stopPropagation();
        var num = event.srcElement.value.length;
        var prebody = $(event.srcElement).parents(".prev-body");
        if (num == 0) {
            $(prebody).slideUp();
            $(event.srcElement).parents(".content-prev").find(".edit-div").show().next().hide();
        }
    },

    /*点击sop名称*/
    detailSop: function (sop, event) {
        event.stopPropagation();
        commonData.publicModel.detailSopShow = true;
        var postObj = {
            user_id: commonData.publicModel.user_id,
            sop_id: sop.sop_id,
            version: sop.version	      //返回结果是否需要带筛选条
        }
        myWorkOrderController.querySopDetailById(sop, postObj);
    },

    closeDetailSop: function () {
        commonData.publicModel.detailSopShow = false;
    },

    //选择品牌
    selBrand: function (item, event) {
        event.stopPropagation();
        publicMethod.toggleOneCriteria(item, 'brands', 'selectedBrands');
    },

    //选择工单类型
    selOrderType: function (item, event) {
        event.stopPropagation();
        publicMethod.toggleOneCriteria(item, 'order_type', 'selectedOrder_type', 'code');
    },

    //选择适用对象
    selFitObj: function (item, event) {
        event.stopPropagation();
        publicMethod.toggleOneCriteria(item, 'fit_objs', 'selectedFit_objs', 'obj_id');
    },

    //选择自定义标签
    selLabel: function (item, event) {
        event.stopPropagation();
        publicMethod.toggleOneCriteria(item, 'labels', 'selectedLabels');
    },

    //设置SOP筛选条件参数选中状态
    setCriteriaStatus: function (attrName1, attrName2, isObj, subAttrName) {
        var arr1 = commonData.publicModel.sopCriteria[attrName1] || [], arr2 = [];
        for (var i = 0; i < arr1.length; i++) {
            var item1 = arr1[i];
            var name = subAttrName ? item1[subAttrName] : item1;
            var selectedArr = commonData[attrName2];
            var selected = selectedArr.indexOf(name) == -1 ? false : true;
            if (isObj) {
                item1.selected = selected;
            } else {
                arr2.push({name: name, selected: selected});
            }
        }
        if (!isObj) commonData.publicModel.sopCriteria[attrName1 + 'Arr'] = arr2;
    },

    //切换某个筛选条件参数选中状态
    toggleOneCriteria: function (item, attrName1, attrName2, subAttrName) {
        var selectedArr = commonData[attrName2];
        var value = subAttrName ? item[subAttrName] : item.name;
        if (selectedArr.indexOf(value) == -1) {
            item.selected = true;
            selectedArr.push(value);
        } else {
            item.selected = false;
            selectedArr.splice(selectedArr.indexOf(value), 1);
        }
        commonData.publicModel.sopCriteria = JSON.parse(JSON.stringify(commonData.publicModel.sopCriteria));
        var id = '#all_' + attrName1;
        //if (createSopModel.sopCriteria[attrName1].length > selectedArr.length) {
        $(id).removeClass('sel-span');
        //} else {
        //    $(id).addClass('selection-on');
        //}
    },

    //点击"全部"标签
    toggleAllTag: function (event, flag) {
        event.stopPropagation();
        var selected = !($(event.target).hasClass('sel-span'));
        if (!selected) return;
        $(event.target).addClass('sel-span');
        switch (flag) {
            case 1:
                publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.brandsArr, 'selectedBrands', !selected);
                break;
            case 2:
                publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.order_type, 'selectedOrder_type', !selected, 'code');
                break;
            case 3:
                publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.fit_objs, 'selectedFit_objs', !selected, 'obj_id');
                break;
            case 4:
                publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.labelsArr, 'selectedLabels', !selected);
                break;
            default:
                break;
        }
        createSopModel.sopCriteria = JSON.parse(JSON.stringify(commonData.publicModel.sopCriteria));
    },

    //选中/取消选中某类筛选条件参数
    toggleSameClassCriterias: function (arr, attrName, selected, subAttrName) {
        commonData[attrName] = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            item.selected = selected;
            var value = subAttrName ? item[subAttrName] : item.name;
            if (selected) commonData[attrName].push(value);
        }
    },

    //查询信息点
    getInfoPointForObject: function (obj, index1, event, contentIndex) {
        event.stopPropagation();
        $(event.target).parents(".aite-list").addClass("selectionOn").siblings().removeClass("selectionOn");
        commonData.contentIndex = contentIndex;
        commonData.infoPoint_obj = obj;      //此处可能为新添加的对象、也可能为已选的对象
        commonData.publicModel.selectedObj = obj;
        var content = publicMethod.confirmResult();
        var belongChoosedObj = false;
        for (var i = 0; i < content.confirm_result.length; i++) {
            if (obj.obj_id == content.confirm_result[i].obj_id) {
                commonData.infoPoint_obj = JSON.parse(JSON.stringify(content.confirm_result[i]));
                commonData.confirmResultIndex = i;
                belongChoosedObj = true;
                break;
            }
        }
        if (!belongChoosedObj) {
            commonData.infoPoint_obj = JSON.parse(JSON.stringify(obj));
            commonData.confirmResultIndex = content.confirm_result.length;
        }

        commonData.belongChoosedObj = belongChoosedObj;
        myWorkOrderController.queryInfoPointForObject(obj, null);
    },

    //选择信息点-复选框选择或取消选择信息点
    checkInfoPoint: function (model, index, contentIndex) {
        commonData.contentIndex = contentIndex;
        model.checked = !model.checked;
        commonData.publicModel.infoArray = JSON.parse(JSON.stringify(commonData.publicModel.infoArray));
    },

    //编辑的工作内容某项keydown事件
    keydownContent: function (index, content, event, contentIndex) {
        var code = event.keyCode;
        var attrName = commonData.contentItemAttrNames[index];
        // var text = content.content;
        var text = commonData.publicModel.workContent.content;
        var textCopy = text;
        var jqTarget = $(event.currentTarget);
        var textwrap = jqTarget[0];
        var textdiv = jqTarget.next()[0];
        var textareapop = jqTarget.next().next();
        var focusIndex = textwrap.selectionStart;

        commonData.beforeLen = text.length;

        if (code == 8) {        //删除操作
            var deletedType;
            //判断是否在对象中
            var text1 = text.slice(0, focusIndex);
            var text2 = text.slice(focusIndex);
            var len1 = text1.length;
            var toDeletedChar = text1[len1 - 1];
            commonData.deletedChar = text1[len1 - 1];
        }

    },

    //工作内容keyup事件
    keyupContent: function (model, index, event) {
        commonData.curMatterIndex = index;
        commonData.curMatterContent = JSON.parse(JSON.stringify(model));
        commonData.publicModel.curMatterIndex = index;
        var code = event.keyCode;
        var jqTarget = $(event.currentTarget);
        var textwrap = jqTarget[0];

        content = commonData.publicModel.workContent;
        commonData.editingJqTextwrap = jqTarget;

        var focusIndex = textwrap.selectionStart;
        var text = commonData.publicModel.workContent.content || '';
        var len = text.length;
        var text1 = text.slice(0, focusIndex);
        var text2 = text.slice(focusIndex);
        var noLastCharText1 = text1.slice(0, focusIndex - 1);
        var len1 = text1.length;
        var text1Char = text1 + commonData.deletedChar;
        var addedLen = len - commonData.beforeLen;
        var addedStr = text.slice(focusIndex - addedLen, focusIndex);
        if (code == 51) {       //'#'

        } else if (code == 8) {        //退格键删除操作
            if (commonData.deletedChar == ' ') {      //在空格后
                //只有对象或SOP后面允许输入空格的情况下此处加强判断可以去掉，目前没有限制空格在普通文本中的输入
                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') || text1.lastIndexOf(' ') < text1.lastIndexOf('#')) {        //在对象结束空格后      //此处不能发起一次搜索，此时可能的情况：@地源热泵设备类@建筑4
                    console.log('删除了标识对象或SOP结束的空格，这是不允许的');
                    content.content = text1 + ' ' + text2;
                }
            } else if (text1Char.lastIndexOf(' ') < text1Char.lastIndexOf('@') && text2.indexOf(' ') !== -1) {        //在对象@或普通字符后且在空格前
                if (commonData.deletedChar == '@') {     //在对象@后
                    console.log('删除对象@符');
                } else {     //在普通字符后，例如：'@建筑2' —> '@建2' 发起一次搜索
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('删除对象中的普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (searchedText.length) {
                        globalController.searchObject(searchedText, function (result) {
                            var data = result && result.data ? result.data : [];
                            publicMethod.dealSearchedObjects(data, commonData.publicModel);
                            commonData.publicModel.aite = true;
                            if (data.length) {
                                commonData.publicModel.curMatterPopType = 0;
                            } else {
                                commonData.publicModel.curMatterPopType = 3;
                            }
                        });
                    } else {
                        commonData.publicModel.curMatterPopType = 3;
                    }
                }
            }
        } else {        //输入字符或字符串的情况
            if (addedStr == '@') {      //输入@符
                //对象中间不允许输入@
                if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@')) {
                    content.content = text.slice(0, focusIndex - 1) + text.slice(focusIndex, len);
                    console.log('对象中间不允许输入@');
                    return;
                }
                //在如'@工具1'前输入@, '@工具1'前添加上空格
                if (commonData.text2.length && commonData.text2[0] == '@') {
                    commonData.text2 = ' ' + commonData.text2;
                }
                commonData.notReplaceObj = true;

                publicMethod.setCurPop(4, 'content');

            } else if (addedStr == '#') {      //输入#符
                //SOP中间不允许输入#
                if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('#')) {
                    content.content = text.slice(0, focusIndex - 1) + text.slice(focusIndex, len);
                    console.log('sop中间不允许输入#');
                    return;
                }
                //在如'#SOP1'前输入#, '#SOP1'前添加上空格
                if (commonData.text2.length && commonData.text2[0] == '@') {
                    commonData.text2 = ' ' + commonData.text2;
                }
                commonData.notReplaceSop = true;
                publicMethod.selAllTags();
                yn_method.upDownSelect();
                publicMethod.setCurPop(null, 'sop');
            } else {        //输入普通字符
                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2 == '') {
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1);
                    console.log('在@后输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (!commonData.composing) {
                        //createSopController.searchObject(searchedText);
                    }
                }

                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2.indexOf(' ') !== -1) {
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('在对象中输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (!commonData.composing) {
                        //createSopController.searchObject(searchedText);
                    }
                }
                commonData.notReplaceObj = false;
            }
        }
    },

    //自定义信息点 列表状态-添加选项
    addOption2: function (custom, event, contentIndex) {
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        custom.items.push('');
        // createSopModel.curStep = JSON.parse(JSON.stringify(createSopModel.curStep));
    },

    //添加信息点  /*接口有问题今天看不了，10.11日继续*/
    addInfoPoint: function (confirmObj, index1, event, contentIndex) {
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        commonData.infoPoint_obj = JSON.parse(JSON.stringify(confirmObj));
        commonData.confirmResultIndex = index1;
        var jqInfoPointPop = $(event.currentTarget).next();
        commonData.jqInfoPointPop = jqInfoPointPop;
        commonData.belongChoosedObj = true;
        myWorkOrderController.queryInfoPointForObject(confirmObj, jqInfoPointPop);
    },

    //信息点-设置当前弹框显示对应的内容  /*修改进行中*/
    setCurPop2: function (index, notInitData) {
        if (!notInitData) {
            commonData.publicModel.curLevelList = [];
            commonData.publicModel.infoPointList = [];
        }
        if (index == 1) {       //此处注意与setCurPop(4)作区分
            commonData.publicModel.curObjType2 = 'init';
        } else if (index == 0) {
            commonData.publicModel.curObjType2 = 'search';
        } else if (index == 4) {
            //恢复自定义信息点弹窗默认设置
            $($(commonData.jqPopDataDivs2[3]).find('.customize').children()[0]).find('input').val('');
            $('#controlSel').precover();
            commonData.publicModel.customItem = {"name": "", "type": "", "items": [], "unit": ""};

            commonData.publicModel.curObjType2 = 'custom';
        } else {
            commonData.publicModel.curObjType2 = 'infoPoint';
        }
        var jqPopDataDivs = commonData.jqPopDataDivs2;
        var curJqPopDataDiv = $(jqPopDataDivs[index]);
        curJqPopDataDiv.show();
        curJqPopDataDiv.siblings().hide();
        // jqPopDataDivs.removeClass('showDiv').hide();
        // curJqPopDataDiv.parents('.tool-select-list').show();
        // curJqPopDataDiv.addClass('showDiv').show();
    },

    /*添加工作内容*/
    addContent: function (model, open, event,index0) {
        debugger
        if (open) {
            commonData.publicModel.addContentWindow = true;
            commonData.publicModel.curMatterIndex = index0;
            myWorkOrderController.queryGeneralDictByKey();
            commonData.publicModel.work_c=true;


        } else {
            commonData.publicModel.addContentWindow = false;
            commonData.publicModel.work_c = false;
        }
        commonData.publicModel.mattersVip = model || {};


    },

    /*事项名称计数*/
    matterNameCounter: function (model, event) {
        $(event.target).next(".counter").find("b").text(model.length);
        // desc_aftpart
    },

    //添加对象和信息点
    //选择大类-确认勾选的信息点
    confirmCheckedInfoPoints2: function () {
        var content1 = publicMethod.confirmResult();
        // var content2 = commonMethod.getCurStepContent();
        var arr = [];
        for (var i = 0; i < commonData.publicModel.infoArray.length; i++) {
            var item = commonData.publicModel.infoArray[i];
            if (item.checked) {
                arr.push(JSON.parse(JSON.stringify(item)));
            }
        }
        if (commonData.belongChoosedObj) {
            content1.confirm_result[commonData.confirmResultIndex].info_points = arr;
            // content2.confirm_result[commonData.confirmResultIndex].info_points = arr;
        } else {
            commonData.infoPoint_obj.obj_type = commonData.publicModel.curObjType;
            commonData.infoPoint_obj.info_points = arr;
            content1.confirm_result.push(JSON.parse(JSON.stringify(commonData.infoPoint_obj)));
        }
        publicMethod.hideCurPop2();
    },

    //确认自定义信息点
    confirmCustomizeInfoPoint: function (event) {
        //TODO: 验证
        commonData.publicModel.customItem.name = $($(commonData.jqPopDataDivs2[4]).children()[0]).find('input').val();
        var obj = {
            name: commonData.publicModel.customItem.name,
            type: commonData.publicModel.customItem.type,
            unit: commonData.publicModel.customItem.unit
        };

        if (commonData.controlName == '单选' || commonData.controlName == '多选') {
            var items = JSON.parse(JSON.stringify(commonData.publicModel.customItem.items));
            var arr = [];
            for (var i = 0; i < items.length; i++) {
                arr.push(items[i].name);
            }
            obj.items = arr;
        }


        if (!publicMethod.confirmResult().confirm_result[commonData.confirmResultIndex]) {
            publicMethod.confirmResult().confirm_result[commonData.confirmResultIndex] = {customs: []};
        }
        publicMethod.confirmResult().confirm_result[commonData.confirmResultIndex] = commonData.infoPoint_obj;
        var confirm_result_obj = publicMethod.confirmResult().confirm_result[commonData.confirmResultIndex];
        if (!confirm_result_obj.customs) confirm_result_obj.customs = [];
        confirm_result_obj.customs.push(obj);
        commonData.publicModel.workContent = JSON.parse(JSON.stringify(commonData.publicModel.workContent));
        publicMethod.hideCurPop2();
        /*setTimeout(function () {
         //选中对应的控件
         var customs = confirm_result_obj.customs;
         for (var j = 0; j < customs.length; j++) {
         var controlIndex = parseInt(customs[j].type) - 1;
         $('#selMo' + commonData.contentIndex + 'separator1' + commonData.confirmResultIndex + 'separator2' + j).psel(controlIndex, false);
         }
         }, 0);*/
    },

    //自定义信息点
    customizeInfoPoint: function () {
        //commonData.customizeInfoPoint_obj =
        commonData.publicModel.curObjType = 'custom'
        publicMethod.setCurPop2(4, true);
    },

    //自定义信息点 弹框-添加选项
    addOption: function (event, contentIndex) {
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        commonData.publicModel.customItem.items.push({name: ''});
    },

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
        if(index!=3 && !commonData.publicModel.noPop) {
            jqTextareaDiv.find(".textarea-prop").show();
        }

        var jqPopDataDivs = jqTextareaDiv.find(".free-aite-pops").children();
        var curJqPopDataDiv = $(jqPopDataDivs[index]);
        if(popType=='content' && index==4 && !commonData.publicModel.noPop){
            curJqPopDataDiv = $(jqPopDataDivs[index+5]);
        }else if(popType=='content' && index==1 && !commonData.publicModel.noPop){
            curJqPopDataDiv = $(jqPopDataDivs[index+5]);
        }else if(popType=='content' && index==1 && commonData.publicModel.noPop){
            curJqPopDataDiv = $(jqPopDataDivs[index]);
        }if(popType=='obj' && index==3 && !commonData.publicModel.noPop){
            curJqPopDataDiv = $(jqPopDataDivs[index+5]);
        }
        jqPopDataDivs.hide();
        //jqTextareaDiv.find('.aite-bubble').hide();

        var hashtagDiv = jqTextareaDiv.find(".hashtag-bubble");
        //$(".hashtag-bubble").hide();

        if (popType == 'obj' || popType == 'content') {     //@对象弹框
            $(".hashtag-bubble").hide();
            if (commonData.publicModel.work_c) {
                $(jqTextareaDiv.find('.aite-bubble')[1]).show();
            } else {
                jqTextareaDiv.find('.aite-bubble').show();
            }
            curJqPopDataDiv.show();
            if(popType='content'){
                publicMethod.locationPop(commonData.publicModel.workContent, commonData.types[3]);

            }else{
                publicMethod.locationPop(commonData.curMatterContent, commonData.types[0]);

            }
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

        //var value = model.description ? model.description : commonData.publicModel.workContent.content;     //取值方法统一如下

        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        if(model.content){
            var value = model[attrName1];

        }else{
            var value = contentData.content[attrName1];
        }
        if(commonData.publicModel.noPop) return;
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
            publicMethod.confirmCheckedObjs(commonData.types[3]);
        } else {
            publicMethod.confirmCheckedObjs(commonData.types[0]);
        }
        commonData.publicModel.noPop=false;
    },

    //确认勾选的对象
    confirmCheckedObjs: function (type) {
        var type1 = type == commonData.types[1] ? type : commonData.types[0];
        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        var attrName2 = contentData.attrName2;
        var content = contentData.content;
        var content_objs = contentData.content_objs;
        var symbol = type1 == commonData.types[0] ? '@' : '#';
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
                if (checkedObj[type1 + '_id'] == initialObj[type1 + '_id']) {
                    newAdded = false;
                    break;
                }
            }
            if (newAdded) {
                checkedObj.obj_type = commonData.publicModel.curObjType;
                addedObjs.push(checkedObj);
            }
        }
        console.log('addedObjs为: ' + JSON.stringify(addedObjs));

        //删除被替代的对象
        if (!commonData.matchExistingObj[type1 + '_id']) {
            var replacedObjName = commonData.text1.slice(commonData.text1.lastIndexOf(symbol) + 1) + commonData.text2.slice(0, commonData.text2.indexOf(' '));
            if (content[attrName2]) {
                for (var i = 0; i < content[attrName2].length; i++) {
                    if (content[attrName2][i][type1 + '_name'] == replacedObjName) {
                        content[attrName2].splice(i, 1);
                    }
                }
            }
        }
        content[attrName2] = content_objs.concat(addedObjs);
        //  添加新选择的对象内容
        var addedText = '';
        for (var i = 0; i < addedObjs.length; i++) {
            var name = addedObjs[i][type1 + '_name'];
            var prefix = symbol;
            addedText += prefix + name + ' ';
        }

        //设置数据content.content
        if (commonData.notReplaceObj) {     //普通文本中输入@, 不替代对象
            content[attrName1] = commonData.text1.slice(0, commonData.text1.lastIndexOf(symbol)) + addedText + commonData.text2;
            console.log(content[attrName1])

            if(type=="content"){
                commonData.publicModel.workContent.content_objs=content[attrName2];
                commonData.publicModel.workContent.content=commonData.publicModel.workContent.content.substring(1)+addedText;

            }
        } else if (!commonData.matchExistingObj[type1 + '_id']) {       //当前输入对象未匹配搜索结果时，删除当前输入的对象，并在该位置加上新增的对象
            content[attrName1] = commonData.text1.slice(0, commonData.text1.lastIndexOf(symbol)) + addedText + commonData.text2.slice(commonData.text2.indexOf(' ') + 1);
        } else {
            content[attrName1] = commonData.text1 + commonData.text2.slice(0, commonData.text2.indexOf(' ') + 1) + addedText + commonData.text2.slice(commonData.text2.indexOf(' ') + 1);
        }
        //删除取消选择的对象内容
        for (var i = 0; i < deletedObjs.length; i++) {
            var name = deletedObjs[i][type1 + '_name'];
            var deletedText = symbol + name + ' ';
            content[attrName1] = content[attrName1].replace(deletedText, '');
        }

        if (type1 != commonData.types[0]) {      //To Confirm
            commonData.publicModel.workContent.content += content[attrName1]
            commonData.publicModel.workContent.content_objs.push(content[attrName2])
        }

        //关闭弹窗
        //左侧有级别树时恢复初始
        //$('#leftLevelTree' + commonData.contentIndex).precover();     TODO
        //$("#textarea-pop").hide();
        publicMethod.hideCurPop();

        if (type == commonData.types[0] || type == commonData.types[1]) {
            commonData.publicModel.allMatters[commonData.curMatterIndex][attrName1] = content[attrName1];
        }
        //console.log('1、allMatters: ' + JSON.stringify(commonData.publicModel.allMatters));
        publicMethod.updateObjs(null, null, type, type1);      //更新当前修改的对象，可能被替代
    },

    //更新已选择的对象数据
    updateObjs: function (index, keyword, type, type1) {
        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        var attrName2 = contentData.attrName2;
        var content = contentData.content;
        var content_objs = contentData.content_objs;
        var originalSelected;
        var symbol = type1 == commonData.types[0] ? '@' : '#';
        //搜索状态下不将当前可能被替换的对象更新至content.content_objs
        if (index === 0) {
            var searchedText = keyword ? keyword : commonData.text1.slice(commonData.text1.lastIndexOf(symbol) + 1) + commonData.text2.slice(0, commonData.text2.indexOf(' '));
            publicMethod.isMatchExistingObj(searchedText, commonData.publicModel.curLevelList, type, type1);
            if (commonData.matchExistingObj[type1 + '_id']) {
                originalSelected = false;
                for (var i = 0; i < content_objs.length; i++) {
                    if (content_objs[i][1 + '_name'] == commonData.matchExistingObj[type1 + '_name']) {
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
                    if (content_objs[i][type1 + '_name'] == objArr[j]) {
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
                if (objArr[i] == content_objsCopy[j][type1 + '_name']) {
                    originalSelected = true;
                    break;
                }
            }
            if (!originalSelected/* && (index !== 0 || obj_name !== searchedText)*/) {      //To Confirm
                var tempObj = {};
                tempObj[type1 + '_name'] = objArr[i];
                tempObj['obj_type'] = "other";
                content_objs.push(tempObj);
            }
        }

        if (type == commonData.types[0] || type == commonData.types[1]) {
            commonData.publicModel.allMatters[commonData.curMatterIndex][attrName2] = content_objs;
        }
        //console.log('2、allMatters: ' + JSON.stringify(commonData.publicModel.allMatters));
        publicMethod.markInitialSelectedObjs(type, type1);
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
            if (!commonData.publicModel.allMatters[commonData.curMatterIndex]) commonData.publicModel.allMatters[commonData.curMatterIndex] = {};
            return commonData.publicModel.allMatters[commonData.curMatterIndex];
        } else {
            if (!commonData.publicModel.curContent) commonData.publicModel.curContent = {};
            return commonData.publicModel.curContent;
        }
    },

    //获取当前步骤中的当前工作内容
    getCurMatter: function () {     //To Replaced By getCurDataObj
        return commonData.publicModel.allMatters[commonData.curMatterIndex];
    },

    //获取当前步骤中的当前工作内容
    getCurContent: function () {     //To Replaced By getCurDataObj
        return commonData.publicModel.curContent ? commonData.publicModel.curContent : {};
    },

    //判断输入的对象是否能匹配搜索结果列表中的某个对象
    isMatchExistingObj: function (keyword, data, type, type1) {
        commonData.matchExistingObj = {};
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (keyword == item[type1 + '_name']) {
                //item.checked = true;
                commonData.matchExistingObj = item;
                break;
            }
        }
        //如果能匹配搜索结果列表中的某个对象，则将该对象推入content.content_objs中
        if (commonData.matchExistingObj[type1 + '_id']) {
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
            commonData.publicModel.allMatters = JSON.parse(JSON.stringify(commonData.publicModel.allMatters));
        }

        //console.log('3、allMatters: ' + JSON.stringify(commonData.publicModel.allMatters));
    },

    //判断是否是已选对象
    isSelectedObj: function (model, type) {
        //var content = publicMethod.getCurMatter();
        var contentData = publicMethod.getContentData(type);
        var content_objs = contentData.content_objs;
        for (var i = 0; i < commonData.publicModel.curLevelList.length; i++) {
            var item = commonData.publicModel.curLevelList[i];
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
        commonData.publicModel.curLevelList = JSON.parse(JSON.stringify(commonData.publicModel.curLevelList));
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
        myWorkOrderController.querySopListForSel(obj);
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
        publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.brandsArr, 'selectedBrands', false);
        publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.order_type, 'selectedOrder_type', false, 'code');
        publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.fit_objs, 'selectedFit_objs', false, 'obj_id');
        publicMethod.toggleSameClassCriterias(commonData.publicModel.sopCriteria.labelsArr, 'selectedLabels', false);
    },

    //添加工作内容名称
    addWorkContentName: function () {
        debugger;
        var contentData = publicMethod.getContentData(commonData.types[0]);
        var attrName1 = contentData.attrName1;
        var attrName2 = contentData.attrName2;
        var content = contentData.content;
        var content_objs = contentData.content_objs;
        var desc_work = commonData.publicModel.desc_works[commonData.publicModel.desc_works.length - 1] || {};
        content[attrName1] = content[attrName1] + (desc_work.work_name || '') + ' ';
        content.desc_works.push(desc_work);
    },

    //处理事项参数
    dealMattersParam: function () {
        //判断工作内容名称是否被删除
        for (var i = 0; i < commonData.publicModel.allMatters.length; i++) {
            var matter = commonData.publicModel.allMatters[i];
            var text = matter.description;
            var textArr = text ? text.split(' ') : [];

            var desc_worksCopy = [];
            for (var j = 0; j < matter.desc_works.length; j++) {
                var deleted = true;
                for (var k = 0; k < textArr.length; k++) {
                    if (textArr[k] == matter.desc_works[j].work_name + ' ') {
                        deleted = false;
                        break;
                    }
                }
                if (!deleted) desc_worksCopy.push(matter.desc_works[j]);
            }
            matter.desc_works = JSON.parse(JSON.stringify(desc_worksCopy));
        }
    },

    //处理工单参数addContent
    dealWorkOrderParam: function () {
        publicMethod.dealMattersParam();
        commonData.publicModel.workOrderDraft.ask_start_time = commonData.publicModel.workOrderDraft.ask_start_time.replace(/[^0-9]/g, '') + '00';
        commonData.publicModel.workOrderDraft.ask_end_time = commonData.publicModel.workOrderDraft.ask_end_time ? commonData.publicModel.workOrderDraft.ask_end_time.replace(/[^0-9]/g, '') + '00' : '';
        commonData.publicModel.workOrderDraft.input_mode = commonData.publicModel.regular ? '2' : '1';
        commonData.publicModel.workOrderDraft.matters = JSON.parse(JSON.stringify(commonData.publicModel.allMatters));
    },

    //保存工单草稿
    toSaveWorkOrderDraft: function () {
        publicMethod.dealWorkOrderParam();
        myWorkOrderController.saveDraftWorkOrder(commonData.publicModel.workOrderDraft);
    },

    //预览工单草稿
    toPreviewWorkOrder: function () {
        publicMethod.dealWorkOrderParam();
        myWorkOrderController.previewWorkOrder(commonData.publicModel.workOrderDraft);
    },

    //添加事项
    addMatter: function () {
        var emptyMatter = {     //空的事项
            "matter_name": "未命名事项-" + (commonData.publicModel.allMatters.length + 1),
            "description": "",
            "desc_forepart": "",
            "desc_aftpart": "",
            "desc_photos": [],
            "desc_objs": [],
            "desc_sops": [],
            "desc_works": [],
            "required_control": []
        };
        commonData.publicModel.allMatters.push(emptyMatter);
    },

    //切换输入模式
    toggleInputMode: function () {
        commonData.publicModel.regular = !commonData.publicModel.regular;
        publicMethod.dealMattersParam();
        var allMatters = commonData.publicModel.allMatters;
        if (commonData.publicModel.regular) {     //结构化
            for (var i = 0; i < allMatters.length; i++) {
                var matter = allMatters[i];
                var desc_aftpart = matter.description;
                var symbol = '@';
                var contentData = publicMethod.getContentData(commonData.types[0]);
                var attrName1 = contentData.attrName1;
                var content = contentData.content;

                //获取当前文本框中的对象
                var text = content[attrName1];
                var textArr = text ? text.split(symbol) : [];
                var objArr = [];
                var i = !text || text.length && text[0] == symbol ? 0 : 1;      //第一项可能为非@的情况
                for (i; i < textArr.length; i++) {
                    if (textArr[i]) {
                        var obj_name = symbol + textArr[i].slice(0, textArr[i].indexOf(' '));
                        objArr.push(obj_name);
                    }
                }
                console.log(JSON.stringify(objArr));

                var desc_forepart = '';
                for (var i = 0; i < objArr.length; i++) {
                    desc_forepart += objArr[i] + ' ';
                    desc_aftpart = desc_aftpart.replace(objArr[i], '');
                }
                matter.desc_forepart = desc_forepart;
                matter.desc_aftpart = desc_aftpart;
            }
        } else {
            for (var i = 0; i < allMatters.length; i++) {
                var matter = allMatters[i];
                matter.description = matter.desc_forepart + matter.desc_aftpart;
            }
        }
        commonData.publicModel.allMatters = JSON.parse(JSON.stringify(commonData.publicModel.allMatters));
    },

    //获取当前弹窗中工作内容中
    confirmResult: function () {
        return commonData.publicModel.workContent
    },
    //信息点-隐藏当前弹框
    hideCurPop2: function () {
        $(commonData.jqPopDataDivs2).parents('.aite-bubble').hide();
    },
    //删除对象
    deleteObj: function (obj, index, contentIndex) {
        commonData.contentIndex = contentIndex;
        var content = commonData.publicModel.workContent[commonData.contentIndex];
        content.confirm_result.splice(index, 1);
        // createSopModel.allSteps[createSopModel.curStepIndex].step_content[commonData.contentIndex].confirm_result.splice(index, 1);
    },
    //自定义信息点 列表状态-删除选项
    deleteOption2: function (custom, itemIndex, event, contentIndex) {
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        custom.items.splice(itemIndex, 1);
    },
    //删除信息点
    deleteInfoPoint: function (infoPoint, infoPointIndex, objIndex, contentIndex) {
        commonData.contentIndex = contentIndex;
        var content = commonData.publicModel.workContent[commonData.contentIndex];
        content.confirm_result[objIndex].info_points.splice(infoPointIndex, 1);
        // createSopModel.allSteps[createSopModel.curStepIndex].step_content[commonData.contentIndex].confirm_result[objIndex].info_points.splice(infoPointIndex, 1);
    },
    //删除自定义的信息点
    deleteCustomizedInfoPoint: function (custom, customIndex, objIndex, contentIndex) {
        commonData.contentIndex = contentIndex;
        var content = commonData.publicModel.workContent[commonData.contentIndex];
        content.confirm_result[objIndex].customs.splice(customIndex, 1);
    },

}

var commonData = {
    publicModel: {},        //我的工单、计划监控的model
    types: ['obj', 'sop', 'workContentName', 'content'],       //事项@对象、事项#SOP、添加工作内容@对象、事项添加工作内容名称
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

var yn_method = {
    delConfirm: function (index, content, event) {
        event.stopPropagation();
        commonData.publicModel.del_plan_id = content;
        $("#del-confirm").pshow({title: '确定删除吗？', subtitle: '删除后不可恢复'});
    },

    cancelConfirm: function () {
        $("#del-confirm").phide();
    },
    scrollLoad: function () {
        var userId = commonData.publicModel.user_id;
        var proId = commonData.publicModel.project_id;
        if ($("#work-already").psel()) {
            commonData.publicModel.workAlreadyID = commonData.publicModel.workAlready[$("#work-already").psel().index].id;
        }
        if ($("#work-type").psel()) {
            var orderType = commonData.publicModel.workTypeL[$("#work-type").psel().index].code;
        }
        //判断url
        var url = commonData.publicModel.workAlreadyID == "0" ? "restMyWorkOrderService/queryMyDraftWorkOrder" : commonData.publicModel.workAlreadyID == "1" ? "restMyWorkOrderService/queryMyPublishWorkOrder" : "restMyWorkOrderService/queryMyParticipantWorkOrder";
        orderType = orderType == "all" ? "" : orderType;
        var nScrollHight = 0; //滚动距离总长
        var nScrollTop = 0;   //滚动到的当前位置
        var nDivHight = $(".myWork-table-body").height();
        $(".myWork-table-body").scroll(function () {
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
                // alert("到底部了")
                commonData.publicModel.pageNum += 1;
                var conditionSelObj = {
                    user_id: userId,                        //员工id-当前操作人id，必须
                    project_id: proId,                     //项目id，必须
                    order_type: orderType,                      //工单类型编码
                    page: commonData.publicModel.pageNum,                       //当前页号，必须
                    page_size: 50                        //每页返回数量，必须
                };
                myWorkOrderController.queryWorkOrder(url, conditionSelObj);//查询所有工单

            }

        });
    },
    /*创建页面*/
    createShow: function () {
        commonData.publicModel.LorC = false;
        $("#work-urgency").psel(0);
        $("#time-combobox").psel(0);
        yn_method.getDateTime();
    },
    /*回到列表页*/
    listShow: function () {
        commonData.publicModel.LorC = true;
    },
    getDateTime: function () {
        commonData.publicModel.starYear = new Date().getFullYear();
        commonData.publicModel.endYear = commonData.publicModel.starYear + 3;
    },
    radioChange: function (event) {
        event.stopPropagation();
        commonData.publicModel.fixedRadio = $("#fixed-radio").psel();
        var starttime = $("#ask_start_time").psel().startTime;
        var hours = parseInt(starttime.substr(-5, 2));
        $("#ask_end_time").psel({h: hours + 2}, false);
        if (commonData.publicModel.fixedRadio) {
            commonData.publicModel.workOrderDraft["ask_end_limit"] = $("#ask_end_limit").val();
        } else {
            commonData.publicModel.workOrderDraft["ask_end_limit"] = "";
            commonData.publicModel.workOrderDraft["ask_end_time"] = "";

        }


    },
    starTimeTypeSel: function (obj, event) {
        event.stopPropagation();
        if (obj.id == "1") {
            commonData.publicModel.timeTypeSel = true;
            commonData.publicModel.workOrderDraft["ask_start_time"] = "";

        } else {
            commonData.publicModel.timeTypeSel = false;
            commonData.publicModel.workOrderDraft["ask_start_time"] = $("#ask_start_time").psel().startTime;
        }
        commonData.publicModel.workOrderDraft["start_time_type"] = obj.id;

    },
    /*事项名称计数*/
    matterNameCounter1: function (dom, value) {
        $(dom).next(".counter").find("b").text(value.length);
        // desc_aftpart
    },
    freedomOrRegular: function () {
        commonData.publicModel.regular = $("#switch-slide").psel();
        if (commonData.publicModel.regular) {
            var text = $(".freedom-textarea").val();
            if (!text || text == '') return;
            var textRemain = text;
            var reg = /(@[^\s]+\s?)|(#[^\s]+\s?)/gi;//f分割字符
            var objSopArr = text.match(reg);
            var objs = "";
            var sops = "";
            objSopArr.forEach(function (value, index, arr) {
                var i = value.indexOf("@");
                if (i != -1) {
                    objs += value + " ";
                } else {
                    sops += value + " ";
                }
                textRemain = textRemain.replace(value, "");
            });
            sops += textRemain;
            // $(".regular-obj-text").find("textarea").val(objs);
            // $(".regular-sop-text").find("textarea").val(sops);
            commonData.publicModel.singleMatters.desc_forepart = objs;
            commonData.publicModel.singleMatters.desc_aftpart = sops;
        } else {
            var reObjs = $(".regular-obj-text").find("textarea").val();
            var reSops = $(".regular-sop-text").find("textarea").val();
            commonData.publicModel.description = reObjs + reSops;
        }
    },
    /*结构输入两者相加计数*/
    bothCountNum: function (dom, value) {
        var totalNum = 0;
        var bothP = $(dom).parents(".regular-text-div")
        var textareas = $(bothP).find("textarea");
        $(textareas).each(function (index, vdom) {
            totalNum += $(vdom).val().length;
        });
        var remainNum = 1000 - totalNum;
        $(bothP).find(".counter b").text(totalNum);
        if (totalNum == 1000) {
            var max1 = textareas[0].value.length;
            var max2 = textareas[1].value.length;
            textareas[0].maxLength = max1;
            textareas[1].maxLength = max2;
        }
        /*else if(totalNum<1000){
         textareas[0].setAttribute("maxlength","1000");
         textareas[1].setAttribute("maxlength","1000");
         }*/


        var textwrap = $(event.srcElement);
        var textpdiv = $(event.srcElement).parents(".textarea-div");
        var textdiv = $(textwrap).siblings(".textareadiv");
        var textareapop = $(textwrap).siblings(".textarea-prop");
        var focusIndex = textwrap[0].selectionStart;
        var firstPartStr = value.substring(0, focusIndex);
        var secondPartStr = value.substring(focusIndex);
        var lastQuanIndex = firstPartStr.lastIndexOf('@');
        var lastJingIndex = firstPartStr.lastIndexOf('#');
        var lastQuanjingIndex = Math.max(lastQuanIndex, lastJingIndex);
        var lastSpaceIndex = firstPartStr.lastIndexOf(' ');
        if (lastQuanjingIndex != -1) {
            if (lastQuanIndex > lastJingIndex) {
                commonData.publicModel.aite = true;
                // yn_method.upDownSelect(true);
            } else if (lastQuanIndex < lastJingIndex) {
                commonData.publicModel.aite = false;
                publicMethod.selAllTags();
                //where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
                yn_method.upDownSelecting(null, null, true);
            }
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
            $(textareapop).css({position: 'absolute', left: left + 'px', top: top + 'px', 'z-index': '15'});
            $(textareapop).show();

        }


    },
    /*添加工作内容界面*/
    /*编辑框出现并聚焦*/
    editable: function (event) {
        event.stopPropagation();
        $(event.currentTarget).parent().hide().next().show();
        var slideDiv = $(event.currentTarget).parents(".prev-title").next();
        $(slideDiv).slideDown();
        $(slideDiv).find("textarea").focus()
    },
    /*清空bubble出现*/
    delBubbleShow: function (event) {
        event.stopPropagation();
        var bubbleDiv = $(event.currentTarget).parent(".clear-div").next();
        $(bubbleDiv).pshow({
            "title": "确定删除此条工作内容？",
            "subtitle": "删除会使内容丢失",
            "position": "absolute",
            "top": "40px",
            "left": "-310px",
            "z-index": "5"
        });
    },
    /*清空bubble消失*/
    delBubbleHide: function (event) {
        event.stopPropagation();
        var bubbleDiv = $(event.currentTarget.offsetParent.offsetParent);
        $(bubbleDiv).phide();


    },
    /*清空内容框*/
    clearAll: function (event) {
        event.stopPropagation();
        var textDiv = $(event.currentTarget).parents(".prev-title").next();
        var a = $(textDiv).find("textarea").length;
        switch ($(textDiv).find("textarea").length) {
            case 0:
                if ($(textDiv).find(".major-sel").length) {
                    $("#add-major").precover("选择专业");
                }
                if ($(textDiv).find(".obj-div").length) {
                    $(textDiv).find(".objs").empty();
                }
                break;
            case 1:
                $(textDiv).find("textarea").val("").css("border", "none");
                $(textDiv).find(".counterNum").text("0");
                $(textDiv).slideUp();
                break;
            default:
                break;
        }
        var bubbleDiv = $(event.currentTarget.offsetParent.offsetParent);
        $(bubbleDiv).phide();
        $(bubbleDiv).prev().hide().prev().show();


    },
    /*计数textarea*/
    counterNum: function (event) {
        var dom = event.currentTarget;
        var num = $(dom).val().length;
        if (num > 100) {
            $(dom).css("border", "1px solid red");
            $(dom).next().css("color", "#ef6767");
        } else {
            $(dom).css("border", "none");
            $(dom).next().css("color", "#cacaca");
        }
        //$(event).next().find(".counterNum").text(num)
    },
    quanjingInputEvent: function (event, isReply) {
        var textwrap = isReply == true ? event.currentTarget : document.getElementById('textwrap');
        var textdiv = isReply == true ? $(textwrap).next()[0] : document.getElementById('textdiv');
        var textareapop = isReply == true ? $(textdiv).next()[0] : document.getElementById('textarea-pop');
        var value = textwrap.value;//.ptrimHeadTail();


        workController.focusIndex = textwrap.selectionStart;
        var firstPartStr = value.substring(0, workController.focusIndex);
        var secondPartStr = value.substring(workController.focusIndex);
        var lastQuanIndex = firstPartStr.lastIndexOf('@');
        var lastJingIndex = firstPartStr.lastIndexOf('#');
        var lastDaoIndex = firstPartStr.lastIndexOf('$');
        var lastQuanjingIndex = Math.max(lastQuanIndex, lastJingIndex);
        lastQuanjingIndex = Math.max(lastQuanjingIndex, lastDaoIndex);
        var lastSpaceIndex = firstPartStr.lastIndexOf(' ');

        if (lastSpaceIndex >= lastQuanjingIndex || lastQuanjingIndex == -1) {
            $(textareapop).hide();
            workModel.instance().textSearchs([]);
            workController.focusIndex = -1;
            if (workController.quanjingAjax) workController.quanjingAjax.abort();
            return;
        }

        //0 @用户    1 #设备    2 $分项
        var isQuan = lastQuanIndex > lastJingIndex && lastQuanIndex > lastDaoIndex ? 0 :
            lastJingIndex > lastQuanIndex && lastJingIndex > lastDaoIndex ? 1 :
                lastDaoIndex > lastQuanIndex && lastDaoIndex > lastJingIndex ? 2 : -1;
        workController.isQuan = isQuan;

        var keyWord = firstPartStr.substring(lastQuanjingIndex + 1, workController.focusIndex);
        workController.searchUsersOrEqu(keyWord, isQuan, function () {
            var jqtextareapop = $(textareapop);
            //if (workModel.instance().textSearchs().length == 0) return jqtextareapop.hide();

            var text = workModel.instance().textSearchs().length == 0 ? '点击空格完成输入' :
                isQuan == 0 ? '选择用户姓名或点击空格完成输入' :
                    isQuan == 1 ? '选择设备或点击空格完成输入' :
                        isQuan == 2 ? '选择分项或点击空格完成输入' : '';

            isReply != true ? $('#liresultre').text(text) : jqtextareapop.find('li:first').text(text);
            jqtextareapop.show();
        });

        var h1 = '<span>' + firstPartStr.substring(0, lastQuanjingIndex) + '</span>';
        var h2 = '<span>' + firstPartStr.substr(lastQuanjingIndex, 1) + '</span>';
        var htmlValue = h1 + h2;
        htmlValue = htmlValue.replace(/\n/g, '<br/>');
        htmlValue = htmlValue.replace(/\s/g, '&nbsp;');
        textdiv.innerHTML = htmlValue;
        textdiv.scrollTop = textwrap.scrollTop;

        var span = $(textdiv).find('span:last');
        var divpos = $(textdiv).offset();
        var pos = span.offset();

        var left = pos.left - divpos.left;
        if (isReply == true) {
            left = left - textwrap.scrollLeft;
            var maxLeft = $(textwrap).width();
            left = Math.min(left, maxLeft);
        }
        var top = pos.top - divpos.top;

        $(textareapop).css({left: left + 'px', top: top + 'px'});
    },
    /*#筛选条件展开折叠*/
    unfold: function (dom, unfold) {
        if (unfold) {
            $(dom).hide().next().show();
            $(dom).parents(".hashtag-sop").next().show();
        } else {
            $(dom).hide().prev().show();
            $(dom).parents(".hashtag-sop").next().hide();
        }
    },
    /*删除照片*/
    removeImage: function (dom) {
        $(dom).parent().remove();
    },

    //转换成父级链字符串形式
    getParentsLinks: function (parents) {
        if (!parents.length) return '';
        var str = '(';
        for (var i = 0; i < parents.length; i++) {
            str += parents[i].parent_names.join('-');
            if (i != parents.length - 1) str += '/';
        }
        return str + ')';
    },
    //转换控件文字
    contolTransfer: function (num) {
        var str = "";
        str = num == 1 ? "文本" : num == 2 ? "单选" : num == 3 ? "多选" : num == 4 ? "无单位的数字" : "有单位的数字"
        return str;
    },
    /*#浮窗中上下键选择*/
    upDownSelect: function (where, who, which) {//where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
        var num = 0;
        var hashtagBubble = null;
        /*  完善中
         *   var bubble=null;
         *   if(where && who && which){//自由方式输入时@浮窗
         *   bubble=$(".matter-freedom .textarea-prop .aite-bubble");
         *   }else if(where && who && !which){//自由方式点击@浮窗
         *   bubble=$(".matter-freedom .add-obj .aite-bubble");
         *   }else if(where && !who && which){//自由方式输入时#浮窗
         *   bubble=$(".matter-freedom .textarea-prop .hashtag-bubble")
         *   }else if(where && !who && !which) {//自由方式点击时#浮窗
         *   bubble=$(".matter-freedom .add-sop .hashtag-bubble")
         *   }else if(!where && who && which){//结构化方式输入时@浮窗
         *   bubble=$(".matter-regular .textarea-prop .aite-bubble");
         *   }
         * */


        if (which) {//输入时的#浮窗
            hashtagBubble = $(".matter-freedom .textarea-prop .hashtag-sop")
        } else {
            // hashtagBubble=$(".add-sop .sop-list .aite-list")
            hashtagBubble = $(".matter-freedom .add-sop .hashtag-sop")

        }
        $(document).keyup(function (e) {
            var code = e.keyCode;
            // e.preventDefault();
            if (code == 40 && num == 0) {
                if (!counterNum.aite) {
                    // $(".sop-list .aite-list:first-of-type").addClass("updownmove");
                    // $(hashtagBubble).eq(0).addClass("updownmove");
                    $(hashtagBubble).find(".aite-list").eq(0).addClass("updownmove");
                }
                num++;
            } else {
                if ($(".updownmove")[0]) {
                    var prev = $(".updownmove")[0].previousElementSibling;//选中元素前置位元素是否存在,以此判断元素是否还可以上下移动
                    var next = $(".updownmove")[0].nextElementSibling;//选中元素后置位元素是否存在,以此判断元素是否还可以上下移动
                    switch (code) {
                        case 38://上
                            // e.preventDefault();
                            if (prev) {
                                if (!commonData.publicModel.aite) {
                                    $(hashtagBubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(prev).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "-=40px"
                                    // })
                                }
                            }
                            break;
                        case 40://下
                            if (!commonData.publicModel.aite) {
                                if (next) {
                                    $(hashtagBubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(next).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "+=40px"
                                    // })
                                }
                            }


                            break;
                        case 32://空格选中
                            if (!commonData.publicModel.aite) {
                                // var id = $(".sop-list .aite-list.updownmove>div:last-of-type>div").attr("id");
                                var id = $(hashtagBubble).find(".aite-list.updownmove>div:last-of-type>div").attr("id");
                                $(hashtagBubble).find("#" + id).psel(true);//空格选中
                                $(hashtagBubble).find("#able-btn").pdisable(false);
                            }
                            break;
                        case 13://回车确定
                            if (!commonData.publicModel.aite) {
                                var checks = $(hashtagBubble).find(".aite-list>div:last-of-type").children("div");
                                var sop = "";
                                checks.each(function (i, dom, arr) {
                                    var check = $(hashtagBubble).find("#" + dom.id).psel();
                                    if (check) {
                                        sop += "#" + $(hashtagBubble).find(dom).parent().prev().children().text() + " ";
                                    }
                                });
                                commonData.publicModel.description += sop;
                                // $(".matter-freedom textarea").

                            }
                            break;
                        default:
                            break;
                    }
                }

            }
        })
    },
    /*#浮窗中上下键选择*/
    upDownSelecting: function (where, who, which) {//where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
        var num = 0;
        // var hashtagBubble = null;
        var bubble = null;
        // var searchList = null;
        var timely = null;
        /*完善中*/
        if (where && who && which) {//自由方式输入时@浮窗
            // bubble = $(".matter-freedom .textarea-prop .aite-bubble");
            timely = $(".matter-freedom .textarea-prop .aite-bubble .timely-checkbox");
            if (timely.css("visibility") == "visible") {
                bubble = timely;
            }
        } else if (where && who && !which) {//自由方式点击@浮窗
            // bubble = $(".matter-freedom .add-obj .aite-bubble");
            timely = $(".matter-freedom .add-obj .aite-bubble .timely-checkbox");
            if (timely.css("visibility") == "visible") {
                bubble = timely;
            }
        } else if (where && !who && which) {//自由方式输入时#浮窗
            bubble = $(".matter-freedom .textarea-prop .hashtag-bubble")
        } else if (where && !who && !which) {//自由方式点击时#浮窗
            bubble = $(".matter-freedom .add-sop .hashtag-bubble")
        } else if (!where && who && which) {//结构化方式输入时@浮窗
            // bubble = $(".matter-regular .textarea-prop .aite-bubble");
            timely = $(".matter-regular .textarea-prop .aite-bubble .timely-checkbox");
            if (timely.css("visibility") == "visible") {
                bubble = timely;
            }
        } else if (!where && who && !which) {//结构化方式点击时@浮窗
            // bubble = $(".matter-regular .add-obj .hashtag-bubble");
            timely = $(".matter-regular .add-obj .aite-bubble .timely-checkbox");
            if (timely.css("visibility") == "visible") {
                bubble = timely;
            }
        } else if (!where && !who && which) {//结构化方式输入时#浮窗
            bubble = $(".matter-regular .textarea-prop .hashtag-bubble");
        } else if (!where && !who && !which) {//结构化方式点击时#浮窗
            bubble = $(".matter-regular .add-sop .hashtag-bubble");
        }


        /*if (which) {//输入时的#浮窗
         hashtagBubble = $(".matter-freedom .textarea-prop .hashtag-sop")
         } else {
         // hashtagBubble=$(".add-sop .sop-list .aite-list")
         hashtagBubble = $(".matter-freedom .add-sop .hashtag-sop")

         }*/
        $(document).keyup(function (e) {
            var code = e.keyCode;
            // e.preventDefault();
            if (code == 40 && num == 0) {
                // if (!commonData.publicModel.aite) {
                // $(hashtagBubble).eq(0).addClass("updownmove");
                if (!who || who && timely) {
                    $(bubble).find(".aite-list").eq(0).addClass("updownmove");
                }
                // }
                num++;
            } else {
                if ($(".updownmove")[0]) {
                    var prev = $(".updownmove")[0].previousElementSibling;//选中元素前置位元素是否存在,以此判断元素是否还可以上下移动
                    var next = $(".updownmove")[0].nextElementSibling;//选中元素后置位元素是否存在,以此判断元素是否还可以上下移动
                    switch (code) {
                        case 38://上
                            // e.preventDefault();
                            if (prev) {
                                if (!commonData.publicModel.aite) {
                                    $(bubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(prev).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "-=40px"
                                    // });
                                }
                            }
                            break;
                        case 40://下
                            if (!commonData.publicModel.aite) {
                                if (next) {
                                    $(bubble).find(".aite-list").each(function () {
                                        $(this).removeClass("updownmove");
                                    });
                                    $(next).addClass("updownmove");
                                    // $(".sop-body .sop-list").animate({
                                    //     scrollTop: "+=40px"
                                    // })
                                }
                            }


                            break;
                        case 32://空格选中
                            // if (!commonData.publicModel.aite) {
                            // var id = $(".sop-list .aite-list.updownmove>div:last-of-type>div").attr("id");
                            var id = $(bubble).find(".aite-list.updownmove>div:last-of-type>div").attr("id");
                            $(bubble).find("#" + id).psel(true);//空格选中
                            $(bubble).find("#able-btn").pdisable(false);
                            // }
                            break;
                        case 13://回车确定
                            // if (!commonData.publicModel.aite) {
                            var checks = $(bubble).find(".aite-list>div:last-of-type").children("div");
                            var sop = "";
                            checks.each(function (i, dom, arr) {
                                var check = $(bubble).find("#" + dom.id).psel();
                                if (check) {
                                    sop += "#" + $(bubble).find(dom).parent().prev().children().text() + " ";
                                }
                            });
                            commonData.publicModel.description += sop;
                            // }
                            break;
                        default:
                            break;
                    }
                }

            }
        })
    },
    /*sop选中chedckbox*/
    checkSop: function () {
        // event.stopPropagation();
        if (!commonData.publicModel.aite) {
            // var id=$(".sop-list .aite-list.updownmove>div:last-of-type div").attr("id");
            // $("#able-btn").pdisable(false);
        }
    },
    /*回车确定*/
    /*enterSop: function (e, which) {
     var timely=$(".textarea-prop .aite-bubble .timely-checkbox");
     // var timely=$(".add-obj .aite-bubble .timely-checkbox");
     if(timely.css("visibility")=="visible"){
     hashtagBubble=timely;
     }
     if (which) {//输入时的#浮窗
     // hashtagBubble=$(".textarea-prop .sop-list .aite-list")
     hashtagBubble = $(".textarea-prop .hashtag-sop")
     } else {
     // hashtagBubble=$(".add-sop .sop-list .aite-list")
     hashtagBubble = $(".add-sop .hashtag-sop")

     }
     if (!commonData.publicModel.aite) {
     // var checks = $(".sop-list .aite-list>div:last-of-type").children("div");
     var checks = $(e.target).parents(".hashtag-bubble").find(".sop-list .aite-list>div:last-of-type").children("div");

     var sop = "";
     checks.each(function (i, dom, arr) {
     var check = $(e.target).parents(".hashtag-bubble").find("#" + dom.id).psel();
     if (check) {
     sop += "#" + $(e.target).parents(".hashtag-bubble").find("#" + dom.id).parent().prev().children().text() + " ";
     }
     });
     if (which) {//输入时的#浮窗
     sop = sop.substring(1);
     }
     commonData.publicModel.description += sop;
     // $(".matter-freedom textarea").

     }
     },*/
    /*回车确定*/
    enterSop: function (e, which) {
        var timely = $(".textarea-prop .aite-bubble .timely-checkbox");
        // var timely=$(".add-obj .aite-bubble .timely-checkbox");
        if (timely.css("visibility") == "visible") {
            hashtagBubble = timely;
        }
        if (which) {//输入时的#浮窗
            // hashtagBubble=$(".textarea-prop .sop-list .aite-list")
            hashtagBubble = $(".textarea-prop .hashtag-sop")
        } else {
            // hashtagBubble=$(".add-sop .sop-list .aite-list")
            hashtagBubble = $(".add-sop .hashtag-sop")

        }
        if (!commonData.publicModel.aite) {
            // var checks = $(".sop-list .aite-list>div:last-of-type").children("div");
            var checks = $(e.target).parents(".hashtag-bubble").find(".sop-list .aite-list>div:last-of-type").children("div");

            var sop = "";
            checks.each(function (i, dom, arr) {
                var check = $(e.target).parents(".hashtag-bubble").find("#" + dom.id).psel();
                if (check) {
                    sop += "#" + $(e.target).parents(".hashtag-bubble").find("#" + dom.id).parent().prev().children().text() + " ";
                }
            });
            if (which) {//输入时的#浮窗
                sop = sop.substring(1);
            }
            commonData.publicModel.description += sop;
            // $(".matter-freedom textarea").

        }
    },
    clickLeftItem: function (content) {
        if (commonData.publicModel.curObjType == "floor" || commonData.publicModel.curObjType == "system") {
            commonData.publicModel.lastLevel = [];
            commonData.publicModel.lastLevel = content.contentCopy;
        } else if (commonData.publicModel.curObjType == "space") {
            if (!content.content) {
                myWorkOrderController.querySpace(content.obj_id, "floor", false)
            } else if (content.content && content.content.length == 0) {
                myWorkOrderController.querySpace(content.obj_id, "build", false)
            }
        } else if (commonData.publicModel.curObjType == "equip") {
            if (content.parents || content.content && content.content.length == 0) {
                var id = content.obj_type == "build" ? "build_id" : content.obj_type == "floor" ? "floor_id" : "space_id"
                var obj = {
                    user_id: commonData.publicModel.user_id,
                    project_id: commonData.publicModel.project_id,
                    need_back_parents: true,
                }
                obj[id] = content.obj_id;
                myWorkOrderController.queryEquip(obj)
            }
        }

    },
    defaultPage: function (dom) {
        $(dom).parents(".aite-bubble").find(".none-both").show().siblings().hide();
    },
    closeBubble: function () {

        $(document).click(function () {
            $(".textarea-prop").hide();
            $(".add-obj .aite-bubble").hide();
            $(".obj-fragment-div .aite-bubble").hide();
            $(".obj-info-btn .aite-bubble").hide();
            $(".add-sop .hashtag-bubble").hide();
            commonData.publicModel.clickAiteShow = false;
            commonData.publicModel.clickHashShow = false;
            commonData.publicModel.noPop=false;
        })
    },
    btnAble: function (index, obj, $event) {
        if (event.pEventAttr.state) {
            $("#able-btn").pdisable(false);
        } else {
            var checks = $(event.target).parents(".last-level-box").find(".aite-list>div:last-of-type").children();
            $(checks).some(function (i, dom, arr) {
                // var check = $("#"+dom.id).psel();
                $("#" + dom.id).psel()
                // if(check){
                //     return check;
                // }
            });
        }
    },
    clickAiteShowFn: function (e, aite, event) {
        event.stopPropagation();
        if (aite) {
            commonData.publicModel.clickAiteShow = true;
            commonData.publicModel.clickHashShow = false;
        } else {
            commonData.publicModel.clickAiteShow = false;
            commonData.publicModel.clickHashShow = true;
        }
        $(e).children("div").show();
        //where--自由输入方式/结构输入，who--@/#，which--手动输入浮窗/点击浮窗
        yn_method.upDownSelecting(true, false, false);
    },
    delObjs: function (dom) {
        $(dom).parents(".obj-div").remove();
    },
    /*添加工作内容中的专业*/
    addMajor: function (majors) {
        commonData.publicModel.workContent.domain = majors.code;
        commonData.publicModel.workContent.domain_name = majors.name;

    },
    /*添加工作内容中，需确认的操作结果添加选项*/
    addSel: function (dom) {
        var sel = "<div class='info-dot'> <input type='text' /> <img src='../images/info_close.png' alt='删除图标x' onclick='yn_method.removeImage(this)'/> </div>"
        $(dom).parent().before(sel)
    },
    /*添加工作内容中，需确认的操作结果添加信息点*/
    infoBubbleShow: function (dom, event) {
        event.stopPropagation();
        $(dom).next().show();
        event.stopPropagation();
        // $(".addInfoPoint").hide();
        commonData.jqPopDataDivs2 = $(dom).next().find('.list-body').children();
        publicMethod.setCurPop2(0);//选择大类
        // var sel="<div class='info-dot'> <input type='text' /> <img src='../images/info_close.png' alt='删除图标x' onclick='yn_method.removeImage(this)'/> </div>"
        // $(dom).parent().siblings(".obj-info").append("")
    },
    /*添加工作内容中，需确认的操作结果添加信息点中的关键字*/
    addKey: function (e) {
        var str = $(e).parent().prev().val();
        if (str) {
            var strHtml = "<div class='key-div'> <span>" + str + "</span> <i onclick='yn_method.removeKey(this)'>x</i> </div>";
            $(e).parent().prev().before(strHtml);
            $(e).parent().prev().val("");
            var length = $(".key-div").length;
            // if(length>1){
            var inpWidth = $(e).parent().prev().width();
            // }else{
            //     var inpWidth = $(e).parent().prev().width() - 48;
            // }
            var prevWidth = $(e).parent().prev().prev().width();
            var neWidth = inpWidth - prevWidth - 20;
            if (neWidth > 45) {

                $(e).parent().prev().width(neWidth + "px");
            } else {
                $(e).parent().prev().width("100%");
            }
        }
    },
    removeAllKey: function (e) {
        $(e).parents(".info-search-box").find(".key-div").remove();
    },
    removeKey: function (e) {
        $(e).parents(".key-div").remove();
    },
    selContent: function (content) {
        commonData.publicModel.seltype = content.type;
        commonData.publicModel.customItem.type = content.type;
        commonData.controlName = content.name;
    },
    /*自定义页面*/
    customShow: function (e) {
        e.stopPropagation();
        $(e.target).parents(".aite-footer").prev().find(".customize").show().siblings().hide();
    },
    /*忽略报错*/
    ignoreError: function (dom) {
        $(dom).parent().hide();
    },
    /*转换时间*/
    transferTime: function (time) {
        time = time.substring(0, 16);
        time = time.replace(/-/g, '/');
        var timestamp = new Date(time).getTime();
        return timestamp;
    },
    /*验证时间*/
    verifyTime: function () {
        var ask_start_time = $("#ask_start_time").psel();
        var ask_end_time = $("#ask_end_time").psel();
        var end_timestamp = yn_method.transferTime(ask_end_time.startTime);
        var start_timestamp = yn_method.transferTime(ask_start_time.startTime);
        if (start_timestamp > end_timestamp) {
            $("#ask_end_time").find(".per-combobox-title").css({
                "border": "1px solid #ed6767"
            });
            $(".time-error-tips").show();
        } else {
            $("#ask_end_time").find(".per-combobox-title").css({
                "border": "1px solid #cacaca"
            });
            $(".time-error-tips").hide();
            commonData.publicModel.workOrderDraft["ask_end_time"] = ask_end_time.startTime;
            commonData.publicModel.workOrderDraft["ask_end_limit"] = "";

        }


    },
    /*删除事项*/
    deleteMatter: function (dom) {
        $(dom).parents(".matter-all").remove();
    },
    /* /!*选中checkbox*!/
     selCheck:function (content,index,event) {
     var state = event.pEventAttr.state;
     var info_points = commonData.infoPoint_obj.info_points;
     commonData.info_pointsCopy = JSON.parse(JSON.stringify(info_points));
     if (state) {
     commonData.info_pointsCopy.push(content);
     } else {
     for (var i = 0; i < commonData.info_pointsCopy.length; i++) {
     if (commonData.info_pointsCopy[i].obj_id == content.obj_id) {
     commonData.info_pointsCopy.splice(i, 1);
     break;
     }
     }
     }
     }*/
    addWorkContent: function () {
        // if (!commonData.publicModel.mattersVip.desc_works) {
        //     commonData.publicModel.mattersVip["desc_works"] = [];
        // }
        // commonData.publicModel.mattersVip["desc_works"].push(commonData.publicModel.workContent);
        // commonData.publicModel.workContent["desc_works"].push(commonData.publicModel.workContent);
        // commonData.publicModel.singleMatters["desc_works"] = commonData.publicModel.mattersVip["desc_works"];
        // debugger;
        commonData.publicModel.addContentWindow = false;
        // publicMethod.addWorkContentName();
        // console.log(publicMethod.addWorkContentName());
        commonData.publicModel.allMatters[commonData.publicModel.curMatterIndex].desc_works.push(commonData.publicModel.workContent)


        // console.log(commonData.publicModel.workContent)
        // console.log(commonData.publicModel.mattersVip)
        console.log(commonData.publicModel.allMatters[commonData.publicModel.curMatterIndex])

    },
    contentAiteShow: function (dom, event) {
        event.stopPropagation();
        $(dom).children(".aite-bubble").show();
        commonData.publicModel.noPop=true;
        publicMethod.setCurPop(4, 'content');
    },
    /*工单类型存储*/
    workTypeFn: function (content) {
        commonData.publicModel.workOrderDraft["order_type_name"] = content.name;
        commonData.publicModel.workOrderDraft["order_type"] = content.code;
    },
    /*紧急程度存储*/
    urgencyFn: function (content) {
        commonData.publicModel.workOrderDraft["urgency"] = content.name;

    },
    /*开始时间存储*/
    startTimeSave: function () {
        var ask_start_time = $("#ask_start_time").psel().startTime;
        commonData.publicModel.workOrderDraft["ask_start_time"] = ask_start_time;

    },
    //选择对象所属类别
    selObjType: function (obj_type) {
        commonData.publicModel.selectedObjType = obj_type;
    },
    /*草稿存储数据*/
    a: function () {
        $(document).keyup(function (e) {
            var code = e.keyCode;
            if (code == 110) {
                console.log(commonData.publicModel.workOrderDraft)
            }


        })
    }

}
