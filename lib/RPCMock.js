"use strict";
var Promise = require("bluebird");
var mr = require("mock-require");
var RPC = require('peerjs-rpc');

var mocks = {};

function RPCMock(id, scope, options) {
    /* istanbul ignore next */
    if ((typeof window !== "undefined" && this === window) || (typeof self !== "undefined" && this === self)) {
        throw new TypeError("Tried to call class RPCMock as a regular function. Classes can only be called with the 'new' keyword.");
    }
    this.id = id;
    this.scope = scope;
    mocks[id] = this;
    this.delays = {};
    this.timeout = 5000;
    this._callbacks = {};
    this._timeouts = {};

    if (options) {
        this.delays = {};
        this.timeout = options.timeout || 5000;
    }
}
RPCMock.prototype = Object.create(RPC.prototype);
RPCMock.prototype.constructor = RPCMock;
RPCMock.prototype._sendInvocation = function _sendInvocation(id, payload, connection) {
    if (id === undefined) {
        throw new Error('Can not send to a node with undefined id')
    }
    var that = this;
    var delay = 0;
    if (id in this.delays) {
        delay = this.delays[id];
    }
    return new Promise(function(resolve, reject) {
        var delayTimeout = setTimeout(function() {
            that._callbacks[payload.signature] = function(error, result) {
                clearTimeout(that._timeouts[payload.signature]);
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            };
            mocks[id]._onData(null, payload);
        }, delay);

        that._timeouts[payload.signature] = setTimeout(function() {
            clearTimeout(delayTimeout);
            reject(new Error('Message timed out.'));
        }, that.timeout);
    });
};
RPCMock.prototype._sendAnswer = function _sendAnswer(id, payload, connection) {
    if (id === undefined) {
        throw new Error('Can not send to a node with undefined id')
    }
    var delay = 0;
    if (id in this.delays) {
        delay = this.delays[id];
    }
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(mocks[id]._onData(null, payload));
        }, delay);
    });
};

var init = function init(_mocks) {
    mocks = _mocks || {};
    return RPCMock;
};


module.exports = init;