var config = {
    port: 9091,
    isInitBase: false,
    isRealData: true,
    navigation: [{
        groupName: '平台监控',
        menu: [{
            id: '1',
            name: '工单引擎服务管理',
            url: '/workorderenginemanage'
        }, {
            id: '2',
            name: '非法访问监控管理',
            url: '/unaccessmonitormanage'
        }]
    }],
    developerId: '',
    developerSecret: '',
    commonLibUrl: 'http://192.168.100.196:9000/',
    //serviceUrl: 'http://192.168.20.225:8080/work-order-engine'
    serviceUrl: 'http://192.168.30.96:8080/saas-manage'

};

module.exports = config;