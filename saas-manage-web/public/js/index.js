;
(function() {


    var VueReady = function(el) {
        // 状态data
        this.data = {};
        // 挂载的DOM
        this.el = el;
        // 实例方法集合
        this.methods = {};
        // 各个部分加载前生成的对应的函数
        this.beforeMount = {};

        // 保存初始化使用的值
        this.init = {};

        // 控制显示隐藏的dom集合
        this.navigators = {};

        // 用于保存生成后面的Vue 实例
        this._instance = null;

        var _that = this;

        // 只读获取Vue 
        Object.defineProperty(this, "instance", {
            get: function() {

                if (_that._instance) return _that._instance;

                _that._instance = new Vue({
                    el: _that.el,
                    data: _that.data,
                    methods: _that.methods,
                });

                return _that._instance;
            }
        });
    }

    // 创建Vue 实例
    VueReady.prototype.createVue = function() {

        this._instance = new Vue({
            el: this.el,
            data: this.data,
            methods: this.methods,
        });

        return this._instance;
    }

    // 将需要添加的实例属性合并
    VueReady.prototype.pushComponent = function(option) {

        /**
         * name:'当前模块名称'
         * data:'当前模块需要绑定的状态树'
         * methods:'当前模块需要绑定的方法'
         */

        var _that = this,
            name,
            assignArr = ['data', 'methods'], // 需要验正重复合并内容
            el = option.el || void 0;



        name = option.name || void 0;

        // 挂载对应的 beforeMount 事件
        if (name && el) {

            // 綁定 方法中this 为 Vue 实例 
            _that.navigators[name] = el;
        }


        // 挂载对应的 beforeMount 事件
        if (name && _.isFunction(option.beforeMount)) {

            // 綁定 方法中this 为 Vue 实例 
            _that.beforeMount[name] = option.beforeMount;
        }

        // 循环执行两种类型的验证合并
        assignArr.map(function(key) {

            // 获对应的data methods 值
            return {
                key: key,
                value: _.isPlainObject(option[key]) ? option[key] : {},
            }
        }).forEach(function(item) {

            var key = item.key, // 区别   'data', 'methods'
                value = item.value, // 传入的 'data', 'methods' 对应的值
                keys = Object.keys(_that[key]), // 已有的值
                err; // 冲突的方法名称集合

            // 记录每个name 对应的初始化状态
            if (key == 'data' && name != void 0) {

                if (Object.keys(_that.init).includes(name)) throw new Error('当前' + name + '已经被使用');

                _that.init[name] = value;
            }

            // 记录冲突
            err = Object.keys(value).reduce(function(err, info) {

                // 冲突记录
                if (keys.includes(info)) err.push(info);
                return err;
            }, []);

            // 合并
            _that[key] = _.assign({}, _that[key], value);

            // 冲突的打印出来
            if (err.length) throw new Error(name + '下' + key + '中' + err.join(',') + '与已有内容发生冲突');

        });

    }

    // 初始化对应页面内容
    VueReady.prototype.initPage = function(name, argu) {

        // 获取对应的状态值
        var data = this.init[name],
            beforeMount = this.beforeMount[name] || function() {};

        // if (argu) data = _.assign(data, argu);

        // 循环修改Vue 实例中的内容
        Object.keys(data).reduce(function(con, key, index) {

            con[key] = data[key];
            return con;
        }, this._instance);

        if (argu) {
            // 循环修改Vue 实例中的内容
            Object.keys(argu).reduce(function(con, key, index) {

                con[key] = argu[key];
                return con;
            }, this._instance);
        }

        // beforeMount 方法执行
        beforeMount.call(this._instance);

    }

    // 页面跳转
    VueReady.prototype.navigatorTo = function(name) {

        if (name in this.navigators) {

            var _that = this;
            Object.keys(this.navigators)
                .forEach(function(key, index, content) {

                    var el = document.querySelector(_that.navigators[key]);
                    el.style.display = key == name ? 'block' : 'none';
                })
        }
    }

    window.VueReady = VueReady;

})();


var v = new VueReady('#component');


// $(function() {
//     // // 创建Vue 实例

//     window.aa = v.createVue();

//     // 测试项目管理页面
//     v.initPage('projectList');
//     v.navigatorTo('projectList');

//     // 跳转选项卡默认第一个
//     // v.initPage('authorityManage');
//     // v.navigatorTo('authorityManage');

//     // v.initPage('templateMange');
//     // v.initPage('componentRelationship');
//     // v.initPage('componentInformation');



//     // // v.instance.selectcomponentRelationship();

//     // setTimeout(function() {

//     //     $("#navBar").psel(2);
//     //     v.instance.selectcomponentRelationship();

//     //     v.instance.componentRelationshipGo();

//     //     v.instance.AddComponent();

//     // }, 0);


// })