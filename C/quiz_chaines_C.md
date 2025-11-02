# Quiz sur les Chaînes de Caractères en C

Ce quiz est conçu pour tester les connaissances sur les pièges les plus courants des chaînes de caractères en C.

---

### <a id="q1-c"></a>Question 1 : La taille et la longueur

Que va afficher le code suivant ?

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[100] = "salut";
    printf("sizeof = %zu\n", sizeof(str));
    printf("strlen = %zu\n", strlen(str));
    return 0;
}
```

- A) `sizeof = 5`, `strlen = 5`
- B) `sizeof = 6`, `strlen = 5`
- C) `sizeof = 100`, `strlen = 5`
- D) `sizeof = 100`, `strlen = 100`

<details>
<summary><a href="#r1-c-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : C**

**Le déclic :** Il faut comprendre la différence fondamentale entre la **mémoire allouée** et la **longueur réelle** de la chaîne.
-   `sizeof(str)` est une opération de compilation. Elle regarde la déclaration `char str[100]` et dit : "On a réservé **100 octets** en mémoire pour cette variable". Elle ne se soucie pas de ce qu'il y a dedans.
-   `strlen(str)` est une fonction qui s'exécute. Elle parcourt la chaîne `s-a-l-u-t` et s'arrête dès qu'elle rencontre le premier caractère nul `\0`. Elle compte donc 5 caractères.
C'est la différence entre la taille du contenant (le carton de 100 places) et le contenu (les 5 objets à l'intérieur).

</details>

---

### <a id="q2-c"></a>Question 2 : Le droit de modifier

Lequel de ces deux extraits de code va provoquer un crash à l'exécution ?

**Code A :**
```c
char str[] = "Texte initial";
str[0] = 't';
printf("%s\n", str);
```

**Code B :**
```c
char *str = "Texte intouchable";
str[0] = 't';
printf("%s\n", str);
```

- A) Le code A va crasher.
- B) Le code B va crasher.
- C) Les deux vont crasher.
- D) Aucun ne va crasher.

<details>
<summary><a href="#r2-c-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : B**

**Le déclic :** La façon de déclarer une chaîne change sa nature en mémoire.
-   `char str[] = "..."` crée un **tableau**. C'est une copie de la chaîne qui vous appartient, stockée sur la pile. Vous avez le droit de la **modifier** comme vous voulez.
-   `char *str = "..."` crée un **pointeur** vers une "chaîne littérale". Cette chaîne est stockée dans une zone spéciale du programme en **lecture seule (read-only)**. Tenter d'écrire dedans (`str[0] = 't'`) est une violation d'accès mémoire qui cause une "Erreur de segmentation" (crash).
C'est la différence entre avoir une copie d'un livre que l'on peut annoter (tableau) et avoir l'adresse de l'exemplaire original à la bibliothèque nationale (pointeur) qu'il est interdit de modifier.

</details>

---

### <a id="q3-c"></a>Question 3 : Le piège de la comparaison

L'utilisateur entre `secret` au clavier. Pourquoi le message "Accès autorisé" ne s'affiche-t-il jamais ?

```c
#include <stdio.h>
#include <string.h>

int main() {
    char mdp[50];
    printf("Mot de passe : ");
    fgets(mdp, 50, stdin);

    if (strcmp(mdp, "secret") == 0) {
        printf("Accès autorisé\n");
    } else {
        printf("Accès refusé\n");
    }
    return 0;
}
```

- A) `strcmp` ne fonctionne pas avec `fgets`.
- B) Il manque le caractère `\0` à la fin de `mdp`.
- C) `fgets` inclut le saut de ligne (`\n`) dans la chaîne, rendant la comparaison fausse.
- D) Le mot de passe est trop court.

<details>
<summary><a href="#r3-c-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : C**

**Le déclic :** Les fonctions de lecture ne se comportent pas toutes de la même manière.
-   `fgets` est sécurisée car elle évite les dépassements de mémoire, mais son comportement est de conserver le caractère de saut de ligne (`\n`) lorsque l'utilisateur appuie sur "Entrée".
-   Donc, la variable `mdp` ne contient pas `"secret"` mais `"secret\n"`.
-   La fonction `strcmp` compare les chaînes octet par octet. Comme `"secret\n"` est différent de `"secret"`, `strcmp` ne renvoie pas 0 et la condition est fausse.
**La solution** est de toujours "nettoyer" la chaîne après un `fgets` pour enlever ce `\n` indésirable :
`mdp[strcspn(mdp, "\n")] = '\0';`

</details>

---

### <a id="q4-c"></a>Question 4 : Compter les caractères ou les octets ?

Que va afficher ce code, en supposant que le système utilise l'encodage UTF-8 ?

```c
#include <stdio.h>
#include <string.h>

int main() {
    char s[] = "créé";
    printf("len = %zu\n", strlen(s));
    return 0;
}
```
- A) `len = 4`
- B) `len = 5`
- C) `len = 6`
- D) Le code ne compile pas.

<details>
<summary><a href="#r4-c-pdf">▶️ Voir la réponse et l'explication</a></summary>

**Réponse correcte : C**

**Le déclic :** En C, `char` veut dire **octet**, pas "caractère" au sens humain.
-   La fonction `strlen` ne compte pas les symboles graphiques, elle compte le **nombre d'octets** jusqu'au `\0`.
-   Dans l'encodage UTF-8 (le plus courant), les caractères de base de l'anglais (comme 'c' et 'r') tiennent sur 1 octet.
-   Mais les caractères accentués ou spéciaux (comme 'é') nécessitent **plusieurs octets**. Ici, 'é' est codé sur 2 octets.
-   Le calcul est donc : `c` (1) + `r` (1) + `é` (2) + `é` (2) = **6 octets**.
Cela prouve que dès qu'on sort des textes en anglais simple, `strlen` ne donne plus le nombre de caractères que l'on voit à l'écran.

</details>

---
---
---

## Corrigés

### <a id="r1-c-pdf"></a>Réponse à la Question 1
**Réponse correcte : C**

**Le déclic :** Il faut comprendre la différence fondamentale entre la **mémoire allouée** et la **longueur réelle** de la chaîne.
-   `sizeof(str)` est une opération de compilation. Elle regarde la déclaration `char str[100]` et dit : "On a réservé **100 octets** en mémoire pour cette variable". Elle ne se soucie pas de ce qu'il y a dedans.
-   `strlen(str)` est une fonction qui s'exécute. Elle parcourt la chaîne `s-a-l-u-t` et s'arrête dès qu'elle rencontre le premier caractère nul `\0`. Elle compte donc 5 caractères.
C'est la différence entre la taille du contenant (le carton de 100 places) et le contenu (les 5 objets à l'intérieur).

[⬆️ Retour à la Question 1](#q1-c)

---

### <a id="r2-c-pdf"></a>Réponse à la Question 2
**Réponse correcte : B**

**Le déclic :** La façon de déclarer une chaîne change sa nature en mémoire.
-   `char str[] = "..."` crée un **tableau**. C'est une copie de la chaîne qui vous appartient, stockée sur la pile. Vous avez le droit de la **modifier** comme vous voulez.
-   `char *str = "..."` crée un **pointeur** vers une "chaîne littérale". Cette chaîne est stockée dans une zone spéciale du programme en **lecture seule (read-only)**. Tenter d'écrire dedans (`str[0] = 't'`) est une violation d'accès mémoire qui cause une "Erreur de segmentation" (crash).
C'est la différence entre avoir une copie d'un livre que l'on peut annoter (tableau) et avoir l'adresse de l'exemplaire original à la bibliothèque nationale (pointeur) qu'il est interdit de modifier.

[⬆️ Retour à la Question 2](#q2-c)

---

### <a id="r3-c-pdf"></a>Réponse à la Question 3
**Réponse correcte : C**

**Le déclic :** Les fonctions de lecture ne se comportent pas toutes de la même manière.
-   `fgets` est sécurisée car elle évite les dépassements de mémoire, mais son comportement est de conserver le caractère de saut de ligne (`\n`) lorsque l'utilisateur appuie sur "Entrée".
-   Donc, la variable `mdp` ne contient pas `"secret"` mais `"secret\n"`.
-   La fonction `strcmp` compare les chaînes octet par octet. Comme `"secret\n"` est différent de `"secret"`, `strcmp` ne renvoie pas 0 et la condition est fausse.
**La solution** est de toujours "nettoyer" la chaîne après un `fgets` pour enlever ce `\n` indésirable :
`mdp[strcspn(mdp, "\n")] = '\0';`

[⬆️ Retour à la Question 3](#q3-c)

---

### <a id="r4-c-pdf"></a>Réponse à la Question 4
**Réponse correcte : C**

**Le déclic :** En C, `char` veut dire **octet**, pas "caractère" au sens humain.
-   La fonction `strlen` ne compte pas les symboles graphiques, elle compte le **nombre d'octets** jusqu'au `\0`.
-   Dans l'encodage UTF-8 (le plus courant), les caractères de base de l'anglais (comme 'c' et 'r') tiennent sur 1 octet.
-   Mais les caractères accentués ou spéciaux (comme 'é') nécessitent **plusieurs octets**. Ici, 'é' est codé sur 2 octets.
-   Le calcul est donc : `c` (1) + `r` (1) + `é` (2) + `é` (2) = **6 octets**.
Cela prouve que dès qu'on sort des textes en anglais simple, `strlen` ne donne plus le nombre de caractères que l'on voit à l'écran.

[⬆️ Retour à la Question 4](#q4-c)

---
<p align="center">
  by <a href="https://tech-info-tuto.vercel.app">TECH INFO TUTO</a> — All rights reserved © 2025–2025
</p>
---
