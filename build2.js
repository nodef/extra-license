const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const OPTIONS = {
  stdio: [0, 1, 2]
};



/**
 * Rename files in a directory.
 * @param {string} dir path to directory containing files
 * @param {RegExp} match which files to rename
 * @param {RegExp} from search regex for filename
 * @param {string} to value for filename
 */
function renameFiles(dir, match, from, to) {
  for(var f of fs.readdirSync(dir)) {
    if(!match.test(f)) continue;
    var src = path.join(dir, f);
    var dst = path.join(dir, f.replace(from, to));
    fs.renameSync(src, dst);
  }
}


function main() {
  cp.execSync('git clone --depth=1 https://github.com/spdx/license-list-data', OPTIONS);
  cp.execSync('mv license-list-data/text text', OPTIONS);
  renameFiles('text', /^deprecated_/, /^deprecated_/, '');
  cp.execSync('rm -rf license-list-data', OPTIONS);
  // cp.execSync('git clone --depth=1 https://github.com/github/choosealicense.com', OPTIONS);
}
main();
