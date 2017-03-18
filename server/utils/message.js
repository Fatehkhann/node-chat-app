var generateMsg = (from, text) => {
    return {
        from,
        text,
        generatedAt: new Date().getTime()
    }
};

module.exports = {generateMsg}