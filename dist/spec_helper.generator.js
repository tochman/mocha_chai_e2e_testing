const fs = require('fs');

const dir = './specs';
const fileName = "/spec.helper.js"
const filepath = dir + fileName;
let fileContent = "const fs = require('fs'); \n"
fileContent += "const chai = require('chai'); \n"
fileContent += "global.expect = chai.expect; \n"
fileContent += "// More stuff..."

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log('\x1b[33m%s\x1b[0m', `Added folder: ${dir}`);
} else {
    console.log('\x1b[31m%s\x1b[0m', `WARNING: Folder ${dir} already exist. Moving on...`);
}

fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    console.log('\x1b[33m%s\x1b[0m', `${fileName} was successfully saved`);
});