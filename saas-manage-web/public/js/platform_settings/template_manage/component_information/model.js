;
(function() {

    var base = 'base',
        godHand = 'godHand',
        saas = 'saas',
        app = 'app';

    function addComponentInformation() {
        return {
            "cmpt_type": "", //组件类型：base、godHand、saas 、app ,必须
            "cmpt_code": "", //组件编码 ,必须
            "cmpt_name": "", //组件名称 ,必须
            "description": "" //描述 ,必须
        }
    }

    v.pushComponent({
        name: 'componentInformation',
        data: {
            componentInformationTab: 'base',
            componentInformationShowList: [], // 列表展示的数据
            componentInformationAcousticList: [], // 原始组件列表数据
            addComponentInformation: new addComponentInformation(),
        },
        methods: {
            //  跳转查看组件对应关系
            componentInformationBack: function() {
                this.onPageName = "componentRelationship";
            },

            // 获取基础列表
            getFilterListBase: function() {

                this.componentInformationTab = base;
                this.getFilterList(base);
            },
            // 获取上帝之手
            getFilterListGodHand: function() {

                this.componentInformationTab = godHand;
                this.getFilterList(godHand);
            },
            // 获取Sass 列表
            getFilterListSaas: function() {

                this.componentInformationTab = saas;
                this.getFilterList(saas);
            },
            // 获取App 列表
            getFilterListApp: function() {

                this.componentInformationTab = app;
                this.getFilterList(app);
            },
            getFilterList: function(type) {

                var _that = this;
                _that.componentInformationShowList = _that.componentInformationAcousticList.filter(function(item) {
                    return item.cmpt_type == type
                })
            },
            AddComponent: function() {

                this.addComponentInformation.cmpt_type = this.componentInformationTab;
                $("#addComponentLayer").pshow();
            },
            AddComponentSubmit: function() {

                var _that = this;
                // 长度验证
                if (!this.addComponentInformation.cmpt_code || !this.addComponentInformation.cmpt_name || !this.addComponentInformation.description) return;

                if (!/^[a-zA-Z0-9]*$/g.test(this.addComponentInformation.cmpt_code)) return;

                if (!/^[\u4e00-\u9fa5]*$/g.test(this.addComponentInformation.cmpt_name)) return;

                var result = this.componentInformationAcousticList.filter(function(item) {
                    return item.cmpt_code == _that.addComponentInformation.cmpt_code && item.cmpt_type == _that.addComponentInformation.cmpt_type;
                }).length;

                if (result) {

                    $("#popNoticeWarn").pshow({ text: "组件编码与现有组件冲突", state: "failure" });
                    return;
                }

                var _that = this;
                componentInformationController.addComponent(_that.addComponentInformation, function(data) {

                    if (data.Result == 'success') {
                        componentRelationshipController.getAllComponentRel()

                        // 查看不同平台组件信息
                        v.initPage('componentInformation');

                        // 刷新查看组件对应关系
                        v.initPage('componentRelationship');

                        _that.AddComponentCancel();
                    }
                })
            },
            // 取消添加原声组件面板
            AddComponentCancel: function() {
                $("#addComponentLayer").phide();
                this.addComponentInformation = new addComponentInformation();
            }
        },
        beforeMount: function() {
            var _that = this;

            componentInformationController.getAllComponent(function(data) {

                _that.componentInformationAcousticList = data;

                // 过滤列表
                _that.getFilterList('base');

            })
        },
        computed: {},
        watch: {}
    })
})();