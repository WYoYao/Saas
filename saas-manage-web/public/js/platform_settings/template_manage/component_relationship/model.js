var componentRelationshipEditModel = function() {
    return {
        index: '',
        cmpt_relation_id: '', //组件关系id ,必须
        base_cmpt_code: '', //原始组件编码
        god_hand_cmpt_code: '', //上帝之手组件编码
        saas_cmpt_code: '', //Saas平台组件编码
        app_cmpt_code: '', //工单app组件编码
    };
}


v.pushComponent({
    name: 'componentRelationship',
    data: {
        componentRelationshipList: [],
        ComponentGroupByType: {
            base: [],
            godHand: [],
            saas: [],
            app: [],
        },
        componentRelationshipEdit: new componentRelationshipEditModel(),
    },
    methods: {
        componentRelationshipGo: function() {
            this.onPageName = "componentInformation";
            this.componentInformationTab = 'base';
            this.getFilterListBase();
        },
        //  跳转查看组件对应关系
        componentRelationshipBack: function() {
            this.onPageName = "templateMange";
        },
        componentRelationshipLayer: function(item, index) {

            this.componentRelationshipEdit = Object.assign({}, item);
            this.componentRelationshipEdit.index = index;

            var ComponentGroupByType, godHandIndex, saasIndex, appIndex;
            ComponentGroupByType = this.ComponentGroupByType;

            godHandIndex = queryIndexByKey(ComponentGroupByType.godHand, { cmpt_code: item.god_hand_cmpt_code });

            saasIndex = queryIndexByKey(ComponentGroupByType.saas, { cmpt_code: item.saas_cmpt_code });

            appIndex = queryIndexByKey(ComponentGroupByType.app, { cmpt_code: item.app_cmpt_code });

            $("#godHandIndex").psel(godHandIndex);
            $("#saasIndex").psel(saasIndex);
            $("#appIndex").psel(appIndex);

            $("#componentRelationshipLayer").pshow();
        },
        submitRelationship: function() {

            var index = this.componentRelationshipEdit.index;

            var argu = Object.assign({}, this.componentRelationshipEdit);

            var _that = this;

            componentRelationshipController.updateComponentRelById(argu, function(data) {

                if (data.Result == 'success') {

                    Vue.set(_that.componentRelationshipList, index, argu)
                    $("#componentRelationshipLayer").phide();
                }
            })


        },
        // 取消弹窗
        cancelComponentRelationshipLayer: function() {

            this.componentRelationshipEdit = new componentRelationshipEditModel();

            $("#componentRelationshipLayer").phide();
        }
    },
    beforeMount: function() {
        var _that = this;

        // 绑定列表信息
        componentRelationshipController.getAllComponentRel(function(list) {
            _that.componentRelationshipList = list;
        });


        // 绑定的用于编辑列表的选项
        componentRelationshipController.ComponentGroupByType(function(obj) {
            _that.ComponentGroupByType = obj;
        })
    },
    computed: {},
    watch: {}
})