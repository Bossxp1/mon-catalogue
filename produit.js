const produit = JSON.parse(localStorage.getItem("produit"));

document.getElementById("imageProduit").src = produit.image;
document.getElementById("nomProduit").textContent = produit.nom;
document.getElementById("prixProduit").textContent = produit.prix;
document.getElementById("refProduit").textContent = "Réf : " + produit.reference;