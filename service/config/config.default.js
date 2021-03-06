/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1643943186228_6271';

  // add your middleware config here
  config.middleware = [];

  // 数据库配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'react_blog',
    }
  }
  // 安全设置
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }
  // 跨域设置
  config.cors = {
    // 允许所有origin
    origin: ctx => ctx.get('origin'),
    credentials: true, // 允许cookies跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }
  config.session = {
    maxAge: 1000 * 60 * 30,
    renew: true
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
