import { readdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { parse, stringify } from 'yaml'

const path = './views';
const res = readdirSync(path).filter(f => f.includes('book')); 

let data = {list:[]};
res.forEach(f=> {
    const match = f.match(/book(?<idx>.*).yaml/);
    const file = readFileSync(`${path}/${f}`, 'utf8');
    const content = parse(file);
    content.intro = content.intro.filter(Boolean); 
    content['author-intro'] = content['author-intro'].filter(Boolean); 
    content.directory = content.directory.filter(Boolean); 
    content.id = match.groups.idx;
    data.list.push(content);
});

writeFileSync('data.js', JSON.stringify(data), { flag: 'w' })