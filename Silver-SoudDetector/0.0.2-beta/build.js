const { build } = require('electron-builder');

build({
    target: ['win32', 'darwin', 'linux'], 
    arch: 'x64', 
    dir: __dirname, 
    appId: 'com.Silver-SoundDetector', 
    win: {
        icon: 'src/assets/images/icon.ico', // Icône pour Windows
    },
    mac: {
        icon: 'src/assets/images/icon.icns', // Icône pour macOS
    },
    linux: {
        icon: 'src/assets/images/icon.png', // Icône pour Linux
    },
})
    .then(() => {
        console.log('Build réussi pour toutes les plateformes');
    })
    .catch(err => {
        console.error('Erreur pendant le build :', err);
    });
