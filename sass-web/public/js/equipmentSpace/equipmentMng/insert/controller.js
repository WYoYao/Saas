var controllerInsert={
    querySystemForBuild:function(build_id){

        return new Promise(function(resolve, reject) {

            pajax.post({
                url: 'restObjectService/querySystemForBuild',
                data: {
                    build_id: build_id
                },
                success: function(data) {
                    resolve(data.data || []);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })

    },
    addEquip:function(argu){

        return new Promise(function(resolve,reject){
            pajax.post({
                url: 'restEquipService/addEquip',
                data: argu,
                success: function(data) {
                    resolve();
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    },
    /**
     * 设备管理-新增页:查询设备动态信息
     */
    queryEquipDynamicInfoForAdd:function(equip_category){

        return new Promise(function(resolve,reject){
            pajax.post({
                url: 'restEquipService/queryEquipDynamicInfoForAdd',
                data: {
                    equip_category:equip_category
                },
                success: function(data) {
                    resolve(data.data);
                },
                error: function() {
                    reject(err);
                },
                complete: function() {

                },
            });
        })
    }
}