const lunr = require('lunr');
const path = require('path');
const cp = require('child_process');
const fs = require('fs');


// globals
const FMT_YAML = /---([\s\S]*?)---([\s\S]*)/;
var corpus = new Map();
var index = null;
var ready = false;


// Get YAML content.
function yamlContent(txt) {
  return txt.replace(FMT_YAML, '$2').trim();
};

// Replace content with given properties.
function contentReplace(txt, p={}) {
  return txt.replace(/\[(\w+)\]/g, (m, p1) => p[p1]||m);
};

// Load corpus.
function loadCorpus() {
  for(var [k, v] of require('./corpus'))
    corpus.set(k, v);
};

// Setup lunr index.
function setupIndex() {
  index = lunr(function() {
    this.ref('id');
    this.field('id', {boost: 3});
    this.field('title', {boost: 2});
    this.field('nickname', {boost: 2});
    this.field('description');
    this.field('permissions');
    this.field('conditions');
    this.field('limitations');
    this.pipeline.remove(lunr.stopWordFilter);
    for(var r of corpus.values())
      this.add(r);
  });
};

// Load corpus, setup index.
function load() {
  if(ready) return true;
  loadCorpus(); setupIndex();
  return ready = true;
};


// Search license properties by text.
function search(txt) {
  if(index==null) return [];
  var z = [], txt = txt.replace(/\W/g, ' ');
  var mats = index.search(txt), max = 0;
  for(var mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for(var mat of mats)
    if(Object.keys(mat.matchData.metadata).length===max) z.push(corpus.get(mat.ref));
  return z;
};

// Get license text by id.
function get(id, opt={}) {
  return new Promise((fres, frej) => {
    var p = path.join(__dirname, 'assets', id+'.txt');
    fs.readFile(p, 'utf8', (err, data) => {
      if(err) return frej(err);
      fres(contentReplace(yamlContent(data), opt));
    });
  });
};

// Get license text.
function license(txt, opt={}) {
  var dats = search(txt);
  if(dats.length===0) return Promise.resolve(null);
  return get(dats[0].id, opt);
};
license.load = load;
license.corpus = corpus;
license.search = search;
license.get = get;
module.exports = license;


// Main function for console.
function main() {
  var E = process.env, A = process.argv, o = {
    year: E['ELICENSE_YEAR']||(new Date()).getFullYear(),
    fullname: E['ELICENSE_FULLNAME']||null,
    email: E['ELICENSE_EMAIL']||null,
    project: E['ELICENSE_PROJECT']||null,
  };
  var txt = E['ELICENSE']||'mit'; load();
  for(var i=2, I=A.length; i<I; i++) {
    if(A[i]==='--help') return cp.execSync(`less "${__dirname}/README.md"`, {stdio: [0, 1, 2]});
    else if(A[i]==='-y' || A[i]==='--year') o.year = A[++i];
    else if(A[i]==='-f' || A[i]==='--fullname') o.fullname = A[++i];
    else if(A[i]==='-e' || A[i]==='--email') o.email = A[++i];
    else if(A[i]==='-p' || A[i]==='--project') o.project = A[++i];
    else txt = A[i].toLowerCase();
  }
  license(txt, o).then((ans) => {
    if(ans==null) console.error(`Unknown license: "${txt}"`);
    else console.log(ans);
  });
};
if(require.main===module) main();
