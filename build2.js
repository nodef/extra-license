const http = require('https');
const path = require('path');
const fs = require('fs');



// Download file from URL (redirect allowed).
function download(url, filename) {
  return new Promise((fres, frej) => {
    var req = http.get(url, (res) => {
      var code = res.statusCode;
      if (code>=300 && code<400) return download(res.headers.location, filename).then(fres);
      if (code>=400) return frej(res.statusCode);
      filename = filename || path.basename(url);
      var file = fs.createWriteStream(filename);
      res.pipe(file).on('close', () => fres(filename));
    });
    req.on('error', () => fres(0));
  });
}
