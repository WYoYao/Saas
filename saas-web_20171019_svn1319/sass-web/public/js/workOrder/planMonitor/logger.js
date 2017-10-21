var planMonitorLogger = {
    init: function () {
        commonData.publicModel = model;
        new Vue({
            el: '#planMonitor',
            data: model,
            methods: methods,
            mounted: function () {
                $("#navBar").psel(0, false);
                controller.getTabList(); //获取table导航数据
                controller.getOrderStateList(); //获取工单状态列表
                // this.getListMonthDate(); //获取当前月和上下月天数
                // this.getListMonth(null, null); //获取当前月和上下月份
            },
        });

    }
}
