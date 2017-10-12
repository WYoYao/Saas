var arr = ["system_id", "system_local_id", "system_local_name", "BIMID", "build_local_name", "domain_name", "system_category_name"];



console.log(arr.map(key => {
    return {
        info_code: key,
        info_name: ''
    }
}));

[
    {
        info_code: 'system_local_name',
        info_name: '系统名称'
    },
    {
        info_code: 'system_local_id',
        info_name: '系统编码'
    },
    {
        info_code: 'BIMID',
        info_name: 'BIMID编码'
    },
    {
        info_code: 'build_local_name',
        info_name: '所属建筑'
    },
    {
        info_code: 'domain_name',
        info_name: '所属专业'
    },
    {
        info_code: 'system_category_name',
        info_name: '所属系统类'
    }
]