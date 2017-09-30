v.pushComponent({
    name: 'authorityManage',
    el: '#platformSet',
    data: {
        allFuncPack: [],
        selFuncPack: {},
        funcPointArr: [],
        funcPointTree: [],//todo
        allfTreeBackup: [],
        allfPointTree: [],

        operateModules: [],
        normalCustomers: [],
        selOperaModule: {},//选择的模块
        selProjectArr: [],//选择的项目数组
        addModuleSign: true,//是否是添加模块
    },

    methods: {
        //setInsert: function (key, value) {
        //    this.selFuncPack[key] = value;
        //},
        funcListClick: function (item) {//权限管理 列表点击事件
            authorityController.queryFuncPackById(item);
            $("#authorityCheck").pshow();
        },
        moduleListClick: function (item) {//工单列表点击事件 
            function callback() {
                var instance = v.instance;
                var selProjectIds = instance.selOperaModule.project_ids || [];//工单的专属项目
                instance.selProjectArr = [];
                for (var i = 0; i < instance.normalCustomers.length; i++) {
                    var customer = instance.normalCustomers[i];
                    customer.isSel = false;
                    if (selProjectIds.indexOf(customer.project_id) > -1) {//专属项目
                        customer.isSel = true;
                        instance.selProjectArr.push(customer);
                    }
                }
                $("#modNameInput").precover();
                $("#modCodeInput").precover();
                $("#modDescripInput").precover();
                $("#modNameInput").pval(instance.selOperaModule.module_name);
                $("#modCodeInput").pval(instance.selOperaModule.module_code);
                $("#modDescripInput").pval(instance.selOperaModule.description);
                $("#operaModuleEdit").pshow({ title: '编辑模块' });
                instance.addModuleSign = false;
            }
            authorityController.queryOperateModuleById(item, callback);
        },
        selProjectDel: function (item, index) {//删除已选项目
            var instance = v.instance;
            instance.selProjectArr.splice(index, 1);
            var resCustom = instance.normalCustomers.filter(function (ele) {
                return ele.project_id == item.project_id;
            });
            resCustom[0].isSel = false;
        },
        projectLiClick: function (item) {//工单  项目列表点击事件  
            var instance = v.instance;
            var isSel = item.isSel;
            if (isSel == true) {
                item.isSel = false;
            } else {
                item.isSel = true;
            }
        },
    },
    beforeMount: function () {
        //authorityController.init();
    },

})