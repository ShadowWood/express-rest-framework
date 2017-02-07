import * as log4js from 'log4js';
import * as path from 'path';
import * as config from 'config';
import * as fs from 'fs-extra';

fs.mkdirsSync(config['log'].dir);
fs.mkdirpSync(`${config['log'].dir}main`);

let log4jsConfig = {
  replaceConsole: config['log'].replaceConsole,
  level: config['log'].level,
  appenders: [
    {
      type: 'console'
    },
    {
      type: 'dateFile',
      filename: path.join(config['log'].dir, 'main/log'),
      pattern: 'yyyyMMdd',
      alwaysIncludePattern: true,
      maxLogSize: 20480,
      backups: 3,
      category: 'main'
    },
    {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: {
        type: 'file',
        filename: path.join(config['log'].dir, 'main.ERROR'),
        maxLogSize: 20480
      },
      category: 'main'
    }
  ]
};

log4js.configure(log4jsConfig);

let logger = log4js.getLogger('main');
logger.setLevel('AUTO');
logger['log4js'] = log4js;

export = logger;