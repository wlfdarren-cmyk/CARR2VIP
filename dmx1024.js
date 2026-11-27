// Numéro WhatsApp unique pour tous les pays (format international, sans "+" ni "00").
const CONFIG = {
    whatsappNumbers: {
        benin: "33602415102",
        cote_divoire: "33602415102",
        togo: "33602415102",
        burkina_faso: "33602415102",
        guinee: "33602415102",
        niger: "33602415102"
    },
    tauxEUR: {
        XOF: 655.957,
        GNF: 9400
    }
};

const COUNTRIES = [
    { id: "benin", nom: "Bénin", capitale: "Porto-Novo", devise: "XOF", delai: "7 à 15 jours" },
    { id: "cote_divoire", nom: "Côte d'Ivoire", capitale: "Abidjan", devise: "XOF", delai: "7 à 15 jours" },
    { id: "togo", nom: "Togo", capitale: "Lomé", devise: "XOF", delai: "7 à 15 jours" },
    { id: "burkina_faso", nom: "Burkina Faso", capitale: "Ouagadougou", devise: "XOF", delai: "10 à 20 jours" },
    { id: "guinee", nom: "Guinée", capitale: "Conakry", devise: "GNF", delai: "10 à 20 jours" },
    { id: "niger", nom: "Niger", capitale: "Niamey", devise: "XOF", delai: "10 à 20 jours" }
];

const VARIANTS = [
    {
        id: "dmx1024",
        nom: "DMX1024 (console seule)",
        prixEUR: 323.16,
        prixAncienEUR: 430.89,
        image: "https://cdn.shopify.com/s/files/1/0698/0164/0110/files/IMG_8161_jpg_e23c020e-9fd5-4a0f-a219-8703c77c595c.jpg?v=1749277112"
    },
    {
        id: "dmx1024_case",
        nom: "DMX1024 avec coffret de transport",
        prixEUR: 420.66,
        prixAncienEUR: 560.89,
        image: "https://cdn.shopify.com/s/files/1/0698/0164/0110/files/IMG_8205_jpg.jpg?v=1749277112"
    }
];

let paysActif = COUNTRIES[0];
let varianteActive = VARIANTS[0];
let quantite = 1;

function formaterMontant(montant, devise) {
    const nombre = Math.round(montant).toLocaleString("fr-FR");
    return devise === "GNF" ? `${nombre} GNF` : `${nombre} FCFA`;
}

function convertir(prixEUR, devise) {
    return prixEUR * CONFIG.tauxEUR[devise];
}

function afficherPrix() {
    const devise = paysActif.devise;
    const prix = convertir(varianteActive.prixEUR * quantite, devise);
    const prixAncien = convertir(varianteActive.prixAncienEUR * quantite, devise);
    const economie = prixAncien - prix;

    document.getElementById("price").textContent = formaterMontant(prix, devise);
    document.getElementById("compare-price").textContent = formaterMontant(prixAncien, devise);
    document.getElementById("save").textContent = `Économisez ${formaterMontant(economie, devise)}`;
    document.getElementById("shipping-note").innerHTML =
        `📦 Expédié depuis la Chine — livraison aérienne/express vers <strong>${paysActif.nom}</strong> en ${paysActif.delai}.`;
}

function afficherVariantes() {
    const liste = document.getElementById("variant-list");
    liste.innerHTML = "";
    const devise = paysActif.devise;

    VARIANTS.forEach(function (variante) {
        const option = document.createElement("div");
        option.className = "variant-option" + (variante.id === varianteActive.id ? " active" : "");
        option.innerHTML =
            `<strong>${variante.nom}</strong>` +
            `<span class="variant-price">${formaterMontant(convertir(variante.prixEUR, devise), devise)}</span>`;
        option.addEventListener("click", function () {
            varianteActive = variante;
            document.getElementById("main-image").src = variante.image;
            document.querySelectorAll(".variant-option").forEach(function (el) {
                el.classList.remove("active");
            });
            option.classList.add("active");
            afficherPrix();
        });
        liste.appendChild(option);
    });
}

function remplirPays() {
    const select = document.getElementById("country-select");
    COUNTRIES.forEach(function (pays) {
        const option = document.createElement("option");
        option.value = pays.id;
        option.textContent = `${pays.nom} — ${pays.devise === "GNF" ? "Franc guinéen (GNF)" : "Franc CFA (FCFA)"}`;
        select.appendChild(option);
    });

    select.addEventListener("change", function () {
        paysActif = COUNTRIES.find(function (p) { return p.id === select.value; });
        afficherVariantes();
        afficherPrix();
        majLienWhatsApp();
    });
}

function remplirTableLivraison() {
    const tbody = document.querySelector("#delivery-table tbody");
    COUNTRIES.forEach(function (pays) {
        const ligne = document.createElement("tr");
        ligne.innerHTML =
            `<td>${pays.nom}</td>` +
            `<td>${pays.capitale}</td>` +
            `<td>${pays.devise === "GNF" ? "GNF (Franc guinéen)" : "FCFA (Franc CFA)"}</td>` +
            `<td>${pays.delai}</td>` +
            `<td>✅ Disponible — commande WhatsApp</td>`;
        tbody.appendChild(ligne);
    });
}

function majLienWhatsApp() {
    const numero = CONFIG.whatsappNumbers[paysActif.id];
    const devise = paysActif.devise;
    const total = convertir(varianteActive.prixEUR * quantite, devise);
    const message =
        `Bonjour CARR2VIP, je souhaite commander :\n` +
        `- Produit : SHEHDS Console DMX 1024 (${varianteActive.nom})\n` +
        `- Quantité : ${quantite}\n` +
        `- Pays : ${paysActif.nom}\n` +
        `- Total estimé : ${formaterMontant(total, devise)}`;
    document.getElementById("whatsapp-order").href =
        `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

function initQuantite() {
    const input = document.getElementById("quantity");
    document.getElementById("qty-minus").addEventListener("click", function () {
        quantite = Math.max(1, quantite - 1);
        input.value = quantite;
        afficherPrix();
        majLienWhatsApp();
    });
    document.getElementById("qty-plus").addEventListener("click", function () {
        quantite += 1;
        input.value = quantite;
        afficherPrix();
        majLienWhatsApp();
    });
    input.addEventListener("change", function () {
        quantite = Math.max(1, parseInt(input.value, 10) || 1);
        input.value = quantite;
        afficherPrix();
        majLienWhatsApp();
    });
}

document.querySelectorAll(".thumb").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
        document.getElementById("main-image").src = thumb.src;
        document.querySelectorAll(".thumb").forEach(function (el) {
            el.classList.remove("active");
        });
        thumb.classList.add("active");
    });
});

remplirPays();
remplirTableLivraison();
afficherVariantes();
afficherPrix();
initQuantite();
majLienWhatsApp();
