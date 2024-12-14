const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./src/assets/js/db.js');
const mic = require('mic');
const { exec } = require('child_process');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './src/assets/js/preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    win.loadFile('./src/panels/html/index.html');
}

ipcMain.on('start-microphone', () => {
    try {
        console.log('Demande pour démarrer le microphone reçue...');
        
        const micInstance = mic({
            rate: '16000',
            channels: '1',
            debug: true,
            exitOnSilence: 6
        });

        const micInputStream = micInstance.getAudioStream();

        micInputStream.on('data', (data) => {
            console.log('Données audio reçues', data.length);  // Ajoutez un log pour vérifier les données

            // Calcul du niveau sonore en dB à partir de la longueur des données audio
            const rms = calculateRMS(data);
            const soundLevelDB = 20 * Math.log10(rms);  // Convertir RMS en dB

            // Envoyer le niveau sonore au renderer
            win.webContents.send('soundLevel', soundLevelDB); 
        });

        micInstance.start();
        console.log("Enregistrement du microphone...");
    } catch (err) {
        console.log('Une erreur est survenue : ' + err);
    }
});

// Fonction pour calculer le RMS d'un buffer audio
function calculateRMS(buffer) {
    let sum = 0;

    // Calcul du RMS
    for (let i = 0; i < buffer.length; i++) {
        sum += Math.pow(buffer[i], 2);  // Carré de chaque échantillon
    }

    const rms = Math.sqrt(sum / buffer.length);  // Moyenne carrée et racine carrée
    return rms;
}

app.whenReady().then(() => {
    createWindow();

    // Récupérer la variable depuis la base de données
    db.getVariable((err, result) => {
        if (err) {
            console.error("Erreur DB:", err);
        } else {
            console.log("Variable récupérée:", result);
            win.webContents.send('dbVariable', result);
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
