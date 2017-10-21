// 处理控件库相关内容

// 递归处理Object 类型的中的Object值
var objDeep = function (obj, cb) {

    var deep = arguments.callee;

    if (_.isPlainObject(obj)) {

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];

                cb(key, element);

                deep(element, cb);
            }
        }
    }
}

/**
 * 根据传入的key 值获取 obj 类型中对应的类型,最后只允许返回的引用类型的值，不允许的返回值类型的值
 * @param {any} obj 取值的 对象 
 * @param {any} k   取值的 key 值
 */
function getObjectByKey(obj, k) {

    // 字符转换数组
    if (_.isString(k)) k = [k];

    // 循环返回对应的属性值
    return k.reduce(function(con,key){

        return con[key];
    },obj);
}


/**
 * 
 * @param {String,Array} vk 对应实例的key 或数组 一级的时候可以直接传字符串 多级的时候需要传依次的字符串数组
 * @param {Function} stfn 配置函数,
 * @param {String,Array} vk 对应实例的key 或数组 一级的时候可以直接传字符串 多级的时候需要传依次的字符串数组
 */
function createEvents(vk,stfn,cb) {

    var instance=getObjectByKey(v.instance,vk);

    /**
     * item 当前作用域下的model 对象
     * event 事件实例
     */
    return function(item,event){



        stfn(vk,cb)
    };

}


var test = {
    name: {
        age: {
            like: 'play',
        }
    }
}

var arr = [1, 2, 3, 4];

for (var key in arr) {
    if (arr.hasOwnProperty(key)) {
        var element = arr[key];
        console.log(element);
    }
}