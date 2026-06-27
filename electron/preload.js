const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (dataUrl, format, defaultName) => ipcRenderer.invoke('save-file-dialog', { dataUrl, format, defaultName })
});
