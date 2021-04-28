import { app, BrowserWindow } from 'electron'
import {join} from 'path'
import dotenv from 'dotenv'
import minimist from 'minimist'
import child_process from 'child_process'

let argv = minimist(process.argv)
// const path = require('path')
dotenv.config({path: join(__dirname, '../../.env')})
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: '../preload/index.js',
      // nodeIntegrationInWorker: true
    }
  })
  if(!app.isPackaged) {
    win.loadURL(`http://127.0.0.1:${process.env.PORT}`)
  } else {
    win.loadURL('file://' + join(__dirname,'../render/index.html'))
  }
  
//   win.loadFile(path.join(__dirname,'../render/index.html'))
}

app.whenReady().then(() => {
  createWindow() 

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
