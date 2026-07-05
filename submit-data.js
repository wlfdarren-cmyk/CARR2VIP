// Fonction pour stocker les données localement (dans le navigateur)
function saveDataLocally(data) {
  // Récupérer les données existantes ou initialiser un tableau vide
  let existingData = JSON.parse(localStorage.getItem('carr2vipData')) || [];
  
  // Ajouter les nouvelles données
  existingData.push(data);
  
  // Sauvegarder dans localStorage
  localStorage.setItem('carr2vipData', JSON.stringify(existingData));
  
  return true;
}

// Fonction pour exporter les données (optionnel)
function exportData() {
  const data = JSON.parse(localStorage.getItem('carr2vipData')) || [];
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'carr2vip_data.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

// Convertir les données en CSV
function convertToCSV(data) {
  if (data.length === 0) return '';
  
  // Créer les en-têtes
  const headers = Object.keys(data[0]);
  let csv = headers.join(',') + '\n';
  
  // Ajouter les lignes de données
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header] || '';
      // Échapper les guillemets et les virgules
      return `"${value.toString().replace(/"/g, '""')}"`;
    });
    csv += values.join(',') + '\n';
  });
  
  return csv;
}

// Gérer l'envoi du formulaire
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

  // Gérer les fichiers (afficher les noms)
  const photos = formData.getAll('photos');
  const pdfDevis = formData.get('pdfDevis');
  
  if (photos.length > 0) {
    data.photos = Array.from(photos).map(file => file.name).join(', ');
  }
  if (pdfDevis) {
    data.pdfDevis = pdfDevis.name;
  }

  // Afficher un message de chargement
  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.textContent = 'Envoi en cours...';
  submitButton.disabled = true;

  // Sauvegarder les données localement
  setTimeout(() => {
    if (saveDataLocally(data)) {
      // Masquer le formulaire et afficher le message de succès
      document.getElementById('main-form').classList.add('hidden');
      document.getElementById('success-message').classList.remove('hidden');
      
      // Ajouter un bouton pour exporter les données (optionnel)
      const exportButton = document.createElement('button');
      exportButton.textContent = 'Exporter les données (CSV)';
      exportButton.className = 'button';
      exportButton.onclick = exportData;
      document.getElementById('success-message').appendChild(exportButton);
    } else {
      alert('Erreur lors de la sauvegarde des données.');
      submitButton.textContent = 'Envoyer';
      submitButton.disabled = false;
    }
  }, 1000);
});
