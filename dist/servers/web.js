"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const responseTime = require("response-time");
const expressSession = require("express-session");
const compression = require("compression");
const config = require("config");
const http = require("http");
const index_1 = require("../routes/index");
const logger = require("../tools/logger");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const SessStore = require('connect-redis')(expressSession);
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.api();
    }
    api() {
    }
    config() {
        this.app.use(compression());
        this.app.use(responseTime());
        this.app.use(express.static(config['static'].dir, { maxAge: config['static'].maxAge }));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(logger['log4js'].connectLogger(logger, config['log']));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(cookieParser('SECRET_GOES_HERE'));
        this.app.use(expressSession({
            proxy: true,
            resave: true,
            saveUninitialized: false,
            name: 'express-rest-framework',
            secret: 'secret',
            store: new SessStore(config['redis'].session),
            cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
        }));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    routes() {
        let router;
        router = express.Router();
        index_1.IndexRoute.create(router);
        this.app.use(router);
    }
    start() {
        let server = http.createServer(this.app);
        server.listen(config['web'].port, function () {
            logger.info(config['web'].name, config['web'].url, 'start up!');
        });
    }
}
exports.Server = Server;
