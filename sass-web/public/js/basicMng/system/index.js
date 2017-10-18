var buttonMenus = [{
    name: '账户管理',
    icon: 'z'
}, {
    name: '项目信息',
    icon: 'z'
}, {
    name: '建筑体',
    icon: 'z'
}, {
    name: '名词管理',
    icon: 'z'
}];

var _window_state;
var la_state;

function goPage() {

    la_state=true;
    $('#navBar').psel(_window_state.index);

    cancelPage();
}

function cancelPage() {
    $('#bubbleWindow').phide();
}


var systemTabbeforeClick = function (argu) {

    var state=argu.pEventAttr;

    if ($(".smt").is(':visible') && !la_state) {

        _window_state = state;

        $('#bubbleWindow').pshow({
            title: '确定要离开此页面吗？',
            subtitle: '您编辑的信息尚未保存，离开会使内容丢失'
        });
        return false;

    }

    return true;
}


var systemTabClick = function (event) {

    var state = event.pEventAttr;

    // $(".system").hide().eq(state.index).show()

    switch (state.index) {
        case 0:
            v.instance.onPage="manage";
            v.initPage('manage');
            break;
        case 1:
            v.instance.onPage="project";
            v.initPage('project');
            break;
        case 2:
            v.instance.onPage="build";
            v.initPage('build');
            break;
        case 3:
            v.instance.onPage="word";
            v.initPage('word');
            break;
        default:
            v.instance.onPage="manage";
            v.initPage('manage');
            break;
    }

};


/**
 * 公用方法
 */
;
(function () {

    // 创建可编辑Obj
    function createIDEObject(attrs, objs) {

        return function (obj) {

            if (!_.isPlainObject(obj)) throw new TypeError('argument must be an Object');

            return Object.keys(obj).reduce(function (con, key) {

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
$(function () {

    v.createVue();

    $("#navBar").psel(0);
});