var routes = require('./routes');
var start = require('common/startServer');
var dirname = __dirname;

start.Start({
    routes: routes,
    dirname: dirname,
    isLogin: true
});