"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
var logger = require("../index");
describe('console', function () {
    var sandbox;
    var infoSpy;
    var errorSpy;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        infoSpy = sandbox.spy(console, 'info');
        errorSpy = sandbox.spy(console, 'error');
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe('log info message', function () {
        it('should log info: "Testing logger..."', function () {
            var date = new Date();
            logger.info('Testing logger...');
            sinon.assert.notCalled(errorSpy);
            sinon.assert.calledOnce(infoSpy);
            sinon.assert.calledWithExactly(infoSpy, "[" + date.toUTCString() + "]: Testing logger...");
        });
    });
    describe('log error message', function () {
        it('should log an error: "Testing log failed!"', function () {
            var date = new Date();
            var msg = logger.error('Testing log failed!');
            sinon.assert.notCalled(infoSpy);
            sinon.assert.calledOnce(errorSpy);
            sinon.assert.calledWithExactly(errorSpy, "[" + date.toUTCString() + "]: Testing log failed!");
        });
    });
});
describe('log files', function () {
});
