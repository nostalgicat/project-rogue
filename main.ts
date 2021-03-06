import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    minimizable: false,
    maximizable: false,
    resizable: false,
    title: 'Rogue Launcher',
    height: 170,
    width: 350,
  })

  // and load the index.html of the app.
  win.loadFile('../themes/ROCredentials/index.html');

  win.webContents.openDevTools({ mode: 'detach' });
  win.setMenu(null);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
