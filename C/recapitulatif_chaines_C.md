# Fiches Récapitulatives : Chaînes de Caractères en C

Ce document synthétise les concepts et pièges essentiels à maîtriser concernant les chaînes de caractères en C.

---

### Fiche 1 : Les Fondamentaux (La Convention `\0`)

#### 🔵 Principe
> En C, une chaîne de caractères n'est pas un type de base. C'est une **convention** : un **tableau de `char`** qui doit obligatoirement se terminer par un caractère spécial, le **caractère nul `\0`**. Ce `\0` est un signal ("sentinelle") qui indique la fin de la chaîne.

#### ⚠️ Pièges et Points de Vigilance
1.  **Oublier le `\0`** : Si vous construisez une chaîne manuellement, caractère par caractère, sans ajouter le `\0` final, les fonctions comme `printf` ou `strlen` ne sauront pas où s'arrêter. Elles continueront de lire la mémoire, provoquant des bugs (affichage de "déchets" mémoire, crashs).
2.  **`sizeof` vs `strlen`** : C'est une source d'erreur majeure.
    *   `sizeof(str)` donne la **taille totale allouée en mémoire** pour le tableau. C'est une valeur de compilation.
    *   `strlen(str)` donne la **longueur utile** de la chaîne, c'est-à-dire le nombre de caractères **avant** le `\0`. C'est une valeur calculée à l'exécution.
    *   Pour `char str[] = "salut";`, `sizeof(str)` vaut 6 (5 lettres + `\0`), mais `strlen(str)` vaut 5.

---

### Fiche 2 : `char str[]` vs `char *str` (Mutable vs Immutable)

#### 🔵 Principe
> La manière de déclarer une chaîne change radicalement ce que vous avez le droit de faire.
> *   `char str[] = "salut";` : Crée un **tableau sur la pile (stack)**. C'est une copie locale et **modifiable** de la chaîne.
> *   `char *str = "salut";` : Crée un **pointeur** vers une chaîne littérale stockée dans une zone mémoire en **lecture seule (read-only)**.

#### ⚠️ Pièges et Points de Vigilance
1.  **Modifier un littéral (LE PIÈGE MORTEL)** : Tenter de modifier une chaîne déclarée avec un pointeur est la cause la plus fréquente de crash.
    ```c
    char *str = "salut";
    str[0] = 'S'; // ERREUR DE SEGMENTATION (crash) !
    ```
    Vous tentez d'écrire dans une zone mémoire protégée. **Si vous devez modifier une chaîne, utilisez `char str[]`.**

---

### Fiche 3 : Entrées/Sorties Sécurisées (`fgets` vs `scanf`)

#### 🔵 Principe
> `scanf` est simple mais dangereux. `fgets` est la méthode sûre pour lire une entrée utilisateur.

#### ⚠️ Pièges et Points de Vigilance
1.  **Le danger de `scanf("%s", ...)`** : Cette fonction est à proscrire. Elle ne vérifie pas la taille du tableau de destination. Si l'utilisateur tape une chaîne plus longue que votre buffer, cela provoque un **débordement de mémoire (buffer overflow)**, une faille de sécurité majeure.
2.  **Le vice caché de `fgets`** : `fgets` est sûr car il prend la taille du buffer en argument. Cependant, il stocke le `\n` (le "Entrée" tapé par l'utilisateur) à la fin de la chaîne. Cela casse les comparaisons avec `strcmp`. Il faut **toujours penser à le supprimer**.
    ```c
    // La "formule magique" pour supprimer le \n après un fgets
    chaine[strcspn(chaine, "\n")] = '\0';
    ```

---

### Fiche 4 : Le Piège des Encodages (ASCII vs UTF-8)

#### 🔵 Principe
> Un `char` en C représente un **octet** (8 bits), pas forcément un caractère visible.
> *   **ASCII** : 1 caractère = 1 octet. Simple, mais limité à l'anglais non accentué.
> *   **UTF-8** : Encodage à taille variable. Un caractère peut prendre de 1 à 4 octets. C'est le standard actuel.

#### ⚠️ Pièges et Points de Vigilance
1.  **`strlen` compte les octets, pas les caractères** : L'erreur la plus commune est de croire que `strlen` donne le nombre de symboles. C'est faux.
    *   `strlen("créé")` ne renvoie pas 4, mais 6 (c:1 + r:1 + é:2 + é:2 = 6 octets).
2.  **Itérer sur une chaîne UTF-8** : Parcourir une chaîne avec `for (int i = 0; ...; i++)` est incorrect si la chaîne peut contenir des accents ou des emojis. Vous risquez de vous positionner "au milieu" d'un caractère multi-octets.

---

### Fiche 5 : La Vraie Solution Unicode (`wchar_t`)

#### 🔵 Principe
> Pour manipuler correctement des chaînes contenant des caractères non-ASCII, le C propose un type spécial : `wchar_t` (wide character). Il est assez grand pour contenir n'importe quel caractère Unicode en une seule unité.

#### ⚠️ Points Clés à Retenir
1.  **Préfixe `L`** : Pour déclarer un littéral de chaîne large, il faut utiliser le préfixe `L`.
    `wchar_t *str = L"Bonjour le monde 😊";`
2.  **Fonctions `w`** : Vous ne pouvez pas utiliser `printf`, `strlen`, etc. Il faut impérativement utiliser leurs équivalents "wide", préfixés par `w` : `wprintf`, `wcslen`, `wcscpy`...
3.  **La `locale`** : Pour que le système sache comment afficher ces caractères, il est fondamental de configurer la "locale" au début du programme : `setlocale(LC_ALL, "fr_FR.UTF-8");`

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>