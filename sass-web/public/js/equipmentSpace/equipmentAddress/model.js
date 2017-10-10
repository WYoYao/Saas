var equipmentAddressModal = {
    merchantArr: [],               //商家列表
    selMerchantToInfo: {},          //选择的商家，用于展示详情
    selMerchantToUpdate: {},        //选择的商家，用于更新数据
    selInsureOrderArr: [],          //选择的保险公司的单号列表
    pageEachNumber: 50,

    tabSelIndex: 0, //tab选中
    tabSelName: ''
};

var equipmentAddressVueMethod = {
    /*选项卡的选择事件*/
    tabSel: function (event) {
        var index = event.pEventAttr.index;
        equipmentAddressModal.tabSelIndex = index;
        tabShow();
        getCurrGridElement().psel(1);

        switch (index) {
            case 0:
                equipmentAddressModal.tabSelName = '供应商';
                break;
            case 1:
                equipmentAddressModal.tabSelName = '生产商';
                break;
            case 2:
                equipmentAddressModal.tabSelName = '维修商';
                break;
            case 3:
                equipmentAddressModal.tabSelName = '保险公司';
                break;
        }
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
    },
    /*保险公司列表--多个保险单号时，点击查看单号详情*/
    gridInsureOrderClick: function (model, event) {
        event.stopPropagation();
        var pageX = event.pageX;
        var pageY = event.pageY;
        equipmentAddressModal.selInsureOrderArr = model.insurer_info;
        $(".insuranceGridPop").css({
            left: pageX - 150,
            top: pageY - 20
        });
        $(".insuranceGridPop").show();
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
    /*构造商家*/
    constructorMerchant: function (arr) {
        arr = arr || [];
        for (var i = 0; i < arr.length; i++) {
            var curr = arr[i];
            var brands = curr.brands || [];
            var objBrand = equipmentLogic.changeBrands(brands);
            curr.brands = objBrand.brands;
            curr.brandStr = objBrand.brandStr;
        }
        return arr;
    },
    /*获取商家列表
    */
    getMerchantArr: function (pageIndex, call) {
        $('#eqaddressloading').pshow();
        equipmentAddressModal.merchantArr = [];
        equipmentAddressModal.selMerchantToInfo = {};
        equipmentAddressModal.selMerchantToUpdate = {};
        var merchantType = this.getMerchantType();
        equipmentAddressController.getMerchantArr(pageIndex, equipmentAddressModal.pageEachNumber, merchantType, function (data) {
            var dataObj = data || {};
            equipmentAddressModal.merchantArr = equipmentLogic.constructorMerchant(dataObj.data);
            var count = dataObj.count || 0;
            getCurrGridElement().pcount(count);
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
                var merchant = equipmentLogic.constructorMerchant([data])[0] || {};
                equipmentAddressModal.selMerchantToInfo = merchant;
                for (var i = 0; i < equipmentAddressModal.merchantArr.length; i++) {
                    if (equipmentAddressModal.merchantArr[i].company_id == merchant.company_id) {
                        equipmentAddressModal.merchantArr[i] = merchant;
                        break;
                    }
                }
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
        if (this.getMerchantType() == 4) {
            Vue.nextTick(function () {
                var insureArr = equipmentAddressModal.selMerchantToUpdate.insurer_info || [];
                var uploadJqTargets = $('#eqaddressfloat [insurefile]');
                for (var i = 0; i < uploadJqTargets.length; i++) {
                    var currInsureFile = insureArr[i].insurance_file || {};
                    uploadJqTargets.eq(i).pval({
                        url: currInsureFile.url, name: currInsureFile.name
                    });
                }
            });
        }
    },
    /*关闭浮动层*/
    closeFloat: function () {
        console.log($('#eqaddressfloat [insurefile]').length);
        $('#eqaddressfloat [insurefileedit]').precover();
        $('#eqaddressfloat [insurefile]').precover();
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
        $('#eqaddressloading').pshow();
        //构造保险单号
        var uploadJqTargets;
        function constructorInsureInfo() {
            var insurer_infoArr = obj.insurer_info || [];
            for (var i = 0; i < insurer_infoArr.length; i++) {
                var currInsureInfo = insurer_infoArr[i];
                var fileInfo = uploadJqTargets.eq(i).pval()[0] || {};
                currInsureInfo.insurance_file = {
                    type: '2',
                    name: fileInfo.name || '',
                    attachments: {
                        path: fileInfo.url,
                        toPro: 'url',
                        multiFile: false,
                        isNewFile: fileInfo.isNewFile || false,
                        fileType: 2,
                        fileName: fileInfo.name,
                        fileSuffix: fileInfo.suffix
                    }
                };
            }
        };

        var controllerFn = '';
        var successCall;

        var obj = {};
        var merchantType = this.getMerchantType();
        if (equipmentAddressModal.selMerchantToUpdate.company_id) {
            uploadJqTargets = $('#eqaddressfloat [insurefileedit]');
            obj[infoType] = equipmentAddressModal.selMerchantToUpdate[infoType];
            obj.company_id = equipmentAddressModal.selMerchantToUpdate.company_id;
            controllerFn = 'updateMerchant';
            successCall = function () {
                equipmentLogic.getMerchantById(function () {
                    if (typeof call == 'function') call();
                    //var objVal = obj[infoType];
                    //if (infoType == 'brands') {
                    //    var objBrand = equipmentLogic.changeBrands(objVal);
                    //    equipmentAddressModal.selMerchantToUpdate.brands = objBrand.brands;
                    //    equipmentAddressModal.selMerchantToUpdate.brandStr = objBrand.brandStr;

                    //    equipmentAddressModal.selMerchantToInfo.brands = objBrand.brands;
                    //    equipmentAddressModal.selMerchantToInfo.brandStr = objBrand.brandStr;
                    //} else
                    //    equipmentAddressModal.selMerchantToInfo[infoType] = equipmentAddressModal.selMerchantToUpdate[infoType];
                    $('#eqaddressnotice').pshow({ text: '保存成功', state: 'success' });
                });
            };
        } else {
            uploadJqTargets = $('#eqaddressfloat [insurefile]');
            obj = JSON.parse(JSON.stringify(equipmentAddressModal.selMerchantToUpdate));
            controllerFn = 'newMerchant';
            successCall = function () {
                if (typeof call == 'function') call();
                getCurrGridElement().psel(1, false);
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
                getCurrGridElement().psel(1, false);
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
                var oldInsureInfoArr = equipmentAddressModal.selMerchantToUpdate.insurer_info;
                oldInsureInfoArr.push({
                    insurer_num: '',
                    insurance_file: { type: '2', name: '', url: '' }
                });
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
                var oldInsureInfoArr = equipmentAddressModal.selMerchantToUpdate.insurer_info;
                oldInsureInfoArr.splice(index, 1);
                break;
        }
    }
};