const moment = require('moment');

var generateMsg = (from, text) => {
    return {
        from,
        text,
        generatedAt: moment.valueOf()
    }
};

var generateLocationMsg = (from, latitude, longitude) => {
    return {
        from,
        url: `http://www.google.com/maps?q=${latitude},${longitude}`,
        generatedAt: moment.valueOf()
    }
}

module.exports = {generateMsg, generateLocationMsg}