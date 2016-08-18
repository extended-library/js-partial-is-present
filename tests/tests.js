'use strict';

const assert    = require('assert'),
      vars      = require('./variables'),
      isPresent = require(vars.path);

module.exports = {
    'js-partial-is-present' : () => {
        let _undefined = undefined,
            _null      = null,
            _boolean   = false,
            _number    = 0,
            _string    = 'str',
            _function  = () => {};

        assert(isPresent()           === false);
        assert(isPresent(_undefined) === false);
        assert(isPresent(_null)      === false);
        assert(isPresent(_boolean)   === true);
        assert(isPresent(_number)    === true);
        assert(isPresent(_string)    === true);
        assert(isPresent(_function)  === true);
    }
};
