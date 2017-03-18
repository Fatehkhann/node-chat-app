var generateMsg = (from, text) => {
    return {
        from,
        text,
        generatedAt: new Date().getTime()
    }
};

var generateLocationMsg = (from, latitude, longitude) => {
    return {
        from,
        url: `http://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMsg, generateLocationMsg}