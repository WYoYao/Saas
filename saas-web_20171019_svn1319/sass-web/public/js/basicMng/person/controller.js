function personController() {
}
personController.attachments = [];
personController.imageChange = false;
personController.init = function () {
    personController.queryPositionsByProjectId();//获取所有岗位
    personController.queryGeneralDictByKey();//获取所有专业
    personController.queryPersonTagsByProjectId();//获取所有标签
    personController.queryPersonList();

    personController.queryRoleList();//角色列表
    personController.queryFuncPackList();//权限项列表
}
personController.queryGeneralDictByKey = function () { //查询专业
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restGeneralDictService/queryGeneralDictByKey',
        data: {
            dict_type: "domain_require"
        },
        success: function (res) {
            data = res.data || [];
            instance.allSpeciality = data;
        },
        error: function (errObj) {
            console.error('queryGeneralDictByKey err');
        },
        complete: function () {

        }
    });
}

personController.queryPersonTagsByProjectId = function () { //获取标签 todo 这个数据得处理 得加上属性
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restPersonService/queryPersonTagsByProjectId',
        data: {
        },
        success: function (res) {
            data = res.data || [];
            var tagArr = data[0].custom_tags;
            var customTags = [];
            if (!tagArr) return;
            tagArr.forEach(function (ele) {
                var tobj = { name: ele };
                customTags.push(tobj);
            });
            instance.customTags = customTags;
        },
        error: function (errObj) {
            console.error('queryPersonTagsByProjectId err');
        },
        complete: function () {

        }
    });
}
personController.queryPositionsByProjectId = function () { //岗位列表 
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restPersonService/queryPositionsByProjectId',
        data: {
        },
        success: function (res) {
            data = res.data || [];
            var positionArr = data[0].positions;
            var positionList = [];
            var allPosition = [];
            if (!positionArr) positionArr = [];
            positionArr.forEach(function (ele) {
                var pobj = { pname: ele };
                positionList.push(pobj);
            });
            instance.positionList = positionList;
            allPosition = JSON.parse(JSON.stringify(positionList));
            allPosition.splice(0, 0, { pname: '全部' });
            instance.allPositions = allPosition;
            setTimeout(function () {
                $("#positionDown").psel(0, false);
            }, 0);

        },
        error: function (errObj) {
            console.error('queryPositionsByProjectId err');
        },
        complete: function () {

        }
    });
}
personController.queryPersonList = function () { //人员列表
    $("#personLoading").pshow();
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restPersonService/queryPersonList',
        data: {
            person_status: instance.workStateSign ? '1' : '0',//0或1
            position: instance.nowPosition,
        },
        success: function (res) {
            data = res.data || [];
            instance.personList = data;
        },
        error: function (errObj) {
            console.error('queryPersonList err');
        },
        complete: function () {
            $("#personLoading").phide();
        }
    });
}
personController.queryPersonWithGroup = function (status) { //人员缩略图列表
    $("#personLoading").pshow();
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restPersonService/queryPersonWithGroup',
        data: {
            person_status: instance.workStateSign ? '1' : '0',//0或1
            position: instance.nowPosition,
        },
        success: function (res) {
            data = res.data || [];
            instance.personGroup = data;
        },
        error: function (errObj) {
            console.error('getQueryAllFuncPack err');
        },
        complete: function () {
            $("#personLoading").phide();
        }
    });
}

personController.queryPersonDetailById = function (pitem) { //获取人员详情
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restPersonService/queryPersonDetailById',
        data: {
            person_id: pitem.person_id,
        },
        success: function (res) {
            instance.selPerson = res;
            var roleIds = [];
            var roleArray = [];
            for (var nature in instance.selPerson.roles) {
                roleIds.push(nature);
                var roleobj = {
                    role_id: nature,
                    role_name: instance.selPerson.roles[nature],
                };
                roleArray.push(roleobj);
            }
            instance.selPerson.role_ids = roleIds;
            instance.selPerson.role_array = roleArray;
            instance.selPersonCopy = JSON.parse(JSON.stringify(instance.selPerson));//备份
        },
        error: function (errObj) {
            console.error('queryPersonDetailById err');
        },
        complete: function () {
        }
    });
}
personController.discardPersonById = function () { //根据Id离职人员信息 用post吗
    $("#personLoading").pshow();
    var instance = personInfoModel.instance();
    pajax.update({
        url: 'restPersonService/discardPersonById',
        data: {
            person_id: instance.selPerson.person_id,
        },
        success: function (res) {
            $("#personNoticeWarn").pshow({ text: "离职成功！", state: "success" });
            $("#perDetailFloat").phide();
            if (!$("#perPicTable").is(":visible")) {
                personController.queryPersonList();
            } else {
                personController.queryPersonWithGroup();
            }
        },
        error: function (errObj) {
            $("#personNoticeWarn").pshow({ text: "离职失败！", state: "failure" });
            $("#personLoading").phide();
            console.error('discardPersonById err');
        },
        complete: function () {
        }
    });
}
personController.regainPersonById = function () { //根据Id恢复已离职的人员信息 用post吗
    $("#personLoading").pshow();
    var instance = personInfoModel.instance();
    pajax.update({
        url: 'restPersonService/regainPersonById',
        data: {
            person_id: instance.selPerson.person_id,
        },
        success: function (res) {
            $("#personNoticeWarn").pshow({ text: "复职成功！", state: "success" });
            $("#perDetailFloat").phide();
            if (!$("#perPicTable").is(":visible")) {
                personController.queryPersonList();
            } else {
                personController.queryPersonWithGroup();
            }
        },
        error: function (errObj) {
            $("#personNoticeWarn").pshow({ text: "复职失败！", state: "failure" });
            $("#personLoading").phide();
            console.error('regainPersonById err');
        },
        complete: function () {
        }
    });
}
personController.updatePersonById = function () { //编辑人员
    $("#personLoading").pshow();
    var instance = personInfoModel.instance();
    var selPerson = personInfoModel.instance().selPerson;
    var params = {
        person_id: selPerson.person_id,  //人员id
        name: selPerson.name.ptrimAll(),
        id_number: selPerson.id_number.ptrimAll(),//身份证号
        phone_num: selPerson.phone_num.ptrimAll(),              //手机号
        gender: selPerson.gender,                 //性别，male-男、female-女,必须
        birthday: selPerson.birthday,
        person_num: selPerson.person_num.ptrimAll(),             //员工编号
        position: selPerson.position,               //岗位
        custom_tag: selPerson.custom_tag,       //自定义标签
        specialty: selPerson.specialty,        //专业编码
        roles: selPerson.roles,//角色
    }
    if (!personController.imageChange) {//没有操作图片
        var operate = 'update';
    } else if (personController.attachments.length == 0) {//图片去掉了
        var operate = 'update';
        params.id_photo = '';
        params.head_portrait = '';
    } else {
        var operate = 'updateWithFile';
        params.attachments = personController.attachments;
    }
    pajax[operate]({
        url: 'restPersonService/updatePersonById',
        data: params,
        success: function (res) {
            $("#personNoticeWarn").pshow({ text: "修改成功！", state: "success" });
            instance.perCheckSign = true;
            $("#perDetailFloat").pshow({ title: '人员详情' });
            if (!$("#perPicTable").is(":visible")) {
                personController.queryPersonList();
            } else {
                personController.queryPersonWithGroup();
            }
            personController.queryPositionsByProjectId();//获取所有岗位
            personController.queryPersonTagsByProjectId();//获取所有标签
            personController.queryPersonDetailById(selPerson);
        },
        error: function (errObj) {
            console.error('updatePersonById err');
            $("#personLoading").phide();
            $("#personNoticeWarn").pshow({ text: "修改失败！", state: "failure" });
            //instance.selPerson = JSON.parse(JSON.stringify(instance.selPersonCopy));//还原
        },
        complete: function () {
        }
    });
}

personController.addPerson = function () { //添加人员 
    $("#personLoading").pshow();
    var selPerson = personInfoModel.instance().selPerson;
    if (personController.attachments.length == 0) {
        var operate = 'update';
    } else {
        var operate = 'updateWithFile';
    };

    pajax[operate]({
        url: 'restPersonService/addPerson',
        data: {
            name: selPerson.name.ptrimAll(),
            id_number: selPerson.id_number.ptrimAll(),//身份证号
            phone_num: selPerson.phone_num.ptrimAll(),              //手机号
            gender: selPerson.gender,                 //性别，male-男、female-女,必须
            birthday: selPerson.birthday,
            person_num: selPerson.person_num.ptrimAll(),             //员工编号
            position: selPerson.position,               //岗位
            custom_tag: selPerson.custom_tag,       //自定义标签
            specialty: selPerson.specialty,        //专业编码
            roles: selPerson.roles,//角色
            attachments: personController.attachments
        },
        success: function (res) {
            $("#personNoticeWarn").pshow({ text: "添加成功！", state: "success" });
            $("#addPersonPage").hide();
            if (!$("#perPicTable").is(":visible")) {
                personController.queryPersonList();
            } else {
                personController.queryPersonWithGroup();
            }
            personController.queryPositionsByProjectId();//获取所有岗位
            personController.queryPersonTagsByProjectId();//获取所有标签         
        },
        error: function (errObj) {
            console.error('addPerson err');
            $("#personLoading").phide();
            $("#personNoticeWarn").pshow({ text: "添加失败！", state: "failure" });
        },
        complete: function () {
        }
    });
}

//角色管理
personController.queryRoleList = function () { //列表页:查询角色列表
    $("#personLoading").pshow();
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restRoleService/queryRoleList',
        data: {
        },
        success: function (res) {
            data = res.data || [];
            instance.roleList = data;
        },
        error: function (errObj) {
            console.error('queryRoleList err');
        },
        complete: function () {
            $("#personLoading").phide();
        }
    });
}
personController.queryFuncPackList = function () { //查询权限项列表
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restRoleService/queryFuncPackList',
        data: {
        },
        success: function (res) {
            data = res.data || [];
            instance.funcPackList = data;
            instance.funcListCopy = JSON.parse(JSON.stringify(instance.funcPackList));//备份
        },
        error: function (errObj) {
            console.error('queryFuncPackList err');
        },
        complete: function () {
        }
    });
}
personController.queryRoleDetailById = function (ritem, cb) { //根据id查询角色详细信息
    var instance = personInfoModel.instance();
    pajax.post({
        url: 'restRoleService/queryRoleDetailById',
        data: {
            role_id: ritem.role_id
        },
        success: function (res) {
            instance.selRole = res;
            instance.funcPackList.forEach(function (ele) {//重新赋值 选中包含的权限
                var fid = ele.func_pack_id;
                var resArr = instance.selRole.func_pack_list.filter(function (func) { return func.func_pack_id == fid });
                if (resArr.length > 0) {
                    ele.issel = true;
                } else {
                    ele.issel = false;
                }
            });
            instance.funcPacksCopy = JSON.parse(JSON.stringify(instance.funcPackList));//备份
            cb();
        },
        error: function (errObj) {
            console.error('queryRoleDetailById err');
        },
        complete: function () {
        }
    });
}
personController.addRole = function (roleName, funcIds) { //添加角色
    $("#personLoading").pshow();
    pajax.update({
        url: 'restRoleService/addRole',
        data: {
            role_name: roleName,              //角色姓名 ,必须
            func_pack_ids: funcIds
        },
        success: function (res) {
            $("#addRolePage").hide();
            $("#personNoticeWarn").pshow({ text: "添加成功！", state: "success" });
            personController.queryRoleList();
        },
        error: function (errObj) {
            console.error('addRole err');
            $("#personLoading").phide();
            $("#personNoticeWarn").pshow({ text: "添加失败！", state: "failure" });
        },
        complete: function () {
        }
    });
}
personController.updateRoleById = function (roleName, funcIds, cb) { //编辑角色
    var instance = personInfoModel.instance();
    $("#personLoading").pshow();
    pajax.update({
        url: 'restRoleService/updateRoleById',
        data: {
            role_id: personInfoModel.instance().selRole.role_id,
            role_name: roleName,              //角色姓名 ,必须
            func_pack_ids: funcIds
        },
        success: function (res) {
            instance.roleCheckSign = true;
            $("#roleCheckFloat").pshow({ title: '角色详情' });
            $("#personNoticeWarn").pshow({ text: "修改成功！", state: "success" });
            cb();
        },
        error: function (errObj) {
            console.error('updateRoleById err');
            $("#personNoticeWarn").pshow({ text: "修改失败！", state: "failure" });
        },
        complete: function () {
            $("#personLoading").phide();
        }
    });
}