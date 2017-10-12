import sinon = require('sinon')
import logger = require ('../index')

describe('console', () => {
    let sandbox: sinon.SinonSandbox
    let infoSpy: sinon.SinonSpy
    let errorSpy: sinon.SinonSpy
    
    beforeEach(() => {
        sandbox = sinon.sandbox.create()

        infoSpy = sandbox.spy(console, 'info')
        errorSpy = sandbox.spy(console, 'error')
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('log info message', () => {
        it('should log info: "Testing logger..."', () => {
            let date: Date = new Date()
            logger.info('Testing logger...')
    
            sinon.assert.notCalled(errorSpy)
            sinon.assert.calledOnce(infoSpy)
            sinon.assert.calledWithExactly(infoSpy, `[${date.toUTCString()}]: Testing logger...`)
        })
    })

    describe('log error message', () => {
        it('should log an error: "Testing log failed!"', () => {
            let date: Date = new Date()
            let msg: string = logger.error('Testing log failed!')
    
            sinon.assert.notCalled(infoSpy)
            sinon.assert.calledOnce(errorSpy)
            sinon.assert.calledWithExactly(errorSpy, `[${date.toUTCString()}]: Testing log failed!`)
        })
    })
})

describe('log files', () => {
    
})