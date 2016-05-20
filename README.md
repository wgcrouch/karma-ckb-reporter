karma-ckb-reporter
==================

Sets the colour of LEDS on a Corsair keyboard. While your tests are passing your keyboard is green, while they are failing it is red.

This has only been tested on Ubuntu 16.04 with a K65 using the [ckb driver](https://github.com/ccMSC/ckb).

You need to stop the ckb app for this to work, otherwise it will reset your colours to whatever profile/mode it is running.

Installation
============

```sh
npm install --save-dev karma-ckb-reporter
```

Usage
=====

```sh
karma start --reporters ckb
```


Config
======

You can change the colours or the path to your device, eg:

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    // rest of your config

    reporters: ['cbk'],

    // reporter options
    ckbReporter: {

      //Path to the device (see [ckb documentation](https://github.com/ccMSC/ckb/blob/master/DAEMON.md))
      device: '/dev/input/ckb/1',

      //Colour while tests are running
      running: '0000FF',

      //Colour while tests are failing
      error: 'FF0000',

      //colour while tests are passing
      success: '00FF000'
    }
  });
};
```
