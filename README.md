Simple Node Logger
==================

A small package which consists of two main methods "info" and "error". 

Info logs information to the console.info and logs/info.log file. 

Error logs errors to the console.error and logs/errors.log. 

Whenever an exception is raised, it is automatically logged in logs/exceptions.log.

## Installation

    npm install logger --save

## Usage

    const logger = require('logger')

    // Logs to console.info and ./logs/info.log
    logger.info('Simple message')

    // Logs to console.error and ./logs/errors.log
    logger.error('Something went wrong!')

    // Logs to ./logs/exceptions.log
    throw new Error('Something went wrong!')

## Tests

    npm test

## Release History

* 0.1.1 Creating logs directory fix
* 0.1.0 Initial release

## Contributors

[Robert Markovski](https://github.com/Roshan931)
