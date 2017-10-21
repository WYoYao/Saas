var config = {
    port: 9030,
    isInitBase: false, //为true时将在网站启动时创建数据库及表，并生成数据配置页面
    isRealData: true, //是否获取真实数据，默认false，为false时，为虚假数据
    navigation: [{
        groupName: '项目管理',
        menu: [{
            id: '1',
            name: '项目信息管理',
            url: '/modulemanage'
        }]
    }, {
        groupName: '平台设置',
        menu: [{
            id: '2',
            name: '工单操作模块管理',
            url: '/platformsettings?index=0'
        }, {
            id: '3',
            name: '权限项管理',
            url: '/platformsettings?index=1'
        }, {
            id: '4',
            name: '动态模板管理',
            url: '/platformsettings?index=2'
        }]
    }],
    mainUrl: '/modulemanage',
    // commonLibUrl: 'http://192.168.100.103:9000/',
    commonLibUrl: 'http://192.168.100.196:9000/',
    // 开发环境
    serviceUrl: 'http://192.168.30.98:8080/saas-manage',
    //serviceUrl: 'http://192.168.100.248:8080/saas-manage',
    // 测试环境
    //serviceUrl: 'http://192.168.30.98:8080/saas-manage',
    // serviceUrl: 'http://192.168.30.96:8080/saas-manage',

};
var fileDomain = 'http://192.168.20.225:8080/';
// var fileDomain = 'http://192.168.20.225:8080/';
// var fileDomain = 'http://172.16.0.193:8080/';
config.imgUploadServiceUrl = fileDomain + 'image-service/common/image_upload?';
config.imgDownServiceUrl = fileDomain + 'image-service/common/image_get?';

config.fileUploadServiceUrl = fileDomain + 'image-service/common/file_upload?';
config.fileDownServiceUrl = fileDomain + 'image-service/common/file_get/';
module.exports = config;