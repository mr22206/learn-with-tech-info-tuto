# Exercices Corrigés : Algorithmes et Complexité

Ces exercices sont conçus pour tester les concepts clés et les pièges courants liés aux algorithmes de tri et à l'analyse de complexité.

---

### <a id="ex1-algo"></a>Exercice 1 : Quelle est la Complexité ? (Le Déclic des Boucles)

**Question :** Déterminez la complexité (en notation Big O) pour chacun des extraits de code suivants. Vous pouvez modifier la valeur de `n` et exécuter le code pour observer le comportement.

<iframe src="https://www.jdoodle.com/embed/v1/a1ba82c3c73448f" width="100%" height="600" frameborder="0"></iframe>

<details>
<summary><a href="#r1-algo-pdf">🔵 Correction et Explications</a></summary>

**Snippet A :**
- **Complexité : O(n)**
- **Le Déclic :** On a deux boucles **successives**, pas imbriquées. On additionne donc leurs complexités : O(n) + O(n). Le résultat est O(2n), mais comme on ignore les constantes en Big O, la complexité finale est **O(n)**. Les boucles successives ne multiplient pas la complexité.

**Snippet B :**
- **Complexité : O(n²)**
- **Le Déclic :** Ici, les boucles sont **imbriquées**. Pour chaque tour de la boucle externe (`i`), la boucle interne (`j`) s'exécute `n` fois. L'opération se fait donc `n * n` fois. La complexité est **quadratique**. C'est le cas typique des tris simples comme le tri à bulles ou par sélection.

**Snippet C :**
- **Complexité : O(log n)**
- **Le Déclic :** Observez bien l'incrémentation : `i = i * 2`. La variable `i` ne parcourt pas toutes les valeurs jusqu'à `n`. Elle double à chaque étape (1, 2, 4, 8, 16, ...). L'algorithme divise le "problème" restant par deux à chaque fois. C'est la signature d'une complexité **logarithmique**, qui est extrêmement rapide.

</details>

---

### <a id="ex2-algo"></a>Exercice 2 : Le Piège de la Recherche Dichotomique

**Contexte :** On vous donne le tableau d'entiers suivant : `int T[] = {10, 2, 8, 5, 9, 1};`

**Question :** Vous devez trouver la position du chiffre `9` dans ce tableau. Si vous utilisez un algorithme de recherche dichotomique, que se passera-t-il ? (Note: Le code fourni est un exemple de recherche dichotomique correcte, mais appliquée au mauvais tableau).

<iframe src="https://www.jdoodle.com/embed/v1/c7d370e7e1039803" width="100%" height="550" frameborder="0"></iframe>

<details>
<summary><a href="#r2-algo-pdf">🔵 Correction et Explications</a></summary>

- **Réponse :** L'algorithme donnera un résultat **incorrect** ou ne trouvera pas l'élément.
- **Le Déclic :** C'est un piège ! La condition **obligatoire** et non négociable pour utiliser la recherche dichotomique est que le tableau **doit être trié**. L'algorithme se base sur l'ordre pour éliminer la moitié du tableau à chaque étape. Sur un tableau non trié, ses décisions n'ont aucun sens. La première étape aurait été de trier le tableau : `{1, 2, 5, 8, 9, 10}`.

</details>

---

### <a id="ex3-algo"></a>Exercice 3 : Tracer le Tri par Sélection

**Contexte :** Soit le tableau `int T[] = {5, 1, 4, 2};`

**Question :** Montrez l'état du tableau après **chaque passe** de la boucle principale d'un tri par sélection. Le code ci-dessous implémente ce tri et affiche l'état du tableau à chaque étape.

<iframe src="https://www.jdoodle.com/embed/v1/e45014c6e949479b" width="100%" height="600" frameborder="0"></iframe>

<details>
<summary><a href="#r3-algo-pdf">🔵 Correction et Explications</a></summary>

Le principe du tri par sélection est : "à chaque passe, on trouve le plus petit élément restant et on le met au début de la zone non triée".

- **État initial :** `{5, 1, 4, 2}`

- **Passe 1 :**
  - On cherche le minimum dans `{5, 1, 4, 2}`. Le minimum est `1`.
  - On l'échange avec le premier élément (`5`).
  - **État après Passe 1 :** `{1, 5, 4, 2}`

- **Passe 2 :**
  - On cherche le minimum dans la partie non triée `{5, 4, 2}`. Le minimum est `2`.
  - On l'échange avec le premier élément de cette zone (`5`).
  - **État après Passe 2 :** `{1, 2, 4, 5}`

- **Passe 3 :**
  - On cherche le minimum dans la partie non triée `{4, 5}`. Le minimum est `4`.
  - On l'échange avec lui-même (pas de changement visible).
  - **État après Passe 3 :** `{1, 2, 4, 5}`

- **Le Déclic :** Cet exercice montre que le tri peut être terminé visuellement bien avant la fin de l'algorithme. Le tri par sélection n'a aucun moyen de le savoir et continuera ses passes jusqu'au bout. Il est "stupide" dans le sens où il ne s'adapte pas à l'état du tableau.

</details>

---
---
---

## Corrigés

### <a id="r1-algo-pdf"></a>Correction de l'Exercice 1
**Snippet A :**
- **Complexité : O(n)**
- **Le Déclic :** On a deux boucles **successives**, pas imbriquées. On additionne donc leurs complexités : O(n) + O(n). Le résultat est O(2n), mais comme on ignore les constantes en Big O, la complexité finale est **O(n)**. Les boucles successives ne multiplient pas la complexité.

**Snippet B :**
- **Complexité : O(n²)**
- **Le Déclic :** Ici, les boucles sont **imbriquées**. Pour chaque tour de la boucle externe (`i`), la boucle interne (`j`) s'exécute `n` fois. L'opération se fait donc `n * n` fois. La complexité est **quadratique**. C'est le cas typique des tris simples comme le tri à bulles ou par sélection.

**Snippet C :**
- **Complexité : O(log n)**
- **Le Déclic :** Observez bien l'incrémentation : `i = i * 2`. La variable `i` ne parcourt pas toutes les valeurs jusqu'à `n`. Elle double à chaque étape (1, 2, 4, 8, 16, ...). L'algorithme divise le "problème" restant par deux à chaque fois. C'est la signature d'une complexité **logarithmique**, qui est extrêmement rapide.

[⬆️ Retour à l'Exercice 1](#ex1-algo)

---

### <a id="r2-algo-pdf"></a>Correction de l'Exercice 2
- **Réponse :** L'algorithme donnera un résultat **incorrect** ou ne trouvera pas l'élément.
- **Le Déclic :** C'est un piège ! La condition **obligatoire** et non négociable pour utiliser la recherche dichotomique est que le tableau **doit être trié**. L'algorithme se base sur l'ordre pour éliminer la moitié du tableau à chaque étape. Sur un tableau non trié, ses décisions n'ont aucun sens. La première étape aurait été de trier le tableau : `{1, 2, 5, 8, 9, 10}`.

[⬆️ Retour à l'Exercice 2](#ex2-algo)

---

### <a id="r3-algo-pdf"></a>Correction de l'Exercice 3
Le principe du tri par sélection est : "à chaque passe, on trouve le plus petit élément restant et on le met au début de la zone non triée".

- **État initial :** `{5, 1, 4, 2}`

- **Passe 1 :**
  - On cherche le minimum dans `{5, 1, 4, 2}`. Le minimum est `1`.
  - On l'échange avec le premier élément (`5`).
  - **État après Passe 1 :** `{1, 5, 4, 2}`

- **Passe 2 :**
  - On cherche le minimum dans la partie non triée `{5, 4, 2}`. Le minimum est `2`.
  - On l'échange avec le premier élément de cette zone (`5`).
  - **État après Passe 2 :** `{1, 2, 4, 5}`

- **Passe 3 :**
  - On cherche le minimum dans la partie non triée `{4, 5}`. Le minimum est `4`.
  - On l'échange avec lui-même (pas de changement visible).
  - **État après Passe 3 :** `{1, 2, 4, 5}`

- **Le Déclic :** Cet exercice montre que le tri peut être terminé visuellement bien avant la fin de l'algorithme. Le tri par sélection n'a aucun moyen de le savoir et continuera ses passes jusqu'au bout. Il est "stupide" dans le sens où il ne s'adapte pas à l'état du tableau.

[⬆️ Retour à l'Exercice 3](#ex3-algo)

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>
---