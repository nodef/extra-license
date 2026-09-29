import {
  load,
  searchLicense,
  license,
} from "./index.ts";


// Run a command in a subprocess, with inherited stdio.
async function run(command: string, args: string[], cwd?: string) {
  const cmd = new Deno.Command(command, {
    args: args,
    cwd:  cwd,
    stdin:  'inherit',
    stdout: 'inherit',
    stderr: 'inherit'
  });
  return await cmd.spawn().status;
}


// Stringify JSON as YAML.
function yamlStringify(obj: Record<string, unknown>, flt: string[] | null = null) {
  let a = "";
  for (const k in obj)
    if (k==="id" || flt==null || flt.includes(k)) a += `${k}: ${obj[k]}\n`;
  return a;
}


// Main function for console.
function main() {
  const E = process.env;
  const A = process.argv;
  const o = {
    year:       E['XLICENSE_YEAR']       || (new Date()).getFullYear(),
    fullname:   E['XLICENSE_FULLNAME']   || null,
    email:      E['XLICENSE_EMAIL']      || null,
    project:    E['XLICENSE_PROJECT']    || null,
    projecturl: E['XLICENSE_PROJECTURL'] || null,
  };
  let filter = E['XLICENSE_FILTER'] || null;
  let cmd    = null;
  let txt    = E['XLICENSE'] || '';
  load();
  const I = A.length;
  for (let i=2; i<I; i++) {
    if (A[i]==='--help') return run('less', [`${__dirname}/README.md`]);
    else if (A[i]==='-y' || A[i]==='--year')       o.year       = A[++i];
    else if (A[i]==='-n' || A[i]==='--fullname')   o.fullname   = A[++i];
    else if (A[i]==='-e' || A[i]==='--email')      o.email      = A[++i];
    else if (A[i]==='-p' || A[i]==='--project')    o.project    = A[++i];
    else if (A[i]==='-u' || A[i]==='--projecturl') o.projecturl = A[++i];
    else if (A[i]==='-f' || A[i]==='--filter')      filter      = A[++i];
    else if (cmd==null && /^(search|get)$/.test(A[i])) cmd      = A[i].toLowerCase();
    else txt = A[i].toLowerCase();
  }
  if (cmd==='search') {
    for (const r of searchLicense(txt))
      console.log(yamlStringify(r, filter?.split(/\s*,\s*/)));
    return;
  }
  license(txt||'mit', o).then((ans) => {
    if (ans==null) console.error(`Unknown license: "${txt}"`);
    else console.log(ans);
  });
}
main();
