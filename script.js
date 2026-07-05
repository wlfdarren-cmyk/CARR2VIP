// Récupérer le paramètre 'user' dans l'URL
const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

// Masquer/afficher les sections en fonction de l'utilisateur
document.addEventListener('DOMContentLoaded', function() {
    const proprietaireSection = document.getElementById('proprietaire-section');
    const artisanSection = document.getElementById('artisan-section');
    const formTitle = document.getElementById('form-title');
    const formDescription = document.getElementById('form-description');

    if (user === 'artisan') {
        // Masquer la section propriétaire
        proprietaireSection.style.display = 'none';
        formTitle.textContent = '🔨 Déposer un devis';
        formDescription.textContent = 'Remplissez les informations du devis pour le bien concerné.';
    } else {
        // Masquer la section artisan
        artisanSection.style.display = 'none';
        formTitle.textContent = '📌 Informations sur le bien';
        formDescription.textContent = 'Remplissez les informations concernant votre bien immobilier.';
    }
});
