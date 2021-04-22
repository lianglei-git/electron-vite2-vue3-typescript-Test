'use strict';

var electron = require('electron');
var path = require('path');

function createWindow () {
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join('../', 'preload/index.js')
    }
  });
  win.loadURL("http://172.16.98.194:3000/");
//   win.loadFile(path.join(__dirname,'../render/index.html'))
}

electron.app.whenReady().then(() => {
  createWindow();

  electron.app.on('activate', () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});
