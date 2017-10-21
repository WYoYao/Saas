function personInfoModel() { }
personInfoModel.instance = function () {
    if (!personInfoModel._instance) {
        personInfoModel._instance = new Vue({
            el: '#personMoleMange',
            data: {
                allPositions: [],//岗位
                positionList: [],//不包含全部
                allSpeciality: [],//所有专业
                customTags: [],//所有标签
                nowPosition: null,//列表选的岗位
                personList: [],//人员列表
                personGroup: [],//人员缩略图列表
                selPerson: new personObj(),//选中的人员
                selPersonCopy: {},//选中人员备份
                perCheckSign: true,//人员管理是查看还是编辑
                workStateSign: true,//列表选的是离职还是在职
                idNumberInput: '',//身份证号的输入

                roleList: [],//角色列表
                funcPackList: [],//权限项列表
                funcListCopy: [],//权限项列表备份
                selRole: {},//选中的角色
                roleCheckSign: true,
            },
            methods: {
                personItemClick: function (item) {
                    $("#perDetailFloat").pshow({ title: '人员详情' });
                    personController.queryPersonDetailById(item);
                    this.perCheckSign = true;
                },
                roleItemClick: function (item) {
                    //$("#roleCheckFloat #roleFloatEdit").show();
                    //$("#roleCheckFloat .checkRoleCont").show();//查看隐藏
                    //$("#roleCheckFloat .editRoleCont").hide();//编辑显示
                    this.roleCheckSign = true;
                    function callback() {
                        $("#roleCheckFloat").pshow({ title: '角色详情' });
                    }
                    personController.queryRoleDetailById(item, callback);
                },
                funcItemClick: function (item) {
                    if (item.issel) {
                        item.issel = false;
                    } else {
                        item.issel = true;
                    }
                },
                delRoleClick: function (item, index) {
                    this.selPerson.role_ids.splice(index, 1);
                    this.selPerson.role_array.splice(index, 1);
                },
                delTagClick: function (item, index) {//删除标签
                    this.selPerson.custom_tag.splice(index, 1);
                },
                delSpecialClick: function (item, index) {//删除专业
                    this.selPerson.specialty_name.splice(index, 1);
                    this.selPerson.specialty.splice(index, 1);
                },
            },
            beforeMount: function () {
            },
            watch: {
                idNumberInput: function (value) {
                    var iscard = value.pisCard();//验证是否是身份证号
                    this.selPerson.id_number = value.ptrimHeadTail();
                    if (!iscard) return;
                    var birthObj = getBirthdayFromIdCard(value);
                    this.selPerson.birthday = birthObj.y + '-' + birthObj.M + '-' + birthObj.d;
                    if ($("#addPersonPage").is(":visible")) {
                        $("#addPersonPage [pertype='borthTimeForm']").psel({ y: birthObj.y, M: birthObj.M, d: birthObj.d });//出生年月赋值
                    } else {
                        $("#perEditDetail [pertype='borthTimeForm']").psel({ y: birthObj.y, M: birthObj.M, d: birthObj.d });//出生年月赋值
                    }
                }
            },
            computed: {
                noRoleNum: function () {
                    var noroles = this.personList.filter(function (ele) {
                        return !ele.roles
                    });
                    return noroles.length;
                }
            }
        });
    }
    return personInfoModel._instance;
}

function personObj() {
    var self = this;
    self.person_id = '';
    self.project_id = '';
    self.name = '';
    self.id_number = '';//身份证号
    self.phone_num = '';              //手机号
    self.gender = 'male';              //性别，male-男、female-女,必须
    self.birthday = '';
    self.person_num = '';             //员工编号
    self.position = '';             //岗位
    self.custom_tag = [];       //自定义标签
    self.specialty = [];       //专业编码
    self.specialty_name = [];        //专业编码
    self.id_photo = '';             //证件照片
    self.head_portrait = '';            //系统头像
    self.person_status = '';//是否在职
    self.roles = {};
    self.role_ids = [];
    self.role_array = [];
    self.id_photo_obj = {};
    self.head_portrait_obj = {};
}