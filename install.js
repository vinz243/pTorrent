// Install node deps individually, useful on low RAM devices


var npm = require("npm");

var cfg = require('./package.json');

var index = 0;

var deps = Object.assign(cfg.dependencies, cfg.devDependencies);
var keys = Object.keys(deps);
const install = function(index) {
  if(index > keys.length - 1) return;
  console.log('Installing ' + keys[index]);
  npm.commands.install([keys[index] + "@" + deps[keys[index]]], function(err) {
    if(err) return console.err(err);
    install(index + 1);
  })
};
npm.load(() => {
  install(0);
});