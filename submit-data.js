// URL de votre Google Apps Script (à remplacer par votre URL de déploiement)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

document.getElementById('main-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Récupérer les données du formulaire
    const formData = new FormData(this);
    const data = {};

    // Ajouter les données des champs texte
    for (let [key, value] of formData.entries()) {
        if (key !== 'photos' && key !== 'pdfDevis') {
            data[key] = value;
        }
    }

    // Ajouter l'utilisateur et la date
    data.user = user;
    data.timestamp = new Date().toISOString();

    // Gérer les fichiers (photos et PDF)
    const files = {
        photos: formData.getAll('photos'),
        pdfDevis: formData.get('pdfDevis')
    };

    // Afficher un message de chargement
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;

    // Simuler l'envoi (à remplacer par un vrai appel à Google Apps Script)
    setTimeout(() => {
        // Masquer le formulaire et afficher le message de succès
        document.getElementById('main-form').classList.add('hidden');
        document.getElementById('success-message').classList.remove('hidden');
        
        // Réinitialiser le bouton (au cas où)
        submitButton.textContent = 'Envoyer';
        submitButton.disabled = false;
    }, 2000);

    // Code pour envoyer les données à Google Apps Script (à décommenter une fois configuré)
    /*
    fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, files }),
    })
    .then(response => {
        // Masquer le formulaire et afficher le message de succès
        document.getElementById('main-form').classList.add('hidden');
        document.getElementById('success-message').classList.remove('hidden');
    })
    .catch(error => {
        alert('Une erreur est survenue. Veuillez réessayer.');
        submitButton.textContent = 'Envoyer';
        submitButton.disabled = false;
    });
    */
});
