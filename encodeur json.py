import json
import os

fichier_json = 'catalogue.json'

# Charge le fichier si il existe
if os.path.exists(fichier_json):
    with open(fichier_json, 'r', encoding='utf-8') as f:
        try:
            catalogue = json.load(f)
        except json.JSONDecodeError:
            catalogue = []
else:
    catalogue = []

print("=== Ajout rapide de produits (nom, prix, référence, page) ===")
print("Exemple: moteur a voiture, 250, REF123, 10")
print("Tape 'q' pour quitter")

while True:
    ligne = input("Produit : ").strip()
    if ligne.lower() == 'q':
        break

    # Séparer les champs par des virgules
    champs = [c.strip() for c in ligne.split(',')]
    if len(champs) < 4:
        print("Erreur : veuillez fournir 4 champs séparés par des virgules")
        continue

    nom, prix, reference, page = champs

    # Ajouter automatiquement € si absent
    if '€' not in prix:
        prix += '€'

    try:
        page = int(page)
    except ValueError:
        page = None

    produit = {"nom": nom, "prix": prix, "reference": reference, "page": page}
    catalogue.append(produit)

    # Écriture immédiate dans le JSON
    with open(fichier_json, 'w', encoding='utf-8') as f:
        json.dump(catalogue, f, ensure_ascii=False, indent=2)

    print(f"Produit '{nom}' ajouté et sauvegardé !\n")

print(f"Catalogue sauvegardé dans '{fichier_json}'.")