var buttonMenus = [{
    name: '账户管理'
}, {
    name: '信息管理'
}, {
    name: '建筑体'
}, {
    name: '名词管理'
}];


systemTabClick = function(event) {
    var state = event.pEventAttr;
    $(".system").hide().eq(state.index).show()

    switch (state.index) {
        case 0:
            v.initPage('manage');
            break;
        case 1:
            v.initPage('project');
            break;
        case 2:
            v.initPage('build');
            break;
        case 3:
            v.initPage('word');
            break;
        default:
            v.initPage('manage');
            break;
    }
};


/**
 * 公用方法
 */
;
(function() {

    // 创建可编辑Obj
    function createIDEObject(attrs, objs) {

        return function(obj) {

            if (!_.isPlainObject(obj)) throw new TypeError('argument must be an Object');

            return Object.keys(obj).reduce(function(con, key) {

                if (attrs.indexOf(key) != -1) {

                    con[key] = _.assign({}, objs, {
                        value: con[key],
                        newValue: con[key]
                    })
                }
                return con;
            }, obj);
        }
    }

    window.createIDEObject = createIDEObject;

})();

window.v = new VueReady('#component');

/**
 * 创建Vue 组件
 */
;
$(function() {

    v.createVue();

    $("#navBar").psel(0);
});