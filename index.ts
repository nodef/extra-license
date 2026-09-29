import lunr from "lunr";  // @deno-types="npm:@types/lunr@2.3.7"
import * as path from "@std/path";




// GLOBALS
// -------

const FMT_YAML = /---([\s\S]*?)---([\s\S]*)/;
const corpus = new Map();
let index: lunr.Index | null = null;
let ready = false;




// METHODS
// -------

// Get YAML content.
function yamlContent(txt: string) {
  return txt.replace(FMT_YAML, "$2").trim();
}


// Replace content with given properties.
function contentReplace(txt: string, p: Record<string, string>={}) {
  return txt.replace(/\[(\w+)\]/g, (m, p1) => p[p1]||m);
}


// Load corpus.
async function loadCorpus() {
  for(const [k, v] of (await import("./corpus.ts")).default)
    corpus.set(k, v);
}


// Setup lunr index.
function setupIndex() {
  index = lunr(function(this: lunr.Builder) {
    this.ref("id");
    this.field("id", {boost: 3});
    this.field("title", {boost: 2});
    this.field("nickname", {boost: 2});
    this.field("description");
    this.field("permissions");
    this.field("conditions");
    this.field("limitations");
    this.pipeline.remove(lunr.stopWordFilter);
    for (const r of corpus.values())
      this.add(r);
  });
};

// Load corpus, setup index.
export async function load(): Promise<boolean> {
  if (ready) return true;
  await loadCorpus(); setupIndex();
  return ready = true;
}


// Search license properties by text.
export function searchLicense(txt: string): Record<string, unknown>[] {
  if (index==null) return [];
  const a = []; txt = txt.replace(/\W/g, " ");
  const mats = index.search(txt); let max = 0;
  for (const mat of mats)
    max = Math.max(max, Object.keys(mat.matchData.metadata).length);
  for (const mat of mats)
    if (Object.keys(mat.matchData.metadata).length===max) a.push(corpus.get(mat.ref));
  return a;
};

// Get license text by id.
export async function getLicense(id: string, opt={}): Promise<string> {
  const p    = path.join(__dirname, "assets", id+".txt");
  const data = await Deno.readTextFile(p);
  return contentReplace(yamlContent(data), opt);
}

// Get license text.
export function license(txt: string, opt={}): Promise<string | null> {
  const dats = searchLicense(txt);
  if (dats.length===0) return Promise.resolve(null);
  return getLicense(dats[0].id as string, opt);
};
