# Guide sur les Chaînes de Caractères en C

Ce guide est destiné aux étudiants débutant en langage C et souhaitant maîtriser la manipulation des chaînes de caractères, un concept fondamental en programmation.

## 1. Qu'est-ce qu'une chaîne de caractères en C ?

Contrairement à d'autres langages, le C n'a pas de type de données "chaîne" (string) intégré. En C, une chaîne de caractères est simplement un **tableau de caractères (`char`)**.

La particularité la plus importante est qu'une chaîne doit toujours se terminer par un caractère spécial : le **caractère nul**, noté `\0`. C'est ce caractère qui indique la fin de la chaîne.

**Exemple :** La chaîne "Bonjour" est stockée en mémoire comme suit :

| B | o | n | j | o | u | r | `\0` |
|---|---|---|---|---|---|---|---|

Si vous oubliez le `\0`, les fonctions C qui manipulent les chaînes continueront de lire la mémoire jusqu'à en trouver un par hasard, ce qui provoquera des bugs imprévisibles (comportement indéfini).

## 2. Déclaration et Initialisation

Il y a plusieurs façons de déclarer une chaîne :

```c
// 1. Initialisation directe (la plus courante)
// Le compilateur ajoute automatiquement le '\0' et calcule la taille.
char salutation[] = "Bonjour";

// 2. Déclaration avec une taille fixe
// Utile quand on ne connaît pas la chaîne à l'avance.
// Il faut prévoir assez de place pour le contenu ET le '\0'.
char nom[50]; // Peut contenir 49 caractères + le '\0'

// 3. Pointeur vers une chaîne littérale (AVANCÉ)
// ATTENTION : Cette chaîne est en "lecture seule", vous ne pouvez PAS la modifier.
char *message = "Ceci est un message constant";
// Tenter de faire message[0] = 'A'; provoquera une erreur à l'exécution.
```

## 3. Afficher et Lire des chaînes

### Afficher avec `printf`

On utilise le format `%s` pour afficher une chaîne de caractères.

```c
#include <stdio.h>

int main() {
    char prenom[] = "Alex";
    printf("Bonjour, %s !\n", prenom); // Affiche "Bonjour, Alex !"
    return 0;
}
```

### Lire une entrée utilisateur

C'est ici que les choses se compliquent et qu'il faut être prudent.

**La mauvaise méthode : `scanf`**

`scanf("%s", ...)` est **extrêmement dangereux**. Si l'utilisateur tape une chaîne plus longue que la taille de votre tableau, `scanf` continuera d'écrire en mémoire, écrasant d'autres données importantes. C'est ce qu'on appelle un **dépassement de tampon (buffer overflow)**, une faille de sécurité majeure.

```c
// À NE PAS FAIRE !
char nom[10];
printf("Entrez votre nom : ");
scanf("%s", nom); // Si l'utilisateur tape "Alexandre", c'est le crash !
```

**La bonne méthode : `fgets`**

`fgets` est la fonction à privilégier. Elle est sécurisée car elle prend la taille maximale du tableau en paramètre, empêchant tout dépassement.

```c
#include <stdio.h>
#include <string.h> // Pour strcspn

int main() {
    char ville[50];
    printf("Dans quelle ville habitez-vous ? ");

    // Lit au maximum 49 caractères (+ '\0') depuis l'entrée standard (clavier)
    fgets(ville, 50, stdin);

    // fgets conserve le retour à la ligne ('\n') si l'utilisateur appuie sur Entrée.
    // On le supprime pour avoir une chaîne "propre".
    ville[strcspn(ville, "\n")] = 0;

    printf("Vous habitez à %s.\n", ville);
    return 0;
}
```

## 4. La Bibliothèque `<string.h>`

Le C fournit une bibliothèque standard très puissante pour manipuler les chaînes. Pour l'utiliser, il faut inclure `#include <string.h>`.

Voici les fonctions les plus importantes à connaître :

| Fonction | Description | Exemple |
|---|---|---|
| `size_t strlen(const char *s)` | Renvoie la **longueur** de la chaîne `s` (sans compter le `\0`). | `strlen("Bonjour")` renvoie 7. |
| `strcpy(char *dest, const char *src)` | **Copie** la chaîne `src` dans `dest`. **DANGEREUX** : pas de vérification de taille ! | `strcpy(ma_chaine, "test");` |
| `strncpy(char *dest, const char *src, size_t n)` | **Copie** au maximum `n` caractères de `src` dans `dest`. Plus sécurisé. | `strncpy(dest, src, 10);` |
| `strcat(char *dest, const char *src)` | **Concatène** (ajoute) la chaîne `src` à la fin de `dest`. **DANGEREUX**. | `strcat(chaine1, chaine2);` |
| `strncat(char *dest, const char *src, size_t n)` | **Concatène** au maximum `n` caractères de `src` à la fin de `dest`. Plus sécurisé. | `strncat(dest, src, 10);` |
| `int strcmp(const char *s1, const char *s2)` | **Compare** `s1` et `s2`. Renvoie **0** si elles sont identiques. | `if (strcmp(pass, "1234") == 0)` |
| `char *strchr(const char *s, int c)` | **Cherche** la première occurrence du caractère `c` dans `s`. Renvoie un pointeur vers `c` ou `NULL` si non trouvé. | `if (strchr(email, '@') != NULL)` |
| `char *strstr(const char *haystack, const char *needle)` | **Cherche** la première occurrence de la sous-chaîne `needle` dans `haystack`. | `if (strstr(url, "http") != NULL)` |

**Règle d'or :** Toujours privilégier les versions `n` (`strncpy`, `strncat`) car elles vous protègent contre les dépassements de tampon.

## 5. Gestion Dynamique de la Mémoire

Que faire si on ne connaît pas la taille de la chaîne à l'avance ? On utilise l'allocation dynamique avec `malloc` de la bibliothèque `<stdlib.h>`.

1.  On alloue de la mémoire sur le "tas" (heap) de la taille souhaitée.
2.  On utilise la mémoire comme un tableau normal.
3.  **Très important :** On doit **libérer** la mémoire avec `free()` quand on n'en a plus besoin pour éviter les fuites de mémoire.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char temp[100]; // Un buffer temporaire
    printf("Entrez une phrase : ");
    fgets(temp, 100, stdin);
    temp[strcspn(temp, "\n")] = 0;

    // 1. Allouer la mémoire EXACTE nécessaire
    char *ma_chaine = malloc(strlen(temp) + 1); // +1 pour le '\0'

    if (ma_chaine == NULL) {
        // Toujours vérifier si malloc a réussi
        printf("Erreur d'allocation mémoire\n");
        return 1;
    }

    // 2. Utiliser la chaîne
    strcpy(ma_chaine, temp);
    printf("Vous avez écrit : %s\n", ma_chaine);

    // 3. Libérer la mémoire !
    free(ma_chaine);

    return 0;
}
```

## 6. Introduction aux Encodages

### Pourquoi un encodage ?

Un ordinateur ne comprend que les nombres binaires (0 et 1). Un encodage est une table de correspondance qui associe un caractère (`'A'`, `'€'`, `'é'`) à un nombre.

### ASCII

-   L'un des premiers encodages.
-   Très simple : 1 caractère = 1 octet (en réalité 7 bits, mais stocké sur 8).
-   Ne contient que **128 caractères** : lettres anglaises (non accentuées), chiffres, et quelques symboles.
-   **Inconvénient :** Incapable de représenter les accents, les alphabets non latins (cyrillique, arabe...), les emojis, etc.

### UTF-8

-   Le standard quasi-universel aujourd'hui (utilisé par >95% du web).
-   **Compatible avec ASCII :** Les 128 premiers caractères de l'UTF-8 sont identiques à l'ASCII.
-   **Taille variable :** Un caractère peut être codé sur 1, 2, 3 ou 4 octets.
    -   `'A'` prend 1 octet.
    -   `'é'` prend 2 octets.
    -   `'€'` prend 3 octets.
    -   `'😂'` prend 4 octets.
-   **Impact en C :** Un `char` en C représente **un octet**, pas forcément un caractère.
    -   Si vous faites `strlen("créé")`, le résultat sera `6` (c-r-é-é -> 1 + 1 + 2 + 2), car "é" est codé sur 2 octets en UTF-8.
    -   C'est un sujet avancé, mais il est important de savoir que `strlen` compte les octets, pas les "caractères" visibles.

## Résumé des points clés

-   Une chaîne en C est un `char[]` terminé par `\0`.
-   Toujours prévoir de la place pour le `\0`.
-   **Ne jamais utiliser `scanf("%s", ...)` ou `strcpy`/`strcat` sans être absolument certain de la taille des données.**
-   Utiliser `fgets` pour lire une entrée de manière sécurisée.
-   La bibliothèque `<string.h>` est votre meilleure amie.
-   Quand la taille est inconnue, utilisez `malloc` et n'oubliez pas `free`.
-   UTF-8 est le standard d'encodage, et en C, cela signifie que certains caractères prennent plus d'un `char` (octet) en mémoire.