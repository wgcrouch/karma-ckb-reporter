var exec = require('child_process').exec;

function handle(error) { if (error) { throw error } }

function CkbReporter(helper, logger, config) {

    var DEFAULT_CONFIG = {
        device: '/dev/input/ckb1',
        running: '0000FF',
        error: 'FF0000',
        success: '00FF000'
    };

    var config = helper.merge(DEFAULT_CONFIG, config);
    var log = logger.create('reporter.ckb');

    var filePath = config.device + "/cmd";

    //Ensure the device is in software mode
    exec("echo active > " + filePath, handle);

    this.onRunStart = function() {
        setColor(config.running);
    }

    this.onBrowserComplete = function (browser) {
        var results = browser.lastResult;
        if (results.disconnected || results.error || results.failed) {
            setColor(config.error);
        } else {
            setColor(config.success);
        }
    };

    function setColor(color) {
        exec("echo rgb " + color + " > " + filePath, handle);
    }
}

CkbReporter.$inject = ['helper', 'logger', 'config.led'];

// PUBLISH DI MODULE
module.exports = {
    'reporter:ckb': ['type', CkbReporter]
};
