$(function () {
    //获取用户信息
    $.ajax({
        url: '/userInfo',
        type: 'get',
        data: {},
        success: function (result) {
            initMenu(result);
        },
        error: function (error) {
        },
        complete: function () {
        }
    });

    function initMenu(result) {
        var userInfo = result && result.user ? result.user : {};
        if (userInfo.person_id) {       //个人登录
            frameModel.userInfo = userInfo;
            frameModel.userMenus = ['个人信息', '修改密码', '退出'];
            frameModel.head = userInfo.id_photo;        //To Confirm
            frameModel.userName = userInfo.name;
            frameModel.projectList = userInfo.project_persons;
            frameModel.selectedProjectId = userInfo.last_project_id ? userInfo.last_project_id : userInfo.project_persons && userInfo.project_persons.length ? userInfo.project_persons[0].project_id : null;
            if (frameModel.selectedProjectId != userInfo.last_project_id) {
                setUserProjectId();
            }
            for (var i = 0; i < frameModel.projectList.length; i++) {
                var project = frameModel.projectList[i];
                if (project.project_id == frameModel.selectedProjectId) {
                    frameModel.selectedProject = project;
                    setMenuItems(project);
                    break;
                }
            }

            new Vue({
                el: '#div1',
                data: frameModel
            });

            Vue.nextTick(function () {
                //$('#pfnor').psel(0, 0);
                $('#combobox1').psel(0, false);
            });

        } else {        //企业登陆
            frameModel.userMenus = ['修改密码', '退出'];
            frameModel.userName = userInfo.company_name;
            frameModel.projectList = [];
            frameModel.menuItems = [{
                name: '',
                menu: [{
                    id: '1001',
                    name: '人员管理',
                    url: '/person'
                }]
            }]

            new Vue({
                el: '#div1',
                data: frameModel
            });
        }


    }

});

var frameModel = {
    //projectMngText: '项目管理',
    userMenus: [],
    head: '',       //头像地址
    userName: '',
    projectList: [],        //项目列表
    menuItems: [],       //菜单列表
    userInfo: {}
};

function setUserProjectId(call) {
    $.ajax({
        url: '/setUser',
        type: 'get',
        data: {
            last_project_id: frameModel.selectedProjectId
        },
        success: function (result) {
            if (typeof call == 'function') call();
        },
        error: function (error) {
        },
        complete: function () {
        }
    });
}

function selProject(model, event) {
    //event.stopPropagation();
    if (model.project_id == frameModel.selectedProjectId) return;
    frameModel.selectedProject = model;
    frameModel.selectedProjectId = model.project_id;
    setMenuItems(model);

    setUserProjectId(function () {
        pajax.update({
            url: 'restUserService/savePersonUseProject',
            data: {},
            success: function (result) {
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    });


    //TODO菜单默认选中
}

function setMenuItems(project) {
    var func_packs = project.func_packs;

    var menuItems = [{
        name: '',
        menu: [{
            id: '1',
            name: '首页',
            url: ''
        }]
    }]

    if (func_packs.indexOf('1001')) {
        menuItems[0].menu.push({
            id: '1001',
            name: '人员管理',
            url: '/person'
        });
    }
    if (func_packs.indexOf('1010')) {
        menuItems[0].menu.push({
            id: '1010',
            name: '排班管理',
            url: '/schedule'
        });
    }

    var menu2 = [];
    if (func_packs.indexOf('1010')) {
        menu2.push({
            id: '1002',
            name: '设备管理',
            url: '/equipmentMng'
        });
    }
    if (func_packs.indexOf('1003')) {
        menu2.push({
            id: '1003',
            name: '空间管理',
            url: '/spaceMng'
        });
    }
    if (func_packs.indexOf('1004')) {
        menu2.push({
            id: '1004',
            name: '设备通讯录',
            url: '/equipmentAddress'
        });
    }
    if (func_packs.indexOf('1005')) {
        menu2.push({
            id: '1005',
            name: '打印设备空间名片',
            url: '/printCard'
        });
    }

    if (menu2.length) {
        menuItems[1] = {
            name: '设备空间',
            menu: menu2
        }
    }

    var menu3 = [];
    if (func_packs.indexOf('1008')) {       //To Modify
        menu3.push({
            id: '1008',
            name: '工单配置',
            url: '/workOrderConfig'
        });
    }
    if (func_packs.indexOf('1006')) {
        menu3.push({
            id: '1006',
            name: '我的工单',
            url: '/myWorkOrder'
        });
    }
    if (func_packs.indexOf('1009')) {
        menu3.push({
            id: '1009',
            name: '计划监控',
            url: '/planMonitor'
        });
    }
    if (func_packs.indexOf('1007')) {
        menu3.push({
            id: '1007',
            name: '工单管理',
            url: '/workOrderMng'
        });
    }
    if (func_packs.indexOf('1011')) {
        var userId = frameModel.userInfo.person_id;
        var projectId = frameModel.selectedProjectId;
        menu3.push({
            id: '1011',
            name: '知识库管理',
            url: 'http://127.0.0.1:9060/?userId=' + userId + '&projectId=' + projectId
        });
    }

    if (menu3.length) {
        var index = menu2.length ? 2 : 1;
        menuItems[index] = {
            name: '工单',
            menu: menu3
        }
    }

    frameModel.menuItems = menuItems;
}

function selUserMenu(model) {
    if (model == '个人信息') {

    } else if (model == '修改密码') {

    } else {
        pajax.update({
            url: 'restUserService/logout',
            data: {},
            success: function (result) {
                pajax.loginOut();
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    }
}