const input = document.getElementById('recherche');
const resultats = document.getElementById('resultats');
const triSelect = document.getElementById('tri-select');
let catalogue = [];

// Charger le catalogue
fetch('catalogue.json')
  .then(res => res.json())
  .then(data => catalogue = data)
  .catch(err => console.error(err));

function afficherProduits(produits) {
  resultats.innerHTML = '';
  produits.forEach(p => {
    const div = document.createElement('div');
    div.className = 'produit';
    div.innerHTML = `
      <img src="${p.image}" alt="${p.nom}">
      <strong>${p.nom}</strong><br>
      Prix: ${p.prix}<br>
      Réf: ${p.reference}<br>
      Page: ${p.page}
    `;
    resultats.appendChild(div);
  });
}

function filtrerEtTrier() {
  const query = input.value.toLowerCase();
  let filtres = catalogue.filter(p => p.nom.toLowerCase().includes(query));

  const tri = triSelect.value;

  if(tri === "asc") {
    filtres.sort((a,b) => parseFloat(a.prix) - parseFloat(b.prix));
  } else if(tri === "desc") {
    filtres.sort((a,b) => parseFloat(b.prix) - parseFloat(a.prix));
  } // default = ne rien faire (ordre du JSON)

  afficherProduits(filtres);
}

// Recherche en temps réel
input.addEventListener('input', filtrerEtTrier);

// Changement de tri via le select
triSelect.addEventListener('change', filtrerEtTrier);

// Affichage initial (tout le catalogue)
window.addEventListener('load', () => {
  afficherProduits(catalogue);
});