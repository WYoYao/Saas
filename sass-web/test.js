

var arr= {
    "equip_local_name": "设备名称1",
    "equip_local_id": "设备编码1",
    "BIMID": "BIM模型中编码1",
    "length": "1",
    "width": "2",
    "height": "3",
    "mass": "4",
    "material": "",
    "dept": "",
    "serial_num": "",
    "specification": "",
    "contract_id": "",
    "asset_id": "",
    "purchase_price": "",
    "principal": "",
    "maintain_id": "",
    "service_life": "",
    "warranty": "",
    "maintain_cycle": "",
    "build_id": "Bd1301020001001",
    "build_name": "上格云-001-1号楼",
    "system_id": "Sy1301020001001ACCC002",
    "system_name": "002号中央供冷系统",
    "equip_category": "CCCC",
    "equip_category_name": "离心机",
    "user_id": "KH1504871131290",
    "customer_id": "KH1504871131290",
    "project_id": "Pj1301020001"
};

var ob={
    "build_name": "上格云-001-1号楼",
    "system_name": "002号中央供冷系统",
    "equip_category_name": "离心机",
}


var str=JSON.stringify(arr);

console.log(str.match(/attachments/g));
