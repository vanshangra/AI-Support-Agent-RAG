const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs/app.log");

const log = (message) => {
    const logEntry = `${new Date().toISOString()}: ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
};

module.exports = {log};