# 🏡 Collaboration Immobilière - CARR2VIP

Ce projet permet à **5 collaborateurs** (4 propriétaires + 1 artisan) de remplir des informations sur leurs biens et de déposer des devis.

## 📌 Structure
- `index.html` : Page d'accueil avec liens vers les formulaires.
- `form.html` : Formulaire dynamique (bien ou devis).
- `style.css` : Styles pour le site.
- `script.js` : Logique pour afficher/masquer les sections.
- `submit-data.js` : Envoi des données vers Google Sheets.

## 🚀 Déploiement

### 1. Créer un Google Sheet
1. Allez sur [Google Sheets](https://sheets.google.com) et créez un nouveau fichier.
2. Nommez-le `CARR2VIP - Données`.
3. Ajoutez les colonnes suivantes :
   - `timestamp`
   - `user`
   - `nomProprietaire`
   - `emailProprietaire`
   - `adresseBien`
   - `typeBien`
   - `surface`
   - `objectif`
   - `nomArtisan`
   - `entreprise`
   - `bienConcerne`
   - `montantDevis`
   - `dateValidite`
   - `lienPhotos` (pour stocker les liens des photos)
   - `lienDevis` (pour stocker le lien du PDF)

### 2. Créer un Google Apps Script
1. Dans votre Google Sheet, cliquez sur **Extensions > Apps Script**. 
2. Collez le code suivant :

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents).data;

  // Ajouter une nouvelle ligne avec les données
  sheet.appendRow([
    data.timestamp,
    data.user,
    data.nomProprietaire || '',
    data.emailProprietaire || '',
    data.adresseBien || '',
    data.typeBien || '',
    data.surface || '',
    data.objectif || '',
    data.nomArtisan || '',
    data.entreprise || '',
    data.bienConcerne || '',
    data.montantDevis || '',
    data.dateValidite || '',
    '', // lienPhotos (à remplir manuellement ou via Google Drive)
    ''  // lienDevis (à remplir manuellement ou via Google Drive)
  ]);

  return ContentService.createTextOutput('OK');
}
```

3. Déployez le script :
   - Cliquez sur **Déployer > Nouveau déploiement**. 
   - Sélectionnez **Type : Application web**. 
   - Autorisez l'accès à votre Google Sheet.
   - Copiez l'**URL du déploiement** (ex: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`).

4. Remplacez `YOUR_SCRIPT_ID` dans `submit-data.js` par cette URL.

### 3. Héberger le site
#### **Option 1 : GitHub Pages (recommandé)**
1. Poussez ce dépôt sur GitHub.
2. Allez dans **Settings > Pages**. 
3. Sélectionnez la branche `main` et le dossier `/root`.
4. Votre site sera disponible à l'adresse : `https://wlfdarren-cmyk.github.io/CARR2VIP/`.

#### **Option 2 : Netlify/Vercel**
1. Importez ce dépôt sur [Netlify](https://www.netlify.com/) ou [Vercel](https://vercel.com/).
2. Déployez le site.

### 4. Partager le lien
- Partagez le lien du site (ex: `https://wlfdarren-cmyk.github.io/CARR2VIP/`) avec vos 5 collaborateurs.

## 📝 Notes
- **Fonctionnement actuel** : Le formulaire simule l'envoi des données et affiche un message de succès. Pour un envoi réel, configurez le Google Apps Script comme décrit ci-dessus.
- **Gestion des fichiers** : Les fichiers (photos et PDF) ne sont pas encore gérés automatiquement. Pour une solution complète, utilisez **Google Drive API** ou un service comme **Firebase Storage**. 
- Pour une gestion avancée des fichiers, contactez-moi pour une solution sur mesure.

## 🔧 Personnalisation
- Modifiez les champs dans `form.html` selon vos besoins.
- Adaptez les styles dans `style.css`.
