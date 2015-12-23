/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
const shell = electron.shell;
let menu;
let template;
let mainWindow = null;


crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1024, height: 728 , frame: false});

  if (process.env.HOT) {
    mainWindow.loadURL('http://127.0.0.1:8000/webpack-dev-server/');
  } else {
    mainWindow.loadURL('http://127.0.0.1:8000/');
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  // }

});
