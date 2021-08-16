const fs = require('fs');
const path = require('path');

const mapFile = fs.readFileSync(path.resolve(__dirname, '../../json/world/map.map'));
console.log(mapFile.toString());