var config = {
    port: 9090,
    isInitBase: false, //为true时将在网站启动时创建数据库及表，并生成数据配置页面
    isRealData: true, //是否获取真实数据，默认false，为false时，为虚假数据
    navigation: [{
        groupName: '',
        menu: [{
            id: '1',
            name: '首页',
            url: '/basicMng/person/index'
        }, {
            id: '2',
            name: '人员管理',
            url: '/basicMng/system/index'
        }, {
            id: '3',
            name: '排班管理',
            url: '/pages/basicMng/schedule/index'
        }]
    }, {
        groupName: '设备空间',
        menu: [{
            id: '4',
            name: '设备管理',
            url: '/equipmentSpace/equipmentMng/index'
        }, {
            id: '5',
            name: '空间管理',
            url: '/equipmentSpace/spaceMng/index'
        }, {
            id: '6',
            name: '设备通讯录',
            url: '/equipmentSpace/equipmentAddress/index'
        }, {
            id: '7',
            name: '打印设备空间名片',
            url: '/equipmentSpace/printCard/index'
        }]
    }, {
        groupName: '工单',
        menu: [{
            id: '8',
            name: '我的工单',
            url: '/workOrder/myWorkOrder/index'
        }, {
            id: '9',
            name: '计划监控',
            url: '/workOrder/planMonitor/index'
        }, {
            id: '10',
            name: '工单管理',
            url: '/workOrder/workOrderMng/index'
        }, {
            id: '11',
            name: '知识库管理',
            url: '/workOrder/SOP/index'
        }]
    }],
    mainUrl: '/layout',
    commonLibUrl: 'http://192.168.100.196:9000/',
    // commonLibUrl: 'http://127.0.0.1:9001/',
    // commonLibUrl: 'http://192.168.100.196:9000/',
    // commonLibUrl: 'http://127.0.0.1:9001/',

    // commonLibUrl: 'http://127.0.0.1:9001/',
    // serviceUrl: 'http://172.16.0.124:9080/saas',
    serviceUrl: 'http://192.168.30.98:8080/saas',
    // serviceUrl: 'http://192.168.100.248:8080/saas',

};
var fileDomain = 'http://192.168.20.225:8080/';
// var fileDomain = 'http://172.16.0.193:8080/';
config.imgUploadServiceUrl = fileDomain + 'image-service/common/image_upload?';
config.imgDownServiceUrl = fileDomain + 'image-service/common/image_get?';

config.fileUploadServiceUrl = fileDomain + 'image-service/common/file_upload?';
config.fileDownServiceUrl = fileDomain + 'image-service/common/file_get/';

module.exports = config;