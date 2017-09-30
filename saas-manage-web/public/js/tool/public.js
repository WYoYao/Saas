// 用于验证的类
var Check = function() {

    // 验证类型
    this.typeEnum = {
        font: {
            mode: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z])+$/, // 字母英文
            message: '请输入字母或英文',
        },
        phone: {
            mode: /^1[34578]\d{9}$/, //手机号
            message: '请输入正确格式的手机号',
        },
        email: {
            mode: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, //邮件
            message: '请输入正确的邮箱地址',
        },
        number: {
            mode: /^-?\d+\.?\d*$/, // 自然数
            message: '请输入数字',
        },
        'yyyy-mm-dd': {
            mode: /^\d{4}-\d{2}-\d{2}$/, // yyyy-mm-dd
            message: '请输入正确的yyyy-MM-dd',
        },
        int: {
            mode: /^\d+$/,
            message: '请输入正确的整数',
        }
    }

};


/**
 * 展示当前实例中已有的类型枚举类型
 */
Check.prototype.showTypeEnum = function() {
    return this.typeEnum;
}

// 添加新的类型验证
/**
 * 向类中添加行的验证类型
 * typeName 类型名称
 * reg 用于验证的正则
 * message 错误时提示信息
 */
Check.prototype.pushType = function(typeName, reg, message) {

    // 当前枚举枚举类型已经被占用
    if (this.typeEnum[typeName] !== undefined) throw new Error('当前枚举值已存在，请使用新的键值');

    if (['RegExp', 'Function'].indexOf(Object.prototype.toString.call(reg).slice(8, -1)) == -1) throw TypeError('Reg 必须为正则类型或方法');

    this.typeEnum[typeName] = {
        reg: reg,
        message: message,
    }
}

/**
 *  is 验证方法
 * value 需要验证的值
 * obj 需要被验证的类型
 */
Check.prototype.is = function(value, obj) {


    // 参数实例
    // obj = {
    //     type: 'font', // 字符类型验证
    //     minlen: 6, // 最小长度验证
    //     maxlen: 12, // 最大长度验证
    // }
    var success = {
        successful: true,
        message: ''
    }

    // 未传入参数时默认通过
    if (obj === void 0) return success

    // 配置对应验证配置
    var o = Object.assign({}, {
            type: void 0,
            minlen: 0,
            maxlen: Number.MAX_SAFE_INTEGER
        }, obj),
        val,
        len,
        vlen,
        type,
        mode,
        message;

    // 是否需要验证长度
    vlen = Object.prototype.toString.call(obj.minlen).slice(8, -1) == 'Number' || Object.prototype.toString.call(obj.maxlen).slice(8, -1) == 'Number';

    if (vlen) {

        // 如果有最小长度限制,过滤 null undefind
        if (o.minlen > 0 && (value === void 0 || value === null)) return {

            successful: false,
            message: '当前项不能未空且不能少于' + o.minlen + '字符',
        }

        len = value.length;

        if (len <= o.minlen || len > o.maxlen) {

            return {
                successful: false,
                message: '当前项不能少于' + o.minlen + '字符,且不能超过的' + o.maxlen + '字符',
            }
        }

    }

    type = o.type;

    if (type === void 0) return success

    if (this.typeEnum[type] === void 0) throw new TypeError('当前检查类型枚举不存在');

    // 键值转换为小写字符便于使用
    type = type.toLowerCase();
    // 验证方式赋值
    mode = this.typeEnum[type].mode;

    message = this.typeEnum[type].message;

    // 验证方式是正则的时候使用正则验证
    if (Object.prototype.toString.call(mode).slice(8, -1) == 'RegExp') {
        return mode.test(value) ? success : {
            successful: false,
            message: message,
        }
    }

    // 验证方式是方法的时候通过调用方法的返回值进行验证
    if (Object.prototype.toString.call(mode).slice(8, -1) == 'Function') {
        try {
            return mode(value) === true ? success : {
                successful: false,
                message: message,
            }
        } catch (error) {
            return {
                successful: false,
                message: JSON.stringify(error),
            }
        }
    }

    return {
        successful: false,
        message: '未进行验证'
    }
}


// 根据code属性值查询对应列表中 code 与之对应的索引
function queryIndexByKey(list, code) {
    if (!_.isArray(list) || !_.isPlainObject(code)) return -1;
    if (!Object.keys(code).length) return -1;

    // 获取第一个作为键值
    var key = Object.keys(code)[0],
        indexAttr = ptool.produceId(),
        filter;

    var filter = list.map(function(item, index) {

        item[indexAttr] = index;
        return item;
    }).filter(function(item) {

        return item[key] == code[key];
    })

    if (filter.length <= 0) return -1;

    return filter.map(function(item) {

        return item[indexAttr];
    }).join('') >>> 0;

}