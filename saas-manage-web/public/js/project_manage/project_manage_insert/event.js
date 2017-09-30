var valiteSETimt = function(arr) {

    arr = _.isArray(arr) ? arr : [arr];

    var title = {
        'contract_valid_term': '托管合同有效期限',
        'operation_valid_term': '公司经营有效期限',
    }

    return arr.map(function(item) {

        item.title = title[item.key];

        return item;

    }).reduce(function(con, item) {

        if (!con) return con;

        if (item.start && item.end) {

            con = +new Date(item.start) > +new Date(item.end) ? false : true;

            if (!con) {
                $("#projectManagePopNoticeWarn").pshow({ text: item.title + "开始时间不能大于结束时间！", state: "failure" });
            }
        }

        return con;

    }, true);
}


// 提交草稿只对项目名称做效验
var projectManageSubmitDraft = function() {

    var params = v.instance.Customer;

    // 验证日期
    if (!valiteSETimt([{
            key: 'contract_valid_term',
            start: v.instance.Customer.contract_valid_term_start,
            end: v.instance.Customer.contract_valid_term_end,
        }, {
            key: 'operation_valid_term',
            start: v.instance.Customer.operation_valid_term_start,
            end: v.instance.Customer.operation_valid_term_end,
        }])) return;


    // 图片的转换
    params.pictures = [];
    params.business_license = "";

    //营业执照，图片集合
    var businessImgs = $("#businessImg").pval();
    //产权证/托管合同，图片集合
    var picturesImg = $("#picturesImg").pval();

    // 对应的图片几个转换成为的对应的上传附件
    function Covert(key, imgobj) {
        return {
            path: imgobj.url,
            fileName: imgobj.name,
            multiFile: key == 'pictures',
            toPro: key,
            fileSuffix: imgobj.suffix,
            fileType: 1,
            isNewFile: !!imgobj.suffix
        }
    };

    // 图片附件
    var attachments = businessImgs.map(Covert.bind(this, 'business_license'))
        .concat(
            picturesImg.map(Covert.bind(this, 'pictures'))
        );

    // 附加到参数上
    if (attachments.length) params.attachments = attachments.length && attachments.length > 1 ? attachments : attachments.length ? [attachments][0] : [];

    attachments = null;

    // 验证方法的类型
    var c = new Check();

    if (!c.is(params.company_name, {
            type: 'font',
            minlen: 1,
            maxlen: 15
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "保存草稿时企业名称不能为空！", state: "failure" });

        return;
    }


    //===========================非必填=====================================
    if (params.company_name) {

        if (!c.is(params.company_name, {
                type: 'font',
                minlen: 1,
                maxlen: 15
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的公司名称！", state: "failure" });

            return;
        }
    }

    if (params.legal_person) {

        if (!c.is(params.legal_person, {
                type: 'font',
                minlen: 1,
                maxlen: 6
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的公司法人！", state: "failure" });

            return;
        }
    }

    if (params.operation_valid_term_start) {

        if (!c.is(params.operation_valid_term_start, {
                type: 'yyyy-mm-dd'
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的公司经营有效期限！", state: "failure" });

            return;
        }
    }

    if (params.operation_valid_term_end) {

        if (!c.is(params.operation_valid_term_end, {
                type: 'yyyy-mm-dd'
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的公司经营有效期限！", state: "failure" });
            return;
        }
    }

    if (params.contract_valid_term_start) {

        if (!c.is(params.contract_valid_term_start, {
                type: 'yyyy-mm-dd'
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的托管合同有效期限！", state: "failure" });
            return;
        }
    }

    if (params.contract_valid_term_end) {

        if (!c.is(params.contract_valid_term_end, {
                type: 'yyyy-mm-dd'
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的托管合同有效期限！", state: "failure" });
            return;
        }
    }

    if (params.tool_type) {

        if (!c.is(params.tool_type, {
                type: 'font',
                minlen: 1,
                maxlen: 5
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请选择客户选用工程工具！", state: "failure" });

            return;
        }
    }

    if (params.note) {

        if (!c.is(params.note, {
                minlen: -1,
                maxlen: 100
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "您输入备注的文本过长！", state: "failure" });
            return;
        }
    }

    if (params.contact_person) {

        if (!c.is(params.contact_person, {
                type: 'font',
                minlen: 0,
                maxlen: 6
            }).successful) {
            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的联系人！", state: "failure" });

            return;
        }
    }

    if (params.contact_phone) {

        if (!c.is(params.contact_phone, {
                type: 'phone',
            }).successful) {
            $("#projectManagePopNoticeWarn").pshow({ text: "请输入正确的手机号！", state: "failure" });

            return;
        }
    }

    if (params.mail) {

        if (!c.is(params.mail, {
                type: 'email',
            }).successful) {

            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的邮箱！", state: "failure" });

            return;
        }
    }

    if (params.project_local_name) {

        if (!c.is(params.project_local_name, {
                type: 'font',
                minlen: 0,
                maxlen: 15
            }).successful) {
            $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的本地名称！", state: "failure" });

            return;
        }
    }
    //===========================非必填=====================================

    var cof = {};
    var bool = params.build_list.reduce(function(bool, item, index) {

        cof[item.build_local_name] = "";

        // 有一个验证不通过后面不再进行验证
        if (!bool) return bool;

        return c.is(item.build_local_name, {
            type: 'font',
            minlen: 1,
            maxlen: 15,
        }).successful && c.is(item.build_age, {
            type: 'int',
            minlen: 4,
            maxlen: 5,
        }).successful


    }, true);

    // 验证重复
    if (Object.keys(cof).length < params.build_list.length) return;
    if (!bool) return;

    projectManageInsert.postCustomer(true, params, function(res) {
        // 返回列表页面

        v.initPage('projectList');
        v.navigatorTo('projectList');
    }, !!params.attachments)

    // 调用保存草稿的接口


};

// 绑定公司经营有效期限
var changeOperation = function() {

    var obj = $("#operationDate").psel(),
        operation_valid_term_start,
        operation_valid_term_end;

    operation_valid_term_start = obj.startTime;
    operation_valid_term_end = obj.endTime;

    v.instance.Customer.operation_valid_term_start = new Date(operation_valid_term_start).format('yyyy-MM-dd');
    v.instance.Customer.operation_valid_term_end = new Date(operation_valid_term_end).format('yyyy-MM-dd');

    // console.log($("#operationDate").psel());
    // console.log(arguments);
}

// 绑定托管合同有效期限
var changeContract = function() {

    var obj = $("#contractDate").psel(),
        contract_valid_term_start,
        contract_valid_term_end;

    contract_valid_term_start = obj.startTime;
    contract_valid_term_end = obj.endTime;

    v.instance.Customer.contract_valid_term_start = new Date(contract_valid_term_start).format('yyyy-MM-dd');
    v.instance.Customer.contract_valid_term_end = new Date(contract_valid_term_end).format('yyyy-MM-dd');
}

// 提交确认
var projectManageSubmitInsert = function() {

    var params = v.instance.Customer;



    params.account = params.mail;


    params.business_license = '';
    params.pictures = [''];

    // 验证方法的类型
    var c = new Check();

    if (!c.is(params.company_name, {
            type: 'font',
            minlen: 1,
            maxlen: 15
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "公司名称不能为空！", state: "failure" });

        return;
    }

    if (!c.is(params.legal_person, {
            type: 'font',
            minlen: 1,
            maxlen: 6
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "公司法人不能为空！", state: "failure" });

        return;
    }

    if (!c.is(params.operation_valid_term_start, {
            type: 'yyyy-mm-dd'
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的公司经营有效期限开始日期！", state: "failure" });

        return;
    }

    if (!c.is(params.operation_valid_term_end, {
            type: 'yyyy-mm-dd'
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的公司经营有效期限开始日期！", state: "failure" });
        return;
    }

    if (!c.is(params.contract_valid_term_start, {
            type: 'yyyy-mm-dd'
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的托管合同有效期限日期！", state: "failure" });
        return;
    }

    if (!c.is(params.contract_valid_term_end, {
            type: 'yyyy-mm-dd'
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的托管合同有效期限日期！", state: "failure" });
        return;
    }

    if (!c.is(params.tool_type, {
            type: 'font',
            minlen: 1,
            maxlen: 5
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "请选择客户选用工程工具！", state: "failure" });

        return;
    }

    if (!c.is(params.note, {
            minlen: -1,
            maxlen: 100
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "您输入备注的文本过长！", state: "failure" });
        return;
    }

    if (!c.is(params.contact_person, {
            type: 'font',
            minlen: 0,
            maxlen: 6
        }).successful) {
        $("#projectManagePopNoticeWarn").pshow({ text: "请输入联系人！", state: "failure" });

        return;
    }

    if (!c.is(params.contact_phone, {
            type: 'phone',
        }).successful) {
        $("#projectManagePopNoticeWarn").pshow({ text: "请输入正确的手机号！", state: "failure" });

        return;
    }

    if (!c.is(params.mail, {
            type: 'email',
        }).successful) {

        $("#projectManagePopNoticeWarn").pshow({ text: "请输入有效的邮箱！", state: "failure" });

        return;
    }

    if (!c.is(params.project_local_name, {
            type: 'font',
            minlen: 0,
            maxlen: 15
        }).successful) {
        $("#projectManagePopNoticeWarn").pshow({ text: "请输入本地名称！", state: "failure" });

        return;
    }

    if (v.instance.project_list.map(function(item) {
            return item.project_local_name;
        }).indexOf(params.project_local_name) != -1) {

        $("#projectManagePopNoticeWarn").pshow({ text: "本地名称与现有本地名称重复", state: "failure" });

        return;
    }



    params.build_list = params.build_list || [];

    var cof = {};
    var bool = params.build_list.reduce(function(bool, item, index) {

        cof[item.build_local_name] = "";

        // 有一个验证不通过后面不再进行验证
        if (!bool) return bool;

        return c.is(item.build_local_name, {
            type: 'font',
            minlen: 1,
            maxlen: 15,
        }).successful && c.is(item.build_age, {
            type: 'int',
            minlen: 4,
            maxlen: 5,
        }).successful


    }, true);

    // 验证重复
    if (Object.keys(cof).length < params.build_list.length) return;

    if (bool) return;


    // 时间类型的验证
    var canSubmit = [{
        key: '托管合同有效期限',
        start: v.instance.Customer.contract_valid_term_start,
        end: v.instance.Customer.contract_valid_term_end,
    }, {
        key: '公司经营有效期限',
        start: v.instance.Customer.operation_valid_term_start,
        end: v.instance.Customer.operation_valid_term_end,
    }].reduce(function(con, item) {

        if (!con) return con;

        if (item.start && item.end) {

            con = +new Date(item.start) > +new Date(item.end) ? false : true;

            if (!con) {
                $("#projectManagePopNoticeWarn").pshow({ text: item.key + "开始时间不能大于结束时间！", state: "failure" });
            }

        }

        return con;

    }, true);
    if (!canSubmit) return;

    projectManageInsert.postCustomer(false, params, function(res) {
        // 返回列表页面
        v.initPage('projectList');
        v.navigatorTo('projectList');
    })



};


;
(function() {

    // 根据传入的行政区域的对象查询对应的气候类型,和发展水平
    function setDevelopLevelAndClimate(code) {

        // 获取实例
        var instance = v.instance;
        // 获取对应的城市水平的内容
        var regionCode = projectManageListModel.regionCode();

        regionCode.then(function(region) {


            //  查询发展水平
            var level = region.queryDevelopLevel(code.developLevel || '');
            //  查询气候
            var climate = region.queryClimate(code.climate || '');

            // 绑定省市县对应的气候区 发展水平
            if (level) {
                // 根据code 查询对应的索引
                var index = queryIndexByKey(v.instance.developLevelList, { code: level.code })

                $("#developLevelId").psel(index)

                instance.Customer.urban_devp_lev_name = v.instance.developLevelList[index].name;
                instance.Customer.urban_devp_lev = level.code || instance.Customer.urban_devp_lev;
            }

            if (climate) {
                // 根据code 查询对应的索引
                var index = queryIndexByKey(v.instance.climateList, { code: climate.code })

                $("#climateId").psel(index)
                instance.Customer.climate_zone_name = v.instance.climateList[index].name;
                instance.Customer.climate_zone = climate.code || instance.Customer.climate_zone;
            }

        });

        // 下拉选择的时候绑定对应的经纬度
        instance.Customer.longitude = code.longitude || instance.Customer.longitude;
        instance.Customer.latitude = code.latitude || instance.Customer.latitude;
        instance.Customer.altitude = code.altitude || instance.Customer.altitude;
    }

    // 选择发展水平事件
    var selDevelopLevel = function(level) {
        v.instance.Customer.urban_devp_lev = level.code || instance.Customer.urban_devp_lev;
        v.instance.Customer.urban_devp_lev_name = level.name || instance.Customer.urban_devp_lev_name;
    }

    // 选择气候区域
    var selClimate = function(climate) {
        v.instance.Customer.climate_zone = climate.code || instance.Customer.climate_zone;
        v.instance.Customer.climate_zone_name = climate.name || instance.Customer.climate_zone_name;
    }

    // 选择省份事件
    var selProvince = function(obj) {

        // 获取实例
        var instance = v.instance;

        // 清空已经绑定的市县 发展水平 等参数
        instance.Customer.city = ""; //市编码
        instance.Customer.district = ""; //市内编码
        instance.Customer.climate_zone = ""; //气候区编码
        instance.Customer.urban_devp_lev = ""; //城市发展水平编码
        instance.Customer.longitude = ""; //经度
        instance.Customer.latitude = ""; //维度
        instance.Customer.altitude = ""; //海拔
        $("#shi").precover();
        $("#xian").precover();
        $("#developLevelId").precover();
        $("#climateId").precover();


        instance.Customer.province = obj.code;

        //  查询发展水平/气候水平
        setDevelopLevelAndClimate(obj);

        // 绑定下拉菜单的列表
        instance.cityList = obj.cities;
        instance.countyList = [];

        console.log(JSON.stringify(obj));


    }

    // 选择城市事件
    var selCity = function(obj) {

        // 获取实例
        var instance = v.instance;

        // 清空已经绑定的市县 发展水平 等参数
        instance.Customer.district = ""; //市内编码
        // instance.Customer.climate_zone = ""; //气候区编码
        // instance.Customer.urban_devp_lev = ""; //城市发展水平编码
        instance.Customer.longitude = ""; //经度
        instance.Customer.latitude = ""; //维度
        instance.Customer.altitude = ""; //海拔

        $("#xian").precover();
        $("#developLevelId").precover();
        $("#climateId").precover();



        // 获取对应的城市水平的内容
        var regionCode = projectManageListModel.regionCode();

        // 绑定订单中需要的参数
        instance.Customer.city = obj.code;

        instance.Customer.province_city_name = obj.name;

        //  查询发展水平/气候水平
        setDevelopLevelAndClimate(obj);

        // 绑定下拉列表
        instance.countyList = obj.districts;


        console.log(JSON.stringify(obj));
    }

    // 选择区县事件
    var selCounty = function(obj) {

        // 获取实例
        var instance = v.instance;

        // 清空已经绑定的市县 发展水平 等参数
        // instance.Customer.climate_zone = ""; //气候区编码
        // instance.Customer.urban_devp_lev = ""; //城市发展水平编码
        instance.Customer.longitude = ""; //经度
        instance.Customer.latitude = ""; //维度
        instance.Customer.altitude = ""; //海拔
        $("#developLevelId").precover();
        $("#climateId").precover();

        // 获取对应的城市水平的内容
        var regionCode = projectManageListModel.regionCode();

        // 绑定订单中需要绑定的参数
        instance.Customer.district = obj.code;

        //  查询发展水平/气候水平
        setDevelopLevelAndClimate(obj);

    }

    // 选择建筑类型列表
    var selbuildingType = function(obj, target) {

        var index = /\d+/g.exec(target._currentTarget.getAttribute('id'));
        var build = v.instance.Customer.build_list[index];
        build.build_func_type = obj.code;
    }

    // 暴露到的window 对象上面
    window.selbuildingType = selbuildingType;
    window.selDevelopLevel = selDevelopLevel;
    window.selClimate = selClimate;
    window.selProvince = selProvince;
    window.selCity = selCity;
    window.selCounty = selCounty;

})();