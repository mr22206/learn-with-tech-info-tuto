# Cours : Les Chaînes de Caractères en C

Ce cours a pour objectif de maîtriser la manipulation des chaînes de caractères en C, un concept fondamental mais source d'erreurs fréquentes. Nous verrons leur représentation, les opérations de base, les pièges à éviter et les bonnes pratiques.

---

## 1. Qu'est-ce qu'une Chaîne de Caractères en C ?

Contrairement à d'autres langages, le C n'a pas de type "string" intégré. Une chaîne est une **convention** : il s'agit d'un **tableau de `char`** qui se termine obligatoirement par un caractère spécial : le **caractère nul `\0`**.

Ce `\0` est une "sentinelle" qui indique la fin de la chaîne. Sans lui, les fonctions de C ne savent pas où s'arrêter.

**Exemple :** La chaîne `"Bonjour"` est stockée en mémoire comme suit, avec le `\0` ajouté automatiquement par le compilateur :

| 'B' | 'o' | 'n' | 'j' | 'o' | 'u' | 'r' | `\0` |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|

---

## 2. Déclaration et Mutabilité : Le Piège à Éviter

Il existe deux manières principales de déclarer une chaîne, et leurs différences sont cruciales.

### A. Le Tableau (`char str[]`) : Modifiable

```c
char salutation[] = "Bonjour";
```

-   **Ce qui se passe :** Le compilateur crée un **tableau** sur la pile et y **copie** le contenu "Bonjour" ainsi que le `\0`.
-   **Nature :** Cette chaîne vous appartient. Elle est **modifiable (mutable)**.
-   **Exemple :**
    ```c
    char str[] = "Bonjour";
    str[0] = 'b'; // Parfaitement légal
    printf("%s", str); // Affiche "bonjour"
    ```

### B. Le Pointeur (`char *str`) : Lecture Seule

```c
char *message = "Message important";
```

-   **Ce qui se passe :** Le compilateur stocke la chaîne `"Message important"` dans une zone spéciale de la mémoire en **lecture seule (read-only)**. La variable `message` est un simple **pointeur** qui contient l'adresse de cette zone.
-   **Nature :** Cette chaîne est **non modifiable (immutable)**.
-   **LE PIÈGE MORTEL :** Tenter de la modifier provoquera un crash (Erreur de Segmentation).

    ```c
    char *str = "Intouchable";
    str[0] = 'i'; // ERREUR DE SEGMENTATION (CRASH)
    ```

> **Règle d'or :** Si vous avez besoin de modifier une chaîne, déclarez-la **toujours** comme un tableau : `char nom[] = "..."`.

---

## 3. Longueur vs Taille Allouée (`strlen` vs `sizeof`)

C'est la confusion la plus fréquente.

-   `strlen(str)` : **Calcule à l'exécution** le nombre de caractères **avant** le premier `\0`.
-   `sizeof(str)` : **Donne à la compilation** la taille totale en octets réservée en mémoire pour la variable, `\0` inclus.

```c
char str[50] = "salut";

// strlen va compter les 5 caractères de "salut"
printf("Longueur (strlen) = %zu\n", strlen(str)); // Affiche 5

// sizeof voit la réservation de 50 octets
printf("Taille allouée (sizeof) = %zu\n", sizeof(str)); // Affiche 50
```

---

## 4. Entrées et Sorties : La Voie Sécurisée

### A. Le Danger de `scanf`

La fonction `scanf("%s", ...)` est **extrêmement dangereuse**. Elle ne vérifie pas la taille du tableau de destination. Si l'utilisateur entre un texte plus long que prévu, `scanf` écrira au-delà des limites du tableau, écrasant d'autres parties de la mémoire. C'est un **dépassement de tampon (buffer overflow)**, une faille de sécurité majeure.

### B. La Bonne Pratique : `fgets`

La fonction `fgets` est la méthode à privilégier. Elle est sécurisée car elle prend la taille du tampon en paramètre, empêchant tout dépassement.

```c
char nom[30];
printf("Entrez votre nom : ");
fgets(nom, 30, stdin); // Lit au maximum 29 caractères + \0
```

**Le seul inconvénient :** `fgets` conserve le caractère de nouvelle ligne (`\n`) lorsque l'utilisateur appuie sur "Entrée". Cela peut fausser les comparaisons. Il faut donc toujours penser à le supprimer :

```c
// Ligne à ajouter après chaque fgets pour "nettoyer" la chaîne
nom[strcspn(nom, "\n")] = '\0';
```

---

## 5. La Bibliothèque `<string.h>`

Cette bibliothèque est indispensable. Voici les fonctions clés :

| Fonction | Description | Exemple |
| :--- | :--- | :--- |
| `size_t strlen(s)` | Renvoie la longueur de la chaîne `s` (sans compter le `\0`). | `strlen("test")` → 4 |
| `strcpy(dest, src)` | **Copie** `src` dans `dest`. **Dangereux !** Préférer `strncpy`. | `strcpy(copie, "original");` |
| `strcat(dest, src)` | **Ajoute** `src` à la fin de `dest`. **Dangereux !** Préférer `strncat`.| `strcat(salut, " le monde");` |
| `int strcmp(s1, s2)`| **Compare** `s1` et `s2`. Renvoie **0** si elles sont identiques. | `if (strcmp(mdp, "secret") == 0)` |
| `char *strchr(s, c)`| **Cherche** la première occurrence du caractère `c` dans `s`. | `strchr("hello", 'l')` |
| `char *strstr(s, sub)`| **Cherche** la première occurrence de la sous-chaîne `sub` dans `s`. | `strstr("Bonjour", "jour")` |

> **Bonne pratique :** Toujours utiliser les versions `"n"` (`strncpy`, `strncat`) qui prennent une taille maximale en argument pour éviter les dépassements de tampon.

---

## 6. Encodage et Caractères Non-ASCII

Un `char` en C représente un **octet**, pas nécessairement un "caractère" au sens humain du terme.

-   **ASCII :** 1 caractère = 1 octet. Limité aux caractères anglais de base.
-   **UTF-8 :** Le standard actuel. Un caractère peut être codé sur 1 à 4 octets.

**Impact en C :**
-   `'A'` prend 1 octet.
-   `'é'` prend 2 octets.
-   `'€'` prend 3 octets.
-   `'😂'` prend 4 octets.

Cela signifie que `strlen` **ne compte pas les caractères, mais les octets**. `strlen("créé")` renverra 6 (c:1 + r:1 + é:2 + é:2), et non 4.

Pour manipuler correctement les chaînes avec des caractères non-ASCII, il faut utiliser des outils plus avancés comme le type `wchar_t` et les fonctions associées (`<wchar.h>`), mais c'est un sujet avancé.

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>
---
