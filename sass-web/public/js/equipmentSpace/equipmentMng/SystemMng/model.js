;
(function () {
    v.pushComponent({
        name: 'systemMng',
        data: {
            majorTypeArr: [{
                code: null,
                name: "全部",
                content: []
            }],//专业列表
            systemTypeArr: [{
                code: null,
                name: "全部",
            }],//系统列表
            buildSystemTree: [],
            systemMngCurrentSelector:{
                domain:'',
                system_category:''
            },
            // 基础信息点
            systemBasePoints:[{
                "system_id": "",            //系统id
                "system_local_id": "",      //系统本地编码
                "system_local_name": "",    //系统本地名称
                "BIMID":"",                 //BIM编码
                "build_local_name":"",      //建筑本地名称
                "domain_name":"",           //所属专业名称
                "system_category_name":""   //系统类型名称
            }],
            // 技术信息点
            systemHeightPoints:[],
            // 信息点总和
            totalPoints:[{
                "system_id": "",            //系统id
                "system_local_id": "",      //系统本地编码
                "system_local_name": "",    //系统本地名称
                "BIMID":"",                 //BIM编码
                "build_local_name":"",      //建筑本地名称
                "domain_name":"",           //所属专业名称
                "system_category_name":""   //系统类型名称
            }],
        },
        computed: {

        },
        filters: {

        },
        methods: {
            // 查询建筑结构树
            queryBuildSystem:function(value){
                var _that=this;
                controllerAddSystem.queryBuildSystemTree(value || _that.systemMngCurrentSelector,function(list){

                    _that.buildSystemTree=list;
                });
            },
            _clickQuerySystem:function(item){
                var system_id=item.system_id;
                
            }         
        },
        watch: {
            systemMngCurrentSelector:function(newValue,oldValue){
                var _that=this;

                for (var key in newValue) {
                    if (newValue.hasOwnProperty(key)) {
                        var newElement = newValue[key];
                        var oldElement = oldValue[key];

                        if(newElement!=oldElement){
                            // 检查到查询值不同的时候重新查询列表中的值
                            setTimeout(function() {

                                _that.queryBuildSystem(newValue);
                            }, 0);

                            break;
                        }
                    }
                }
            }
        },
        beforeMount:function(){
            var _that=this;

            //绑定专业信息
            controllerAddSystem.queryAllEquipCategory(function(list){
                _that.majorTypeArr=list;
            });
            
            _that.queryBuildSystem();
        }
    })
})();