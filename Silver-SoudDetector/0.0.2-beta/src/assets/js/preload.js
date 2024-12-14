const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);  // Envoie des messages au main process
    },
    on: (channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => callback(...args));  // Réception des messages du main process
    },
    shutdown: () => {
        ipcRenderer.send('shutdown');  // Envoie l'événement pour éteindre le PC
    }
});
