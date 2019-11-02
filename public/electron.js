const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let playerWindow;

const createWindow = ()=> {
  var url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;


  var displays = electron.screen.getAllDisplays();
  console.log(displays);

  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: { webSecurity: !isDev }
  });
  playerWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: { webSecurity: !isDev },
    backgroundColor: "#000",
    
  });
  mainWindow.loadURL(url);
  playerWindow.loadURL(url + "/player");

  //playerWindow.setMenu(null);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    //mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
  playerWindow.on('closed', () => playerWindow = null);
  playerWindow.setFullScreen(true);
  mainWindow.focus();




  ipcMain.on('execute-transmition', (event, arg) => {
    console.log('execute-transmition', arg); // prints "ping"
    playerWindow.webContents.send('execute-transmition-reply', arg)
  });
  ipcMain.on('list-display', (event, arg) => {
    mainWindow.webContents.send('list-display-reply', displays)
  });
}




app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});