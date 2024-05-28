var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var countryApiRouter = require('./routes/api/country');
var stateApiRouter = require('./routes/api/state');


var countryUiRouter = require('./routes/ui/user/countryTemplete');
var stateUiRouter = require('./routes/ui/user/stateTemplete');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/country', countryApiRouter);
app.use('/api/state', stateApiRouter);


app.use('/country/', countryUiRouter);
app.use('/state/',stateUiRouter);


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;