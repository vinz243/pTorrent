// Install node deps individually, useful on low RAM devices

'use strict'
var npm = require("npm");

var cfg = require('./package.json');
var fs = require('fs');
var index = 0;

var deps = Object.assign(cfg.dependencies, cfg.devDependencies);
var keys = Object.keys(deps);

var dry = process.argv[2];

const install = function(index) {
  if(index > keys.length - 1) return;
  console.log('Installing ' + keys[index]);
  npm.commands.install([keys[index] + "@" + deps[keys[index]]], function(err) {
    if(err) return console.err(err);
    install(index + 1);
  })
};

if(dry === '--dry') {
  let content = '';
  for(let dep in deps) {
    content += 'npm install ' + dep + '@' + deps[dep] + '\nnpm cache clean && rm -rf /tmp/*\n';
  }
  fs.writeFile('packages', content, (err) => {
    if(err) console.err(err);
    console.log('done');
  });
} else {
  npm.load({loglevel: 'silent'}, () => {
    install(0);
  });
}