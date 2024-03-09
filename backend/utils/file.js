const fs = require("node:fs/promises");

// async function readData(path) {
//     const data = await fs.readFile(path, 'utf8');
//     return JSON.parse(data);
// }

async function writeData(path, data) {
    await fs.writeFile(path, JSON.stringify(data));
}

// exports.readData = readData;
exports.writeData = writeData;