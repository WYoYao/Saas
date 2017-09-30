v.pushComponent({
    name: 'templateMange',
    data: {
        CategorySearch: '', // 未使用
        CategorySearchResList: [], // 未使用
        CategorySearchList: [], // 未使用
        CategoryTree: [],
        isShowCategoryTree: true,
        CategoryList: [],
        onPageName: 'templateMange',
    },
    methods: {
        slideClickSaas: function(item, index) {
            // 改变状态
            item.saas_show_flag = +!item.saas_show_flag;
            // 赋值Vue
            Vue.set(this.CategoryList, index, item);

            // 调用更新接口
            templateManageController.updateInfoPointCmptById(item, templateManageEvent.updateInfoPointCmptById);
        },
        slideClickApp: function(item, index) {
            // 改变状态
            item.app_show_flag = +!item.app_show_flag;
            // 赋值Vue
            Vue.set(this.CategoryList, index, item);

            // 调用更新接口
            templateManageController.updateInfoPointCmptById(item, templateManageEvent.updateInfoPointCmptById);
        },
        // 每条信息查询事件
        categoryClick: function(item) {

            var arr = JSON.parse(JSON.stringify(this.CategoryTree));

            function deepClear(arr) {

                var _deepClear = arguments.callee;
                arr.forEach(function(info) {

                    // 判断是否选中  第一级父级不能被选中
                    if (info.type) {
                        if (item.code == info.code) {

                            info.isSelected = true;
                        } else {
                            info.isSelected = false;
                        }
                    }

                    if (item.parents.indexOf(info.code) != -1) {
                        info.isOn = true;
                    } else {
                        info.isOn = false;
                    }

                    // 如果有子集循环自己
                    if (_.isArray(info.content) && info.content.length) _deepClear(info.content);
                })
            }

            deepClear(arr);

            this.CategoryTree = arr;

            if (!item.type) return; // 第一级不查询
            // 绑定页面列表信息
            templateManageController.queryObjectTemplate(item, templateManageEvent.queryFuncPointTreeEvent);

            console.log(`当前查询的信息为${JSON.stringify(item)}`)
        },
        //  跳转查看组件对应关系
        selectcomponentRelationship: function() {
            var _that = this;
            this.onPageName = "";

            setTimeout(function() {
                _that.onPageName = "componentRelationship";
            }, 0);
        },
        // 根据搜索框中的内容 过滤对象   (暂时不使用)
        templateSearchInput: function() {

            this.isShowCategoryTree = !this.CategorySearch.length;

            if (!this.CategorySearch.length) {
                this.CategorySearchResList = [];
                return;
            }

            var CategorySearch = this.CategorySearch;

            // 绑定查询对应的列表
            this.CategorySearchResList = this.CategorySearchList.filter(function(item) {
                item.isSelected = false;
                return item.name.indexOf(CategorySearch) != -1;
            });
        },
        // 查询条件中的接口 (暂时不使用)
        serachClick: function(item) {
            var arr = JSON.parse(JSON.stringify(this.CategorySearchResList));

            arr.forEach(function(info) {
                if (info.name == item.name) {
                    info.isSelected = true;
                }

                info.isSelected = info.name == item.name;
            });

            this.CategorySearchResList = arr;

            // 绑定页面列表信息
            templateManageController.queryObjectTemplate(item, templateManageEvent.queryFuncPointTreeEvent);

            console.log(`当前查询的信息为${JSON.stringify(item)}`);
        },
    },
    beforeMount: function() {
        var _that = this;

        $("#project_list_loading").pshow()
            // 创建Promise 实例请求页面需要的参数
        new Promise(function(resolve) {
            templateManageController.queryObjectCategoryTree({}, function(res) {
                resolve(res);
            })
        }).then(function(list) {

            // 绑定的树形菜单查询解构，需要的结构数据

            // 整体处理整个树形接口添加链接标识
            function deep(arr, parent) {

                var _deep = arguments.callee;
                arr.forEach(function(item) {
                    // 浅赋值上级的父级链接
                    var par = parent.map(function(item) {
                        return item;
                    });

                    // item.code = (Math.random() * Math.pow(10, 6)).toString().slice(0, 6);

                    // 将自己添加到链接集合中
                    par.push(item.code);

                    // 添加父级链接
                    item.parents = par;
                    // 绑定页面展示需要数据
                    item.isOn = false;
                    item.isSelected = false;

                    // 如果有子集循环自己
                    if (_.isArray(item.content) && item.content.length) _deep(item.content, par);
                })
            };

            deep(list, []);
            // 绑定查询树结构
            _that.CategoryTree = list;


            if (list.length) {


                var arr = list.map(function(item) {
                    return item.content;
                }).reduce(function(con, item) {
                    return con.concat(item);
                }, []);

                if (_.isArray(arr) || arr.length) {
                    // 默认查询第一项
                    var query = {};
                    query.code = arr[0].code;
                    query.type = arr[0].type;

                    templateManageController.queryObjectTemplate(query, function(res) {

                        _that.CategoryList = res;
                    })
                }

            }

            $("#project_list_loading").phide();
        });

    },
    computed: {},
    watch: {}
})