const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./mydb.db', (err) => {
    if (err) {
        console.error("Erreur d'ouverture de la base de données:", err);
    } else {
        console.log("Base de données ouverte avec succès");
    }
});

db.run("CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, variable TEXT)");

function getVariable(callback) {
    db.get("SELECT variable FROM settings WHERE id = 1", (err, row) => {
        if (err) {
            console.error("Erreur lors de la récupération de la variable:", err);
            return callback(err);
        }
        callback(null, row ? row.variable : "Aucune variable trouvée");
    });
}

module.exports = { getVariable };
