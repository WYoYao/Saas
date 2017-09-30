function spaceInfoModel() { }

spaceInfoModel.instance = function () {
    if (!spaceInfoModel._instance) {
        spaceInfoModel._instance = new Vue({
            el: '#spaceMoleMange',
            data: {
                allBuild: [],//所以建筑
                selBuild: {},//首页选择的建筑
                allFloorInfo: [],//所有楼层信息
                floorDetail: {},//楼层详情信息
                floorTypeArr: ['普通楼层', '中庭', '室外', '其他'],
                allSpace: [],//所有空间信息
                floorSpace: [],//某楼层下的空间信息
                desFloorSpace: [],//拆毁的空间信息
                spaceRemind: [],//空间提醒数组
                spaceRemindCopy: [],//空间提醒数组 备份

                allSpaceCode: [],//所有空间功能类型
                allRentalCode: [],//租赁业态类型
                floorEditSign: true,//是否可以编辑
                floorShowTitle: '建筑下的全部空间',//是否显示所有floor

                spaceFloorArr: [],//空间添加中的楼层
                selSpaceFloor: {},//空间添加选中的楼层
                spaceDetail: {},//空间详细信息
            },
            methods: {
                upFloor: function (findex, item) {
                    if (findex == 0) return;//最高层
                    if (item.floor_sequence_id == -1) {//地下一层
                        this.allFloorInfo.forEach(function (ele) {
                            ele.floor_sequence_id++;
                        });
                    } else {
                        var temp = this.allFloorInfo[findex - 1];
                        item.floor_sequence_id = parseInt(item.floor_sequence_id) + 1;
                        temp.floor_sequence_id = parseInt(temp.floor_sequence_id) - 1;
                        Vue.set(this.allFloorInfo, findex - 1, item);
                        Vue.set(this.allFloorInfo, findex, temp);
                    }
                    spaceInfoController.updateFloorOrder();
                },
                downFloor: function (findex, item) {
                    if (findex == this.allFloorInfo.length - 1) return;//最底层
                    if (item.floor_sequence_id == 0) {//地上一层
                        this.allFloorInfo.forEach(function (ele) {
                            ele.floor_sequence_id--;
                        });
                    } else {
                        var temp = this.allFloorInfo[findex + 1];
                        item.floor_sequence_id = parseInt(item.floor_sequence_id) - 1;
                        temp.floor_sequence_id = parseInt(temp.floor_sequence_id) + 1;
                        Vue.set(this.allFloorInfo, findex + 1, item);
                        Vue.set(this.allFloorInfo, findex, temp);
                    }
                    spaceInfoController.updateFloorOrder();
                },
                checkFloorDetail: function (event, item) {//查看楼层详情
                    event.stopPropagation();
                    $("#floorCheckFloat").pshow();
                    $("#floorCheckFloat .contShow").css({ 'display': 'block' });
                    $("#floorCheckFloat .editShow").css({ 'display': 'none' });
                    spaceInfoController.queryFloorById(item);
                },
                spaceItemClick: function (item) {//空间模块的点击事件
                    $("#spaceCheckFloat").pshow();
                },
                floorItemClick: function (item) {//楼层模块的点击事件
                    spaceInfoController.querySpaceForFloor(item);
                    this.floorShowTitle = item.floor_local_name + '空间';
                    this.allFloorInfo.forEach(function (ele) {
                        ele.ischeck = false;
                    });
                    item.ischeck = true;
                },
                checkRemind: function (item) {//选中空间提醒
                    item.is_remind = !item.is_remind;
                },
                orderSignClick: function (event, item) {//详情工单标志的点击
                    event.stopPropagation();
                    var $orderList = $(event.currentTarget).find(".orderList");
                    if (item.orders.length == 1) {//只有一个工单

                    }
                    if (item.orders.length > 1) {
                        $orderList.is(":visible") ? $orderList.css({ 'display': 'none' }) : $orderList.css({ 'display': 'block' });
                    }
                },
                orderLiClick: function (item) {//工单列表一行的点击


                }
            },
            beforeMount: function () {
            },
            watch: {
            },
            computed: {
                hasUnder: function () {
                    var resArr = this.allFloorInfo.filter(function (ele) {
                        return ele.floor_sequence_id == -1;
                    });
                    var flag = resArr.length > 0 ? true : false;
                    return flag;
                }


            }
        });
    }
    return spaceInfoModel._instance;
}

function floorObj() {
    var self = this;
    self.floor_local_id = '';
    self.floor_local_name = '';
    self.floor_sequence_id = '';
    self.BIMID = '';
    self.floor_type = '';
    self.area = '';
    self.net_height = '';
    self.floor_func_type = '';
    self.permanent_people_num = '';
    self.out_people_flow = '';
    self.in_people_flow = '';
    self.exsit_people_num = '';
}
function spaceObj() {
    var self = this;
    self.build_id = "";
    self.floor_id = "";
    self.room_local_id = "";
    self.room_local_name = "";         //空间名称
    self.BIMID = "";                 //BIM编码
    self.room_func_type = ''            //空间功能区类型
    self.length = '';
    self.width = '';
    self.height = '';
    self.area = '';
    self.elec_cap = '';                  //配电容量
    self.intro = '';                     //备注文字
    self.tenant_type = '';               //租赁业态类型
    self.tenant = '';                   //所属租户
    self.permanent_people_num = '';      //空间内常驻人数
    self.out_people_flow = '';          //逐时流出人数
    self.in_people_flow = '';            //逐时流入人数
    self.exsit_people_num = '';          //逐时空间内现有人数
    self.elec_power = '';              //用电功率
    self.cool_consum = '';               //逐时冷量
    self.heat_consum = '';               //逐时热量
    self.ac_water_press = '';            //空调水压力
    self.water_consum = '';              //用水量
    self.water_press = '';               //自来水压力
    self.hot_water_consum = ''          //热水用水量
    self.hot_water_press = '';           //热水压力
    self.gas_consum = '';               //用燃气量
    self.gas_press = '';                 //燃气压力
    self.PMV = '';                     //热舒适PMV
    self.PPD = ''                        //热舒适PPD
}