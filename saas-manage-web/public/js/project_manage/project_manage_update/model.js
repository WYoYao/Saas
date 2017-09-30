;
(function() {
    /*页面model*/
    function projectManageUpdateModel() {}


    v.pushComponent({
        name: 'projectUpdate',
        el: '#project_manage_update',
        data: {
            customerUpdate: {},
            ptimeuse: {
                operation_valid_term: {
                    isUpdate: false,
                    oldValue: {
                        stime: '',
                        etime: '',
                    }, // 原始参数避免取消修改
                    newValue: {
                        stime: '',
                        etime: '',
                    },
                    block: '',
                },
                contract_valid_term: {
                    isUpdate: false,
                    oldValue: {
                        stime: '',
                        etime: '',
                    }, // 原始参数避免取消修改
                    newValue: {
                        stime: '',
                        etime: '',
                    },
                    block: '',
                },
            },
            insertBuildList: [],
            showToolType: false, // 是否显示工具
        },
        beforeMount: function() {

            var _that = this;


            var getCustomer = new Promise(function(resolve) {

                projectManageUpdate.getCustomerById(_that.customerUpdate, function(info) {

                    _that.customerUpdate = info;

                    resolve(info);
                })
            });

            /**
             * 绑定各个建筑类型
             */
            getCustomer.then(function() {

                // 获取城市相关对象
                var regionCode = projectManageListModel.regionCode();
                // 绑定相关的选项
                regionCode.then(function(res) {

                    // 绑定建筑类型列表
                    _that.buildingTypeList = res.getBuildingType();

                })

                /**
                 * 绑定各个建筑类型
                 */
                if (_.isArray(_that.customerUpdate.build_list) && _that.customerUpdate.build_list.length) {

                    _that.customerUpdate.build_list.forEach(function(item, index) {

                        if (!item.build_func_type) {
                            $("#UpdatedevelopLevelId" + index).precover();
                        }

                        var i = queryIndexByKey(v.instance.buildingTypeList, { code: item.build_func_type });
                        if (i >= 0) {
                            $("#UpdatedevelopLevelId" + index).psel(i);
                            return;
                        }

                    }, this);
                }

            })

            /**
             * 绑定日历控件
             */
            getCustomer.then(function(info) {

                /**
                 * 日历控件赋值
                 */
                // 公司经营有效期限开始日期
                // 编辑前后值
                _that.ptimeuse.operation_valid_term.newValue = {
                    stime: _that.customerUpdate.operation_valid_term_start,
                    etime: _that.customerUpdate.operation_valid_term_end,
                }

                _that.ptimeuse.operation_valid_term.oldValue = {
                    stime: _that.customerUpdate.operation_valid_term_start,
                    etime: _that.customerUpdate.operation_valid_term_end,
                }

                // 对应的日历控件
                _that.ptimeuse.operation_valid_term.block = $("#operation_valid_term");

                // 托管合同有效期限开始日期
                // 编辑前后值
                _that.ptimeuse.contract_valid_term.newValue = {
                    stime: _that.customerUpdate.contract_valid_term_start,
                    etime: _that.customerUpdate.contract_valid_term_end,
                }

                _that.ptimeuse.contract_valid_term.oldValue = {
                    stime: _that.customerUpdate.contract_valid_term_start,
                    etime: _that.customerUpdate.contract_valid_term_end,
                }

                // 对应的日历控件
                _that.ptimeuse.contract_valid_term.block = $("#contract_valid_term");
            })

            /**
             * 绑定证书等图片控件
             */
            getCustomer.then(function(info) {

                $("#ubusinessImg").precover();
                $("#upicturesImg").precover();

                if (info.business_license.length) {
                    $("#ubusinessImg").pval([{ name: 'isOld', url: info.business_license }]);
                }

                if (_.isArray(info.pictures) && info.pictures.length) {
                    $("#upicturesImg").pval(info.pictures.map(function(str) {
                        return {
                            name: 'isOld',
                            url: str,
                        };
                    }));
                }
            })



        },
        methods: {
            // 删除对应的新建建筑体
            _clickAddBuildCancel: function(index) {
                this.insertBuildList.splice(index, 1);
            },
            // 提交对应的新建建筑体
            _clickAddBuildSubmit: function(index) {

                var _that = this;
                var item = this.insertBuildList[index];

                if (!item.build_local_name) {
                    $("#projectManagePopNoticeWarn").pshow({ text: "本地名称不能为空！", state: "failure" });
                    return;
                }
                if (!item.build_age) {
                    $("#projectManagePopNoticeWarn").pshow({ text: "建筑年代不能为空！", state: "failure" });
                    return;
                }
                if (!item.build_func_type) {
                    $("#projectManagePopNoticeWarn").pshow({ text: "请选择建筑类型！", state: "failure" });
                    return;
                }


                projectManageUpdate.addConfirmBuild(item, function() {
                    _that.insertBuildList.splice(index, 1);
                    _that.customerUpdate.build_list.push(item);
                })
            },
            // 设置建筑信息
            _clickSubmitBuild: function(index) {

                var val = $("#UpdatedevelopLevelId" + index).psel();

                var i = val.index;

                var option = v.instance.buildingTypeList[i];

                var item = this.customerUpdate.build_list[index];

                item.build_func_type = option.code;
                item.build_func_type_name = option.name;

                item.isShowIDE = false;

                Vue.set(this.customerUpdate.build_list, index, item);

                projectManageUpdate.updateConfirmBuild({
                    build_id: item.build_id, //建筑id，必须
                    build_code: item.build_code, //建筑编码，必须
                    build_age: item.build_age, //建筑年代
                    build_func_type: item.build_func_type //建筑功能类型编码
                })
            },
            _clickCancelBuild: function(index) {

                var item = this.customerUpdate.build_list[index];
                var i = queryIndexByKey(v.instance.buildingTypeList, { code: item.build_func_type });
                if (i >= 0) {
                    $("#UpdatedevelopLevelId" + index).psel(i);
                }
                item.isShowIDE = false;

                Vue.set(this.customerUpdate.build_list, index, item);

            },
            // 显示下拉菜单的建筑体
            _clickShowBuild: function(index, key, value) {
                var item = this.customerUpdate.build_list[index];

                item[key] = value;

                Vue.set(this.customerUpdate.build_list, index, item);
            },
            // 日期控件编辑隐藏
            ptimeuseupdate: function(key) {
                this.ptimeuse[key].isUpdate = true;
            },
            // 隐藏编辑文本日历框
            ptimeusecancelupdate: function(key) {
                this.ptimeuse[key].isUpdate = false;
            },
            // 提交修改日期
            ptimeuseSubmitUpdate: function(key) {
                var obj = $(this.ptimeuse[key].block).psel();
                this.ptimeuse[key].isUpdate = false;

                // 修改父级的值
                var stime = new Date(obj.startTime).format('yyyy-MM-dd');
                var etime = new Date(obj.endTime).format('yyyy-MM-dd');


                if (!valiteSETimt({
                        key: key,
                        start: stime,
                        end: etime,
                    })) return;


                this.ptimeuse[key].oldValue = {
                    stime: stime,
                    etime: etime,
                }

                this.ptimeuse[key].newValue = {
                    stime: stime,
                    etime: etime,
                }

                var startkey = key + '_start';
                var endkey = key + '_end';

                var req = {
                    customer_id: this.customerUpdate.customer_id,
                };

                req[startkey] = stime;
                req[endkey] = etime;

                projectManageUpdate.postProjectManageSubmitUpdate(req, function(data) {
                    if (data.Result == 'success') {
                        console.log('调用成功');
                    } else {
                        console.log('调用失败');
                    }
                });


            },
            // 为子组件赋值使用
            setCustomerUpdate: function(key, value) {
                this.customerUpdate[key] = value;
            },
            setvalue: function(key, value, cb) {


                var enumValit = {
                    "company_name": "企业名称不能为空", //公司名称 ,必须
                    "legal_person": "公司法人不能为空", //公司法人
                    "contact_person": "联系人姓名不能为空", //联系人
                    "contact_phone": "联系人手机号码不能为空", //联系人电话
                    "longitude": "经度不能为空", //经度
                    "latitude": "维度不能为空", //维度
                    "altitude": "海拔不能为空", //海拔
                };

                if (Object.keys(enumValit).indexOf(key) != -1 && (value.length == 0 || value == '--')) {
                    $("#projectManagePopNoticeWarn").pshow({ text: enumValit[key], state: "failure" });
                    cb(true);
                    return;
                }

                var _that = this;
                projectManageUpdate.postProjectManageSubmitUpdate({
                    customer_id: _that.customerUpdate.customer_id,
                    [key]: value,
                }, function() {
                    cb(false);
                });

            },
            update: function(key) {
                this.customerUpdate
            },
            // 修改的項目的客户选用工程工具
            clickSetCustomerUpdateToolType(bool) {

                this.Oldtool_type = this.customerUpdate.tool_type;

                this.customerUpdate.tool_type = bool ? 'Web' : 'Revit';
                // projectManageUpdate.postProjectManageSubmitUpdate({
                //     customer_id: this.customerUpdate.customer_id,
                //     tool_type: bool ? 'Web' : 'Revit',
                // }, function(data) {
                //     if (data.Result == 'success') {
                //         console.log('编辑成功');
                //     } else {
                //         console.log('编辑失败');
                //     }
                // });
            },
            // 提交工程工具的修改
            clickSubmitCustomerUpdateToolType() {

                var tool_type = this.customerUpdate.tool_type;
                projectManageUpdate.postProjectManageSubmitUpdate({
                    customer_id: this.customerUpdate.customer_id,
                    tool_type: tool_type,
                }, function(data) {

                });
            },
            // 取消提交修改工具
            clickCancelCustomerUpdateToolType() {
                this.customerUpdate.tool_type = this.Oldtool_type;
                this.Oldtool_type = this.customerUpdate.tool_type;


            },
            // 添加建筑的管理
            addBuildUpdate: function() {

                var _that = this;
                // 初始化结构
                if (!_.isArray(this.insertBuildList)) this.insertBuildList = [];

                _that.insertBuildList.push({
                    "customer_id": _that.customerUpdate.customer_id, //客户id ,必须
                    "project_id": _that.customerUpdate.project_id, //项目id/项目编码 ,必须
                    "build_local_name": "", //建筑本地名称
                    "build_age": "", //建筑年代
                    "build_func_type": "" //建筑功能类型编码
                })

            },
            // 更新建筑
            updateBuildByIndex: function(index, key, isSubmit, value) {
                // console.log(index, key, value);
                this.customerUpdate.build_list[index][key] = value;


                if (isSubmit) {
                    var item = this.customerUpdate.build_list[index];
                    projectManageUpdate.updateConfirmBuild({
                        "build_id": item.build_id, //建筑id，必须
                        "build_code": item.build_code, //建筑编码，必须
                        "build_age": item.build_age, //建筑年代
                        "build_func_type": item.build_func_type //建筑功能类型编码
                    })

                }
            },
            _repassword: function() {
                var _that = this;
                var req = {
                    customer_id: _that.customerUpdate.customer_id
                }

                projectManageUpdate.resetCustomerPasswd(req, function() {

                })
            }

        }
    });

    projectManageUpdateModel.instance = function(customerUpdate) {

        if (customerUpdate && projectManageUpdateModel._instance) {
            projectManageUpdateModel._instance.customerUpdate = customerUpdate;
        }

        if (!projectManageUpdateModel._instance) {

            Vue.config.devtools = true;
            Vue.config.debug = true;




            projectManageUpdateModel._instance = new Vue({
                el: '#project_manage_update',
                data: {
                    customerUpdate: {}
                },
                // 组件加载之前加载数据
                beforeMount: function() {
                    // 将上个页面中查询出来的绑定到当前控件
                    this.customerUpdate = customerUpdate;
                },
                methods: {
                    // 为子组件赋值使用
                    set: function(key, value) {
                        this.customerUpdate[key] = value;
                    },
                    setvalue: function(key, value) {

                        projectManageUpdate.postProjectManageSubmitUpdate({
                            customerUpdate_id: this.customerUpdate.customerUpdate_id,
                            key: value,
                        }, function(data) {
                            if (data.Result == 'success') {
                                console.log('调用成功');
                            } else {
                                console.log('调用失败');
                            }
                        });
                    }
                }
            })
        }

        return projectManageUpdateModel._instance;
    }

    window.projectManageUpdateModel = projectManageUpdateModel;
})();