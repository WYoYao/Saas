var equipmentAddressModal = {
    merchantArr: [],               //商家列表
    selMerchantToInfo: {},          //选择的商家，用于展示详情
    selMerchantToUpdate: {},        //选择的商家，用于更新数据
    pageEachNumber: 50,

    tabSelIndex:0 //tab选中
};

var equipmentAddressVueMethod = {
    /*选项卡的选择事件*/
    tabSel: function (event) {
        var index = event.pEventAttr.index;
        equipmentAddressModal.tabSelIndex = index;
        tabShow();
        getCurrTabElement().psel(1);
    },
    /*表格某一行的单击事件*/
    gridLineSel: function (model, event) {
        selfloatShow();
        equipmentAddressModal.selMerchantToInfo = model;
        equipmentLogic.getMerchantById();
    },
    /*表格翻页事件*/
    gridPageChange: function (event) {
        var currPageIndex = event.pEventAttr.pageIndex;
        equipmentLogic.getMerchantArr(currPageIndex);
    }
};


var equipmentLogic = {
    init: function () {
        new Vue({
            el: '#eqaddressWrap',
            data: equipmentAddressModal,
            methods: equipmentAddressVueMethod
        });
        Vue.nextTick(function () {
            $("#eqaddresstab").psel(0);
        });
    },
    /*获取公司类型 1 供应商、2 生产厂家、3 维修商、4 保险公司*/
    getMerchantType: function () {
        return ($('#eqaddresstab').psel() + 1).toString();
    },
    /*获取商家列表
    */
    getMerchantArr: function (pageIndex, call) {
        equipmentAddressModal.merchantArr = [];
        equipmentAddressModal.selMerchantToInfo = {};
        equipmentAddressModal.selMerchantToUpdate = {};
        var merchantType = this.getMerchantType();

        $('#eqaddressloading').pshow();
        equipmentAddressController.getMerchantArr(pageIndex, equipmentAddressModal.pageEachNumber, merchantType, function (data) {
            var dataObj = data || {};
            equipmentAddressModal.merchantArr = dataObj.data || [];
            var count = dataObj.count || 0;
            getCurrTabElement().pcount(count);
        }, function () {
            console.error('queryEquipCompanyList err');
        }, function () {
            $('#eqaddressloading').phide();
            if (typeof call == 'function') call();
        });
    },
    /*根据ID获取某一个商家*/
    getMerchantById: function (call) {
        $('#eqaddressloading').pshow();
        equipmentAddressController.getMerchantById(equipmentAddressModal.selMerchantToInfo.company_id,
            function (data) {
                data = data || {};
                var isCanDelete = data.can_delete || false;
                equipmentAddressModal.selMerchantToInfo.can_delete = isCanDelete;
            }, function () {
                console.error('getMerchantById err');
            }, function () {
                $('#eqaddressloading').phide();
                if (typeof call == 'function') call();
            });
    },
    /*添加商家点击事件时调用此方法，以清空缓存信息*/
    newMerchantEvent: function () {
        equipmentAddressModal.selMerchantToUpdate = {};
    },
    /*编辑商家信息点点击事件时调用此方法，以清空缓存信息*/
    editMerchantEvent: function () {
        equipmentAddressModal.selMerchantToUpdate = JSON.parse(JSON.stringify(equipmentAddressModal.selMerchantToInfo));
    },
    /*保存商家---保存新增、编辑
    *infoType 信息点对应的属性名称，用于编辑时，从保存按钮的if属性上获取
    */
    saveMerchant: function (infoType) {
        //构造保险单号
        function constructorInsureInfo() {
            var uploadJqTargets = $('#eqaddressfloat [insurefile]');
            var insurer_infoArr = obj.insurer_info || [];
            for (var i = 0; i < insurer_infoArr.length; i++) {
                var currInsureInfo = insurer_infoArr[i];
                var fileInfo = uploadJqTargets.eq(i).pval()[0] || {};
                currInsureInfo.insurance_file = {
                    type: '1',
                    name: fileInfo.name || '',
                    attachments: {
                        path: fileInfo.url,
                        toPro: 'url',
                        multiFile: false,
                        isNewFile: fileInfo.isNewFile || false,
                        fileType: 2
                    }
                };
            }
        };

        var controllerFn = '';
        var successCall;

        var obj = {};
        var merchantType = this.getMerchantType();
        obj.company_type = merchantType;
        if (equipmentAddressModal.selMerchantToUpdate.company_id) {
            obj[infoType] = equipmentAddressModal.selMerchantToUpdate[infoType]
            obj.company_id = equipmentAddressModal.selMerchantToUpdate.company_id;
            if (infoType == 'insurer_info') constructorInsureInfo();
            controllerFn = 'updateMerchant';
            successCall = function () {
                equipmentLogic.getMerchantById(function () {
                    $('#eqaddressnotice').pshow({ text: '保存成功', state: 'success' });
                });
            };
        } else {
            obj = equipmentAddressModal.selMerchantToUpdate;
            if (merchantType == 4)
                constructorInsureInfo();
            controllerFn = 'newMerchant';
            successCall = function () {
                getCurrTabElement().psel(1, false);
                equipmentLogic.getMerchantArr(1, function () {
                    $('#eqaddressnotice').pshow({ text: '保存成功', state: 'success' });
                });
            };
        }

        equipmentAddressController[controllerFn](obj, successCall, function () {
            $('#eqaddressloading').phide();
            $('#eqaddressnotice').pshow({ text: '保存失败', state: 'failure' });
        });
    },
    /*删除商家
    */
    removeMerchantById: function () {
        $('#eqaddressloading').pshow();
        equipmentAddressController.removeMerchantById(equipmentAddressModal.selMerchantToInfo.company_id,
            function () {
                getCurrTabElement().psel(1, false);
                equipmentLogic.getMerchantArr(1, function () {
                    $('#eqaddressnotice').pshow({ text: '删除成功', state: 'success' });
                });
            }, function () {
                $('#eqaddressloading').phide();
                $('#eqaddressnotice').pshow({ text: '保存失败', state: 'failure' });
            });
    }
};