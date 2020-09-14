import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import fa from "element-ui/src/locale/lang/fa";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const edge = require('electron-edge-js')

// eslint-disable-next-line no-unused-vars
const helloWorld = edge.func(`
    async (input) => { 
        return "Hellow world " + input.ToString(); 
    }
`)

// eslint-disable-next-line no-unused-vars
const Test = edge.func({
  // eslint-disable-next-line no-undef
  assemblyFile: path.join(__static, 'RequirePic.dll'),
  typeName: 'Require.Main',
  methodName: 'Test'
})

// eslint-disable-next-line no-unused-vars
const HttpGet = edge.func({
  // eslint-disable-next-line no-undef
  assemblyFile: path.join(__static, 'RequirePic.dll'),
  typeName: 'Require.Main',
  methodName: 'HttpGet'
})

// eslint-disable-next-line no-unused-vars
const GetImage = edge.func({
  // eslint-disable-next-line no-undef
  assemblyFile: path.join(__static, 'RequirePic.dll'),
  typeName: 'Require.Main',
  methodName: 'GetImage'
})

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    minWidth: 1050,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  // 获取信息
  ipcMain.on('callHttpGet', (e, args) => {
    HttpGet(args, (error, result) => {
      if (error) throw error
      e.returnValue = result
    })
  })

  // 获取图片，这时候基本不用了
  ipcMain.on('callGetImage', (e, args) => {
    GetImage(args, (error, result) => {
      if (error) throw error
      e.returnValue = result
    })
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
