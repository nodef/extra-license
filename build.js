const fs = require('fs');
const yaml = require('js-yaml');

var txt = fs.readFileSync('assets/mit.txt', 'utf8');
txt = txt.replace(/---([\s\S]*)---[\s\S]*/, '$1');
console.log(txt);
console.log(yaml.load(txt));
