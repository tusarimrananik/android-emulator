const fs = require('fs');
const path = require('path');
const svgs = fs.readdirSync(path.join(__dirname, '..', 'lawnicons-repo', 'svgs'));

console.log('rotate:', svgs.filter(s => s.includes('rotat')));
console.log('power:', svgs.filter(s => s.includes('power')));
console.log('battery:', svgs.filter(s => s.includes('battery')));
console.log('dnd/silent:', svgs.filter(s => s.includes('silent') || s.includes('dnd') || s.includes('mute') || s.includes('volume')));
console.log('wifi:', svgs.filter(s => s.includes('wifi')));
console.log('bluetooth:', svgs.filter(s => s.includes('blue')));
