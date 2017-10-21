
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
            if (frameModel.selectedProjectId) {
                getControlRequireList();
            }
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
            frameModel.companyInfo.customer_id = userInfo.customer_id;
            frameModel.companyInfo.project_id = userInfo.project_id;
            frameModel.companyInfo.project_local_name = userInfo.project_local_name;
            frameModel.companyInfo.last_project_id = userInfo.last_project_id;
            frameModel.companyInfo.system_code = userInfo.system_code;
            frameModel.companyInfo.image_secret = userInfo.image_secret;
            frameModel.companyInfo.tool_type = userInfo.tool_type;
            frameModel.companyInfo.password = userInfo.p;
            frameModel.projectList = [];
            frameModel.menuItems = [{
                name: '',
                menu: [{
                    id: '1001',
                    name: '人员管理',
                    url: '/person'
                }]
            }]
            console.log("获取来的原信息：")
            console.log(result.user)
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
    userInfo: {},
    controlRequireCodes: ['obj_first_photo', 'obj_first_sign', 'matter_end_scan'],
    controlRequireList: [],      //管控需求列表（工单流转的控制模块）

    person_password: '',//关闭弹窗用
    companyInfo: {
        isOldPasswd: 2,//是否为原密码
        formatCode: 2,//新密码格式
        newPassWord: null,//记录新密码
        ifSame: 2,//两次密码验证相同与否
    },//公司信息
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

    getControlRequireList();

    //TODO菜单默认选中
}

//获取管控需求列表
function getControlRequireList() {
    pajax.post({
        url: 'restGeneralDictService/queryGeneralDictByKey',
        data: {
            dict_type: 'wo_control_require'
        },
        success: function (result) {
            var data = result && result.data ? result.data : [];
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var code = data[i].code;
                var codes = frameModel.controlRequireCodes;
                data[i].index = code == codes[0] ? 0 : code == codes[1] ? 1 : 2;
            }
            data.sort(compare('index'));
            frameModel.controlRequireList = data;
        },
        error: function (err) {
        },
        complete: function (err) {
        },
    });
}

//比较方法，用于排序
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
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
//编辑
function editableMode(dom) {
    var value = $(dom).prev().text();
    $(dom).parent().hide().next().show().find(".transfer-input").val(value);
    var verify = $(dom).parent().parent().attr("class");
    if (verify == "phone-div") {
        $(dom).parent().next().find(".send-code-countdown span:first-of-type").css({
            "color": "#02a9d1"
        })
    }
}
//取消编辑
function uneditableMode(dom, save) {
    $(dom).parents(".able-edit").hide().prev().show();
    $(dom).siblings(".error-id-span").hide();
}
//保存编辑
function saveEdit(dom, pro) {
    var newValue;
    if (pro == 'gender') {
        newValue = $(dom).parent().siblings().find(".transfer-input").val();
    } else {
        newValue = $(dom).parent().siblings(".transfer-input").val();
    }
    if (newValue) {
        if (pro == "gender") {
            if (newValue == "男") {
                newValue = "male";
            } else if (value == "女") {
                newValue = "female";
            }

        }
        if (pro == 'id_number') {
            // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            var reg = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
            if (!reg.test(newValue)) {
                $(dom).siblings(".error-id-span").show();
                return false;
            } else {
                $(dom).siblings(".error-id-span").hide();
            }
        }
        var poObj = {
            user_id: frameModel.userInfo.person_id,
            person_id: frameModel.userInfo.person_id,
            project_id: frameModel.userInfo.selectedProjectId,
        };
        poObj[pro] = newValue;
    }
    var obj = {
        "user_id": "***",                  //员工id-当前操作人id，必须
        "person_id": "***",                //员工id ,必须
        "project_id": "***",               //项目id
        "name": "***",                     //姓名
        "id_number": "***",                //身份证号码
        "phone_num": "***",                //手机号
        "gender": "***",                   //性别，male-男、female-女
        "birthday": "yyyy-MM-dd",          //出生年月
        "head_portrait": "key"             //系统头像
    };

    updatePersonById(dom, newValue, poObj)

}
//根据id编辑人员信息
function updatePersonById(dom, newValue, postObj) {
    $('#globalloading').pshow();
    pajax.update({
        url: 'restUserService/updatePersonById',
        data: postObj,
        success: function (result) {
            $(dom).parents(".able-edit").prev().find("div").text(newValue);
            $(dom).parents(".able-edit").hide().prev().show();

        },
        error: function (err) {
            $("#globalnotice").pshow({text: '获取工单列表成功', state: "failure"});
        },
        complete: function () {
            $('#globalloading').phide();
        }
    });
}
//验证手机号
function verifyAble(dom, value) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/; //手机号码
    if (value.length == 11) {
        if (reg.test(value)) {
            $(dom).next().find("span:first-of-type").css({
                "color": "#02a9d1"
            });
            $(dom).parents(".able-edit").find(".error-tel-span").hide();
        } else {
            $(dom).next().find("span:first-of-type").css({
                "color": "#b0b0b0"
            });
            $(dom).parents(".able-edit").find(".error-tel-span").show();

        }
    } else {
        $(dom).next().find("span:first-of-type").css({
            "color": "#b0b0b0"
        });
    }
}
//发送验证码
function sendCode(dom) {
    //发送验证码
    pajax.novalidGet({
        url: 'restUserService/smsSendCode',
        data: {
            phone_num: $('#phone-number').val()
        },
        success: function (res) {
            console.log(res);
        },
        error: function (error) {
        },
        complete: function () {
        }
    });
    $(dom).hide().next().show();
    var second = 60;
    var color = $(dom).css("color");
    if (color == "rgb(2, 169, 209)") {
        var s = setInterval(function () {
            if (second > 0) {
                second--;
            }
            $(dom).hide().next().show().find("b").text(second);
            if (second == 0) {
                clearInterval(s);
                $(dom).show().next().hide();
            }
        }, 1000);
    }
};
//关闭弹窗
function closePersonPassword() {
    frameModel.person_password = '';
}
//验证原密码
function testVerificationCode(dom, value) {
    if (value) {
        $('#globalloading').pshow();
        pajax.post({
            url: 'restCustomerService/verifyCustomerPasswd',
            type: 'post',
            data: {
                custom_id: frameModel.companyInfo.customer_id,
                old_passwd: value
            },
            success: function (result) {
                frameModel.companyInfo.isOldPasswd = result && result[0] ? result[0].is_passwd : {};
            },
            error: function (error) {
                $("#globalnotice").pshow({text: '验证原密码失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });
    }

}
//验证新密码格式
function testCodeformat(dom, value) {
    if (value.indexOf(' ') != -1 || value.length < 6) {
        frameModel.companyInfo.formatCode = false;
    } else {
        frameModel.companyInfo.formatCode = true;
        frameModel.companyInfo.newPassWord = value;
    }
}
//验证两次密码是否相同
function twoIfSame(dom, value) {
    frameModel.companyInfo.ifSame = value === frameModel.companyInfo.newPassWord;
}
//保存修改密码
function saveEditPassWord() {
    if (frameModel.companyInfo.isOldPasswd && frameModel.companyInfo.formatCode && frameModel.companyInfo.formatCode !== 2 && frameModel.companyInfo.isOldPasswd && frameModel.companyInfo.ifSame && frameModel.companyInfo.ifSame !== 2 && frameModel.companyInfo.newPassWord) {
        $('#globalloading').pshow();

        var obj = {
            customer_id: frameModel.companyInfo.customer_id,                //客户id，必须
            old_passwd: frameModel.companyInfo.password,                  //旧密码，必须
            new_passwd: frameModel.companyInfo.newPassWord                 //新密码，必须
        };
        console.log(obj);
        pajax.update({
            url: 'restCustomerService/updateCustomerPasswd',
            data: obj,
            success: function (result) {
                closePersonPassword();
                logQuit();
            },
            error: function (err) {
                $("#globalnotice").pshow({text: '修改密码失败', state: "failure"});
            },
            complete: function () {
                $('#globalloading').phide();
            }
        });

    }
}
//退出
function logQuit() {
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
function selUserMenu(model) {
    $('.log-in-win').removeClass("interim");
    frameModel.person_password = model;
    if (model == '个人信息') {

    } else if (model == '修改密码') {

    } else {
        logQuit();
        // pajax.update({
        //     url: 'restUserService/logout',
        //     data: {},
        //     success: function (result) {
        //         pajax.loginOut();
        //     },
        //     error: function (err) {
        //     },
        //     complete: function () {
        //     }
        // });
    }
}