//var majorTypeArr = [{ name: '数学' }, { name: '数学' }, { name: '数学' }];
//var systemTypeArr = [{ name: '系统1' }, { name: '系统' }, { name: '系统' }];
var spaceFloorArr = [{
    floor_local_name: '建筑1'
}, {
    floor_local_name: '建筑2'
}];
$(function () {
    controllerAddSystem.init();

});

function showAddSystem() {
    v.initPage("addSystem");
    v.instance.isShowAddSystem=true;
    // $("#addSystemDiv").show();
}

function hideAddSystem() {
    // $("#addSystemDiv").hide();
    v.instance.isShowAddSystem=false;
    v.initPage("systemMng");
}


function editItem(event) {
    var $this = $(event.currentTarget);
    var $contShow = $this.parents(".contShow");
    $contShow.hide();
    $contShow.siblings(".editShow").show();
}

function cancelEdit() { //确认取消编辑
    var $this = $(event.currentTarget);
    var $editShow = $this.parents(".editShow");
    $editShow.hide();
    $editShow.siblings(".contShow").show();
}

function showSystList(event) {
    event.stopPropagation();
    var $sarrow = $(event.currentTarget);
    var $buildTitle = $sarrow.parent(".buildTitle");
    if ($buildTitle.attr('stype') == 'show') { //展开状态
        $buildTitle.siblings(".systemCont").slideUp();
        $sarrow.text('r');
        $buildTitle.attr('stype', 'close');
    } else {
        $buildTitle.siblings(".systemCont").slideDown();
        $sarrow.text('b');
        $buildTitle.attr('stype', 'show');
    }
}

// 专业下拉菜单选择事件
function selMajorType(item) {
    var resArr = v.instance.majorTypeArr.filter(function (ele) {
        return ele.code == item.code;
    });
    if (resArr.length == 0) return;
    var majorObj = resArr.length > 0 ? resArr[0] : {};
    var typeArr = majorObj.content;
    v.instance.systemTypeArr = typeArr; //专业列表
    // $("#cmbSystem").precover();
}


//=============================================公共模块 Start===========================================

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

//=============================================公共模块 End=============================================

//=============================================下拉菜单模块 Start===========================================

// 下拉菜单参数对应的数据源的值
var ComboxEnum = {
    domin: {
        domain: 'code',
    },
    system: {
        system_category: 'code',
    }
};

// 下拉菜单之间的依赖关系
var relationshipComboxEnum = {
    domin: {
        system: {}
    }
};

/**
 * 根据传入的key 生成对应的下拉菜单控件回调函数
 * 
 * @param {any} key 
 */
function createComboxSelFn(key, vkey, elid) {

    return function (item) {

        // 关联查询
        if (key == "domin") {
            selMajorType(item);
        }

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
                    $(elid + keyname).pdisable(false);
                    $(elid + keyname).precover();

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
    }

};

Object.keys(ComboxEnum).forEach(function (key) {

    if (window['cbx_sel_' + key]) {
        console.error('当前声明' + 'cbx_sel_' + key + '与现有方法发生冲突');
    }

    // 将对应的函数绑定 window 对象上面
    window['cbx_sel_' + key] = createComboxSelFn(key, 'systemMngCurrentSelector', '#cbx_id_');
});




var relationshipIstmComboxEnum = {
    domin: {
        system_category: {},
    }
}

// 选择赋值
var IstmComboxEnum = {
    build_id: {
        build_id: 'obj_id',
    },
    domin: {
        EList: 'content',
    },
    system_category: {
        system_category: 'code',
    }
}

// 创建新建页面下拉菜单事件
function createIstmComboxSelFn(key, vkey, elid) {

    return function (item) {

        // 循环对应的值赋值
        for (k in IstmComboxEnum[key]) {

            if (IstmComboxEnum[key].hasOwnProperty(k)) {

                var obj = {};
                obj[k] = item[IstmComboxEnum[key][k]];
                // 附加对应的值
                v.instance[vkey] = Object.assign({}, v.instance[vkey], obj)
            }
        }

        // 判断的当前关联信息 如果父级被修改,子级需要重置
        deep(relationshipIstmComboxEnum, function (keyname, element) {

            // 找到其对应的依赖关系
            if (keyname == key) {

                deep(element, function (keyname) {

                    // 清空对应树结构菜单
                    $(elid + keyname).pdisable(false);
                    $(elid + keyname).precover();

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
        });


        // 选择所属建筑需要验证当前系统编码的值是否重复
        if (key == "build_id") {

            
            if (v.instance[vkey]["system_local_name"]) {

                controllerAddSystem.verifySystemName({
                    build_id: v.instance[vkey]["build_id"],
                    system_local_name: v.instance[vkey]["system_local_name"],
                }).then(function (data) {

                    var el = $(v.instance.addSystemKey + 'system_local_id'),
                        val = el.pval();

                    if (!data.can_use) {
                        el.pshowTextTip('与当前已添加内容重复');
                    } else {
                        el.precover();
                        el.pval(val);
                    }
                })
            }
        }
    }

}

Object.keys(IstmComboxEnum).forEach(function (key) {

    if (window['istm_sel_' + key]) {
        console.error('当前声明' + 'istm_sel_' + key + '与现有方法发生冲突');
    }

    // 将对应的函数绑定 window 对象上面
    window['istm_sel_' + key] = createIstmComboxSelFn(key, 'InsertSystemModel', '#istm_id_');
});

//=============================================下拉菜单模块 End  ===========================================



window.as_blur = createEvents(TextSel2Fn, function (el) {



    var val = el.pval(),
        el = $(el),
        key = el.attr('id').replace(v.instance.addSystemKey, "");

    // 验证字母下划线
    function vFN(str, el) {

        var bool = str.pisAlphanumeric()

        if (!bool) el.pshowTextTip('仅支持数字字母下划线');

        return bool
    }

    // 验证传入的 key 值不能为空
    if (!_.isString(key)) throw new TypeError('key is null');

    if (key == "system_local_name") {
        // 当有建筑ID 的时候再验证重复
        if (v.instance.InsertSystemModel.build_id) {
            controllerAddSystem.verifySystemName({
                build_id: obj.build_id,
                system_local_name: val,
            }).then(function (data) {

                if (!data.can_use) {
                    el.pshowTextTip('与当前已添加内容重复');
                } else {
                    el.precover();
                    el.pval(val);
                }
            })
        }
        // 验证不可重复


    } else if (key == "system_local_id") {

        // 验证汉字
        if (vFN(val, el)) return;

        // 验证不可重复
        controllerAddSystem.verifySystemLocalId({
            system_local_id: val,
        }).then(function (data) {

            if (!data.can_use) {
                el.pshowTextTip('与当前已添加内容重复');
            } else {
                el.precover();
                el.pval(val);
            }
        })


    } else if (key == "BIMID") {

        // 验证汉字
        if (vFN(val, el)) return;

        // 验证不可重复
        controllerAddSystem.verifySystemBimId({
            BIMID: val,
        }).then(function (data) {

            if (!data.can_use) {
                el.pshowTextTip('与当前已添加内容重复');
            } else {
                el.precover();
                el.pval(val);
            }
        })


    }

})

window.as_focus = createEvents(TextSel2Fn, function (obj, el) {

    console.log(arguments);
})