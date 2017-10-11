var myWorkOrderModel = {//工单管理模块数据模型
    //------------------------------------------zy__start------------------------------------------
    curObjType: "",
    allMatters: [
        {
            "matter_name":"未命名事项-1",
            "description":"",
            "desc_forepart":"",
            "desc_aftpart":"",
            "desc_photos": [],
            "desc_objs": [],
            "desc_sops": [],
            "desc_works": []
        }
    ],       //所有的事项
    curMatterIndex: 0,      //当前操作的事项索引
    curMatterPopType: 4,       //当前事项弹框类型，0-4为选择或搜索对象弹框，0搜索，1选择大类结果无级别，2选择大类结果有左侧级别，3自定义，4选择大类
    curContent: {},     //当前工作内容
    //------------------------------------------zy__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue绑定的数据data
    user_id: '', //用户id
    project_id: '', //项目id
    LorC: true,//列表页或者新建页
    workAlready: [
        {
            id: "0",
            name: "草稿箱"
        }, {
            id: "1",
            name: "我发布的工单"
        }, {
            id: "2",
            name: "我参与的工单"
        },
    ],
    workAlreadyID: "",
    workTypeL: [],//工单类型,列表页
    workTypeC: [],//工单类型，创建页
    del_plan_id: "",//方案计划id
    pageNum: 1,
    temList: [],//存储工单
    workList: [],//工单
    urgency: [//工单紧急程度
        {
            id: "0",
            name: "低"
        }, {
            id: "1",
            name: "中"
        }, {
            id: "2",
            name: "高"
        }
    ],
    fixedRadio: true,//要求固定时间完成
    starTimeType: [//要求开始时间执行类型
        {
            id: "1",
            name: "发单后立即开始"
        }, {
            id: "2",
            name: "自定义开始时间"
        }
    ],
    timeTypeSel: true,//要求开始时间类型选中
    starYear: null,
    endYear: null,
    regular: true,//结构化输入
    editBtn: true,//编辑或清空
    /* domainList:[
     {
     id:1,
     name:"强电"
     },{
     id:1,
     name:"弱电"
     },{
     id:1,
     name:"机电"
     },
     ],//专业*/
    controlsList: [
        {name: "普通文本", type: "1"},
        {name: "单选", type: "2"},
        {name: "多选", type: "3"},
        {name: "无单位的数字", type: "4"},
        {name: "有单位的数字", type: "5"}
    ],
    focusContent: false,
    contentItemAttrNames: ['pre_conform', 'content', 'notice', 'confirm_result', 'domain'],
    emptyContent: {     //空的工作内容
        editContent: true,
        "from_sop": false,
        "pre_conform": "",
        "content": "",
        "content_objs": [],
        "notice": "",
        "confirm_result": [],
        "domain": ""
    },
    description: "",
    preContent: "",
    domainList: [],//设备实例下专业需求
    systemList: [],//系统专业下所有系统
    /* systemList:[
     {
     id:1,
     name:"空调系统"
     }
     ],*/
    treeList: [
        {
            name: "建筑名称1",
            id: "1",
            child: [
                {
                    name: "1层",
                    id: "1-1",
                    child: []
                }, {
                    name: "2层",
                    id: "1-2",
                    child: [
                        {
                            name: "空间名称1",
                            id: "1-2-1",
                            child: []
                        }, {
                            name: "空间名称2",
                            id: "1-2-2",
                            child: []
                        }
                    ]
                },
            ]
        },
        {
            name: "建筑名称2",
            id: "2",
            child: [
                {
                    name: "1层",
                    id: "1-1",
                    child: []
                }, {
                    name: "2层",
                    id: "1-2",
                    child: [
                        {
                            name: "空间名称1",
                            id: "1-2-1",
                            child: []
                        }, {
                            name: "空间名称2",
                            id: "1-2-2",
                            child: []
                        }
                    ]
                },
            ]
        },
    ],
    ask_end_limit: "",//要求固定时间完成
    aite: true,
    //curObjType: "",
    buildList: [],//建筑体
    leftLevel: [],//楼层通用设备
    sopList: [],//sop列表
    sopCriteria: {},//筛选条件
    addContentWindow: false,//添加工作内容
    detailSopShow: false,//sop详细内容展现
    detailSopData: {},//sop详细内容
    curLevelList: [],       //当前有级别列表
    lastLevel: [],
    clickAiteShow: false,
    clickHashShow: false,
    workOrderDraft: {},//工单草稿内容
    matters: [],//步骤信息,事项
    singleMatters: {},//单步事项
    desc_works: [],//工作中设计的工作内容
    workContent: {},//工作内容
    infoArray: [],//信息点list
    seltype: null,
    desc_forepart: "",


    popTitleText2: {
        init: '分类',
        search: '请选择',
        custom: '自定义',

        infoPoint: '信息点'
    },
    matterSignalid:"",//事项标识
    mattersVip:null,//打开的事项
    //------------------------------------------yn__end------------------------------------------
}
myWorkOrderModel.singleMatters = {
    matter_name: "",          //事项名称
    description: "",         //事项描述
    desc_forepart: "",       //描述内容前段,结构化时用
    desc_aftpart: "",        //描述内容后段,结构化时用
    desc_photos: [],         //描述中的图片
    desc_sops:[],            //描述中涉及的sop
    desc_works:[],            //描述中涉及的工作内容
};
myWorkOrderModel.workContent = {
    work_id: "",        //工作内容id
    work_name: "未命名工作内容1",      //工作内容名称
    pre_conform: "",  //强制确认
    content: "",        //操作内容
    //操作内容中涉及的对象
    content_objs: [],
    notice: "",        //注意事项
    confirm_result: [	//需确认的操作结果
        {
            obj_id: "dkkd",
            obj_name: "对象1",
            obj_type: "",
            parents: [
                {parent_ids: ["d", "s", "a"], parent_names: ["建筑1", "楼层1", "空间"]},
                 {parent_ids: ["c", "v"], parent_names: ["专业1", "系统1"]},
                 {parent_ids: ["g", "ad", "sf"], parent_names: ["专业1", "系统大类", "设备大类"]}
            ],
            info_points: [
                {"id": "1", "code": "1", "name": "到底"},
                 {"id": "2", "code": "2", "name": "地方"}
            ],
            customs: [//自定义项，type：1-文本，2-单选，3-多选,4、无单位的数字,5、有单位的数字
                 {"name": "确认信息2", "type": "1"},
                 {"name": "确认信息2", "type": "2", "items": ["选项1", "选项2", "选项3"]},
                 {"name": "确认信息3", "type": "3", "items": ["选项1", "选项2", "选项3"]},
                 {"name": "确认信息4", "type": "4"},
                 {"name": "确认信息5", "type": "5", "unit": "吨"}
            ]
        }
    ],
    domain: "",                //专业code
    domain_name: "",            //专业名称
    selectedObj: {},        //选择信息点 对象列表已选择的对象

}

var myWorkOrderMethod = {//工单管理模块方法
    //------------------------------------------zy__start------------------------------------------
    //事项内容keyup事件
    keyupMatterContent: function (model, index, event) {
        commonData.curMatterIndex = index;
        commonData.curMatterContent = JSON.parse(JSON.stringify(model));
        myWorkOrderModel.curMatterIndex = index;
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
                            publicMethod.dealSearchedObjects(data, myWorkOrderModel);
                            myWorkOrderModel.aite = true;
                            if (data.length) {
                                myWorkOrderModel.curMatterPopType = 0;
                            } else {
                                myWorkOrderModel.curMatterPopType = 3;
                            }
                        });
                    } else {
                        myWorkOrderModel.curMatterPopType = 3;
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
        debugger;
        type = type ? type : 'obj'
        model.checked = !model.checked;
        myWorkOrderModel.curLevelList = JSON.parse(JSON.stringify(myWorkOrderModel.curLevelList));
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

    //判断当前输入字符数是否超上限        //To Delete
    isLengthErr: function (model, event) {
        var isLengthErr = false;
        var maxNum = $(event.target).attr("maxlength");
        var num = model.description.length;
        if (maxNum == 101) {
            if (num > 100) {
                isLengthErr = true;
                $(event.target).css("border", "1px solid red");
                $(event.target).next().css("color", "#ef6767");
            } else {
                $(event.target).css("border", "none");
                $(event.target).next().css("color", "#cacaca");
            }
        }
        return isLengthErr;
    },

    deleteMatter: function (index) {
        myWorkOrderModel.allMatters.splice(index, 1);
    },

    //设置当前弹窗位置
    /*
     locationPop: function (model, event) {
     //var textwrap = $(event.srcElement);
     //var textpdiv = $(event.srcElement).parents(".textarea-div");
     var textwrap = commonData.editingJqTextwrap;
     var textpdiv = commonData.editingJqTextwrap.parents(".textarea-div")
     var textdiv = $(textwrap).siblings(".textareadiv");
     var textareapop = $(textwrap).siblings(".textarea-prop");
     //var value = model
     // .description;
     //var focusIndex = textwrap[0].selectionStart;
     //var firstPartStr = value.substring(0, focusIndex);
     //var secondPartStr = value.substring(focusIndex);
     //var lastQuanIndex = firstPartStr.lastIndexOf('@');
     //var lastJingIndex = firstPartStr.lastIndexOf('#');
     //var lastQuanjingIndex = Math.max(lastQuanIndex, lastJingIndex);
     //var lastSpaceIndex = firstPartStr.lastIndexOf(' ');
     //if (lastQuanjingIndex != -1) {
     //    if (lastQuanIndex > lastJingIndex) {
     //        myWorkOrderModel.aite = true;
     //    } else if (lastQuanIndex < lastJingIndex) {
     //        myWorkOrderModel.aite = false;
     //        myWorkOrderMethod.selAllTags();
     //        yn_method.upDownSelect();
     //    }
     //    var h1 = '<span>' + firstPartStr.substring(0, lastQuanjingIndex) + '</span>';
     //    var h2 = '<span>' + firstPartStr.substr(lastQuanjingIndex, 1) + '</span>';
     //    var htmlValue = h1 + h2;
     //    htmlValue = htmlValue.replace(/\n/g, '<br/>');
     //    htmlValue = htmlValue.replace(/\s/g, '&nbsp;');
     //    textdiv[0].innerHTML = htmlValue;
     textdiv[0].scrollTop = textwrap.scrollTop;
     var span = $(textdiv).find('span:last');
     var divpos = $(textpdiv).offset();
     var pos = span.offset();
     var left = pos.left - divpos.left + 18;
     var top = pos.top - divpos.top + 25;
     $(textareapop).css({left: left + 'px', top: top + 'px'}).show();
     //}

     },
     */

    //------------------------------------------zy__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue的方法
    initDatas: function () {
        $('#sopName').pval('');
        myWorkOrderModel.allSteps = [];
        myWorkOrderModel.isNextStepPage = false;
        myWorkOrderModel.curStepIndex = 0;
        myWorkOrderModel.curStep = {step_content: []};        //页面显示的当前sop步骤内容
        myWorkOrderModel.sopCriteria = {};        //sop列表筛选条件
        myWorkOrderModel.sopList = [];      //sop列表;复制、引用sop时用
        //myWorkOrderModel.copyOrQuote = null;      //1复制，2引用
        myWorkOrderModel.editContent = false;     //是否为编辑内容状态
        myWorkOrderModel.notMultiSopSteps = [];     //不是引用的多步骤的SOP的步骤列表

        myWorkOrderModel.curObjType = 'init';     //标准作业操作内容-当前对象类型
        myWorkOrderModel.curObjType2 = 'init';        //需确认的操作结果-当前对象类型

        myWorkOrderModel.curLevelList = [];       //当前有级别列表
        myWorkOrderModel.leftLevel = [];      //左侧级别列表

        //createSopModel.domainList = [];     //专业列表
        myWorkOrderModel.systemList = [];     //系统列表
        myWorkOrderModel.checkedObjs = [];        //弹框页面check的对象

        myWorkOrderModel.curSelectedDomain = {};      //当前选择的专业
        myWorkOrderModel.curSelectedSystem = {};      //当前选择的系统

        myWorkOrderModel.searchedObjectList = [];     //搜索的对象结果列表
        myWorkOrderModel.selectedObjType = null;      //选择的对象类别

        myWorkOrderModel.infoPointList = [];      //信息点列表
        myWorkOrderModel.optionList = [];     //选项列表

        myWorkOrderModel.customs = [];        //自定义项列表
        myWorkOrderModel.customItem = {items: []};     //自定义项
        myWorkOrderModel.isCustomizeBtnAble = false;        //自定义按钮是否able

        myWorkOrderModel.sameDomain = false;      //是否所有步骤中的所有工作内容都为相同的专业
        myWorkOrderModel.settedDomain = true;        //是否所有步骤中的所有工作内容未设置专业

        myWorkOrderModel.selectedTools1 = [];     //新建/编辑SOP step1中所选的工具列表
        myWorkOrderModel.selectedTools2 = [];     //新建/编辑SOP 下一步页面中所选的工具列表
        //createSopModel.toolList = [];       //弹框工具列表

        //createSopModel.orderTypeList = [];      //工单类型列表
        myWorkOrderModel.brandList = [];      //品牌列表
        myWorkOrderModel.labelList = [];      //标签列表

        myWorkOrderModel.sop = {
            order_type: [],     //工单类型
            fit_objs: []       //适用对象
        };

        myWorkOrderModel.selectedObj = {};        //选择信息点 对象列表已选择的对象

        myWorkOrderModel.fitRangeList = [];       //适用范围列表
        myWorkOrderModel.fitRangeListCopy = [];       //适用范围列表副本
        myWorkOrderModel.linkDataList = [];       //链接资料列表
    },
    verityNum: function () {

    },
    counterNum: function (event) {
        var maxNum = $(event.target).attr("maxlength");
        if (maxNum == 100) {
            var num = this.workContent.pre_conform.length;
            if (num > 100) {
                $(event.target).css("border", "1px solid red");
                $(event.target).next().css("color", "#ef6767");
            } else {
                $(event.target).css("border", "none");
                $(event.target).next().css("color", "#cacaca");
            }
            /*
             num = this.description.length;
             var textwrap = $(event.srcElement);
             var textpdiv = $(event.srcElement).parents(".textarea-div");
             var textdiv = $(textwrap).siblings(".textareadiv");
             var textareapop = $(textwrap).siblings(".textarea-prop");
             var value = this.description;
             var focusIndex = textwrap[0].selectionStart;
             var firstPartStr = value.substring(0, focusIndex);
             var secondPartStr = value.substring(focusIndex);
             var lastQuanIndex = firstPartStr.lastIndexOf('@');
             var lastJingIndex = firstPartStr.lastIndexOf('#');
             var lastQuanjingIndex = Math.max(lastQuanIndex, lastJingIndex);
             var lastSpaceIndex = firstPartStr.lastIndexOf(' ');
             if (lastQuanjingIndex != -1) {
             if (lastQuanIndex > lastJingIndex) {
             myWorkOrderModel.aite = true;
             // yn_method.upDownSelect(true);
             } else if (lastQuanIndex < lastJingIndex) {
             myWorkOrderModel.aite = false;
             myWorkOrderMethod.selAllTags();
             yn_method.upDownSelect(null,null,true);
             // yn_method.upDownSelecting(null,null,true);
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
             $(textareapop).css({left: left + 'px', top: top + 'px'});
             $(textareapop).show();
             }
             */

        }
        $(event.target).next().find(".counterNum").text(num);
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
        myWorkOrderModel.detailSopShow = true;
        var postObj = {
            user_id: myWorkOrderModel.user_id,
            sop_id: sop.sop_id,
            version: sop.version	      //返回结果是否需要带筛选条
        }
        controller.querySopDetailById(sop, postObj);
    },
    closeDetailSop: function () {
        myWorkOrderModel.detailSopShow = false;
    },


    //选择品牌
    selBrand: function (item, event) {
        event.stopPropagation();
        myWorkOrderMethod.toggleOneCriteria(item, 'brands', 'selectedBrands');
    },

    //选择工单类型
    selOrderType: function (item, event) {
        event.stopPropagation();
        myWorkOrderMethod.toggleOneCriteria(item, 'order_type', 'selectedOrder_type', 'code');
    },

    //选择适用对象
    selFitObj: function (item, event) {
        event.stopPropagation();
        myWorkOrderMethod.toggleOneCriteria(item, 'fit_objs', 'selectedFit_objs', 'obj_id');
    },

    //选择自定义标签
    selLabel: function (item, event) {
        event.stopPropagation();
        myWorkOrderMethod.toggleOneCriteria(item, 'labels', 'selectedLabels');
    },

    ////查询可供选择的sop前的参数处理
    //toQuerySopListForSel: function (isInit, event, copyOrQuote) {
    //    event.stopPropagation();
    //    // if (isInit) $('#delaySearch input').val('');
    //    // if (copyOrQuote) createSopModel.copyOrQuote = copyOrQuote;
    //    var obj = {
    //        user_id: myWorkOrderModel.user_id,
    //        project_id: myWorkOrderModel.project_id,
    //        //sop_id: '',     //当sop修订中时选择引用sop时必须传，其它情况不传
    //        need_return_criteria: true
    //    };
    //    // var searchedText = $('#delaySearch input').val();
    //    // if (searchedText) obj.sop_name = searchedText;
    //    if (!isInit) {
    //        if (commonData.selectedBrands.length) obj.brands = commonData.selectedBrands;
    //        if (commonData.selectedOrder_type.length) obj.order_type = commonData.selectedOrder_type;
    //        if (commonData.selectedFit_objs.length) obj.fit_obj_ids = commonData.selectedFit_objs;
    //        if (commonData.selectedLabels.length) obj.labels = commonData.selectedLabels;
    //    }
    //    controller.querySopListForSel(obj);
    //    // method_yn.scrollLoad();
    //},
    //设置SOP筛选条件参数选中状态
    setCriteriaStatus: function (attrName1, attrName2, isObj, subAttrName) {
        var arr1 = myWorkOrderModel.sopCriteria[attrName1] || [], arr2 = [];
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
        if (!isObj) myWorkOrderModel.sopCriteria[attrName1 + 'Arr'] = arr2;
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
        myWorkOrderModel.sopCriteria = JSON.parse(JSON.stringify(myWorkOrderModel.sopCriteria));
        var id = '#all_' + attrName1;
        //if (createSopModel.sopCriteria[attrName1].length > selectedArr.length) {
        $(id).removeClass('sel-span');
        //} else {
        //    $(id).addClass('selection-on');
        //}
    },
    //选中所有"全部"标签
    //selAllTags: function () {
    //    // event.stopPropagation();
    //    $('.sel-all').addClass('sel-span');
    //    myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.brandsArr, 'selectedBrands', false);
    //    myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.order_type, 'selectedOrder_type', false, 'code');
    //    myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.fit_objs, 'selectedFit_objs', false, 'obj_id');
    //    myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.labelsArr, 'selectedLabels', false);
    //},

    //点击"全部"标签
    toggleAllTag: function (event, flag) {
        event.stopPropagation();
        var selected = !($(event.target).hasClass('sel-span'));
        if (!selected) return;
        $(event.target).addClass('sel-span');
        switch (flag) {
            case 1:
                myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.brandsArr, 'selectedBrands', !selected);
                break;
            case 2:
                myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.order_type, 'selectedOrder_type', !selected, 'code');
                break;
            case 3:
                myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.fit_objs, 'selectedFit_objs', !selected, 'obj_id');
                break;
            case 4:
                myWorkOrderMethod.toggleSameClassCriterias(myWorkOrderModel.sopCriteria.labelsArr, 'selectedLabels', !selected);
                break;
            default:
                break;
        }
        createSopModel.sopCriteria = JSON.parse(JSON.stringify(myWorkOrderModel.sopCriteria));
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
    //复选框选择或取消选择对象      //To Delete
    /*
     checkObject: function (model, index, event) {
     var state = event.pEventAttr.state;
     if (state) {
     commonData.checkedObjs.push(model);
     } else {
     for (var i = 0; i < commonData.checkedObjs.length; i++) {
     if (commonData.checkedObjs[i].obj_id == model.obj_id) {
     commonData.checkedObjs.splice(i, 1);
     break;
     }
     }
     }
     //commonMethod.setSureBtnStatus();      //交互去掉确定按钮disable状态
     },
     */
    //查询信息点
    getInfoPointForObject: function (obj, index1, event, contentIndex) {
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        commonData.infoPoint_obj = obj;      //此处可能为新添加的对象、也可能为已选的对象
        myWorkOrderModel.selectedObj = obj;
        var content = publicMethod.getCurContent();
        // var content = publicMethod.getCurMatter();
        console.log(content)
        var belongChoosedObj = false;
        if(content.confirm_result){
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
        }

        commonData.belongChoosedObj = belongChoosedObj;
        controller.queryInfoPointForObject(obj, null);
    },

    //选择信息点-复选框选择或取消选择信息点
    checkInfoPoint: function (model, index, contentIndex,event) {
        // commonData.contentIndex = contentIndex;
        // model.checked = !model.checked;
        // myWorkOrderModel.infoArray = JSON.parse(JSON.stringify(myWorkOrderModel.infoArray));
        //var info_points = commonMethod.getCurContent().confirm_result[commonData.confirmResultIndex].info_points;
        // var state = event.pEventAttr.state;
        model.checked = !model.checked;
        if (!commonData.infoPoint_obj.info_points) commonData.infoPoint_obj.info_points = [];
        var info_points = commonData.infoPoint_obj.info_points;
        commonData.info_pointsCopy = JSON.parse(JSON.stringify(info_points));
        if (state) {
            commonData.info_pointsCopy.push(model);
        } else {
            for (var i = 0; i < commonData.info_pointsCopy.length; i++) {
                if (commonData.info_pointsCopy[i].obj_id == model.obj_id) {
                    commonData.info_pointsCopy.splice(i, 1);
                    break;
                }
            }
        }


    },
    //编辑的工作内容某项keydown事件
    keydownContent: function (index, content, event, contentIndex) {
        var code = event.keyCode;
        var attrName = commonData.contentItemAttrNames[index];
        // var text = content.content;
        var text = this.workContent.content;
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
    //编辑的工作内容某项keyup事件
    keyupContentItem: function (index, content, event, contentIndex, jqTextarea, addSpecialCharFocusIndex, addSpecialCharAddedStr) {
        //console.log('keyup');
        var attrName = commonData.contentItemAttrNames[index];
        commonData.contentIndex = contentIndex;

        var code = event.keyCode;
        //console.log('keyCode: ' + code);
        var jqTarget = jqTextarea ? jqTextarea : $(event.currentTarget);
        var textwrap = jqTarget[0];
        var textdiv = jqTarget.next().next()[0];
        var textareapop = jqTarget.next().next().next();

        commonData.jqTarget = jqTarget;
        commonData.textwrap = textwrap;
        commonData.textdiv = textdiv;
        commonData.textareapop = textareapop;

        commonData.editingContentObjs = content.content_objs;
        commonData.editingJqTextwrap = jqTarget;

        // var text = content.content;
        var text = this.workContent.content;
        commonData.text = text;
        var len = text.length;
        //console.log('beforeLen: ' + commonData.beforeLen);
        //console.log('len: ' + len);
        if (!addSpecialCharAddedStr && len == commonData.beforeLen) return;        //过滤：1、中文输入法输入的拼音字符 2、对文本框操作无效的按键

        var focusIndex = addSpecialCharFocusIndex ? addSpecialCharFocusIndex : textwrap.selectionStart;
        if (code == 13 || code == 100) {        //不允许回车输入       //TODO
            content.content = text.slice(0, focusIndex - 1) + text.slice(focusIndex, len);
            return;
        }

        var text1 = text.slice(0, focusIndex);
        var text2 = text.slice(focusIndex);
        var noLastCharText1 = text1.slice(0, focusIndex - 1);
        commonData.text1 = text1;
        commonData.text2 = text2;
        var len1 = text1.length;
        var text1Char = text1 + commonData.deletedChar;
        var searchedText;
        var addedLen = len - commonData.beforeLen;
        var addedStr = addSpecialCharAddedStr ? addSpecialCharAddedStr : text.slice(focusIndex - addedLen, focusIndex);
        //应限制#号的输入
        if (code == 8) {        //退格键删除操作
            if (commonData.deletedChar == ' ') {      //在空格后
                //只有对象后面允许输入空格的情况下此处加强判断可以去掉，目前没有限制空格在普通文本中的输入
                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@')) {        //在对象结束空格后      //此处不能发起一次搜索，此时可能的情况：@地源热泵设备类@建筑4
                    console.log('删除了标识对象结束的空格，这是不允许的');
                    content.content = text1 + ' ' + text2;
                }
            } else if (text1Char.lastIndexOf(' ') < text1Char.lastIndexOf('@') && text2.indexOf(' ') !== -1) {        //在对象@或普通字符后且在空格前
                if (commonData.deletedChar == '@') {     //在对象@后
                    console.log('删除对象@符');
                } else {     //在普通字符后，例如：'@建筑2' —> '@建2' 发起一次搜索
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('删除对象中的普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (searchedText.length) {
                        createSopController.searchObject(searchedText);
                    } else {
                        commonMethod.setCurPop(4);
                    }
                }
            } else if (text1Char.lastIndexOf(' ') < text1Char.lastIndexOf('@') && text2.indexOf(' ') == -1) {
                $(".textarea-pop").hide();
                commonMethod.updateObjs();
            }
            commonData.notReplaceObj = false;
        } else if (code == 32 && text1[text1.length - 1] == ' ') {        //输入空格键，排除非单个字符输入状态下输入空格
            //普通文本中间允许输入空格
            //在@后输入了一个空格
            if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@') && noLastCharText1.lastIndexOf('@') == text1.length - 2) {
                console.log('在@后输入了一个空格，这是不允许的');
                content.content = noLastCharText1 + text2;
                return;
            }
            if (noLastCharText1.lastIndexOf('@') == -1 || noLastCharText1.lastIndexOf('@') < noLastCharText1.lastIndexOf(' ')) {     //不在对象中间
                return;
            } else if ($($(".textarea-pop")[commonData.contentIndex]).is(':hidden')) {     //对象中间还未发起搜索直接输入空格

                var objName = text1.slice(text1.lastIndexOf('@') + 1, text1.lastIndexOf(' '));
                controller.searchObject(objName, true);
            } else {        //对象中间已发起搜索，后输入空格
                if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@')) {
                    if (commonData.matchExistingObj.obj_id) {
                        console.log('输入了一个空格，结束对象输入，该对象为已有对象');
                        $(".textarea-pop").hide();
                    } else {
                        console.log('输入了一个空格，结束对象输入，该对象为自定义对象');
                        var objName = text1.slice(text1.lastIndexOf('@') + 1, text1.length - 2);
                        var obj = {
                            user_id: myWorkOrderModel.user_id,
                            project_id: myWorkOrderModel.project_id,
                            obj_name: objName
                        }
                        controller.addTempObjectWithType(obj);
                    }
                }
            }
        } else {        //输入普通字符或字符串的情况
            if (addedStr == '@') {      //输入@符
                //对象中间不允许输入@
                if (noLastCharText1.lastIndexOf(' ') < noLastCharText1.lastIndexOf('@')) {
                    content.content = text.slice(0, focusIndex - 1) + text.slice(focusIndex, len);
                    return;
                }
                //在如'@工具1'前输入@, '@工具1'前添加上空格
                if (commonData.text2.length && commonData.text2[0] == '@') {
                    commonData.text2 = ' ' + commonData.text2;
                }
                commonData.notReplaceObj = true;
                commonMethod.setCurPop(4);
                commonMethod.locationTextareaPop(textwrap, textdiv, textareapop, text, addSpecialCharFocusIndex);     //定位
            } else {        //输入普通字符
                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2 == '') {
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1);
                    console.log('在@后输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (!commonData.composing) {
                        createSopController.searchObject(searchedText);
                    }
                }

                if (text1.lastIndexOf(' ') < text1.lastIndexOf('@') && text2.indexOf(' ') !== -1) {
                    searchedText = text1.slice(text1.lastIndexOf('@') + 1) + text2.slice(0, text2.indexOf(' '));
                    console.log('在对象中输入普通字符，发起一次搜索，搜索的字符串为：' + searchedText);
                    if (!commonData.composing) {
                        createSopController.searchObject(searchedText);
                    }
                }
                commonData.notReplaceObj = false;
            }
        }

        switch (index) {
            case 1:
                /*
                 if (text1 == '@' || len > 1 && text1[len - 1] == '@' && text1[len - 2] == ' ') {       //输入@打开选择大类弹框
                 //jqTarget.siblings('.textarea-pop').find('.state-five').show();
                 commonMethod.locationTextareaPop(textwrap, textdiv, textareapop, text);
                 }
                 */
                break;
            default:
                break;
        }
    },

    //工作内容keyup事件
    keyupContent: function (model, index, event) {
        commonData.curMatterIndex = index;
        commonData.curMatterContent = JSON.parse(JSON.stringify(model));
        myWorkOrderModel.curMatterIndex = index;
        var code = event.keyCode;
        var jqTarget = $(event.currentTarget);
        var textwrap = jqTarget[0];

        content=myWorkOrderModel.workContent;
        commonData.editingJqTextwrap = jqTarget;

        var focusIndex = textwrap.selectionStart;
        var text = this.workContent.content || '';
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
                            publicMethod.dealSearchedObjects(data, myWorkOrderModel);
                            myWorkOrderModel.aite = true;
                            if (data.length) {
                                myWorkOrderModel.curMatterPopType = 0;
                            } else {
                                myWorkOrderModel.curMatterPopType = 3;
                            }
                        });
                    } else {
                        myWorkOrderModel.curMatterPopType = 3;
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
                publicMethod.setCurPop(4, 'obj');
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
                myWorkOrderMethod.selAllTags();
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
        // console.log(confirmObj,index1,event,contentIndex)
        event.stopPropagation();
        commonData.contentIndex = contentIndex;
        // $(".addObjectAndInfoPoint").hide();
        commonData.infoPoint_obj = JSON.parse(JSON.stringify(confirmObj));
        commonData.confirmResultIndex = index1;
        var jqInfoPointPop = $(event.currentTarget).next();
        commonData.jqInfoPointPop = jqInfoPointPop;
        commonData.belongChoosedObj = true;
        controller.queryInfoPointForObject(confirmObj,jqInfoPointPop);
    },
    //信息点-设置当前弹框显示对应的内容  /*修改进行中*/
    setCurPop2: function (index, notInitData) {
        if (!notInitData) {
            myWorkOrderModel.curLevelList = [];
            myWorkOrderModel.infoPointList = [];
        }
        if (index == 1) {       //此处注意与setCurPop(4)作区分
            myWorkOrderModel.curObjType2 = 'init';
        } else if (index == 0) {
            myWorkOrderModel.curObjType2 = 'search';
        } else if (index == 3) {
            //恢复自定义信息点弹窗默认设置
            $($(commonData.jqPopDataDivs2[3]).find('.list-body').children()[0]).find('input').val('');
            $('#selControlCombobox').precover();
            myWorkOrderModel.customItem = {"name": "", "type": "", "items": []};

            myWorkOrderModel.curObjType2 = 'custom';
        } else {
            myWorkOrderModel.curObjType2 = 'infoPoint';
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
    addContent: function (model,open,event) {
        if (open) {
            myWorkOrderModel.addContentWindow = true;
            controller.queryGeneralDictByKey();

        } else {
            myWorkOrderModel.addContentWindow = false;

        }
        myWorkOrderModel.mattersVip=model ||{};

    },
    /*事项名称计数*/
    matterNameCounter: function (model, event) {
        console.log(model,event)
        $(event.target).next(".counter").find("b").text(model.length);
        // desc_aftpart
    }
    //------------------------------------------yn__end------------------------------------------
}
