;
(function () {

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
        },
        equip_category: {
            equip_category: 'code',
            equip_category_name: 'name',
        }
    };

    /**
     * 根据传入的key 生成对应的数树结构点击回调函数
     * 
     * @param {any} key 
     */
    function createTreeSelFn(key) {

        return function (item) {

            // 选择安装位置的时候楼层不能被选择
            if (key == 'build_id' && item.obj_type == 'floor') {

                $("#Tree_" + key).precover();

                return;
            };

            // 循环对应的值赋值
            for (k in TreeEnum[key]) {

                if (TreeEnum[key].hasOwnProperty(k)) {

                    var obj = {};
                    obj[k] = item[TreeEnum[key][k]];
                    // 附加对应的值
                    v.instance.insertModel = Object.assign({}, v.instance.insertModel, obj)
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
                        $("#Tree_" + keyname).precover();

                        // 循环清空依赖的值
                        for (k in TreeEnum[keyname]) {

                            if (TreeEnum[keyname].hasOwnProperty(k)) {

                                var obj = {};
                                obj[k] = "";
                                // 附加对应的值
                                v.instance.insertModel = Object.assign({}, v.instance.insertModel, obj)

                            }
                        }

                    })
                }
            })


        }
    }

    Object.keys(TreeEnum).forEach(function (key) {
        // 将对应的函数绑定 window 对象上面
        window['TreeSel' + key] = createTreeSelFn(key);
    });


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
            type: 2,
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
    function createUploadSelFn(key) {

        return function () {

            // 当前附件的文件集合
            var arr = $("#insert_" + key).pval();
            var _that = v.instance;

            var fileList = arr.map(function (item) {

                return {
                    path: item.url, //文//件的下载地址， 即网站后台(非java端) 后台返回的下载地址。 必须 *
                    toPro: key, //此文件对应的属性名称 *
                    multiFile: true, //是否是多附件， 默认true *
                    fileName: item.name, // 文件真实名称 *
                    fileSuffix: item.suffix, //文件后缀,不带点// *
                    isNewFile: (item.isNewFile != void 0) ? item.isNewFile : true, // 是不是新文件， 默认true， 为false时将不进行文件上传 *
                    fileType: UploadEnum[key].type, //文件类型， 1 图片 2 非图片， 暂时只有fm系统会用到； 默认1 /
                }
            });

            if (UploadEnum[key].struct == 1) {

                _that.insertModel[key] = fileList.map(function (info) {

                    info.toPro = "key";
                    return {
                        "type": "2",
                        "name": info.fileName,
                        "key": info.path,
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
        window['pupload_' + key] = createUploadSelFn(key);
    });
    // 参数对应的数据源的值
    var ComboxEnum = {
        manufacturer_id: {
            manufacturer_id: 'code',
            manufacturer: 'name',
        },
        supplier_id: {
            supplier_id: 'code',
            supplier: 'name',
        },
        maintainer_id: {
            maintainer_id: 'code',
            maintainer: 'name',
        },
        insurer_id: {
            insurer_id: 'code',
            insurer: 'name',
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
    function createComboxSelFn(key) {

        return function (item) {

            var _that = v.instance;
            // 循环对应的值赋值
            for (k in ComboxEnum[key]) {

                if (ComboxEnum[key].hasOwnProperty(k)) {

                    var obj = {};
                    obj[k] = item[ComboxEnum[key][k]];
                    // 附加对应的值
                    v.instance.insertModel = Object.assign({}, v.instance.insertModel, obj)
                    // v.instance.insertModel[k]=item[TreeEnum[key][k]];
                }
            }

            // 判断的当前关联信息 如果父级被修改,子级需要重置
            deep(relationshipComboxEnum, function (keyname, element) {

                // 找到其对应的依赖关系
                if (keyname == key) {

                    deep(element, function (keyname) {

                        // 清空对应树结构菜单
                        $("#insert_" + keyname).pdisable(false);
                        $("#insert_" + keyname).precover();

                        // 循环清空依赖的值
                        for (k in ComboxEnum[keyname]) {

                            if (ComboxEnum[keyname].hasOwnProperty(k)) {

                                var obj = {};
                                obj[k] = "";
                                // 附加对应的值
                                v.instance.insertModel = Object.assign({}, v.instance.insertModel, obj)

                            }
                        }

                    })
                }
            })

            if (key == 'manufacturer_id') {
                _that.brands = item.brands.map(function (name) {

                    return {
                        name: name
                    };
                })
            } else if (key == 'insurer_id') {
                _that.insurer_infos = item.insurer_info.map(function (i) {

                    return {
                        name: i.insurer_num
                    };
                })
            }


        }

    };

    Object.keys(ComboxEnum).forEach(function (key) {
        // 将对应的函数绑定 window 对象上面
        window['cmbx_' + key] = createComboxSelFn(key);
    });


    var PtimeEnum={
        product_date:{},
        start_date:{},
        maintain_deadline:{},
    }

    function createPtimeSelFn(key){

        return function(item){
            var _that=v.instance;

            _that.insertModel[key]=item.pEventAttr.startTime;
        }
    }

    Object.keys(PtimeEnum).forEach(function (key) {
        // 将对应的函数绑定 window 对象上面
        window['ptime_' + key] = createPtimeSelFn(key);
    });

    function createCancelAddBlock(key){

        return function(key){
            $("#floatWindow_"+key).phide();
        }
    }





})();