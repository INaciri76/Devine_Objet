"use strict";

// === Liste des objets avec chemin des images et noms ===
const objets = [
    { fichier: `./img/appleAC.png`, nom: "Assassin's Creed" },
    { fichier: `./img/bouclierZelda.png`, nom: "Zelda" },
    { fichier: `./img/balista.png`, nom: "Black Ops 2" },
    { fichier: `./img/bellAnimalCrossing.png`, nom: "Animal Crossing" },
    { fichier: `./img/Boost_full.png`, nom: "Rocket League" },
    { fichier: `./img/casqueSkyrim.jpg`, nom: "Skyrim" },
    { fichier: `./img/clashofclan.png`, nom: "Clash of clan" },
    { fichier: `./img/couteauLancer.png`, nom: "Black Ops 2" },
    { fichier: `./img/dragonball.png`, nom: "Dragon Ball" },
    { fichier: `./img/energySwordHalo.png`, nom: "Halo" },
    { fichier: `./img/FruitCrash.png`, nom: "Crash Bandicoot" },
    { fichier: `./img/gelanoe.png`, nom: "Dofus" },
    { fichier: `./img/gishu-3eye-catch.jpg`, nom: "Sekiro" },
    { fichier: `./img/jetpack.png`, nom: "GTA" },
    { fichier: `./img/Keysword.png`, nom: "Kingdom Hearts" },
    { fichier: `./img/kratos-blades-of-chaos.png`, nom: "God of War" },
    { fichier: `./img/kunai.png`, nom: "Naruto" },
    { fichier: `./img/lama.png`, nom: "Fortnite" },
    { fichier: `./img/laserGun.png`, nom: "Call of duty" },
    { fichier: `./img/LOLConsumable.png`, nom: "League of Legends" },
    { fichier: `./img/Luffy.png`, nom: "One piece" },
    { fichier: `./img/medkitFortnite.png`, nom: "Fortnite" },
    { fichier: `./img/Mettaton.png`, nom: "Undertale" },
    { fichier: `./img/MinecraftEpee.png`, nom: "Minecraft" },
    { fichier: `./img/MPSRCarapaceVerte.png`, nom: "Mario Kart" },
    { fichier: `./img/Mr._Cupcake.png`, nom: "FNAF" },
    { fichier: `./img/Ocarina_du_Temps_oot.png`, nom: "Zelda" },
    { fichier: `./img/overcookedObject.png`, nom: "Overcooked" },
    { fichier: `./img/Poke_Ball.png`, nom: "Pokemon" },
    { fichier: `./img/portalgunrendernew1.png`, nom: "Portal" },
    { fichier: `./img/residentevil.png`, nom: "Resident Evil" },
    { fichier: `./img/sabreLaser.png`, nom: "Star Wars" },
    { fichier: `./img/smashBros.png`, nom: "Smash Bros" },
    { fichier: `./img/SonicBoots.png`, nom: "Sonic" },
    { fichier: `./img/spike.png`, nom: "Valorant" },
    { fichier: `./img/splatoonWeapon.png`, nom: "Splatoon" },
    { fichier: `./img/Splintercell.png`, nom: "Splintercell" },
];

// === Sélection des éléments HTML ===
const boutonDemarrer = document.getElementById("start");
const boutonRecommencer = document.getElementById("restart");
const boutonValider = document.getElementById("submit");
const boutonPasser = document.getElementById("skip");
const champReponse = document.getElementById("guess");
const scoreAffichage = document.getElementById("score");
const progressionAffichage = document.getElementById("progress");
const message = document.getElementById("message");
const imageObjet = document.getElementById("object-image");
const listeScores = document.getElementById("score-list");

// === Variables du jeu ===
let score = 0;
let objetsSelectionnes = [];
let minuteur;
let tempsRestant = 50;
let indexActuel = 0;

// === Générer 14 objets aléatoires ===
function genererObjets() {
    const melange = [...objets].sort(() => Math.random() - 0.5);
    objetsSelectionnes = melange.slice(0, 14);
}

// === Afficher un message ===
function afficherMessage(txt) {
    message.textContent = txt;
}

// === Démarrer le minuteur 50s ===
function demarrerMinuteur() {
    tempsRestant = 60;
    afficherMessage(`⏳ Temps restant : ${tempsRestant}s`);
    minuteur = setInterval(() => {
        tempsRestant--;
        afficherMessage(`⏳ Temps restant : ${tempsRestant}s`);
        if (tempsRestant <= 0) {
            clearInterval(minuteur);
            passerObjet();
        }
    }, 1000);
}

// === Afficher l’objet actuel ===
function afficherObjet() {
    if (indexActuel >= 14) {
        finDePartie();
        return;
    }

    const objet = objetsSelectionnes[indexActuel];
    imageObjet.src = objet.fichier;
    imageObjet.alt = `Objet ${indexActuel + 1}`;

    champReponse.value = "";
    champReponse.disabled = false;
    boutonValider.disabled = false;
    boutonPasser.disabled = false;

    progressionAffichage.textContent = `${indexActuel + 1} / 14`;

    clearInterval(minuteur);
    demarrerMinuteur();
}

// === Vérifier la réponse du joueur ===
function verifierReponse() {
    const reponse = champReponse.value.trim();
    const correct = objetsSelectionnes[indexActuel].nom;

    // Normalisation Unicode (accents, apostrophes, etc.)
    const repNorm = reponse.normalize("NFC").toLowerCase();
    const corNorm = correct.normalize("NFC").toLowerCase();

    if (repNorm.includes(corNorm) || corNorm.includes(repNorm)) {
        score += 10;
        scoreAffichage.textContent = score;
        afficherMessage("✅ Bonne réponse !");
        clearInterval(minuteur);
        passerObjet();
    } else {
        afficherMessage("❌ Mauvaise réponse !");
    }
}
// === Passer à l’objet suivant ===
function passerObjet() {
    indexActuel++;
    if (indexActuel < 14) {
        afficherObjet();
    } else {
        finDePartie();
    }
}

// === Fin de la partie ===
function finDePartie() {
    clearInterval(minuteur);
    afficherMessage(`🎉 Partie terminée ! Score final : ${score}`);
    champReponse.disabled = true;
    boutonValider.disabled = true;
    boutonPasser.disabled = true;
    enregistrerScore();
}

// === Enregistrer le score ===
function enregistrerScore() {
    const pseudo = prompt("Entre tes 4 lettres (pseudo) :")?.substring(0, 4).toUpperCase() || "----";
    const anciensScores = JSON.parse(localStorage.getItem("scores")) || [];
    anciensScores.push({ pseudo, score });
    anciensScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("scores", JSON.stringify(anciensScores.slice(0, 5)));
    afficherScores();
}

// === Afficher les meilleurs scores ===
function afficherScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    listeScores.innerHTML = scores.map(s => `<li>${s.pseudo} — ${s.score} pts</li>`).join("");
}

// === Démarrer une nouvelle partie ===
function demarrerPartie() {
    score = 0;
    indexActuel = 0;
    scoreAffichage.textContent = score;
    genererObjets();
    // Affiche l'image
    document.getElementById("image-container").style.display = "flex";
    afficherObjet();
    afficherMessage("🎮 Partie commencée !");
}

// === Réinitialiser le jeu ===
function reinitialiserJeu() {
    clearInterval(minuteur);
    score = 0;
    indexActuel = 0;
    scoreAffichage.textContent = score;
    progressionAffichage.textContent = `0 / 14`;
    champReponse.value = "";
    champReponse.disabled = true;
    boutonValider.disabled = true;
    boutonPasser.disabled = true;
    afficherMessage("Appuie sur Démarrer pour jouer.");
    document.getElementById("image-container").style.display = "none";
}

// === Événements des boutons ===
boutonDemarrer.addEventListener("click", demarrerPartie);
boutonValider.addEventListener("click", verifierReponse);
boutonPasser.addEventListener("click", passerObjet);
boutonRecommencer.addEventListener("click", reinitialiserJeu);

// Affiche les meilleurs scores au chargement
afficherScores();
