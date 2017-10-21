var myWorkOrderModel = {//工单管理模块数据模型
    //------------------------------------------zy__start------------------------------------------
    orderDetailData: {},        //工单详情
    curPage: '',
    curObjType: "",
    orderOperatList: [],
    personPositionList: [],
    selectedTool: [],
    toolList: [],
    stop_order_content: '',

    allMatters: [
        {
            "matter_name": "未命名事项-1",
            "description": "",
            "desc_forepart": "",
            "desc_aftpart": "",
            "desc_photos": [],
            "desc_objs": [],
            "desc_sops": [],
            "desc_works": [],
            "required_control": []
        }
    ],       //所有的事项
    curMatterIndex: 0,      //当前操作的事项索引
    curMatterPopType: 4,       //当前事项弹框类型，0-4为选择或搜索对象弹框，0搜索，1选择大类结果无级别，2选择大类结果有左侧级别，3自定义，4选择大类
    curContent: {},     //当前工作内容
    //------------------------------------------zy__end------------------------------------------

    //------------------------------------------yn__start------------------------------------------
    //vue绑定的数据data
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
    regular: false,//结构化输入
    editBtn: true,//编辑或清空

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
    mattersVip: null,//打开的事项
    customs: [],        //自定义项列表
    customItem: {items: []},     //自定义项
    isCustomizeBtnAble: false,        //自定义按钮是否able

    singleMatters: {
        matter_name: "",          //事项名称
        description: "",         //事项描述
        desc_forepart: "",       //描述内容前段,结构化时用
        desc_aftpart: "",        //描述内容后段,结构化时用
        desc_photos: [],         //描述中的图片
        desc_sops: [],            //描述中涉及的sop
        desc_works: [],            //描述中涉及的工作内容
    },

    workContent: {
        work_id: "",        //工作内容id
        work_name: "",      //工作内容名称
        pre_conform: "",  //强制确认
        content: "",        //操作内容
        //操作内容中涉及的对象
        content_objs: [],
        notice: "",        //注意事项
        confirm_result: [],	//需确认的操作结果
        domain: "",                //专业code
        domain_name: "",            //专业名称
        selectedObj: {},        //选择信息点 对象列表已选择的对象

    },
    noPop:null,//点击添加对象和信息点是否需要textarea处prop
    selectedObjType:"",//自定义选中对象类别
    blurClose:null,
    textareaOperate:null,
    selSeriesType:''//添加信息点中对自定义之前的curObjType的记录
    //------------------------------------------yn__end------------------------------------------
}

var myWorkOrderMethod = {}
