;
(function () {
    v.pushComponent({
        name: 'equipmentMngInsert',
        data: {
            // BuildFloorSpaceTree:[], // 安装位置结构树
            treeData: [{
                name: "建筑名称1",
                id: "1",
                child: [{
                    name: "1层",
                    id: "1-1",
                    child: []
                }, {
                    name: "2层",
                    id: "1-2",
                    child: [{
                        name: "空间名称1",
                        id: "1-2-1",
                        child: []
                    }, {
                        name: "空间名称2",
                        id: "1-2-2",
                        child: []
                    }]
                }, ]
            },{
                name: "建筑名称1",
                id: "1",
                child: [{
                    name: "1层",
                    id: "1-1",
                    child: []
                }, {
                    name: "2层",
                    id: "1-2",
                    child: [{
                        name: "空间名称1",
                        id: "1-2-1",
                        child: []
                    }, {
                        name: "空间名称2",
                        id: "1-2-2",
                        child: []
                    }]
                }, ]
            },{
                name: "建筑名称1",
                id: "1",
                child: [{
                    name: "1层",
                    id: "1-1",
                    child: []
                }, {
                    name: "2层",
                    id: "1-2",
                    child: [{
                        name: "空间名称1",
                        id: "1-2-1",
                        child: []
                    }, {
                        name: "空间名称2",
                        id: "1-2-2",
                        child: []
                    }]
                }, ]
            },{
                name: "建筑名称1",
                id: "1",
                child: [{
                    name: "1层",
                    id: "1-1",
                    child: []
                }, {
                    name: "2层",
                    id: "1-2",
                    child: [{
                        name: "空间名称1",
                        id: "1-2-1",
                        child: []
                    }, {
                        name: "空间名称2",
                        id: "1-2-2",
                        child: []
                    }]
                }, ]
            },{
                name: "建筑名称1",
                id: "1",
                child: [{
                    name: "1层",
                    id: "1-1",
                    child: []
                }, {
                    name: "2层",
                    id: "1-2",
                    child: [{
                        name: "空间名称1",
                        id: "1-2-1",
                        child: []
                    }, {
                        name: "空间名称2",
                        id: "1-2-2",
                        child: []
                    }]
                }, ]
            },{
                    name: "建筑名称1",
                    id: "1",
                    child: [{
                        name: "1层",
                        id: "1-1",
                        child: []
                    }, {
                        name: "2层",
                        id: "1-2",
                        child: [{
                            name: "空间名称1",
                            id: "1-2-1",
                            child: []
                        }, {
                            name: "空间名称2",
                            id: "1-2-2",
                            child: []
                        }]
                    }, ]
                },
                {
                    name: "建筑名称2",
                    id: "2",
                    child: [{
                        name: "1层",
                        id: "1-1",
                        child: []
                    }, {
                        name: "2层",
                        id: "1-2",
                        child: [{
                            name: "空间名称1",
                            id: "1-2-1",
                            child: []
                        }, {
                            name: "空间名称2",
                            id: "1-2-2",
                            child: []
                        }]
                    }, ]
                },
            ]
        },
        computed: {

        },
        filters: {

        },
        methods: {

        },
        beforeMount: function () {
            var _that = this;

            // 查询安装位置
            equipmentMngDeatilController.queryBuildFloorSpaceTree()
                .then(function (list) {
                    _that.BuildFloorSpaceTree = list;
                })
        },
        watch: {

        },
    })
})();