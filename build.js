const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');
const os = require('os');


// globals
const FMT_YAML = /---([\s\S]*)---([\s\S]*)/;


// Get YAML data as JSON.
function yamlData(txt) {
  txt = txt.replace(FMT_YAML, '$1');
  return yaml.load(txt);
};

// Get YAML content.
function yamlContent(txt) {
  return txt.replace(FMT_YAML, '$2').trim();
};

// Filter corpus data.
function dataFilter(d) {
  return {
    title: d.title,
    'spdx-id': d['spdx-id'],
    nickname: d.nickname||'',
    description: d.description,
    permissions: d.permissions.join(' '),
    conditions: d.conditions.join(' '),
    limitations: d.limitations.join(' ')
  };
};

// Replace content with given properties.
function contentReplace(txt, p) {
  return txt.replace(/\[(\w+)\]/g, (m, p1) => p[p1]||'');
};

// Stringify JSON without quoted keys.
function jsonStringify(v) {
  return JSON.stringify(v).replace(/\"(\w+)\":/g, '$1:');
};


// Perform build.
function build() {
  var z = 'const CORPUS = new Map(['+os.EOL;
  for(var f of fs.readdirSync('assets')) {
    var k = f.replace('.txt', '');
    var p = path.join('assets', f);
    var txt = fs.readFileSync(p, 'utf8');
    var dat = dataFilter(yamlData(txt));
    z += `  ["${k}", ${jsonStringify(dat)}],`+os.EOL;
  }
  z += ']);'+os.EOL;
  z += 'module.exports = CORPUS;'+os.EOL;
  fs.writeFileSync('corpus.js', z);
};
build();
