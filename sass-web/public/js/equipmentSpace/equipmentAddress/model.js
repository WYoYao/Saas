var equipmentAddressModal = {
    merchantArr: [],               //商家列表
    selMerchantToInfo: {},          //选择的商家，用于展示详情
    selMerchantToUpdate: {},        //选择的商家，用于更新数据
    pageEachNumber: 50,

    tabSelIndex: 0 //tab选中
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
    /*转换brands*/
    changeBrands: function (brandsArr) {
        var newBrands = [];
        for (var j = 0; j < brandsArr.length; j++) {
            newBrands.push({ name: brandsArr[j] || '' });
        }
        return { brands: newBrands, brandStr: brandsArr.join(',') || '' };
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
            var arr = dataObj.data || [];
            for (var i = 0; i < arr.length; i++) {
                var curr = arr[i];
                var brands = curr.brands || [];
                var objBrand = equipmentLogic.changeBrands(brands);
                curr.brands = objBrand.brands;
                curr.brandStr = objBrand.brandStr;
            }
            equipmentAddressModal.merchantArr = arr;
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
        equipmentLogic.setValForMerchantToUpdate({});
    },
    /*编辑商家信息点点击事件时调用此方法，以清空缓存信息*/
    editMerchantEvent: function () {
        equipmentLogic.setValForMerchantToUpdate(JSON.parse(JSON.stringify(equipmentAddressModal.selMerchantToInfo)));
    },
    setValForMerchantToUpdate: function (objVal) {
        if (!objVal.brands) objVal.brands = [{ name: '' }];
        if (!objVal.insurer_info) objVal.insurer_info = [{}];
        equipmentAddressModal.selMerchantToUpdate = objVal;
    },
    /*保存商家---保存新增、编辑
    *infoType 信息点对应的属性名称，用于编辑时，从保存按钮的if属性上获取
    */
    saveMerchant: function (infoType, call) {
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
        if (equipmentAddressModal.selMerchantToUpdate.company_id) {
            obj[infoType] = equipmentAddressModal.selMerchantToUpdate[infoType];
            obj.company_id = equipmentAddressModal.selMerchantToUpdate.company_id;
            controllerFn = 'updateMerchant';
            successCall = function () {
                equipmentLogic.getMerchantById(function () {
                    if (typeof call == 'function') call();
                    var objVal = obj[infoType];
                    if (infoType == 'brands') {
                        var objBrand = equipmentLogic.changeBrands(objVal);
                        equipmentAddressModal.selMerchantToUpdate.brands = objBrand.brands;
                        equipmentAddressModal.selMerchantToUpdate.brandStr = objBrand.brandStr;

                        equipmentAddressModal.selMerchantToInfo.brands = objBrand.brands;
                        equipmentAddressModal.selMerchantToInfo.brandStr = objBrand.brandStr;
                    } else
                        equipmentAddressModal.selMerchantToInfo[infoType] = equipmentAddressModal.selMerchantToUpdate[infoType];
                    $('#eqaddressnotice').pshow({ text: '保存成功', state: 'success' });
                });
            };
        } else {
            obj = JSON.parse(JSON.stringify(equipmentAddressModal.selMerchantToUpdate));
            controllerFn = 'newMerchant';
            successCall = function () {
                if (typeof call == 'function') call();
                getCurrTabElement().psel(1, false);
                equipmentLogic.getMerchantArr(1, function () {
                    $('#eqaddressnotice').pshow({ text: '保存成功', state: 'success' });
                });
            };
        }
        obj.company_type = merchantType;

        if (merchantType == 4) constructorInsureInfo();
        if (merchantType == 2) {
            var oldBrands = obj.brands || [];
            var newBrands = [];
            for (var i = 0; i < oldBrands.length; i++) {
                newBrands.push(oldBrands[i].name);
            }
            obj.brands = newBrands;
        }

        equipmentAddressController[controllerFn](obj, successCall, function () {
            $('#eqaddressloading').phide();
            $('#eqaddressnotice').pshow({ text: '保存失败', state: 'failure' });
        });
    },
    /*删除商家
    */
    removeMerchantById: function (call) {
        $('#eqaddressloading').pshow();
        equipmentAddressController.removeMerchantById(equipmentAddressModal.selMerchantToInfo.company_id,
            function () {
                call();
                getCurrTabElement().psel(1, false);
                equipmentLogic.getMerchantArr(1, function () {
                    $('#eqaddressnotice').pshow({ text: '删除成功', state: 'success' });
                });
            }, function () {
                $('#eqaddressloading').phide();
                $('#eqaddressnotice').pshow({ text: '保存失败', state: 'failure' });
            });
    },
    /*添加品牌或添加保险单号*/
    addBrandOrInsure: function () {
        var merchantType = this.getMerchantType();
        switch (merchantType) {
            case '2':
                var oldBrands = equipmentAddressModal.selMerchantToUpdate.brands;
                oldBrands.push({ name: '' });
                break;
            case '4':
                break;
        }
    },
    /*删除品牌或删除保险单号*/
    removeBrandOrInsure: function (index) {
        var merchantType = this.getMerchantType();
        switch (merchantType) {
            case '2':
                var oldBrands = equipmentAddressModal.selMerchantToUpdate.brands;
                oldBrands.splice(index, 1);
                break;
            case '4':
                break;
        }
    }
};