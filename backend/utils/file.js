const fs = require("node:fs/promises");
 export async function readData(path) {
    const data = await fs.readFile(path, 'utf8');
    return JSON.parse(data);
}

 export async function writeData(path, data) {
    await fs.writeFile(path, JSON.stringify(data));
}

