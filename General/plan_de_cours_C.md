# Plan de Cours (1 Heure) : Les Pièges des Chaînes en C

**Objectif :** En une heure, provoquer des déclics chez l'élève sur les 3 concepts les plus piégeux des chaînes de caractères en C, en s'appuyant sur les fiches et exercices fournis. L'approche est interactive, basée sur la prédiction et l'expérimentation.

**Matériel Requis :** Un éditeur de code avec un compilateur C, et les fichiers `exercices_chaines_C.md` et `quiz_chaines_C.md` à portée de main.

---

### Étape 1 : Introduction et Analogie (5 minutes)

**Discours :**
"Bonjour ! Aujourd'hui, on va aborder un sujet fondamental en C : les chaînes de caractères. Contrairement à beaucoup d'autres langages, le C n'a pas de type 'string' simple. C'est une source de bugs très courants, même pour les pros. Mais si on comprend 3 concepts clés, tout devient plus clair."

"L'analogie à retenir : **une chaîne en C, c'est comme un train.**"
1.  Les wagons sont les caractères (`'B'`, `'o'`, `'n'`, ...).
2.  Chaque wagon est un `char` (un octet en mémoire).
3.  Le plus important, c'est le **dernier wagon**, qui est toujours le même : le caractère nul, `\0`. C'est le signal qui dit "le train est terminé". Sans ce wagon, les fonctions C ne savent pas où s'arrêter et c'est le déraillement assuré."

"Notre but aujourd'hui est de devenir des chefs de gare experts pour ne jamais faire dérailler nos trains."

---

### Étape 2 : Le Contenant et le Contenu (`sizeof` vs `strlen`) (15 minutes)

**Partie 1 : Explication (5 min)**
-   Ouvrir le fichier `guide_chaines_C.md`, section 1 et 2.
-   Expliquer la déclaration `char nom[50];`.
-   **Discours :** "Quand on écrit ça, on réserve un grand parking de 50 places. C'est la taille du **contenant**."
-   "Maintenant, si j'y mets la chaîne 'Alex', j'utilise 4 places pour les lettres, plus une place obligatoire pour le `\0`. C'est le **contenu**."
-   "En C, il y a deux outils pour mesurer ça, et il ne faut JAMAIS les confondre :
    -   `sizeof` : mesure la taille du **contenant** (le parking). C'est décidé à la compilation.
    -   `strlen` : mesure la taille du **contenu** (le nombre de voitures garées, sans compter le `\0`). La fonction compte les wagons un par un jusqu'à trouver le `\0`."

**Partie 2 : Mise en Pratique (10 min)**
-   Ouvrir `exercices_chaines_C.md`, Exercice 1.
-   **Cacher la solution.**
-   **Interaction :** "Regarde ce code. Sans l'exécuter, essaie de deviner ce que chaque `printf` va afficher. Prends ton temps, applique la logique du contenant et du contenu."
-   Laisser l'élève réfléchir et proposer une réponse.
-   Dévoiler la solution et l'exécuter. Discuter de chaque ligne :
    -   `sizeof(str1)` : 5, car le compilateur est sympa, il a alloué juste la place pour "test" + `\0`.
    -   `strlen(str1)` : 4, la longueur du mot "test".
    -   `sizeof(str2)` : 50, on avait réservé un grand parking de 50 places.
    -   `strlen(str2)` : 4, même si le parking est grand, il n'y a que "test" dedans.
-   **Valider le déclic :** "Est-ce que la différence est claire ? C'est le piège numéro 1."

---

### Étape 3 : Le Droit de Modifier (`char[]` vs `char*`) (15 minutes)

**Partie 1 : Explication (5 min)**
-   Se référer à la Fiche 2 de `recapitulatif_chaines_C.md`.
-   **Discours :** "Il y a deux façons principales de déclarer une chaîne, et l'une d'elles est un piège mortel.
    -   `char str[] = "salut";` : Ici, tu demandes au C de **créer une copie** de la chaîne "salut" dans un tableau qui t'appartient. C'est ton propre carnet de notes, tu peux raturer, effacer, réécrire dessus. C'est **modifiable**.
    -   `char *str = "salut";` : Ici, tu ne crées pas de copie. Tu crées une **étiquette (un pointeur)** qui pointe vers la chaîne "salut" originale, qui est stockée dans la "bibliothèque" du programme. Cette zone est en **lecture seule**. Tu as le droit de la lire, mais pas de l'altérer."

**Partie 2 : Mise en Pratique (10 min)**
-   Ouvrir `exercices_chaines_C.md`, Exercice 2.
-   **Cacher la solution.**
-   **Interaction :** "L'un de ces deux codes va crasher violemment. Lequel, et pourquoi, d'après ce qu'on vient de dire ?"
-   Laisser l'élève analyser `strA` (la copie) et `strB` (le pointeur vers l'original).
-   Dévoiler la solution, et si possible, compiler et exécuter le code B pour provoquer le "Segmentation fault".
-   **Discours :** "Cette erreur, 'Segmentation fault', tu la verras souvent. 9 fois sur 10 avec les chaînes, c'est parce que tu as essayé d'écrire sur une chaîne en lecture seule."
-   **Valider le déclic :** "Retiens bien : si tu as besoin de modifier une chaîne, déclare-la avec `char str[]`."

---

### Étape 4 : Lire Proprement (`fgets` et le `\n`) (10 minutes)

**Partie 1 : Explication (5 min)**
-   Se référer à la Fiche 3 de `recapitulatif_chaines_C.md`.
-   **Discours :** "Pour lire ce que tape l'utilisateur, on est souvent tenté d'utiliser `scanf`. C'est une très mauvaise idée, c'est la fonction la plus dangereuse du C car elle ne vérifie pas la taille et peut faire 'déborder' la mémoire. On l'oublie."
-   "La bonne méthode, c'est `fgets`. Elle est sûre, mais elle a un petit vice caché. Quand tu tapes ton nom et que tu appuies sur 'Entrée', `fgets` stocke aussi le 'Entrée' (le `\n`). Et ça, ça casse toutes nos comparaisons."

**Partie 2 : Mise en Pratique (5 min)**
-   Ouvrir `exercices_chaines_C.md`, Exercice 3.
-   **Cacher la solution.**
-   **Interaction :** "Regarde ce code. L'utilisateur tape `admin` et appuie sur Entrée. Pourquoi est-ce que ça ne marche pas ?"
-   Guider l'élève vers l'idée que la chaîne stockée n'est pas `"admin"` mais `"admin\n"`.
-   Montrer la solution avec la ligne `nom[strcspn(nom, "\n")] = '\0';`.
-   **Discours :** "Cette ligne peut paraître compliquée, mais retiens-la comme une 'formule magique' à appliquer après chaque `fgets` pour nettoyer la chaîne. Elle cherche le `\n` et le remplace par un `\0`."

---

### Étape 5 : Synthèse et Ouverture (5 minutes)

**Discours :**
"En résumé, pour maîtriser 80% des problèmes avec les chaînes en C, il faut retenir 3 choses :"
1.  "Toujours faire la différence entre la **taille allouée (`sizeof`)** et la **longueur utile (`strlen`)**."
2.  "Si tu dois modifier une chaîne, utilise un **tableau (`char[]`)**, jamais un pointeur vers un littéral (`char*`)."
3.  "Pour lire une entrée, utilise **`fgets`** et n'oublie pas de **nettoyer le `\n`**."

**Ouverture (Teaser) :**
-   Montrer rapidement l'exercice 4 de `exercices_chaines_C.md`.
-   **Discours :** "Juste pour ta culture, sache qu'il y a un dernier piège : `strlen` ne compte pas les caractères, mais les octets. Pour un mot comme 'Ça', qui a 2 caractères, `strlen` te donnera 3, car le 'Ç' prend 2 octets en mémoire. C'est un sujet plus avancé (l'encodage UTF-8), mais garde ça dans un coin de ta tête."

**Q&A :** "As-tu des questions sur ce qu'on a vu ?"

---

<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>

---
