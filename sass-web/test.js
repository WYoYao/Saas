var obj1 = {
    "data": [{
        "create_time": "20170912204254",
        "equip_id": "Eq1301020001001ACCCCC001",
        "equip_local_id": "设备编码001",
        "equip_local_name": "1号楼-离心机-001",
        "maintainer": "维修商1",
        "position": "上格云-001-1号楼",
        "specification": "设备型号001",
        "work_orders": [{
                "order_id": "Wo13010200011507540386402",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507541838961",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507546367621",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507547491168",
                "order_state_desc": "执行中",
                "summary": "测试-自定义状态-016"
            },
            {
                "order_id": "Wo13010200011507547660106",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507548305785",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507548665076",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507550538104",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507599886061",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507599990341",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507602787894",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507605354609",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507639155582",
                "order_state_desc": "",
                "summary": ""
            }
        ]
    }],
    "count": 1
};

var obj2 = {
    "data": [{
        "create_time": "20170912204254",
        "equip_id": "Eq1301020001001ACCCCC001",
        "equip_local_id": "设备编码001",
        "equip_local_name": "1号楼-离心机-001",
        "maintainer": "维修商1",
        "position": "上格云-001-1号楼",
        "specification": "设备型号001",
        "work_orders": [{
                "order_id": "Wo13010200011507540386402",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507541838961",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507546367621",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507547491168",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507547660106",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507548305785",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507548665076",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507550538104",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507599886061",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507599990341",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507602787894",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507605354609",
                "order_state_desc": "",
                "summary": ""
            },
            {
                "order_id": "Wo13010200011507639155582",
                "order_state_desc": "",
                "summary": ""
            }
        ]
    }],
    "count": 3
};


var req1 = {
    "url": "http://192.168.30.96:8080/saas/restEquipService/queryRepairEquipList",
    "req": {
        "build_id": "",
        "domain_code": "",
        "system_id": "",
        "keyword": "",
        "valid": true,
        "page": 1,
        "page_size": 50,
        "user_id": "RY1503737342744",
        "customer_id": "",
        "project_id": "Pj1301020001"
    }
};

var req2 = {
    "url": "http://192.168.30.96:8080/saas/restEquipService/queryMaintEquipList",
    "req": {
        "build_id": "",
        "domain_code": "",
        "system_id": "",
        "keyword": "",
        "valid": true,
        "page": 1,
        "page_size": 50,
        "user_id": "RY1503737342744",
        "customer_id": "",
        "project_id": "Pj1301020001"
    }
};