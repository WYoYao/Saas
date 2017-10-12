// 报废设备
var scrappedEquipment = function() {

    equipmentMngList.verifyDestroyEquip(v.instance.Scrapped.equip_id)
        .then(function(res) {

            if (res.can_destroy) {
                // 可以删除执行删除
                equipmentMngList.destroyEquip(v.instance.Scrapped.equip_id)
                    .then(function() {

                        var index = v.instance.ScrappedList.indexOf(v.instance.Scrapped);

                        v.instance.ScrappedList.splice(index, 1);

                        $("#equipmentMngpnotice").pshow({ text: '报废成功', state: "success" });
                    }).catch(function() {

                        $("#equipmentMngpnotice").pshow({ text: '报废失败', state: "failure" });
                    })


            } else {

                // 不可以删除提示原因
                $("#equipmentMngpnotice").pshow({ text: res.remind, state: "failure" });
            }
        })

    $("#confirmWindow").phide();


}

// 取消报废设备
var cancelScrappedEquipment = function() {

    $("#confirmWindow").phide();
}