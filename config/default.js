'use strict';
const path = require("path");
const pkg = require("../package.json");

module.exports = {
    web: {
        url: 'http://127.0.0.1:3000',
        host: '127.0.0.1',
        port: 3000,
        name: pkg.name
    },
    view: {
        cache: {},
        engine: 'ejs',
        dir: path.join(__dirname, '../../views')
    },
    log: {
        dir: `/raid/${pkg.name}/log/`,
        nolog: /\.(js|css|png|jpg|jpeg|ico|svg|gif)/,
        format: ':remote-addr :method :url :status :response-time ms :user-agent :content-lenght',
        replaceConsole: true,
        level: 'AUTO',
        console: false
    },
    static: {
        dir: path.join(__dirname, '../../public'),
        maxAge: 1000 * 60 * 60
    },
    redis: {
        session: {
            host: '127.0.0.1',
            port: '6379',
            db: 1,
            pass: ''
        }
    },
    database: {},
};
