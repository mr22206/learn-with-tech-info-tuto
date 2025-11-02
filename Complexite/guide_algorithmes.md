# Guide sur les Algorithmes et la Complexité

Ce guide est destiné à introduire les concepts de base des algorithmes de tri, de recherche, et l'outil indispensable pour les évaluer : la complexité algorithmique.

---

## 1. Pourquoi Evaluer les Algorithmes ? Introduction à la Complexité

Imaginez que vous avez deux recettes pour faire un gâteau. L'une prend 20 minutes, l'autre 2 heures. Laquelle est la plus "efficace" ? C'est facile à mesurer.

En programmation, c'est pareil. Pour une même tâche (trier un million de nombres), un algorithme peut prendre une milliseconde et un autre plusieurs minutes. La **complexité algorithmique** est l'outil qui nous permet de mesurer cette efficacité, non pas en secondes, mais en **nombre d'opérations** par rapport à la taille des données d'entrée (notée `n`).

On utilise la notation **Big O** (`O(...)`) pour exprimer la complexité dans le **pire des cas**.

### Les Ordres de Complexité à Connaître

| Notation | Nom | Description & Analogie | Performance |
| :--- | :--- | :--- | :--- |
| **`O(1)`** | Constante | Le temps d'exécution ne dépend pas de `n`. (Prendre le premier élément d'un tableau) | Excellente |
| **`O(log n)`** | Logarithmique | L'algorithme divise le problème par deux à chaque étape. (Recherche dans un dictionnaire) | Très rapide |
| **`O(n)`** | Linéaire | Le temps d'exécution est proportionnel à `n`. (Lire tous les éléments d'un tableau) | Bonne |
| **`O(n²)`** | Quadratique | Typique d'une boucle imbriquée dans une autre. (Comparer chaque élément avec tous les autres) | Lente |

**Le Déclic :** `O(log n)` est incroyablement plus rapide que `O(n)`, qui est lui-même bien plus rapide que `O(n²)`. Pour de grandes valeurs de `n`, le choix de l'algorithme est crucial.

---

## 2. Les Algorithmes de Recherche

### A. Recherche Séquentielle (ou Linéaire)

-   **Principe :** On parcourt le tableau, un par un, du début à la fin, jusqu'à trouver l'élément. C'est la méthode la plus simple et la plus intuitive.
-   **Complexité :** `O(n)` dans le pire des cas (si l'élément est à la fin ou absent).
-   **Prérequis :** Aucun. Le tableau n'a pas besoin d'être trié.

### B. Recherche Dichotomique

-   **Principe :** C'est une stratégie de "diviser pour régner".
    1.  On regarde l'élément au milieu du tableau.
    2.  S'il est plus grand que notre cible, on sait que la cible se trouve dans la moitié gauche. On ignore la droite.
    3.  S'il est plus petit, on cherche dans la moitié droite. On ignore la gauche.
    4.  On répète ce processus sur la moitié restante jusqu'à trouver l'élément.
-   **Complexité :** `O(log n)`. C'est extrêmement rapide. Pour trouver un élément parmi un milliard, il faut au maximum 30 comparaisons !
-   **Prérequis :** **OBLIGATOIREMENT**, le tableau doit être trié au préalable.

---

## 3. Les Algorithmes de Tri "Classiques" (en O(n²))

Ces trois algorithmes sont parfaits pour apprendre les bases du tri. Ils sont simples à comprendre mais deviennent lents sur de grands tableaux.

### A. Tri par Sélection

-   **Principe en 1 phrase :** "À chaque tour, on trouve le plus petit élément qui reste et on le place au début de la zone non triée."
-   **Déroulement :**
    1.  On parcourt tout le tableau pour trouver l'élément le plus petit. On l'échange avec le premier élément. La première case est maintenant triée.
    2.  On recommence à partir de la deuxième case : on cherche le plus petit dans le reste du tableau et on l'échange avec le deuxième élément.
    3.  On continue jusqu'à la fin.
-   **Complexité :** Toujours `O(n²)`, même si le tableau est déjà trié. Il parcourt systématiquement le reste du tableau.

### B. Tri à Bulles

-   **Principe en 1 phrase :** "On parcourt le tableau plusieurs fois et on fait 'remonter' les plus grands éléments vers la fin, comme des bulles."
-   **Déroulement :**
    1.  On compare les paires d'éléments adjacents (`T[0]` et `T[1]`, puis `T[1]` et `T[2]`, etc.). Si un élément est plus grand que son voisin de droite, on les échange.
    2.  À la fin du premier passage, le plus grand élément du tableau est garanti d'être à la toute fin.
    3.  On recommence le processus, mais en s'arrêtant à l'avant-dernier élément, et ainsi de suite.
-   **Complexité :** `O(n²)`. Une version optimisée peut s'arrêter si aucun échange n'est fait durant un passage (le tableau est alors trié), ce qui donne `O(n)` dans le meilleur des cas.

### C. Tri par Insertion

-   **Principe en 1 phrase :** "On construit une partie triée à gauche et on insère chaque nouvel élément à la bonne place dans cette partie."
-   **Déroulement :**
    1.  On considère que le premier élément est une liste triée d'un seul élément.
    2.  On prend le deuxième élément et on le "décale" vers la gauche jusqu'à ce qu'il soit à sa place. La liste triée contient maintenant deux éléments.
    3.  On prend le troisième élément et on l'insère à sa place dans la partie déjà triée.
    4.  On continue jusqu'à la fin.
-   **Complexité :** `O(n²)` dans le pire des cas (tableau trié à l'envers). Mais il est très efficace, en **`O(n)`**, si le tableau est **déjà presque trié**.

---

## 4. Résumé et Comparaison

| Algorithme | Complexité (Pire cas) | Espace Mémoire | Quand l'utiliser ? |
| :--- | :--- | :--- | :--- |
| **Tri par Sélection** | `O(n²)` | `O(1)` | Éducatif, pour de petits tableaux. |
| **Tri à Bulles** | `O(n²)` | `O(1)` | Éducatif, presque jamais en pratique. |
| **Tri par Insertion** | `O(n²)` | `O(1)` | Efficace si le tableau est déjà presque trié. |
| **Recherche Séquentielle** | `O(n)` | `O(1)` | Simple, ou si le tableau n'est pas trié. |
| **Recherche Dichotomique** | `O(log n)` | `O(1)` | **La meilleure méthode**, mais le tableau DOIT être trié. |

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>
