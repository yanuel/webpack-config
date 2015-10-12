'use strict';

var Config = require('./lib/config'),
    ConfigNameResolver = require('./lib/configNameResolver'),
    ConfigPathResolver = require('./lib/configPathResolver'),
    ConfigFactory = require('./lib/configFactory'),
    ConfigLoader = require('./lib/configLoader'),
    ConfigFinder = require('./lib/configFinder'),
    ConfigVisitor = require('./lib/configVisitor');

var configFactory = new ConfigFactory(),
    configNameResolver = new ConfigNameResolver(),
    configPathResolver = new ConfigPathResolver(configNameResolver),
    configLoader = new ConfigLoader(configFactory, configPathResolver),
    configVisitor = new ConfigVisitor(configLoader, configPathResolver),
    configFinder = new ConfigFinder(configLoader, configPathResolver);

/**
 * @property {ConfigNameResolver}
 * @static
 */
Config.nameResolver = configNameResolver;
/**
 * @property {ConfigFinder}
 * @static
 */
Config.factory = configFactory;
/**
 * @property {ConfigLoader}
 * @static
 */
Config.loader = configLoader;
/**
 * @property {ConfigFinder}
 * @static
 */
Config.finder = configFinder;
/**
 * @property {ConfigVisitor}
 * @static
 */
Config.visitor = configVisitor;
/**
 * @property {ConfigPathResolver}
 * @static
 */
Config.pathResolver = configPathResolver;

/**
 * @module webpack-config
 * @returns {Config}
 */
module.exports = Config;
