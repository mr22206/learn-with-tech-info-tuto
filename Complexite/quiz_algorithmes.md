# Quiz sur les Algorithmes et la Complexité

Ce quiz est conçu pour tester la compréhension des concepts clés liés à la complexité et aux algorithmes de tri et de recherche.

---

### <a id="q1-algo"></a>Question 1 : Identifier la Complexité

Quelle est la complexité du bloc de code suivant ?

```c
void fonction(int n) {
    for (int i = 1; i < n; i = i * 2) {
        printf("%d", i);
    }
}
```

- A) `O(n)`
- B) `O(n²)`
- C) `O(log n)`
- D) `O(1)`

<details>
<summary><a href="#r1-algo-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : C**

**Le déclic :** Il faut regarder attentivement comment la variable de boucle (`i`) évolue. Elle n'est pas incrémentée de 1 en 1 (`i++`). Au contraire, elle **double** à chaque itération (`i = i * 2`). Les valeurs de `i` seront : 1, 2, 4, 8, 16, 32, ... Pour atteindre `n`, on ne fait pas `n` tours, mais un nombre de tours qui correspond à la puissance de 2 nécessaire pour atteindre `n`. C'est la définition même d'un **logarithme en base 2**. Cette complexité est très performante. C'est la signature des algorithmes qui divisent le problème en deux à chaque étape, comme la recherche dichotomique.

</details>

---

### <a id="q2-algo"></a>Question 2 : Le Prérequis Indispensable

Vous avez le tableau `T[] = {20, 3, 15, 8, 11}` et vous voulez trouver la position du nombre `8`.

Si vous appliquez directement un algorithme de recherche dichotomique, que se passera-t-il ?

- A) L'algorithme trouvera `8` en très peu d'étapes.
- B) L'algorithme va crasher.
- C) L'algorithme donnera un résultat faux ou ne trouvera pas `8`.
- D) L'algorithme fonctionnera, mais sera aussi lent qu'une recherche normale.

<details>
<summary><a href="#r2-algo-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : C**

**Le déclic :** C'est le piège le plus classique ! La recherche dichotomique a une condition **non négociable** : elle ne fonctionne **QUE** sur un tableau **préalablement trié**. Son efficacité vient du fait qu'elle peut éliminer la moitié des données à chaque étape en se basant sur l'ordre des éléments. Si le tableau est en désordre, comme ici, ses décisions n'ont aucun sens. Elle pourrait, par exemple, comparer `8` à l'élément du milieu `15`, conclure que `8` est plus petit et donc chercher à gauche, ignorant ainsi la partie `[8, 11]` où se trouve la bonne réponse. La première étape aurait dû être de trier le tableau : `{3, 8, 11, 15, 20}`.

</details>

---

### <a id="q3-algo"></a>Question 3 : Le Meilleur Outil pour la Tâche

On vous donne un très grand tableau qui est "presque trié" : seuls quelques éléments sont à la mauvaise place.

Quel algorithme de tri parmi les suivants serait le plus rapide pour finaliser le tri ?

- A) Tri par sélection
- B) Tri à bulles
- C) Tri par insertion
- D) Ils sont tous aussi lents.

<details>
<summary><a href="#r3-algo-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : C**

**Le déclic :** Bien que les trois tris soient en `O(n²)` dans le pire des cas, leur comportement change selon l'état initial du tableau.
-   Le **tri par sélection** et le **tri à bulles** (non optimisé) sont "aveugles". Ils effectueront toujours leur `n²` opérations, même si le tableau est déjà trié.
-   Le **tri par insertion** est différent. Son mécanisme consiste à prendre un élément et à le décaler vers la gauche jusqu'à sa place. Si le tableau est presque trié, chaque élément est déjà très proche de sa position finale. Le "décalage" sera donc très court ou nul pour la plupart des éléments. Dans ce cas précis (tableau presque trié), la complexité du tri par insertion se rapproche de son meilleur cas, qui est `O(n)`. Il est donc beaucoup plus performant que les autres dans cette situation.

</details>

---

### <a id="q4-algo"></a>Question 4 : Suivre l'Exécution

Soit le tableau `T[] = {7, 2, 8, 1, 5}`.

Quel sera l'état du tableau après la **première passe complète** de la boucle principale d'un **tri par sélection** ?

- A) `{2, 7, 8, 1, 5}`
- B) `{1, 2, 8, 7, 5}`
- C) `{7, 2, 1, 8, 5}`
- D) `{2, 8, 1, 5, 7}`

<details>
<summary><a href="#r4-algo-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : B**

**Le déclic :** Il faut se souvenir du principe exact du tri par sélection. Son unique objectif à chaque passe est :
1.  **Trouver** le plus petit élément de la zone non triée.
2.  **L'échanger** avec l'élément qui se trouve au début de cette zone.

-   **État initial :** `{7, 2, 8, 1, 5}`. La zone non triée est le tableau entier.
-   **Passe 1 :**
    1.  On parcourt tout le tableau `{7, 2, 8, 1, 5}` pour trouver le minimum. Le minimum est `1`.
    2.  On échange ce minimum (`1`) avec le premier élément de la zone (`7`).
-   **État final après la passe 1 :** `{1, 2, 8, 7, 5}`. L'élément `1` est maintenant à sa place définitive, et la prochaine passe commencera à partir du `2`.

</details>

## Corrigés

### <a id="r1-algo-pdf"></a>Réponse à la Question 1
**Réponse correcte : C**

**Le déclic :** Il faut regarder attentivement comment la variable de boucle (`i`) évolue. Elle n'est pas incrémentée de 1 en 1 (`i++`). Au contraire, elle **double** à chaque itération (`i = i * 2`). Les valeurs de `i` seront : 1, 2, 4, 8, 16, 32, ... Pour atteindre `n`, on ne fait pas `n` tours, mais un nombre de tours qui correspond à la puissance de 2 nécessaire pour atteindre `n`. C'est la définition même d'un **logarithme en base 2**. Cette complexité est très performante. C'est la signature des algorithmes qui divisent le problème en deux à chaque étape, comme la recherche dichotomique.

[⬆️ Retour à la Question 1](#q1-algo)

---

### <a id="r2-algo-pdf"></a>Réponse à la Question 2
**Réponse correcte : C**

**Le déclic :** C'est le piège le plus classique ! La recherche dichotomique a une condition **non négociable** : elle ne fonctionne **QUE** sur un tableau **préalablement trié**. Son efficacité vient du fait qu'elle peut éliminer la moitié des données à chaque étape en se basant sur l'ordre des éléments. Si le tableau est en désordre, comme ici, ses décisions n'ont aucun sens. Elle pourrait, par exemple, comparer `8` à l'élément du milieu `15`, conclure que `8` est plus petit et donc chercher à gauche, ignorant ainsi la partie `[8, 11]` où se trouve la bonne réponse. La première étape aurait dû être de trier le tableau : `{3, 8, 11, 15, 20}`.

[⬆️ Retour à la Question 2](#q2-algo)

---

### <a id="r3-algo-pdf"></a>Réponse à la Question 3
**Réponse correcte : C**

**Le déclic :** Bien que les trois tris soient en `O(n²)` dans le pire des cas, leur comportement change selon l'état initial du tableau.
-   Le **tri par sélection** et le **tri à bulles** (non optimisé) sont "aveugles". Ils effectueront toujours leur `n²` opérations, même si le tableau est déjà trié.
-   Le **tri par insertion** est différent. Son mécanisme consiste à prendre un élément et à le décaler vers la gauche jusqu'à sa place. Si le tableau est presque trié, chaque élément est déjà très proche de sa position finale. Le "décalage" sera donc très court ou nul pour la plupart des éléments. Dans ce cas précis (tableau presque trié), la complexité du tri par insertion se rapproche de son meilleur cas, qui est `O(n)`. Il est donc beaucoup plus performant que les autres dans cette situation.

[⬆️ Retour à la Question 3](#q3-algo)

---

### <a id="r4-algo-pdf"></a>Réponse à la Question 4
**Réponse correcte : B**

**Le déclic :** Il faut se souvenir du principe exact du tri par sélection. Son unique objectif à chaque passe est :
1.  **Trouver** le plus petit élément de la zone non triée.
2.  **L'échanger** avec l'élément qui se trouve au début de cette zone.

-   **État initial :** `{7, 2, 8, 1, 5}`. La zone non triée est le tableau entier.
-   **Passe 1 :**
    1.  On parcourt tout le tableau `{7, 2, 8, 1, 5}` pour trouver le minimum. Le minimum est `1`.
    2.  On échange ce minimum (`1`) avec le premier élément de la zone (`7`).
-   **État final après la passe 1 :** `{1, 2, 8, 7, 5}`. L'élément `1` est maintenant à sa place définitive, et la prochaine passe commencera à partir du `2`.

[⬆️ Retour à la Question 4](#q4-algo)

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>
---
