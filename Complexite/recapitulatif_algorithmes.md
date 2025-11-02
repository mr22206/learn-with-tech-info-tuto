# Fiches Récapitulatives : Algorithmes et Complexité

Ce document synthétise les concepts et pièges essentiels à maîtriser concernant les algorithmes de tri, de recherche et la notion de complexité.

---

### Fiche 1 : La Complexité (Notation "Big O")

#### 🔵 Principe
> La complexité algorithmique mesure l'efficacité d'un algorithme. Plutôt que de mesurer le temps en secondes (qui dépend de l'ordinateur), on compte le **nombre d'opérations** en fonction de la taille des données d'entrée, notée `n`. La notation **Big O (`O(...)`)** décrit le comportement de l'algorithme dans le **pire des cas**, ce qui nous donne une garantie sur sa performance.

#### ✅ Les Ordres de Grandeur à Connaître
| Big O | Nom | Analogie (Trier des livres sur une étagère) | Performance |
| :--- | :--- | :--- | :--- |
| **`O(1)`** | Constante | Prendre le premier livre. | ⭐⭐⭐⭐⭐ (Instantané) |
| **`O(log n)`**| Logarithmique | Chercher un livre dans un dictionnaire (en divisant par 2 à chaque fois).| ⭐⭐⭐⭐ (Très rapide) |
| **`O(n)`** | Linéaire | Lire le titre de chaque livre, l'un après l'autre. | ⭐⭐⭐ (Bon) |
| **`O(n²)`** | Quadratique | Comparer chaque livre avec tous les autres. | ⭐ (Très lent) |

---

### Fiche 2 : "Deviner" la Complexité d'après les Boucles

#### 🔵 Principe
> La complexité d'un code simple peut souvent être estimée en regardant la structure de ses boucles.

#### ⚠️ Règles et Points de Vigilance
1.  **Boucles successives → On additionne** : Deux boucles `for` l'une après l'autre, c'est `O(n) + O(n)`, ce qui se simplifie en `O(n)`.
    ```c
    for (int i = 0; i < n; i++) { ... } // O(n)
    for (int j = 0; j < n; j++) { ... } // + O(n)
    // Complexité totale = O(n)
    ```
2.  **Boucles imbriquées → On multiplie** : Une boucle `for` à l'intérieur d'une autre, c'est `O(n) * O(n)`, ce qui donne `O(n²)`. C'est le cas typique des tris simples.
    ```c
    for (int i = 0; i < n; i++) {       // O(n)
        for (int j = 0; j < n; j++) {   // * O(n)
            ...
        }
    }
    // Complexité totale = O(n²)
    ```
3.  **Boucle qui divise le problème → `log n`** : Si la variable de boucle double (`i = i * 2`) ou si la taille du problème est divisée par deux à chaque tour, c'est la signature d'une complexité logarithmique, `O(log n)`.

---

### Fiche 3 : Les Tris Classiques en `O(n²)`

#### 🔵 Principe
> Les tris par sélection, à bulles et par insertion sont les algorithmes de base. Ils sont simples, mais lents sur de grands tableaux.

| Tri | Principe en une phrase | Point Clé |
| :--- | :--- | :--- |
| **Tri par Sélection** | "À chaque tour, on **cherche le minimum** du reste et on le place à sa position finale." | Il fait peu d'échanges (swaps), mais il est "aveugle" : toujours `O(n²)`. |
| **Tri à Bulles** | "On **compare les paires** de voisins et on fait remonter les plus grands comme des bulles."| Le plus simple à visualiser, mais généralement le moins performant en pratique. |
| **Tri par Insertion** | "On prend les éléments un par un et on les **insère à leur place** dans la partie déjà triée." | C'est le seul des trois qui est **intelligent** : il est très rapide (`O(n)`) si le tableau est déjà presque trié. |

---

### Fiche 4 : La Recherche Dichotomique et son Piège

#### 🔵 Principe
> La recherche dichotomique (ou binaire) est une méthode extrêmement rapide (`O(log n)`) pour trouver un élément dans un tableau. Elle fonctionne en coupant le champ de recherche en deux à chaque étape.

#### ⚠️ Le Piège Mortel
> La condition **absolue et non négociable** pour utiliser la recherche dichotomique est que **le tableau doit être trié**.
>
> Appliquer cet algorithme sur un tableau non trié ne provoquera pas de crash, mais donnera un **résultat faux ou ne trouvera rien**, car sa logique de division se base sur l'ordre des éléments.

---

### Fiche 5 : Aller plus loin : le Tri en `O(n log n)`

#### 🔵 Principe
> Des algorithmes plus avancés, comme le **Tri Fusion (Merge Sort)**, utilisent une approche de type **"Diviser pour Régner"** pour atteindre une complexité bien meilleure de `O(n log n)`.

#### ✅ Comment ça marche (en bref) ?
1.  **Diviser** : On coupe récursivement le tableau en deux jusqu'à n'avoir que des tableaux d'un seul élément (qui sont, par définition, triés). Cette division se fait `log n` fois.
2.  **Régner (Fusionner)** : On fusionne ensuite ces petits tableaux deux par deux de manière ordonnée. Chaque étape de fusion parcourt tous les `n` éléments.
3.  **Résultat** : `log n` étapes de division, et `n` opérations à chaque étape de fusion mènent à une complexité totale de `O(n log n)`. C'est la meilleure complexité possible pour un tri par comparaison.

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>
---