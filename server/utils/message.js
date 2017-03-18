var generateMsg = (from, text) => {
    return {
        from,
        text,
        generatedAt: new Date().getTime()
    }
};

var generateLocationMsg = (from, lat, long) => {
    return {
        from,
        url: `http://www.google.com/maps?q=${lat},${long}`,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMsg, generateLocationMsg}