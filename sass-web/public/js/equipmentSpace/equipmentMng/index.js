
var v = new VueReady('#component');


$(function() {
    // // 创建Vue 实例
    $("#globalloading").pshow();
    $("#component").show();

    v.createVue();

    v.initPage('equipmentMng');

    // v.initPage('equipmentMngDeatil', { equip_id: 'Eq1301020001003ACCCCC00C' });

    // v.initPage('equipmentMngInsert');
    // v.initPage('systemMng');

    // v.initPage('addSystem');

    // // 开发结束后删除
    // // 创建新建的页面内容
    // goProjectManageInsert();

})