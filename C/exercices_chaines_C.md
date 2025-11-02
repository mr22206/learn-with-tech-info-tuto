# Exercices Corrigés : Chaînes de Caractères en C

Ces exercices sont conçus pour provoquer des déclics sur les pièges les plus courants lors de la manipulation des chaînes de caractères en C.

---

### <a id="ex1-c"></a>Exercice 1 : `sizeof` ou `strlen` ? (Le Déclic de la Mémoire)

**Question :** Sans exécuter le code, prédisez ce qu'afficheront les `printf` suivants. Cliquez sur "Run" pour vérifier votre prédiction.

```{.c .interactive-c}
#include <stdio.h>
#include <string.h>

int main() {
    char str1[] = "test";
    char str2[50] = "test";

    printf("sizeof(str1) = %zu\n", sizeof(str1));
    printf("strlen(str1) = %zu\n", strlen(str1));

    printf("sizeof(str2) = %zu\n", sizeof(str2));
    printf("strlen(str2) = %zu\n", strlen(str2));
    
    return 0;
}
```

<details>
<summary><a href="#r1-c-pdf">🔵 Correction et Explications</a></summary>

- **Résultats attendus :**
  ```
  sizeof(str1) = 5
  strlen(str1) = 4
  sizeof(str2) = 50
  strlen(str2) = 4
  ```
- **Le Déclic :** `sizeof` est une opération qui a lieu à la compilation. Elle vous dit combien de mémoire a été **allouée** pour la variable.
    - Pour `str1`, le compilateur alloue juste assez de place pour "test" (4 octets) plus le `\0` final (1 octet), donc 5.
    - Pour `str2`, on a explicitement demandé d'allouer 50 octets. `sizeof` renvoie donc 50.
- `strlen` est une fonction qui s'exécute. Elle **parcourt** la chaîne à partir du début et compte les caractères jusqu'à ce qu'elle rencontre le `\0`. Dans les deux cas, la chaîne est "test", donc `strlen` s'arrête après 4 caractères. Il ne sait pas et ne se soucie pas de la mémoire allouée après.

</details>

---

### <a id="ex2-c"></a>Exercice 2 : Le Droit de Modifier (Le Déclic du `char*`)

**Question :** L'un de ces deux extraits de code va provoquer un crash. Lequel et pourquoi ? Décommentez la ligne fautive dans le Snippet B pour voir l'erreur.

```{.c .interactive-c}
#include <stdio.h>

void snippet_A() {
    printf("--- Snippet A ---\n");
    char strA[] = "modifiable";
    printf("Avant: %s\n", strA);
    strA[0] = 'M';
    printf("Après: %s\n\n", strA);
}

void snippet_B() {
    printf("--- Snippet B ---\n");
    char *strB = "intouchable";
    printf("Avant: %s\n", strB);
    // Décommentez la ligne suivante pour voir le crash
    // strB[0] = 'I'; 
    printf("Après: %s\n", strB);
}

int main() {
    snippet_A();
    snippet_B();
    return 0;
}
```

<details>
<summary><a href="#r2-c-pdf">🔵 Correction et Explications</a></summary>

- **Le code qui crashe :** Le **Snippet B**.
- **Le Déclic :**
  - **`char strA[]`** crée un **tableau** sur la pile. C'est une copie de la chaîne "modifiable" qui vous appartient. Vous avez tous les droits pour en modifier le contenu.
  - **`char *strB`** crée un **pointeur** vers une chaîne littérale `"intouchable"`. Cette chaîne est stockée dans un segment de mémoire en **lecture seule (read-only)**. Tenter de modifier un caractère (`strB[0] = 'I'`) est une tentative d'écriture dans une zone protégée, ce qui cause une erreur de segmentation et fait planter le programme. C'est le piège le plus classique et le plus dangereux.

</details>

---

### <a id="ex3-c"></a>Exercice 3 : Le Caractère Fantôme (Le Déclic de `fgets`)

**Question :** L'utilisateur tape `admin` et appuie sur Entrée. Pourquoi le programme affiche-t-il "Accès refusé" ? Essayez de corriger le code en décommentant la ligne de correction.

```{.c .interactive-c}
#include <stdio.h>
#include <string.h>

int main() {
    char nom[20];
    printf("Entrez votre nom : ");
    fgets(nom, 20, stdin);

    // Ligne de correction (à décommenter) :
    // nom[strcspn(nom, "\n")] = 0;

    if (strcmp(nom, "admin") == 0) {
        printf("Bonjour, admin !\n");
    } else {
        printf("Accès refusé.\n");
    }
    
    return 0;
}
```

<details>
<summary><a href="#r3-c-pdf">🔵 Correction et Explications</a></summary>

- **Réponse :** Parce que `fgets` inclut le caractère de saut de ligne (`\n`) dans la chaîne qu'il lit.
- **Le Déclic :** Quand l'utilisateur tape `admin` puis `Entrée`, la chaîne stockée dans `nom` n'est pas `"admin"` mais `"admin\n"`.
- La fonction `strcmp` compare les deux chaînes octet par octet. Elle compare `"admin\n"` avec `"admin"`. Les chaînes sont différentes, donc `strcmp` ne retourne pas 0, et la condition `if` est fausse.
- **La solution** est de toujours penser à supprimer ce `\n` "fantôme" après un `fgets` :
  ```c
  // Ajouter cette ligne juste après fgets
  nom[strcspn(nom, "\n")] = '\0'; 
  ```

</details>

---

### <a id="ex4-c"></a>Exercice 4 : Compter en UTF-8 (Le Déclic Multi-Octets)

**Question :** Qu'affichera le code suivant ?

```{.c .interactive-c}
#include <stdio.h>
#include <string.h>

int main() {
    // Note: Le compilateur WASM ne gère pas bien l'UTF-8 directement
    // dans le code source. Cette chaîne simule le comportement.
    char s[] = { 0xc3, 0x87, 'a', ' ', 'v', 'a', ' ', '?', 0x00 }; // "Ça va ?" en UTF-8
    printf("strlen(\"Ça va ?\") = %zu\n", strlen(s));
    return 0;
}
```

<details>
<summary><a href="#r4-c-pdf">🔵 Correction et Explications</a></summary>

- **Réponse attendue :** `strlen = 9` (et non 7).
- **Le Déclic :** `strlen` ne compte **pas des caractères**, il compte **des octets**. Dans l'encodage UTF-8 (le standard sur la plupart des systèmes modernes) :
  - Les caractères ASCII simples comme 'a', ' ', 'v', '?' prennent 1 octet.
  - Les caractères accentués comme 'ç' et 'à' prennent 2 octets chacun.
- Le calcul est donc :
  - `Ç` (2) + `a` (1) + ` ` (1) + `v` (1) + `a` (1) + ` ` (1) + `?` (1) + `\0` (1 octet, mais `strlen` ne le compte pas).
  - Total : 2 + 1 + 1 + 1 + 1 + 1 + 1 = **9 octets**.
- C'est la preuve que dès qu'on sort de l'anglais simple, on ne peut plus se fier à `strlen` pour connaître le nombre de symboles affichables dans une chaîne.

</details>
## Corrigés

### <a id="r1-c-pdf"></a>Correction de l'Exercice 1
- **Résultats attendus :**
  ```
  sizeof(str1) = 5
  strlen(str1) = 4
  sizeof(str2) = 50
  strlen(str2) = 4
  ```
- **Le Déclic :** `sizeof` est une opération qui a lieu à la compilation. Elle vous dit combien de mémoire a été **allouée** pour la variable.
    - Pour `str1`, le compilateur alloue juste assez de place pour "test" (4 octets) plus le `\0` final (1 octet), donc 5.
    - Pour `str2`, on a explicitement demandé d'allouer 50 octets. `sizeof` renvoie donc 50.
- `strlen` est une fonction qui s'exécute. Elle **parcourt** la chaîne à partir du début et compte les caractères jusqu'à ce qu'elle rencontre le `\0`. Dans les deux cas, la chaîne est "test", donc `strlen` s'arrête après 4 caractères. Il ne sait pas et ne se soucie pas de la mémoire allouée après.

[⬆️ Retour à l'Exercice 1](#ex1-c)

---

### <a id="r2-c-pdf"></a>Correction de l'Exercice 2
- **Le code qui crashe :** Le **Snippet B**.
- **Le Déclic :**
  - **`char strA[]`** crée un **tableau** sur la pile. C'est une copie de la chaîne "modifiable" qui vous appartient. Vous avez tous les droits pour en modifier le contenu.
  - **`char *strB`** crée un **pointeur** vers une chaîne littérale `"intouchable"`. Cette chaîne est stockée dans un segment de mémoire en **lecture seule (read-only)**. Tenter de modifier un caractère (`strB[0] = 'I'`) est une tentative d'écriture dans une zone protégée, ce qui cause une erreur de segmentation et fait planter le programme. C'est le piège le plus classique et le plus dangereux.

[⬆️ Retour à l'Exercice 2](#ex2-c)

---

### <a id="r3-c-pdf"></a>Correction de l'Exercice 3
- **Réponse :** Parce que `fgets` inclut le caractère de saut de ligne (`\n`) dans la chaîne qu'il lit.
- **Le Déclic :** Quand l'utilisateur tape `admin` puis `Entrée`, la chaîne stockée dans `nom` n'est pas `"admin"` mais `"admin\n"`.
- La fonction `strcmp` compare les deux chaînes octet par octet. Elle compare `"admin\n"` avec `"admin"`. Les chaînes sont différentes, donc `strcmp` ne retourne pas 0, et la condition `if` est fausse.
- **La solution** est de toujours penser à supprimer ce `\n` "fantôme" après un `fgets` :
  ```c
  // Ajouter cette ligne juste après fgets
  nom[strcspn(nom, "\n")] = '\0'; 
  ```

[⬆️ Retour à l'Exercice 3](#ex3-c)

---

### <a id="r4-c-pdf"></a>Correction de l'Exercice 4
- **Réponse attendue :** `strlen = 9` (et non 7).
- **Le Déclic :** `strlen` ne compte **pas des caractères**, il compte **des octets**. Dans l'encodage UTF-8 (le standard sur la plupart des systèmes modernes) :
  - Les caractères ASCII simples comme 'a', ' ', 'v', '?' prennent 1 octet.
  - Les caractères accentués comme 'ç' et 'à' prennent 2 octets chacun.
- Le calcul est donc :
  - `Ç` (2) + `a` (1) + ` ` (1) + `v` (1) + `a` (1) + ` ` (1) + `?` (1) + `\0` (1 octet, mais `strlen` ne le compte pas).
  - Total : 2 + 1 + 1 + 1 + 1 + 1 + 1 = **9 octets**.
- C'est la preuve que dès qu'on sort de l'anglais simple, on ne peut plus se fier à `strlen` pour connaître le nombre de symboles affichables dans une chaîne.

[⬆️ Retour à l'Exercice 4](#ex4-c)

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>