// 选择查询对应的工单
var _clickWorkOrderCode = function (val) {
    v.instance.WorkOrderCode = val.code;
}

var headerbdata = [{
    name: "基础信息"
}, {
    name: "技术参数"
}]

var headerbCall = function () {

    v.instance.baseTab = $("#baseTab").psel();
}

var addbuild1 = function (item) {
    v.instance.Build1 = item;
}

var addbuild2 = function (item) {
    v.instance.Build2 = item;
}

var addid_manufacturer_sel = function (item) {
    v.instance.brands = item.brands.map(function (info) {
        return {
            name: info
        };
    });
}

var addid_insurer_sel = function (item) {
    v.instance.insurer_infos = item.insurer_info;
}

var _SystemDomainChange = function (item) {
    v.instance.AllEquipCategory = item.content;
}


;
(function () {

    var deep = function (obj, cb) {

        var deep = arguments.callee;

        if (_.isPlainObject(obj)) {

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var element = obj[key];

                    cb(key, element);

                    deep(element, cb);
                }
            }
        }
    }

    //=============================================下拉菜单模块 Start===========================================

    // 下拉菜单参数对应的数据源的值
    var ComboxEnum = {
        manufacturer: {
            manufacturer_id: 'company_id',
            manufacturer: 'company_name',
        },
        supplier: {
            supplier_id: 'company_id',
            supplier: 'company_name',
        },
        maintainer: {
            maintainer_id: 'company_id',
            maintainer: 'company_name',
        },
        insurer: {
            insurer_id: 'company_id',
            insurer: 'company_name',
        },
        insurer_num: {
            insurer_num: 'name',
        },
        brand: {
            brand: 'name',
        },
    };

    // 下拉菜单之间的依赖关系
    var relationshipComboxEnum = {
        manufacturer_id: {
            brand: {}
        },
        insurer_id: {
            insurer_num: {}
        }
    };

    /**
     * 根据传入的key 生成对应的下拉菜单控件回调函数
     * 
     * @param {any} key 
     */
    function createComboxSelFn(key, vkey) {

        return function (item) {


            // 循环对应的值赋值
            for (k in ComboxEnum[key]) {

                if (ComboxEnum[key].hasOwnProperty(k)) {

                    var obj = {};
                    obj[k] = item[ComboxEnum[key][k]];
                    // 附加对应的值
                    v.instance[vkey] = Object.assign({}, v.instance[vkey], obj)
                }
            }

            // 判断的当前关联信息 如果父级被修改,子级需要重置
            deep(relationshipComboxEnum, function (keyname, element) {

                // 找到其对应的依赖关系
                if (keyname == key) {

                    deep(element, function (keyname) {

                        // 清空对应树结构菜单
                        $("#ideid_" + keyname).pdisable(false);
                        $("#ideid_" + keyname).precover();

                        // 循环清空依赖的值
                        for (k in ComboxEnum[keyname]) {

                            if (ComboxEnum[keyname].hasOwnProperty(k)) {

                                var obj = {};
                                obj[k] = "";
                                // 附加对应的值
                                v.instance[vkey] = Object.assign({}, v.instance[vkey], obj)

                            }
                        }

                    })
                }
            })

            if (key == 'manufacturer') {
                v.instance.brands = item.brands.map(function (name) {

                    return {
                        name: name
                    };
                })
            } else if (key == 'insurer') {
                v.instance.insurer_infos = item.insurer_info.map(function (i) {

                    return {
                        name: i.insurer_num
                    };
                })
            }
        }

    };

    Object.keys(ComboxEnum).forEach(function (key) {

        // 将对应的函数绑定 window 对象上面
        window['ide_com_sel_' + key] = createComboxSelFn(key, 'EquipInfoBak');
    });

    //=============================================下拉菜单模块 End  ===========================================

    //=============================================树形菜单模块 Start===========================================

    /**
     * 关系树通过之前的关系完成对应的关联
     */
    var relationshipEnum = {
        build_id: {
            system_id: {
                equip_category: {

                }
            }
        }
    };

    /**
     * 树形菜单键值对应  ==> 提交参数的key 值 == 数据源返回的实例的属性
     */
    var TreeEnum = {
        build_id: {
            build_id: 'obj_id',
            build_name: 'obj_name',
        },
        system_id: {
            system_id: 'system_id',
            system_name: 'system_name',
        }
    };

    /**
     * 根据传入的key 生成对应的数树结构点击回调函数
     * 
     * @param {any} key 
     */
    function createTreeSelFn(key, vkey) {

        return function (item) {
            var _that = v.instance;

            // 选择安装位置的时候楼层不能被选择
            if (key == 'build_id' && item.obj_type == 'floor') {

                $("#ideid_" + key).precover();

                return;
            };

            // 循环对应的值赋值
            for (k in TreeEnum[key]) {

                if (TreeEnum[key].hasOwnProperty(k)) {

                    var obj = {};
                    obj[k] = item[TreeEnum[key][k]];
                    // 附加对应的值
                    v.instance[vkey] = Object.assign({}, v.instance[vkey], obj)
                    // v.instance.insertModel[k]=item[TreeEnum[key][k]];
                }
            }

            // 关闭树形结构菜单
            v.instance.iv[key] = false;

            // 判断的当前关联信息 如果父级被修改,子级需要重置
            deep(relationshipEnum, function (keyname, element) {

                // 找到其对应的依赖关系
                if (keyname == key) {

                    deep(element, function (keyname) {

                        // 清空对应树结构菜单
                        $("#ideid_" + keyname).precover();

                        // 循环清空依赖的值
                        for (k in TreeEnum[keyname]) {

                            if (TreeEnum[keyname].hasOwnProperty(k)) {

                                var obj = {};
                                obj[k] = "";
                                // 附加对应的值
                                v.instance[vkey] = Object.assign({}, v.instance[vkey], obj)

                            }
                        }

                    })
                }
            })



            // 如果的当前选项为所属系统  ** 当前只能默认选中不能默认展开 **
            // if (key == "system_id") {
            //     var system_category = item.system_category;

            //     function fn(x) {
            //         var f=arguments.callee;

            //         if (_.isArray(x.content)) {

            //             var tag=x.code;
            //             if(tag==system_category && x.content.length){
            //                 $("#Tree_equip_category").psel({
            //                     nodeId:x.content[0].code,
            //                     isEvent:true,
            //                     type:1,
            //                 })
            //             }

            //             // 递归
            //             x.content.forEach(f);
            //         }
            //     }

            //     _that.AllEquipCategory.forEach(fn)
            // }


        }
    }

    Object.keys(TreeEnum).forEach(function (key) {
        // 将对应的函数绑定 window 对象上面
        window['ide_tree_sel_' + key] = createTreeSelFn(key, 'EquipInfoBak');
    });

    //=============================================树形菜单模块 End===========================================

    //============================================= 上传下载事件 Start  ======================================

    var UploadEnum = {
        picture: {
            type: 1,
            struct: 2,
        },
        drawing: {
            type: 2,
            struct: 1,
        },
        check_report: {
            type: 2,
            struct: 1,
        },
        nameplate: {
            type: 1,
            struct: 2,
        },
        archive: {
            type: 2,
            struct: 1,
        }
    };
    /**
     * 根据传入的key 生成对应的上传控件上传回调函数
     * 
     * @param {any} key 
     */
    function createUploadSelFn(key, vkey) {

        return function () {

            // 当前附件的文件集合
            var arr = $("#ideid_" + key).pval();
            var _that = v.instance;

            var fileList = arr.map(function (item) {

                return uploadPval2attachment(item, key, UploadEnum[key].type);
            });

            if (UploadEnum[key].struct == 1) {

                _that[vkey][key] = fileList.map(function (info) {

                    info.toPro = "key";
                    info.multiFile=false;
                    return {
                        "type": "2",
                        "name": info.fileName,
                        "key": "",
                        "attachments": info,
                    }
                })

            } else {

                _that.attachments[key] = fileList;
            }
        }

    };

    Object.keys(UploadEnum).forEach(function (key) {
        // 将对应的函数绑定 window 对象上面
        window['ide_upload_sel_' + key] = createUploadSelFn(key, 'EquipInfoBak');
    });

    //============================================= 上传下载事件 End  ========================================

    //============================================= 日历选择事件 Start========================================

    var PtimeEnum = {
        product_date: {},
        start_date: {},
        maintain_deadline: {},
    }

    function createPtimeSelFn(key, vkey) {

        return function (item) {
            var _that = v.instance;

            _that[vkey][key] = item.pEventAttr.startTime;
        }
    }

    Object.keys(PtimeEnum).forEach(function (key) {
        // 将对应的函数绑定 window 对象上面
        window['ide_ptime_sel_' + key] = createPtimeSelFn(key, 'EquipInfoBak');
    });

    //============================================= 日历选择事件 End  ========================================

    //============================================= 技术参数 Start  ========================================


    // function createComboxSelFnPoint(info, vkey) {

    //     return function (item) {

    //         if(item.type==1){

    //         }

    //     }

    // };


    //============================================= 技术参数 End  ========================================
})();