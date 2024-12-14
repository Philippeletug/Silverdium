window.electron.on('soundLevel', (soundLevel) => {
    console.log('Niveau sonore reçu :', soundLevel);
    document.getElementById('soundLevel').textContent = `Niveau du son: ${soundLevel} db`;
    if (soundLevel > 40) {
        console.log('Le son a dépassé 40db');
    } else if (soundLevel > 50) {
        console.warn('Le son a dépassé 50db');
    } else if (soundLevel > 60) {
        alert('Attention le son a dépassé 60db');
        console.warn('Le son a dépassé 60db');
    } else if (soundLevel > 65) {
        console.warn('Le son a dépassé 65db');
        alert('Attention le son a dépassé 65db');
        alert('Attention le son a dépassé 65db');
        alert('Attention le son a dépassé 65db');
    } else if (soundLevel > 70) {
        window.location.href = 'https://silverdium.fr';
        console.warn('Le son a dépassé 70db');
    } else if (soundLevel > 75) {
        console.warn('Le son a dépassé 75db');
        alert('Frere c trop la...')
    } else if (soundLevel > 80) {
        console.warn('Le son a dépassé 80db');
        alert('Calme toi !!')
        alert('Attention le son a dépassé 80db');
        alert('Attention le son a dépassé 80db');
        alert('Attention le son a dépassé 80db');
        window.location.href = 'https://silverdium.fr/tipeee.html';
    } else if (soundLevel > 90) {
        console.warn('Seuille de tolérence dépacer');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
        alert('Seuille de tolérence dépacé.');
    }
});

const startMicBtn = document.getElementById('startMicBtn');

startMicBtn.addEventListener('click', () => {
    window.electron.send('start-microphone');
});

