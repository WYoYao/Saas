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
            
            var str=JSON.stringify(argu);

            if(argu.attachments.length>0){
                bool=true;
            }else if(str.match(/attachments/g).length>1){
                bool=true;
            }else{
                bool=false;
            }

            if(!argu.attachments.length){
                delete argu.attachments;
            }else{

                argu = ['build_name','system_name','equip_category_name'].reduce(function(con,key){

                    if(con[key]){
                        delete con[key];
                    };

                    return con;
                },argu)
            }


            pajax[bool?'updateWithFile':'post']({
                url: 'restEquipService/addEquip',
                data: argu,
                success: function(data) {
                    $("#globalnotice").pshow({text:"添加成功",state:"success"});
                    resolve();
                },
                error: function() {
                    $("#globalnotice").pshow({text:"添加失败",state:"failure"});
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