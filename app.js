var express = require('express');
var routes = require('./routes');
var load = require('./routes/load');
var http = require('http');
var path = require('path');
var engine = require('./engine');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', engine.create());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.locals({
//    something: 'value'
//});
//app.locals.qaz = 'qut';

app.get('/', routes.index);
app.get('/load/:url', load.load);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
