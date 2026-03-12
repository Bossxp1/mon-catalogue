const input = document.getElementById('recherche');
const resultats = document.getElementById('resultats');
const triSelect = document.getElementById('tri-select');
let catalogue = [];

// Charger le catalogue
fetch('catalogue.json')
  .then(res => res.json())
  .then(data => {
    catalogue = data;
    afficherProduits(catalogue);
  })
  .catch(err => console.error(err));

function afficherProduits(produits) {

  resultats.innerHTML = '';

  produits.forEach(p => {

    const div = document.createElement('div');
    div.className = 'produit';

    div.innerHTML = `
      <img src="${p.image}" alt="${p.nom}">
      <h3>${p.nom}</h3>
      <p class="prix">${p.prix}</p>
      <p>Réf: ${p.reference}</p>
    `;

    // clic sur le produit
    div.onclick = () => {
      localStorage.setItem("produit", JSON.stringify(p));
      window.location.href = "produit.html";
    };

    resultats.appendChild(div);

  });

}

function filtrerEtTrier() {

  const query = input.value.toLowerCase();
  let filtres = catalogue.filter(p => p.nom.toLowerCase().includes(query));

  const tri = triSelect.value;

  if(tri === "asc") {
    filtres.sort((a,b) => parseFloat(a.prix) - parseFloat(b.prix));
  }
  else if(tri === "desc") {
    filtres.sort((a,b) => parseFloat(b.prix) - parseFloat(a.prix));
  }

  afficherProduits(filtres);
}

// Recherche en temps réel
input.addEventListener('input', filtrerEtTrier);

// Tri
triSelect.addEventListener('change', filtrerEtTrier);