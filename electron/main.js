const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    autoHideMenuBar: true
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC handler for native save file dialog
ipcMain.handle('save-file-dialog', async (event, { dataUrl, format, defaultName }) => {
  let filters = [];
  const lowerFormat = format.toLowerCase();
  
  if (lowerFormat === 'png') {
    filters = [{ name: 'PNG Image', extensions: ['png'] }];
  } else if (lowerFormat === 'jpg' || lowerFormat === 'jpeg') {
    filters = [{ name: 'JPEG Image', extensions: ['jpg', 'jpeg'] }];
  } else if (lowerFormat === 'svg') {
    filters = [{ name: 'SVG Vector Graphic', extensions: ['svg'] }];
  }

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Export QR Code',
    defaultPath: defaultName,
    filters: filters
  });

  if (canceled || !filePath) {
    return { success: false, status: 'cancelled' };
  }

  try {
    let buffer;
    if (dataUrl.includes(';base64,')) {
      const base64Data = dataUrl.split(';base64,')[1];
      buffer = Buffer.from(base64Data, 'base64');
    } else if (dataUrl.startsWith('data:image/svg+xml,')) {
      // Handles url-encoded SVG files (decode first)
      const content = decodeURIComponent(dataUrl.split(',')[1]);
      buffer = Buffer.from(content, 'utf-8');
    } else {
      // Fallback base64 extraction
      const parts = dataUrl.split(',');
      const content = parts[1] || parts[0];
      buffer = Buffer.from(content, 'base64');
    }

    fs.writeFileSync(filePath, buffer);
    return { success: true, path: filePath };
  } catch (error) {
    console.error('Failed to write file to disk:', error);
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
