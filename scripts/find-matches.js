const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NodeJS' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    });
  });
}

async function findFiles() {
  const treeUrl = 'https://api.github.com/repos/LawnchairLauncher/lawnicons/git/trees/develop?recursive=1';
  const treeData = await fetchJson(treeUrl);
  const svgs = treeData.tree
    .filter((i) => i.path.startsWith('svgs/') && i.path.endsWith('.svg'))
    .map((i) => path.basename(i.path));

  const lookups = ['camera', 'clock', 'calc', 'setting', 'weather', 'music', 'recorder'];
  lookups.forEach(l => {
    console.log(`Matches for "${l}":`, svgs.filter(f => f.includes(l)).slice(0, 10));
  });
}

findFiles();
