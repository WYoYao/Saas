var publicMethod = {
    clickAdditem: function (item) { //弹出框添加选中

        var id = item.id;

        var personPositionList = JSON.parse(JSON.stringify(orderDetail_data.pub_model.personPositionList));

        personPositionList.forEach(function (item) {

            if (item.id == id) {

                item.isSelected = !item.isSelected;

                // 当父级被选中的时候子级跟随变化
                if (item.type == 2) {
                    item.persons.map(function (t) {

                        t.isSelected = item.isSelected;
                        return t;
                    })
                }
            } else if (item.type == 2) {
                item.isSelected = item.persons.reduce(function (con, info) {
                    info.isSelected = info.id == id ? !info.isSelected : info.isSelected;
                    if (!con) return con;
                    return info.isSelected;
                }, true);
            }
        })

        orderDetail_data.pub_model.personPositionList = personPositionList;

        // Vue.set(this, 'personPositionList', personPositionList);

    },
    createAssignSetYes: function () { //指派设置确定
        var valArr = [];
        var arr = JSON.parse(JSON.stringify(orderDetail_data.pub_model.personPositionList));
        arr.forEach(function (ele) {
            if (ele.isSelected) {
                if (ele.type == 2) {
                    valArr.push({"name": ele.name, "type": ele.type})
                } else if (ele.type == 3) {
                    valArr.push({"name": ele.name, "type": ele.type, "person_id": ele.person_id})

                }
            }
            if (ele.type == "2" && !ele.isSelected) {
                ele.persons.forEach(function (p) {
                    if (p.isSelected) {
                        valArr.push({"name": p.name, "type": "3", "person_id": p.person_id})

                    }
                })
            }
        });
        console.log(JSON.stringify(valArr));
        orderDetail_data.userInfo;
        var nextRoute = valArr;
        var operatorName = orderDetail_data.userInfo.user.name;
        var operatorId = orderDetail_data.userInfo.user.person_id;
        console.log(operatorName)
        var _data = {
            "order_id": orderDetail_data.order_id,
            "operator_id": operatorId,
            "operator_name": operatorName,
            "next_route": nextRoute
        };
        if (nextRoute.length > 0) {
            orderDetail_pub.assignOrderSet(_data);
            $("#createAssignSet").hide();
        } else {
            $("#publishNotice").pshow({text: '请选择指派的岗位或人员范围', state: "failure"});
        }
    },
    stopOrderSetYes: function () {//中止工单确定
        var operatorName = orderDetail_data.userInfo.user.name;
        var operatorId = orderDetail_data.userInfo.user.person_id;
        var _data = {
            "order_id": orderDetail_data.order_id,
            "operator_id": operatorId,
            "operator_name": operatorName,
            "opinion": orderDetail_data.stop_order_content
        };
        controller.stopOrderSet(_data);
    },
    //事项内容keyup事件
    //params:
    //  flag 2为结构化输入'我要对'文本框 3为结构化输入'进行'文本框
    keyupMatterContent: function (model, index, event, jqTextarea, addSpecialCharFocusIndex, addSpecialCharAddedStr, flag) {
        //commonData.inputMode = flag;
        commonData.textAttrName = flag == 2 ? 'desc_forepart' : flag == 3 ? 'desc_aftpart' : 'description';
        commonData.curMatterIndex = index;
        commonData.curMatterContent = JSON.parse(JSON.stringify(model));
        commonData.publicModel.curMatterIndex = index;
        var code = event.keyCode;
        var jqTarget = jqTextarea ? jqTextarea : $(event.currentTarget);
        var textwrap = jqTarget[0];
        commonData.editingJqTextwrap = jqTarget;

        var focusIndex = addSpecialCharFocusIndex ? addSpecialCharFocusIndex : textwrap.selectionStart;
        var text = model[commonData.textAttrName] || '';
        var len = text.length;
        if (!addSpecialCharAddedStr && len == commonData.beforeLen) return;        //过滤：1、中文输入法输入的拼音字符 2、对文本框操作无效的按键
        var text1 = text.slice(0, focusIndex);
        var text2 = text.slice(focusIndex);
        commonData.text1 = text1;
        commonData.text2 = text2;
        var noLastCharText1 = text1.slice(0, focusIndex - 1);
        var len1 = text1.length;
        var text1Char = text1 + commonData.deletedChar;
        var searchedText;
        var addedLen = len - commonData.beforeLen;
        var addedStr = addSpecialCharAddedStr ? addSpecialCharAddedStr : text.slice(focusIndex - addedLen, focusIndex);
        if (code == 8) {        //退格键删除操作
            if (commonData.deletedChar == ' ') {      //在空格后
                //只有对象或SOP后面允许输入空格的情况下此处加强判断可以去掉，目前没有限制空格在普通文本中的输入
                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') || text1.lastIndexOf(' ') < text1.lastIndexOf('#')) {        //在对象结束空格后      //此处不能发起一次搜索，此时可能的情况：@地源热泵设备类@建筑4
                    console.log('删除了标识对象或SOP结束的空格，这是不允许的');
                    model[commonData.textAttrName] = text1 + ' ' + text2;
                }
            } else if (text1Char.lastIndexOf(' ') < text1Char.lastIndexOf('@') && text2.indexOf(' ') !== -1) {        //在对象@或普通字符后且在空格前
                if (commonData.deletedChar == '@') {     //在对象@后        //To Delete
                    console.log('删除对象 @符');
                } else {     //在普通字符后，例如：'@建筑2' —> '@建2' 发起一次搜索
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('删除对象中的普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (searchedText.length) {
/*
                        globalController.searchObject(searchedText, function (result) {
                            var data = result && result.data ? result.data : [];
                            publicMethod.dealSearchedObjects(data, commonData.publicModel, searchedText);
                            commonData.publicModel.aite = true;
                            if (data.length) {
                                commonData.publicModel.curMatterPopType = 0;        //To Delete
                                publicMethod.setCurPop(0, commonData.types[0]);
                            } else {
                                commonData.publicModel.curMatterPopType = 3;
                                setTimeout(function () {
                                    publicMethod.setCurPop(3, commonData.types[0]);
                                }, 0);
                            }
                        });
*/
                        myWorkOrderController.searchObject(searchedText);
                    } else {
                        //commonData.publicModel.curMatterPopType = 3;
                        publicMethod.setCurPop(4, 'obj');
                    }
                }
            } else if (text1Char.lastIndexOf(' ') < text1Char.lastIndexOf('#') && text2.indexOf(' ') !== -1) {        //在SOP#或普通字符后且在空格前
                if (commonData.deletedChar == '#') {     //在SOP #后
                    console.log('删除SOP #符');
                } else {     //在普通字符后，例如：'#SOP名称1' —> '#SOP名1' 发起一次搜索
                    searchedText = text1.slice(text1.lastIndexOf('#') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('删除SOP中的普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    publicMethod.toQuerySopListForSel(true, searchedText);
                }
            }
        } else if (code == 32 && text1[text1.length - 1] == ' ') {        //输入空格键，排除非单个字符输入状态下输入空格
            //普通文本中间允许输入空格

            //在@后输入了一个空格
            if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@') && noLastCharText1.lastIndexOf('@') == text1.length - 2 ) {
                console.log('在@后输入了一个空格，这是不允许的');
                model[commonData.textAttrName] = noLastCharText1 + text2;
                return;
            }
            //在#后输入了一个空格
            if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('#') && noLastCharText1.lastIndexOf('#') == text1.length - 2) {
                console.log('在#后输入了一个空格，这是不允许的');
                model[commonData.textAttrName] = noLastCharText1 + text2;
                return;
            }
            if (noLastCharText1.lastIndexOf('@') == -1 || noLastCharText1.lastIndexOf('@') < noLastCharText1.lastIndexOf(' ')) {     //不在对象中间
                return;
            } /*else if ($($(".aite-bubble")[commonData.curMatterIndex]).is(':hidden')) {     //对象中间还未发起搜索直接输入空格
                console.log('对象中间还未发起搜索直接输入空格');
                var objName = text1.slice(text1.lastIndexOf('@') + 1, text1.lastIndexOf(' '));
                myWorkOrderController.searchObject(objName, true);
            } else {        //对象中间已发起搜索，后输入空格
                if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@')) {
                    if (commonData.matchExistingObj.obj_id) {
                        console.log('输入了一个空格，结束对象输入，该对象为已有对象');
                        $($(".aite-bubble")[commonData.curMatterIndex]).hide();
                    } else {
                        console.log('输入了一个空格，结束对象输入，该对象为自定义对象');
                        var objName = text1.slice(text1.lastIndexOf('@') + 1, text1.length - 2);
                        var obj = {
                            user_id: commonData.user_id,
                            project_id: commonData.project_id,
                            obj_type: 'other',
                            obj_name: objName
                        }
                        myWorkOrderController.addTempObjectWithType(obj, null, null, null, commonData.types[0]);
                    }
                }
            }*/ else {      //获取搜索结果后判断是否已发起搜索
                var objName = text1.slice(text1.lastIndexOf('@') + 1, text1.lastIndexOf(' '));
                myWorkOrderController.searchObject(objName, true);
            }

            if (noLastCharText1.lastIndexOf('@') == -1 || noLastCharText1.lastIndexOf('@') < noLastCharText1.lastIndexOf(' ')) {     //不在对象中间
                return;
            }
            /*else if ($($(".hashtag-bubble")[commonData.curMatterIndex]).is(':hidden')) {     //SOP中间还未发起搜索直接输入空格
             var objName = text1.slice(text1.lastIndexOf('@') + 1, text1.lastIndexOf(' '));
             myWorkOrderController.searchObject(objName, true);
             } else {        //对象中间已发起搜索，后输入空格
             if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@')) {
             if (commonData.matchExistingObj.obj_id) {
             console.log('输入了一个空格，结束SOP输入，该SOP为已有SOP');
             $($(".aite-bubble")[commonData.curMatterIndex]).hide();
             } else {
             console.log('输入了一个空格，结束对象输入，该对象为自定义对象');
             var objName = text1.slice(text1.lastIndexOf('@') + 1, text1.length - 2);
             var obj = {
             user_id: commonData.user_id,
             project_id: commonData.project_id,
             obj_type: 'other',
             obj_name: objName
             }
             myWorkOrderController.addTempObjectWithType(obj);
             }
             }
             }*/
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
                publicMethod.setCurPop(4, commonData.types[0], addSpecialCharFocusIndex);
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
                if (text1.lastIndexOf('@') > text1.lastIndexOf('#')) {
                    if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2 == '') {
                        searchedText = text1.slice(text1.lastIndexOf('@') + 1);
                        console.log('在@后输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                        if (!commonData.composing) {
                            myWorkOrderController.searchObject(searchedText);
                        }
                    }

                    if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2.indexOf(' ') !== -1) {
                        searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                        console.log('在对象中输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                        if (!commonData.composing) {
                            myWorkOrderController.searchObject(searchedText);
                        }
                    }
                    commonData.notReplaceObj = false;
                } else {
                    if (text1.lastIndexOf(' ') < text1.lastIndexOf('#') && text2 == '') {
                        searchedText = text1.slice(text1.lastIndexOf('#') + 1);
                        console.log('在#后输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                        if (!commonData.composing) {
                            publicMethod.toQuerySopListForSel(true, searchedText, true);
                        }
                    }

                    if (text1.lastIndexOf(' ') < text1.lastIndexOf('#') && text2.indexOf(' ') !== -1) {
                        searchedText = text1.slice(text1.lastIndexOf('#') + 1) + text2.slice(0, text2.indexOf(' '));
                        console.log('在SOP中输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                        if (!commonData.composing) {
                            publicMethod.toQuerySopListForSel(true, searchedText, true);
                        }
                    }
                }
            }
        }
    },

    //事项内容keydown事件
    //params:
    //  flag 2为结构化输入'我要对'文本框 3为结构化输入'进行'文本框
    keydownMatterContent: function (model, index, event, flag) {
        var code = event.keyCode;
        var jqTarget = $(event.currentTarget);
        var textwrap = jqTarget[0];
        var focusIndex = textwrap.selectionStart;
        var text = flag == 2 ? (model.desc_forepart || '') : flag == 3 ? (model.desc_aftpart || '') : (model[commonData.textAttrName] || '');
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
    //删除事项弹窗
    deleteMatterWindow: function (index, event) {
        event.stopPropagation();
        commonData.publicModel.del_matter_index = index;
        $("#delete-matter-confirm").pshow({title: '确定要删除该事项吗？', subtitle: '删除后的事项无法恢复'})
    },
    //删除事项
    deleteMatter: function () {
        commonData.publicModel.allMatters.splice(commonData.publicModel.del_matter_index, 1);
        $("#delete-matter-confirm").phide();
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

        //commonData.publicModel.domainList = [];     //专业列表
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
        //commonData.publicModel.toolList = [];       //弹框工具列表

        //commonData.publicModel.orderTypeList = [];      //工单类型列表
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
        // if(
    },
    //标准操作内容编辑时失焦问题
    blurContentItemOpe: function (event) {
        event.stopPropagation();
        var num = event.srcElement.value.length;
        var prebody = $(event.srcElement).parents(".prev-body");
        commonData.publicModel.textareaOperate = false;
        setTimeout(function () {
            if (commonData.publicModel.blurClose && !commonData.publicModel.textareaOperate) {
                if (num == 0) {
                    $(prebody).slideUp();
                    $(event.srcElement).parents(".content-prev").find(".edit-div").show().next().hide();
                    commonData.publicModel.textareaOperate = false;
                }
            }
        }, 2000);
    },
    contentTextAreafocus: function (event) {
        event.stopPropagation();
        commonData.publicModel.textareaOperate = true;
        var prebody = $(event.srcElement).parents(".prev-body");
        $(prebody).slideDown();
    },
    operatePrevBodyShow: function (dom, event) {

        event.stopPropagation();
    },
    /*点击sop名称*/
    detailSop: function (sop, event) {
        event.stopPropagation();
        commonData.publicModel.detailSopShow = true;
        $(".detail-alert").show();
        var postObj = {
            sop_id: sop.sop_id,
            version: sop.version	      //返回结果是否需要带筛选条
        }
        myWorkOrderController.querySopDetailById(sop, postObj);
    },

    closeDetailSop: function () {
        commonData.publicModel.detailSopShow = false;
        $(".detail-alert").hide();

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
        //if (commonData.publicModel.sopCriteria[attrName1].length > selectedArr.length) {
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
        commonData.publicModel.sopCriteria = JSON.parse(JSON.stringify(commonData.publicModel.sopCriteria));
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
        commonData.publicModel.curObjType2 = 'infoPoint';
        console.log(commonData.infoPoint_obj);
        myWorkOrderController.queryInfoPointForObject(commonData.infoPoint_obj, null, '');
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
        if (commonData.publicModel.addContentWindow) {
            $(jqTarget[0]).parents(".textarea-div").find(".counter b").text(len);
        }
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

    //添加特殊字符@
    addSpecialChar: function (event, index, symbol) {
        event.stopPropagation();
        var dom = event.currentTarget;
        commonData.curMatterIndex = index;
        var content = publicMethod.getCurMatter();
        content[commonData.textAttrName] += symbol;
        var jqTextarea = $(dom).parents('.textarea-div').find('textarea');
        jqTextarea.focus();
        var focusIndex = content[commonData.textAttrName].length;
        var addedStr = symbol;
        publicMethod.keyupMatterContent(content, index, event, jqTextarea, focusIndex, addedStr);
    },

    //自定义信息点 列表状态-添加选项
    addOption2: function (custom, event, contentIndex) {
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        custom.items.push('');
        // commonData.publicModel.curStep = JSON.parse(JSON.stringify(commonData.publicModel.curStep));
    },

    //添加信息点
    addInfoPoint: function (confirmObj, index1, event, contentIndex) {
        event.stopPropagation();
        commonData.publicModel.searchResultLength = null;
        $(".aite-bubble").hide();
        $(event.currentTarget).parents(".import-box").find(".textarea-prop").hide();
        // $(event.currentTarget).parents(".import-box").find(".textarea-div .aite-btn").next(".aite-bubble").hide();
        // $(event.currentTarget).parents(".import-box").find(".obj-info-btn .aite-bubble").hide();
        $($(event.currentTarget).next().find(".list-body").children()[0]).show().siblings().hide();
        commonData.contentIndex = contentIndex;
        commonData.infoPoint_obj = JSON.parse(JSON.stringify(confirmObj));
        commonData.confirmResultIndex = index1;
        var jqInfoPointPop = $(event.currentTarget).next();
        commonData.jqInfoPointPop = jqInfoPointPop;
        commonData.belongChoosedObj = true;
        myWorkOrderController.queryInfoPointForObject(confirmObj, jqInfoPointPop);
    },
    //清除信息点搜索关键字
    //  params:
    //      flag: 1为添加对象和信息时，搜索物理世界的信息点，不挂载在对象下面
    clearInfoPointKeyword: function (dom, flag) {
        if (flag == 1) {
            $(dom).parents('.info-search-box').find('input').val('');
        } else {
            commonData.jqInfoPointPop.find('.keyinput').val('');
        }
        $(dom).hide();
    },
    // //信息点关键字输入改变事件
    // changeInfoPointKeyword: function (dom) {
    //     var jqDeleteTag = $(dom).next().children(':first');
    //     if ($(dom).val()) {
    //         jqDeleteTag.show();
    //     } else {
    //         jqDeleteTag.hide();
    //     }
    // },
    //关键字输入改变事件
    changeKeyword: function (dom) {
        var jqDeleteTag = $(dom).next().children(':first');
        debugger;
        if ($(dom).val()) {
            jqDeleteTag.show();
        } else {
            jqDeleteTag.hide();
        }
    },
    //判断是否是已选信息点
    isSelectedInfoPoint: function () {
        var content = publicMethod.confirmResult();
        debugger;
        for (var i = 0; i < commonData.publicModel.curLevelList.length; i++) {
            var item = commonData.publicModel.curLevelList[i];
            var len = content.confirm_result.length;
            for (var j = 0; j < len; j++) {
                var confirm_resultObj = content.confirm_result[j];
                if (item.obj_id == confirm_resultObj.obj_id) {      //属于同一个对象
                    for (var k = 0; k < confirm_resultObj.info_points.length; k++) {
                        var info_point = confirm_resultObj.info_points[k];
                        if (info_point.id == item.info_point.id) {
                            item.checked = true;
                            j = len;
                            break;
                        }
                    }
                }
            }
        }
    },
    //搜索筛选获取对象下信息点
    filterGetInfoPointForObject: function (dom) {
        var keyword = $(dom).parents('.info-search-box').find('input').val();
        myWorkOrderController.queryInfoPointForObject(commonData.infoPoint_obj, null, keyword);
    },
    //将字符串转换成带标记的数组，用于匹配搜索关键字标红显示
    strToMarkedArr: function (str, substr, modifiedArr) {
        var markedArr = [];
        if (!substr) {
            for (var i = 0; i < str.length; i++) {
                var markValue = false;
                if (modifiedArr && modifiedArr[i] && modifiedArr[i].mark) markValue = true;
                markedArr.push({char: str[i], mark: markValue});
            }
            return markedArr;
        }
        var x = 0;
        for (var i = 0; i < str.length; i = x + substr.length) {
            x = str.indexOf(substr, i);
            if (x == -1) {
                for (var j = i; j < str.length; j++) {
                    var markValue = false;
                    if (modifiedArr && modifiedArr[j] && modifiedArr[j].mark) markValue = true;
                    markedArr.push({char: str[j], mark: markValue});
                }
                return markedArr;
            } else {
                for (var j = i; j < x; j++) {
                    var markValue = false;
                    if (modifiedArr && modifiedArr[j] && modifiedArr[j].mark) markValue = true;
                    markedArr.push({char: str[j], mark: markValue});
                }
                for (var j = x; j < x + substr.length; j++) {
                    markedArr.push({char: str[j], mark: true});
                }
            }
        }
        return markedArr;
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
            // $($(commonData.jqPopDataDivs2[3]).find('.customize').children()[0]).find('input').val('');
            $($(commonData.jqPopDataDivs2).find('.customize').children()[0]).pval('');
            $('#controlSel').precover('请选择');
            commonData.publicModel.seltype = null;
            commonData.publicModel.searchResultLength = null;
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
    addContent: function (model, open, event, index0) {
        //清空工作内容 start
        commonData.publicModel.workContent.pre_conform = "";
        commonData.publicModel.workContent.content = "";
        commonData.publicModel.workContent.content_obj = [];
        commonData.publicModel.workContent.notice = "";
        commonData.publicModel.workContent.confirm_result = [];
        commonData.publicModel.workContent.domain = "";
        commonData.publicModel.workContent.domain_name = "";
        $("#add-major").precover("选择专业");
        //清空工作内容 end
        if (open) {
            commonData.publicModel.addContentWindow = true;

            $(".workcontent-alert").show();
            commonData.publicModel.curMatterIndex = index0;
            myWorkOrderController.queryGeneralDictByKey();
            commonData.publicModel.work_c = true;


        } else {        //关闭弹窗      //To Delete
            commonData.publicModel.addContentWindow = false;
            $(".workcontent-alert").hide();
            commonData.publicModel.work_c = false;
        }
        commonData.publicModel.mattersVip = model || {};


    },

    /*事项名称计数*/
    matterNameCounter: function (model, event) {
        $(event.target).next(".counter").find("b").text(model.matter_name.length);
        // desc_aftpart
    },

    //添加对象和信息点
    //选择大类-确认勾选的信息点
    confirmCheckedInfoPoints2: function () {
        if (commonData.publicModel.curObjType == 'search') {        //搜索确认勾选的结果
            var content = publicMethod.confirmResult();
            for (var i = 0; i < commonData.publicModel.curLevelList.length; i++) {
                var item = commonData.publicModel.curLevelList[i];
                //判断是否是已选对象中已选的信息点
                var len = content.confirm_result.length;
                var belongSelectedObj = false;
                for (var j = 0; j < len; j++) {
                    var confirm_resultObj = content.confirm_result[j];
                    if (item.obj_id == confirm_resultObj.obj_id) {      //属于已选的对象
                        belongSelectedObj = true;
                        var belongSelected = false;     //是否属于已选的信息点
                        for (var k = 0; k < confirm_resultObj.info_points.length; k++) {
                            var info_point = confirm_resultObj.info_points[k];
                            if (info_point.id == item.info_point.id) {      //属于已选的信息点
                                if (!item.checked) {        //取消勾选
                                    confirm_resultObj.info_points.splice(k, 1);
                                }
                                belongSelected = true;
                                j = len;
                                break;
                            }
                        }
                        if (!belongSelected && item.checked) {      //不属于已选的信息点，属于该对象，且在搜索结果中勾选上了
                            confirm_resultObj.info_points.push(item.info_point);
                        }
                        break;
                    }
                }
                if (!belongSelectedObj) {        //不属于已选的对象
                    if (item.checked) {
                        var obj = {
                            obj_id: item.obj_id,
                            obj_name: item.obj_name,
                            obj_type: item.obj_type,
                            parents: item.parents,
                            info_points: [item.info_point],
                            customs: []
                        }
                        content.confirm_result.push(obj);
                        len = content.confirm_result.length;
                    }
                }
            }
        } else {
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
        }
        publicMethod.hideCurPop2();
        $(".add-info-btn .aite-bubble").hide();
        commonData.publicModel.searchResultLength = null;
    },

    //确认自定义信息点
    confirmCustomizeInfoPoint: function (event) {
        //TODO: 验证
        // commonData.publicModel.customItem.name = $($(commonData.jqPopDataDivs2[4]).children()[0]).find('input').val();
        commonData.publicModel.customItem.name = $($(event.target).parents(".aite-bubble").find(".customize").find('input')[0]).val();
        commonData.publicModel.customItem.unit = $(event.target).parents(".aite-bubble").find(".customize .unit-div").find('input').val();
        if (commonData.publicModel.customItem.name == "" || commonData.publicModel.customItem.name.length > 40) return;
        if (commonData.publicModel.seltype == 5 && commonData.publicModel.customItem.unit == "") return;
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
        $(event.target).parents(".aite-bubble").hide();
        publicMethod.hideCurPop2();
    },

    //自定义信息点
    customizeInfoPoint: function (event) {
        //commonData.customizeInfoPoint_obj =
        commonData.publicModel.curObjType = 'custom';
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
    dealSearchedObjects: function (data, modelName, value) {
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
        modelName.curLevelList = data;
        modelName.curObjType = 'search';
    },

    //设置当前弹窗
    setCurPop: function (index, popType, addSpecialCharFocusIndex) {
        commonData.checkedObjs = [];
        if (index == 4) {
            commonData.publicModel.curObjType = 'init';
        } else if (index == 0) {
            commonData.publicModel.curObjType = 'search';
        } else if (index == 3) {
            commonData.publicModel.curObjType = 'custom';
            $("#selfText").pval("");
            $(".belong-category").children().each(function () {
                $(this).removeClass("selectDiv");
            })
        }
        var jqTextareaDiv = commonData.editingJqTextwrap.parents(".textarea-div");
        var jqPopDataDivs = jqTextareaDiv.find(".free-aite-pops").children();
        var curJqPopDataDiv;
        jqPopDataDivs.hide();
        var hashtagDiv = jqTextareaDiv.find(".hashtag-bubble");
        if (commonData.publicModel.addContentWindow) {
            if (index != 3 && !commonData.publicModel.noPop) {
                jqTextareaDiv.find(".textarea-prop").show();
            }
            if (popType == 'content' && index == 4 && !commonData.publicModel.noPop) {
                curJqPopDataDiv = $(jqPopDataDivs[index + 5]);
            } else if (popType == 'content' && index == 1 && !commonData.publicModel.noPop) {
                curJqPopDataDiv = $(jqPopDataDivs[index + 5]);
            } else if (popType == 'content' && index == 1 && commonData.publicModel.noPop) {
                curJqPopDataDiv = $(jqPopDataDivs[index]);
            }
            if (popType == 'obj' && index == 3 && !commonData.publicModel.noPop) {
                curJqPopDataDiv = $(jqPopDataDivs[index + 5]);
            }
            if (popType == 'obj' && index == 3 && commonData.publicModel.noPop) {//添加工作内容中的obj自定义弹窗
                curJqPopDataDiv = $(jqPopDataDivs[index]);
            }
            if (popType == 'obj') {//添加工作内容中的obj自定义弹窗
                curJqPopDataDiv.show();
            }
            if (popType == 'content' && index == 4 && commonData.publicModel.noPop) {//添加工作内容中obj点击弹窗
                curJqPopDataDiv = $(jqPopDataDivs[index]);
            }
            if (popType == 'content') {     //@对象弹框
                $(".hashtag-bubble").hide();
                curJqPopDataDiv.show();
                if (commonData.publicModel.work_c) {
                    $(jqTextareaDiv.find('.aite-bubble')[1]).show();
                } else {
                    jqTextareaDiv.find('.aite-bubble').show();
                }
                $(jqPopDataDivs[index]).show();
                if (popType == 'content') {     //?
                    publicMethod.locationPop(commonData.publicModel.workContent, commonData.types[3], addSpecialCharFocusIndex);
                } else {
                    publicMethod.locationPop(commonData.curMatterContent, commonData.types[0], addSpecialCharFocusIndex);
                }
            }
        } else {        //工单事项弹框
            var type1 = popType == commonData.types[1] ? popType : commonData.types[0];
            publicMethod.updateObjs(index, '', popType, type1);
            jqTextareaDiv.find(".textarea-prop").show();
            curJqPopDataDiv = $(jqPopDataDivs[index]);

            if (popType == 'obj') {     //@对象弹框
                $(".hashtag-bubble").hide();
                jqTextareaDiv.find('.aite-bubble').show();
                curJqPopDataDiv.show();
                commonData.curJqPop = curJqPopDataDiv;
            } else {        //#SOP弹框
                jqTextareaDiv.find('.aite-bubble').hide();
                hashtagDiv.show();
            }
            publicMethod.locationPop(commonData.curMatterContent, commonData.types[0], addSpecialCharFocusIndex);
        }
    },


    //自定义对象
    customizeObj: function (event) {
        commonData.publicModel.inputToCustomize = false;
        publicMethod.setCurPop(3, 'obj');
    },

    //设置当前弹窗位置
    locationPop: function (model, type, addSpecialCharFocusIndex) {
        var textwrap = commonData.editingJqTextwrap;
        var textpdiv = commonData.editingJqTextwrap.parents(".textarea-div")
        var textdiv = $(textwrap).siblings(".textareadiv");
        var textareapop = $(textwrap).siblings(".textarea-prop");

        //var value = model[commonData.textAttrName] ? model[commonData.textAttrName] : commonData.publicModel.workContent.content;     //取值方法统一如下

        var contentData = publicMethod.getContentData(type);
        var attrName1 = contentData.attrName1;
        if (model && model.content) {
            var value = model[attrName1];

        } else {
            var value = contentData.content[attrName1];
        }
        if (commonData.publicModel.noPop) return;
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
            var totalwidth = $(textpdiv).width();
            var remainl = totalwidth - pos.left + divpos.left;
            if (remainl <= 400) {
                left = totalwidth - 400;
            }
            $(textareapop).css({position: "absolute", "z-index": 50, left: left + 'px', top: top + 'px'}).show();
        }
    },

    //隐藏当前弹框
    hideCurPop: function () {
        commonData.editingJqTextwrap.parents(".textarea-div").find(".textarea-prop").hide();
        commonData.curJqPop = null;
    },

    //确认选择的事项对象
    confirmCheckedMatterObjs: function () {
        var work_c = $(event.currentTarget).parents(".import-box")[0]
        if (work_c) {
            publicMethod.confirmCheckedObjs(commonData.types[3]);
        } else {
            publicMethod.confirmCheckedObjs(commonData.types[0]);
        }
        commonData.publicModel.noPop = false;
        commonData.publicModel.blurClose = true;
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
            if (type == "content") {
                var len = commonData.publicModel.workContent.content.length;
                var len2 = addedText.length;
                var totalen = len + len2
                if (totalen <= 200) {
                    commonData.publicModel.workContent.content = commonData.publicModel.workContent.content.substring(0, len - 1) + addedText;
                    commonData.publicModel.workContent.content_objs = content[attrName2];

                }

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
    //  params:
    //      type: 对应commonData.types中的值
    //      type1 = type == commonData.types[1] ? type : commonData.types[0]; 'obj'或'sop'
    updateObjs: function (index, keyword, type, type1, obj) {
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

        if (obj) {      //没有弹框，直接输入空格匹配到的是物理世界中的对象
            for (var i = 0; i < content_objs.length; i++) {
                if (content_objs[i].obj_name == obj.obj_name) {
                    content_objs[i] = JSON.parse(JSON.stringify(obj));
                    break;
                }
            }
            $(".aite-bubble").hide();
        }
        publicMethod.markInitialSelectedObjs(type, type1);
    },

    //确认自定义对象
    confirmCustomizeObj: function () {
        //TODO: 验证
        var value;
        if (commonData.publicModel.addContentWindow) {
            if (!commonData.publicModel.noPop) {
                value = $($(commonData.editingJqTextwrap.parents(".slide-div").find(".customText")[1]).find('input')).val();
            } else {
                value = $($(commonData.editingJqTextwrap.parents(".slide-div").find(".customText")[0]).find('input')).val();
            }
        } else {
            if (commonData.publicModel.inputToCustomize) {
                value = commonData.text1.slice(commonData.text1.lastIndexOf('@') + 1) + commonData.text2.slice(0, commonData.text2.indexOf(' '));
            } else {
                value = commonData.curJqPop.find('input').val();
            }
        }
        if (value != "" && value.length <= 40) {
            var obj = {
                obj_type: commonData.publicModel.selectedObjType,
                obj_name: value
            }
            myWorkOrderController.addTempObjectWithType(obj, true, null, null, commonData.types[0]);
        }

    },

    //成功添加自定义对象后的处理
    //@params: isConfirmCustomizeObj是否为点击确定按钮，确认自定义对象，其它可能的情况：删除已有对象某些字符时自定义、@后输入字符空格结束自定义
    addedTempObjectWithType: function (obj, isConfirmCustomizeObj, isShowPop, type) {
        if (isConfirmCustomizeObj) {
            //设置数据content.content_objs
            //var content = commonData.curStep.step_content[commonData.contentIndex];

            var contentData = publicMethod.getContentData(type);
            var attrName1 = contentData.attrName1;
            var attrName2 = contentData.attrName2;
            var content = contentData.content;
            var content_objs = contentData.content_objs;
            var objType = obj.obj_type;
            var type = objType == '2' ? 'component' : objType == '3' ? 'tool' : 'other';

            //自定义对象时，数据已经更新至content.content_objs，此处用于其它地方的容错处理
            var addObj = true;
            if (content_objs) {
                for (var i = 0; i < content_objs.length; i++) {
                    if (content_objs[i].obj_name == obj.obj_name && !content_objs[i].obj_id) {
                        content_objs[i].obj_type = type;
                        addObj = false;
                        break;
                    }
                }
            }
            if (addObj) {
                content_objs/* = commonData.otherSelectedObjs*/.push({      //To Confirm With Backstage
                    obj_type: type,
                    obj_name: obj.obj_name
                });
            }

            //设置数据content.content
            var spaceOrNoSpaceChar = commonData.text2.length && commonData.text2[0] == ' ' ? '' : ' ';
            //content[attrName1] = commonData.text1.slice(0, commonData.text1.lastIndexOf('@')) + '@' + obj.obj_name + spaceOrNoSpaceChar + commonData.text2;
            content[attrName1] = commonData.text1.slice(0, commonData.text1.lastIndexOf('@')) + '@' + obj.obj_name + spaceOrNoSpaceChar + commonData.text2.slice(commonData.text2.indexOf(' '));
            if (commonData.publicModel.addContentWindow) {
                if (!commonData.publicModel.noPop) {
                    var len1 = commonData.publicModel.workContent.content.length;
                    var len2 = obj.obj_name.length;
                    var totalen = len1 + len2;
                    if (totalen <= 200) {
                        commonData.publicModel.workContent.content += obj.obj_name;
                        commonData.publicModel.workContent.content_objs = content_objs;

                    }
                } else {
                    var len3 = commonData.publicModel.workContent.content.length;
                    var len4 = content.content.length;
                    var totalen2 = len3 + len4;
                    if (totalen2 <= 200) {
                        commonData.publicModel.workContent.content += content.content;
                        commonData.publicModel.workContent.content_objs = content_objs;

                    }
                }
            }
        }
        publicMethod.hideCurPop();
    },

    //获取文本框相关数据
    getContentData: function (type) {
        var types = commonData.types;
        var attrName1 = type == types[0] || type == types[1] || type == types[2] ? commonData.textAttrName : 'content';
        var attrName2 = type == types[0] ? 'desc_objs' : type == types[1] ? 'desc_sops' : type == types[2] ? 'desc_works' : 'content_objs';
        var content = publicMethod.getCurDataObj(type);
        if (!content[attrName2]) content[attrName2] = [];
        var content_objs = content[attrName2];
        return {content: content, content_objs: content_objs, attrName1: attrName1, attrName2: attrName2};
    },

    //获取当前文本框中操作的数据对象
    getCurDataObj: function (type) {
        if (type == commonData.types[0] || type == commonData.types[1] || type == commonData.types[2]) {
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
        if (type == commonData.types[0]) {
            var onlyCustomizedObjs = true;
            for (var i = 0; i < content_objs.length; i++) {
                if (content_objs[i].obj_id) {
                    onlyCustomizedObjs = false;
                    break;
                }
            }
            content.onlyCustomizedObjs = onlyCustomizedObjs;
        }
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
    toQuerySopListForSel: function (isInit, searchedText, notReturnCriteria) {
        //if (isInit) $('#delaySearch input').val('');      //To Modify
        var obj = {
            need_return_criteria: !notReturnCriteria
        };
        if (searchedText) obj.sop_name = searchedText;
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
        commonData.publicModel.work_c = false;
        var contentData = publicMethod.getContentData(commonData.types[2]);
        var attrName1 = contentData.attrName1;
        var attrName2 = contentData.attrName2;
        var content = contentData.content;
        var content_objs = contentData.content_objs;
        var desc_work = commonData.publicModel.workContent || {};
        // content[attrName1] = content[attrName1] + (desc_work.work_name || '') + ' ';
        if (desc_work.work_name != "") {
            content[attrName1] = (content[attrName1] || '') + (desc_work.work_name || '') + ' ';
        } else {
            content[attrName1] = content[attrName1] + (desc_work.work_name || '') + ' ';
        }
        content["desc_works"].push(desc_work);
        commonData.publicModel.allMatters = JSON.parse(JSON.stringify(commonData.publicModel.allMatters));
    },

    //处理事项参数
    dealMattersParam: function () {
        //判断工作内容名称是否被删除
        for (var i = 0; i < commonData.publicModel.allMatters.length; i++) {
            var matter = commonData.publicModel.allMatters[i];
            var text = matter[commonData.textAttrName];
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
        commonData.publicModel.workOrderDraft.ask_start_time = commonData.publicModel.workOrderDraft.ask_start_time ? commonData.publicModel.workOrderDraft.ask_start_time.replace(/[^0-9]/g, '') + '00' : '';
        commonData.publicModel.workOrderDraft.ask_end_time = commonData.publicModel.workOrderDraft.ask_end_time ? commonData.publicModel.workOrderDraft.ask_end_time.replace(/[^0-9]/g, '') + '00' : '';
        commonData.publicModel.workOrderDraft.input_mode = commonData.publicModel.regular ? '2' : '1';
        commonData.publicModel.workOrderDraft.matters = JSON.parse(JSON.stringify(commonData.publicModel.allMatters));
    },

    //保存工单草稿
    toSaveWorkOrderDraft: function () {
        publicMethod.getLeftDataAgain();
        publicMethod.dealWorkOrderParam();
        myWorkOrderController.saveDraftWorkOrder(commonData.publicModel.workOrderDraft);
    },

    //预览工单草稿
    toPreviewWorkOrder: function () {
        publicMethod.getLeftDataAgain();
        publicMethod.dealWorkOrderParam();
        myWorkOrderController.previewWorkOrder(commonData.publicModel.workOrderDraft);
    },
    //已发布的工单
    publishedWorkOrder: function (model, index) {
        commonData.publicModel.workListSave = commonData.publicModel.workList;
        myWorkOrderController.queryWorkOrderById(model.order_id)
        commonData.publicModel.workList = commonData.publicModel.workListSave;

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
            "required_control": [],
            "onlyCustomizedObjs": true
        };
        commonData.publicModel.allMatters.push(emptyMatter);
    },
    //切换按钮输入模式

    //切换输入模式
    toggleInputMode: function () {
        commonData.publicModel.regular = !commonData.publicModel.regular;
        publicMethod.dealMattersParam();
        var allMatters = commonData.publicModel.allMatters;
        if (commonData.publicModel.regular) {     //结构化
            for (var i = 0; i < allMatters.length; i++) {
                var matter = allMatters[i];
                var desc_aftpart = matter[commonData.textAttrName];
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

    //设置管控需求
    setControlRequire: function (model, event) {
        var id = $(event.target).parent().attr('id');
        commonData.curMatterIndex = parseInt(id.slice(0, id.indexOf('separator')));
        var controlRequireIndex = parseInt(id.slice(id.indexOf('separator') + 'separator'.length));
        var checked = arguments[1].pEventAttr.state;
        var matter = commonData.publicModel.allMatters[commonData.curMatterIndex];
        if (checked) {
            if (!matter.required_control) matter.required_control = [];
            matter.required_control.push(model.code);
        } else {
            for (var i = 0; i < matter.required_control.length; i++) {
                if (matter.required_control[i] == model.code) {
                    matter.required_control.splice(i, 1);
                    break;
                }
            }
        }
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
        var content = commonData.publicModel.workContent;
        content.confirm_result.splice(index, 1);
        // commonData.publicModel.allSteps[commonData.publicModel.curStepIndex].step_content[commonData.contentIndex].confirm_result.splice(index, 1);
    },
    //自定义信息点 弹框-删除选项
    deleteOption: function (model, index, event, contentIndex) {
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        if (commonData.publicModel.customItem.items.length > 1) {
            commonData.publicModel.customItem.items.splice(index, 1);
        } else {
            commonData.publicModel.customItem.items = [{name: ''}];
        }
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
        var content = commonData.publicModel.workContent;
        content.confirm_result[objIndex].info_points.splice(infoPointIndex, 1);
        // commonData.publicModel.allSteps[commonData.publicModel.curStepIndex].step_content[commonData.contentIndex].confirm_result[objIndex].info_points.splice(infoPointIndex, 1);
    },
    //删除自定义的信息点
    deleteCustomizedInfoPoint: function (custom, customIndex, objIndex, contentIndex) {
        commonData.contentIndex = contentIndex;
        var content = commonData.publicModel.workContent;
        content.confirm_result[objIndex].customs.splice(customIndex, 1);
    },
    //点击编辑时，设置页面
    setEditDraft: function () {
        console.log("设置之前的")
        console.log(commonData.publicModel.workOrderDraft)
        debugger;
        commonData.publicModel.regular = commonData.publicModel.workOrderDraft.input_mode == 0 ? false : commonData.publicModel.workOrderDraft.input_mode == 1 ? false : true;
        $("#work-typec").psel(commonData.publicModel.workOrderDraft.order_type_name, true);
        $("#work-urgency").psel(commonData.publicModel.workOrderDraft.urgency, false)
        if (commonData.publicModel.workOrderDraft.ask_end_limit == "--") {
            commonData.publicModel.fixedRadio = false;
            $("#fixed-radio").psel(false, true)
            $("#ask-radio").psel(true, true)
            $("#ask_end_limit").val("");
            var endTime = commonData.publicModel.workOrderDraft.ask_end_time;
            $("#ask_end_time").psel(publicMethod.cutTime(endTime), true)
        } else {
            commonData.publicModel.fixedRadio = true;
            $("#fixed-radio").psel(true, true)
            $("#ask-radio").psel(false, true)
            $("#ask_end_limit").val(commonData.publicModel.workOrderDraft.ask_end_limit)
        }
        if (commonData.publicModel.workOrderDraft.start_time_type == 1) {
            $("#time-combobox").psel(0, true);
        } else {
            $("#time-combobox").psel(1, true);
            var startTime = commonData.publicModel.workOrderDraft.ask_start_time;
            $("#ask_start_time").psel(publicMethod.cutTime(startTime), false)
        }
        commonData.publicModel.LorC = false;
    },
    //分割时间
    cutTime: function (time) {
        //{y:2017,M:1,d:1,h:0,m:0}
        var timeObj = {};
        timeObj.y = time.substring(0, 4);
        timeObj.M = time.substring(4, 6);
        timeObj.d = time.substring(6, 8);
        timeObj.h = time.substring(8, 10);
        timeObj.m = time.substring(10, 12);
        return timeObj;
    },
    //格式化时间
    formatTime: function (stringTime) {
        if (stringTime) {
            var arr = stringTime.split("");
            arr.length = arr.length - 2;
            for (var i = 0; i < arr.length; i++) {
                if (i == 4 || i == 7) {
                    arr.splice(i, 0, ".");
                } else if (i == 10) {
                    arr.splice(i, 0, " ");
                } else if (i == 13) {
                    arr.splice(i, 0, ":");
                }

            }
            var newtime = arr.join("");
            return newtime;
        }
    },
    //统一在获取一遍左侧数据
    getLeftDataAgain: function () {
        commonData.publicModel.workOrderDraft["order_type_name"] = $("#work-typec").psel().text;
        if (commonData.publicModel.workTypeC[$("#work-typec").psel().index]){
            commonData.publicModel.workOrderDraft["order_type"] = commonData.publicModel.workTypeC[$("#work-typec").psel().index].code;
        }
        commonData.publicModel.workOrderDraft["urgency"] = $("#work-urgency").psel().text;
        var index = parseInt($("#time-combobox").psel().index);
        commonData.publicModel.workOrderDraft["start_time_type"] = index + 1;
        if (index == 0) {
            commonData.publicModel.workOrderDraft["ask_start_time"] = "";
        } else {
            commonData.publicModel.workOrderDraft["ask_start_time"] = $("#ask_start_time").psel().startTime;
        }
        var fixed = $("#fixed-radio").psel();
        if (fixed) {
            commonData.publicModel.workOrderDraft["ask_end_limit"] = $("#ask_end_limit").val();
            commonData.publicModel.workOrderDraft["ask_end_time"] = "";
        } else {
            commonData.publicModel.workOrderDraft["ask_end_time"] = $("#ask_end_time").psel().startTime;
            commonData.publicModel.workOrderDraft["ask_end_limit"] = "";
        }

    },
    //添加信息点--自定义信息点
    customizeInfoPoint2: function (event) {
        commonData.publicModel.selSeriesType = commonData.publicModel.curObjType;//记录自定义之前的curObjType
        commonData.publicModel.curObjType = 'custom';
        commonData.publicModel.curObjType2 = 'custom'
        $(event.target).parents('.aite-bubble').find(".customize").show().siblings().hide();
        $(event.target).parents('.aite-bubble').find(".customize").find("#errorText").pval("");
        $(event.target).parents('.aite-bubble').find(".customize").find("#timely-checkbox").precover('请选择');
        // $(event.target).parents('.addInfoPoint').next().show();

    },

}

var commonData = {
    stop_order_content: '',//中止内容
    publicModel: {},        //我的工单、计划监控的model
    types: ['obj', 'sop', 'workContentName', 'content'],       //事项@对象、事项#SOP、添加工作内容@对象、事项添加工作内容名称
    copyOrQuote: null,      //1复制，2引用
    curMatterIndex: 0,      //当前事项索引

    deletedChar: '',        //文本框被删除的字符

    user_id: '',
    project_id: '',

    textAttrName: '',       //文本属性名称

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
    curJqPop: null,         //当前弹框jquery对象

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
        $("#delete-matter-confirm").phide();
    },
    scrollLoad: function () {
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
        commonData.publicModel.allMatters = [{}]
        $("#work-typec").precover("请选择");
        $("#work-urgency").psel(0);
        $("#time-combobox").psel(0, true);
        $("#fixed-radio").psel(true, true);
        $("#ask-radio").psel(false, true);
        $("#ask_end_limit").val("");
        $(".matter-name").val("");
        $(".freedom-textarea").val("");
        yn_method.getDateTime();
        var date = new Date();
        var y = date.getFullYear(), mo = date.getMonth() + 1, da = date.getDate(), h = date.getHours(), m = date.getMinutes();
        $("#ask_start_time").psel({y: y, M: mo, d: da, h: h, m: m});
        $("#ask_end_time").psel({y: y, M: mo, d: da, h: h + 2, m: m});
        myWorkOrderController.queryUserWoInputMode();//用户输入方式

    },
    /*回到列表页*/
    listShow: function () {
        commonData.publicModel.LorC = true;
        // $("#work-already").psel().text;
        // $("#work-type").psel().text;
        myWorkOrderController.selAlreadyEvent()
    },
    getDateTime: function () {
        commonData.publicModel.starYear = parseInt(new Date().getFullYear());
        commonData.publicModel.endYear = commonData.publicModel.starYear + 3;
    },
    radioChange: function (event) {
        event.stopPropagation();
        commonData.publicModel.fixedRadio = $("#fixed-radio").psel();
        var starttime = $("#ask_start_time").psel().startTime;
        var hours = parseInt(starttime.substr(-5, 2));
        $("#ask_end_time").psel({h: hours + 2}, false);
        // if (commonData.publicModel.fixedRadio) {
        //     commonData.publicModel.workOrderDraft["ask_end_limit"] = $("#ask_end_limit").val();
        //     commonData.publicModel.workOrderDraft["ask_end_time"] = "";
        // } else {
        //     commonData.publicModel.workOrderDraft["ask_end_limit"] = "";
        //     commonData.publicModel.workOrderDraft["ask_end_time"] = $("#ask_end_time").psel().startTime;
        // }


    },
    starTimeTypeSel: function (obj, event) {
        event.stopPropagation();
        if (obj.id == "1") {
            commonData.publicModel.timeTypeSel = true;
            // commonData.publicModel.workOrderDraft["ask_start_time"] = "";

        } else {
            commonData.publicModel.timeTypeSel = false;
            // commonData.publicModel.workOrderDraft["ask_start_time"] = $("#ask_start_time").psel().startTime;
        }
        // commonData.publicModel.workOrderDraft["start_time_type"] = obj.id;

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
            // $(".regular-obj-text").find("textarea").val(objs);commonData.textAttrName
            // $(".regular-sop-text").find("textarea").val(sops);
            commonData.publicModel.singleMatters.desc_forepart = objs;
            commonData.publicModel.singleMatters.desc_aftpart = sops;
        } else {
            var reObjs = $(".regular-obj-text").find("textarea").val();
            var reSops = $(".regular-sop-text").find("textarea").val();
            commonData.publicModel[commonData.textAttrName] = reObjs + reSops;
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
            "title": "确定要清空此条内容吗？",
            "subtitle": "被清空的内容将不可恢复",
            "position": "absolute",
            "top": "40px",
            "left": "-310px",
            "z-index": "50"
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
        var maxnum = parseInt($(dom).attr("maxlenth"));
        var num = $(dom).val().length;
        if (num > maxnum) {
            $(dom).css("border", "1px solid red");
            $(dom).next().css("color", "#ef6767");
        } else {
            $(dom).css("border", "none");
            $(dom).next().css("color", "#cacaca");
        }
        $(dom).next().find(".counterNum").text(num)
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
                                commonData.publicModel[commonData.textAttrName] += sop;
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
                            commonData.publicModel[commonData.textAttrName] += sop;
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
     commonData.publicModel[commonData.textAttrName] += sop;
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
            commonData.publicModel[commonData.textAttrName] += sop;
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
                    need_back_parents: true,
                }
                obj[id] = content.obj_id;
                // commonData.publicModel.isCustomizeBtnAble=true;
                myWorkOrderController.queryEquip(obj);

            }
        }

    },
    defaultPage: function (dom) {
        $(dom).parents(".aite-bubble").find(".none-both").show().siblings().hide();
        // commonData.publicModel.isCustomizeBtnAble=false;
        // commonData.publicModel.curObjType2='init';
    },
    defaultPage2: function (dom) {
        $(dom).parents(".aite-bubble").find(".only-checkbox").show().siblings().hide();
        commonData.publicModel.curObjType = commonData.publicModel.selSeriesType;
        commonData.publicModel.curObjType2 = 'infoPoint';
    },
    closeBubble: function () {

        $(document).click(function () {
            $(".textarea-prop").hide();
            $(".add-obj .aite-bubble").hide();
            $(".obj-fragment-div .aite-bubble").hide();
            $(".obj-info-btn .aite-bubble").hide();
            // $(".add-info-btn .aite-bubble").hide();

            $(".add-sop .hashtag-bubble").hide();
            commonData.publicModel.clickAiteShow = false;
            commonData.publicModel.clickHashShow = false;
            commonData.publicModel.noPop = false;
            commonData.publicModel.blurClose = true;
            // commonData.publicModel.textareaOperate=false;
            if (!commonData.publicModel.textareaOperate && $("#content-textarea").val().length == 0) {
                $("#content-textarea").parents(".prev-body").slideUp();
                commonData.publicModel.editBtn = true;
            }


        });

    },
    btnAble: function (index, obj, $event) {
        if (event.pEventAttr.state) {
            $("#able-btn").pdisable(false);
        } else {
            var checks = $(event.target).parents(".last-level-box").find(".aite-list>div:last-of-type").children();
            $(checks).some(function (i, dom, arr) {
                // var check = $("#"+dom.id).psel();
                $("#" + dom.id).psel();
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
        commonData.publicModel.searchResultLength = null;
        // event.stopPropagation();
        // $(".addInfoPoint").hide();
        $(dom).parents(".import-box").find(".textarea-prop").hide();
        $(dom).parents(".import-box").find(".textarea-div .aite-btn").next(".aite-bubble").hide();
        $(dom).parents(".import-box").find(".add-info-btn .aite-bubble").hide();
        $(dom).next().find(".keyinput").val("");
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
        if ($("#time-combobox").psel().index == 1) {

            var ask_start_time = $("#ask_start_time").psel();
            var ask_end_time = $("#ask_end_time").psel();
            var end_timestamp = yn_method.transferTime(ask_end_time.startTime);
            var start_timestamp = yn_method.transferTime(ask_start_time.startTime);
            if (start_timestamp > end_timestamp) {
                $("#ask_end_time").find(".per-combobox-title").css({
                    "border": "1px solid #ed6767"
                });
                $(".time-error-tips").show();
            } else if (start_timestamp < end_timestamp) {
                $("#ask_end_time").find(".per-combobox-title").css({
                    "border": "1px solid #cacaca"
                });
                $(".time-error-tips").hide();
                // commonData.publicModel.workOrderDraft["ask_end_time"] = ask_end_time.startTime;
                // commonData.publicModel.workOrderDraft["ask_end_limit"] = "";

            }

        }


    },
    /*删除事项*/
    deleteMatter: function (dom) {
        $(dom).parents(".matter-all").remove();
    },

    confirmAddWorkContent: function () {
        // if (!commonData.publicModel.mattersVip.desc_works) {
        //     commonData.publicModel.mattersVip["desc_works"] = [];
        // }
        // commonData.publicModel.mattersVip["desc_works"].push(commonData.publicModel.workContent);
        // commonData.publicModel.workContent["desc_works"].push(commonData.publicModel.workContent);
        // commonData.publicModel.singleMatters["desc_works"] = commonData.publicModel.mattersVip["desc_works"];
        // debugger;
        $(".obj-div").each(function (index1, value1) {
            $(this).find(".self-div").each(function (index2, value2) {
                commonData.publicModel.workContent.confirm_result[index1].customs[index2].items = [];
                $(this).find(".info-self-input").each(function (index3, value3) {
                    var item = $(this).val();
                    commonData.publicModel.workContent.confirm_result[index1].customs[index2].items.push(item);
                })
            })
        })
        commonData.publicModel.addContentWindow = false;
        $(".workcontent-alert").hide();
        commonData.publicModel.work_c = false;
        commonData.textAttrName = commonData.publicModel.regular ? 'desc_aftpart' : 'description';
        publicMethod.addWorkContentName();
        // publicMethod.addWorkContentName();

        // console.log(publicMethod.addWorkContentName());
        //commonData.publicModel.allMatters[commonData.publicModel.curMatterIndex].desc_works.push(commonData.publicModel.workContent)


        // console.log(commonData.publicModel.workContent)
        // console.log(commonData.publicModel.mattersVip)
        //console.log(commonData.publicModel.allMatters[commonData.publicModel.curMatterIndex])

    },
    contentAiteShow: function (dom, event) {
        event.stopPropagation();
        $(dom).children(".aite-bubble").show();
        commonData.publicModel.blurClose = false;
        commonData.publicModel.noPop = true;
        publicMethod.setCurPop(4, 'content');
        var num = $(dom).prev().val().length;
        if (num == 0) {
            $(dom).parents(".prev-body").slideUp();
        }
    },
    /*工单类型存储*/
    workTypeFn: function (content) {
        // commonData.publicModel.workOrderDraft["order_type_name"] = content.name;
        // commonData.publicModel.workOrderDraft["order_type"] = content.code;
    },
    /*紧急程度存储*/
    urgencyFn: function (content) {
        // commonData.publicModel.workOrderDraft["urgency"] = content.name;

    },
    /*开始时间选择*/
    startTimeSave: function () {
        var ask_start_time = $("#ask_start_time").psel().startTime;
        var hours = parseInt(ask_start_time.substr(-5, 2));
        $("#ask_end_time").psel({h: hours + 2}, true);
        // commonData.publicModel.workOrderDraft["ask_start_time"] = ask_start_time;

    },
    //选择对象所属类别
    selObjType: function (obj_type) {
        commonData.publicModel.selectedObjType = obj_type;
    },
    //时间限制的存储
    askLimit: function (event) {
        // commonData.publicModel.workOrderDraft["ask_end_limit"] = event.target.value
    },
    scrollLoadMonitor: function () {
        debugger;
        if ($("#time-type").psel()) {
            var time = workOrderMngModel.timeType[$("#time-type").psel().index].code;
        }
        if ($("#work-type").psel()) {
            var orderType = workOrderMngModel.workType[$("#work-type").psel().index].code;
        }
        if ($("#work-state").psel()) {
            var orderState = workOrderMngModel.workState[$("#work-state").psel().index].code;
        }
        if ($("#create-person").psel()) {
            var creatorId = workOrderMngModel.createPerson[$("#create-person").psel().index].person_id;
        }
        time = time == "all" ? "" : time;
        orderType = orderType == "all" ? "" : orderType;
        orderState = orderState == "all" ? "" : orderState;
        creatorId = creatorId == "all" ? "" : creatorId;
        var nScrollHight = 0; //滚动距离总长
        var nScrollTop = 0;   //滚动到的当前位置
        var nDivHight = $(".monitor-table-body").height();
        $(".monitor-table-body").scroll(function () {
            nScrollHight = $(this)[0].scrollHeight;
            nScrollTop = $(this)[0].scrollTop;
            if (nScrollTop + nDivHight >= nScrollHight) {
                // alert("到底部了")
                workOrderMngModel.pageNum += 1;
                var conditionSelObj = {
                    time_type: time,                       //时间类型，temp-临时，plan计划
                    order_type: orderType,                      //工单类型编码
                    order_state: orderState,                     //工单状态编码
                    creator_id: creatorId,                      //创建人id
                    page: workOrderMngModel.pageNum,                       //当前页号，必须
                    page_size: 50                        //每页返回数量，必须
                };
                controller.queryAllWorkOrder(conditionSelObj);//查询所有工单

            }

        });
    },
    //发布列表页闪现
    flashNone: function () {
        $(".flash").removeClass("flash-pub")
    }
}
