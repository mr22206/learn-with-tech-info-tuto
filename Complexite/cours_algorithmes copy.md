# Cours : Algorithmes de Tri, Recherche et Complexité

Ce cours introduit les concepts fondamentaux des algorithmes de tri et de recherche, ainsi que l'outil essentiel pour mesurer leur efficacité : la complexité algorithmique.

---

## 1. Introduction à la Complexité Algorithmique

### A. Pourquoi mesurer les algorithmes ?

Pour une même tâche, plusieurs algorithmes peuvent exister. Certains sont plus rapides ou consomment moins de mémoire que d'autres. La **complexité algorithmique** est une manière de mesurer cette efficacité de façon théorique, indépendamment de la vitesse de l'ordinateur.

On s'intéresse principalement à :
-   **La complexité en temps :** Le nombre d'opérations effectuées par l'algorithme.
-   **La complexité en espace :** La mémoire supplémentaire nécessaire.

### B. La Notation Big O (`O(...)`)

La notation Big O décrit comment la performance d'un algorithme se dégrade lorsque la taille des données d'entrée (`n`) augmente. Elle exprime le **pire des cas**.

| Notation | Nom | Exemple | Performance |
| :--- | :--- | :--- | :--- |
| `O(1)` | Constante | Accéder à un élément d'un tableau par son index. | Excellente |
| `O(log n)` | Logarithmique | Recherche dichotomique. | Très rapide |
| `O(n)` | Linéaire | Parcourir tous les éléments d'un tableau. | Bonne |
| `O(n²)` | Quadratique | Une boucle imbriquée (ex: tri à bulles). | Lente |
| `O(n log n)`| "n log n" | La meilleure complexité pour un tri (ex: tri fusion). | Très bonne |

> **Le Déclic :** Pour de grandes quantités de données, la différence entre `O(n²)` et `O(n log n)` est colossale. Choisir le bon algorithme est donc crucial.

---

## 2. Algorithmes de Recherche

### A. Recherche Séquentielle (ou Linéaire)

-   **Principe :** On parcourt le tableau un par un, du début à la fin, jusqu'à trouver l'élément.
-   **Complexité :** `O(n)`
-   **Avantage :** Simple, ne nécessite pas que le tableau soit trié.

### B. Recherche Dichotomique (ou Binaire)

-   **Principe :** C'est une stratégie de "diviser pour régner". On regarde au milieu, et selon que la valeur cherchée est plus grande ou plus petite, on élimine une moitié du tableau et on recommence sur l'autre moitié.
-   **Complexité :** `O(log n)`
-   **Condition OBLIGATOIRE :** Le tableau **doit être trié** au préalable. Utiliser cet algorithme sur un tableau non trié donnera un résultat incorrect.

---

## 3. Algorithmes de Tri "Classiques" en `O(n²)`

Ces algorithmes sont fondamentaux pour l'apprentissage, mais sont trop lents pour être utilisés sur de grands volumes de données.

### A. Tri à Bulles (Bubble Sort)

-   **Principe :** On parcourt le tableau plusieurs fois, en comparant chaque élément avec son voisin de droite. S'ils sont dans le désordre, on les échange. À chaque passage, le plus grand élément "remonte" à sa place définitive.
-   **Cas d'usage :** Principalement pédagogique.

### B. Tri par Sélection (Selection Sort)

-   **Principe :** On divise mentalement le tableau en une partie triée et une non triée. À chaque passe, on cherche le plus petit élément de la partie non triée et on l'échange avec le premier élément de cette même partie.
-   **Caractéristique :** Il effectue toujours le même nombre de comparaisons (`O(n²)`), que le tableau soit trié ou non.

### C. Tri par Insertion (Insertion Sort)

-   **Principe :** On parcourt le tableau à partir du deuxième élément. Chaque élément est pris et "inséré" à sa place correcte dans la partie du tableau déjà triée (à sa gauche), en décalant les autres éléments.
-   **Caractéristique :** C'est un tri "adaptatif". Il est très efficace (complexité proche de `O(n)`) si le tableau est **déjà presque trié**.

---

## 4. Un Tri Efficace : Le Tri Fusion (Merge Sort)

-   **Principe :** C'est l'exemple parfait de "Diviser pour Régner".
    1.  **Diviser :** L'algorithme coupe le tableau en deux, puis recoupe les moitiés en deux, et ainsi de suite jusqu'à n'avoir que des tableaux d'un seul élément.
    2.  **Régner (Fusionner) :** Il fusionne ensuite ces petits tableaux deux par deux de manière ordonnée pour créer des tableaux plus grands et triés, jusqu'à reconstituer le tableau entier.
-   **Complexité en Temps :** `O(n log n)` dans tous les cas (pire, meilleur, moyen). C'est la meilleure complexité possible pour un tri basé sur des comparaisons.
-   **Complexité en Espace :** `O(n)`. Son inconvénient est qu'il n'est pas "en place" : il nécessite un tableau temporaire de la même taille que l'original pour fonctionner.

---

## 5. Tableau Récapitulatif

| Algorithme | Complexité (Pire cas) | Complexité (Meilleur cas) | Espace Auxiliaire | En Place ? | Stable ? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Tri à Bulles** | `O(n²)` | `O(n)` (si optimisé) | `O(1)` | Oui | Oui |
| **Tri par Sélection**| `O(n²)` | `O(n²)` | `O(1)` | Oui | Non |
| **Tri par Insertion**| `O(n²)` | `O(n)` | `O(1)` | Oui | Oui |
| **Tri Fusion** | `O(n log n)`| `O(n log n)` | `O(n)` | Non | Oui |

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>
---
