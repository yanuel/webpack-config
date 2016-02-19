'use strict';

var _ = require('lodash');

/**
 * @private
 * @class
 * @alias ConfigTransformInvoker
 * @constructor
 * @param {ConfigLoader} loader
 */
function ConfigTransformInvoker(loader) {
    this.loader = loader;
}

/**
 * @param {ConfigTransformRawMap} map
 * @param {Function=} callback
 * @param {*} [context]
 */
ConfigTransformInvoker.prototype.forEach = function(map, callback, context) {
    _.forEach(map, function(transforms, filename) {
        var currConfig = this.loader.loadConfig(filename);

        _.forEach(transforms, function(transform) {
            var prevConfig = transform.call(context, currConfig);

            if (!_.isObject(prevConfig)) {
                currConfig = {};
            } else {
                currConfig = prevConfig;
            }
        }, this);

        callback.call(context, currConfig);
    }, this);
};

/**
 * @private
 * @module webpack-config/lib/configTransformInvoker
 * @returns {ConfigTransformInvoker}
 */
module.exports = ConfigTransformInvoker;