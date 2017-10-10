var arr=['equip_local_name','equip_local_id','BIMID','length','width','height','mass','material','dept','serial_num','specification','contract_id','asset_id','purchase_price','principal','maintain_id','service_life','warranty','maintain_cycle'];


console.log(arr.reduce(function(con,item,index){


    con[item]={
        isShould:false,
        name:'',
        message:'错误提示的话',
    };

    return con;
},{}));