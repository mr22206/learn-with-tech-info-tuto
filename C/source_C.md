Chapitre 7
Chaînes de caractères en C – Manipulation et encodages

R1.01
c
Résumé
Ce chapitre explore les chaînes de caractères en C, depuis leur représentation basique comme tableaux de char jusqu’aux techniques avancées de manipulation. Il couvre les encodages (ASCII, Latin-1, UTF-8), les fonctions standard de gestion (<string.h>, <ctype.h>), les entrées/sorties (scanf, fgets), ainsi que les spécificités des caractères larges (wchar_t) pour le support Unicode. Une attention particulière est portée aux bonnes pratiques pour éviter les erreurs courantes comme les débordements de mémoire ou les problèmes d’encodage.

Objectifs
Comprendre la représentation des chaînes comme tableaux de char terminés par \0
Maîtriser les différences entre déclarations mutables (char str[]) et immuables (char* str)
Connaître les principaux encodages (ASCII, Latin-1, UTF-8) et leurs limitations
Savoir utiliser les fonctions de base (strlen, strcpy, strcat, strcmp)
Manipuler les entrées/sorties sécurisées avec fgets et sprintf/sscanf
Gérer les tableaux de chaînes et les recherches avec strstr
Découvrir les caractères larges (wchar_t) pour le support Unicode complet
Appliquer les bonnes pratiques pour éviter les erreurs courantes (débordements, encodages)
1. Introduction aux chaines de caractères
Une chaîne de caractères en C est un tableau de char.

1.1. Type char
Pour rappel:

un caractère est un entier codé sur un octet (8 bits)
En pratique, un char est utilisé pour stocker des caractères ASCII ou des octets de données binaires.
On peut donner le décodage ascii avec le format %c.
Une variable de type char est mutable.
NoneExemple : Rappels sur le type char
char lettre = 'A';
printf(
    "Type char:\n"
    "- taille: %zu\n"
    "- décodage ascii: %c\n"
    "- valeur décimale: %d\n- "
    "valeur hexadécimale: x%x\n",
    sizeof(lettre), lettre, lettre, lettre);

lettre = 'B';
printf(
    "Type char:\n"
    "- taille: %zu\n"
    "- décodage ascii: %c\n"
    "- valeur décimale: %d\n- "
    "valeur hexadécimale: x%x\n",
    sizeof(lettre), lettre, lettre, lettre);

Type char:
- taille: 1
- décodage ascii: A
- valeur décimale: 65
- valeur hexadécimale: x41
Type char:
- taille: 1
- décodage ascii: B
- valeur décimale: 66
- valeur hexadécimale: x42

1.2. Tableau de char
On a déjà défini des tableaux de char comme ceci.

char str[] = {'B', 'o', 'n', 'j', 'o', 'u', 'r'};

NoneExemple : Création d’un tableau de caractère
char str[] = {'B', 'o', 'n', 'j', 'o', 'u', 'r'};

int taille = (int)sizeof(str);  // sizeof(char) vaut 1!

printf("\nTaille du tableau : %d\n", taille);

// en-tête du tableau
afficherSepTab("4x10");
printf(("|%-10s|%-10s|%-10s|%-10s|\n"), "index", "ascii(%c)", "int(%d)",
       "hexa(%x)");
afficherSepTab("4x10");

// Boucle d'affichage
for (int i = 0; i < taille; i++) {
  char val = str[i];
  printf(("|%10d|%10c|%10d|%10x|\n"), i, val, val, val);
}

afficherSepTab("4x10");


Taille du tableau : 7
+----------+----------+----------+----------+
|index     |ascii(%c) |int(%d)   |hexa(%x)  |
+----------+----------+----------+----------+
|         0|         B|        66|        42|
|         1|         o|       111|        6f|
|         2|         n|       110|        6e|
|         3|         j|       106|        6a|
|         4|         o|       111|        6f|
|         5|         u|       117|        75|
|         6|         r|       114|        72|
+----------+----------+----------+----------+

1.3. Chaîne de caractères
1.3.1. Déclaration, définition et affichage
Le langage C permet également d’écrire les chaînes de caractère en utilisant des littéraux de chaîne entourés de ".
Le spécificateur %s permet d’afficher une chaîne de caractères.
// Chaîne modifiable (copie sur la pile)
char str1[] = "Bonjour";

// Pointeur vers une chaîne littérale (en mémoire readonly)
char *str2 = "Bonjour";

NoneExemple : Déclaration et affichage
char c = 'A';
char str1[] = "Bonjour";
char *str2 = "Bonjour";

printf("%c, %p\n", c, &c);
printf("%s, %p\n", str1, &str1);
printf("%s, %p\n", str2, &str2);

A, 0x7fff5adfe9d7
Bonjour, 0x7fff5adfe9e0
Bonjour, 0x7fff5adfe9d8

1.3.2. Mutabilité
Suivant le type de déclaration la chaine de caractère est mutable ou non.

char str[] = "Bonjour"; : chaîne de caractère définie sur la pile mutable
char *str = "Bonjour"; : chaîne de caractère définie en mémoire readonly non mutable
NoneExemple : Mutabilité tableau
char str[] = "Bonjour";
printf("%s -> %p\n", str, &str);

// Mutation d'un caractère du tableau possible
str[0] = 'b';
printf("%s -> %p\n", str, &str);

Bonjour -> 0x7fffc3f98800
bonjour -> 0x7fffc3f98800

char str[] = "Bonjour";
// Mais pas du tableau entier
str = "bonjour";
printf("%s -> %p\n", str, &str);

GccException: Execution Error: Command '['gcc', '-std=c23', '-Wall', '-x', 'c', '-o', 'jupygcc_code', '-', '/home/ben/git/0lyceum/iut-info/quarto/r101-init-dev/lib/tableaux.c', '/home/ben/git/0lyceum/iut-info/quarto/r101-init-dev/lib/listes.c', '/home/ben/git/0lyceum/iut-info/quarto/r101-init-dev/lib/utils.c', '/home/ben/git/0lyceum/iut-info/quarto/r101-init-dev/lib/linkedlists.c', '-lm']' returned non-zero exit status 1.
<stdin>: Dans la fonction « main »:
<stdin>:16:5: erreur: affectation vers une expression de type tableau
NoneExemple : Mutabilité pointeur
char *str = "Bonjour";
printf("%s -> %p\n", str, str);
// affectation d'un nouveau pointeur possible
str = "bonjour";
printf("%s -> %p\n", str, str);

Bonjour -> 0x55f029de0004
bonjour -> 0x55f029de0016

char *str = "Bonjour";
printf("%s -> %p\n", str, str);
// Mutation d'un caractère impossible
str[0] = 'b';
printf("%s -> %p\n", str, str);

GccException: Runtime Error: Bonjour -> 0x5578ff343004

1.3.3. Taille d’une chaîne de caractères
Mise en garde
Le compilateur ajoute automatiquement un caractère de fin de chaîne \0 à la fin de la chaîne.

On parle de null terminated strings.

Ce caractère de fin est essentiel pour marquer la fin de de la chaîne.

Il va nous permettre de savoir où s’arrête la chaine, on parle de valeur sentinelle.

NoneExemple : Taille d’une chaîne de caractère
char str[] = "Bonjour";

int taille = (int)sizeof(str);  // sizeof(char) vaut 1!

printf("\nTaille du tableau : %d\n", taille);

// en-tête du tableau
afficherSepTab("4x10");
printf(("|%-10s|%-10s|%-10s|%-10s|\n"), "index", "ascii(%c)", "int(%d)",
       "hexa(%x)");
afficherSepTab("4x10");

// Boucle d'affichage
for (int i = 0; i < taille; i++) {
  char val = str[i];
  printf(("|%10d|%10c|%10d|%10x|\n"), i, val, val, val);
}

afficherSepTab("4x10");


Taille du tableau : 8
+----------+----------+----------+----------+
|index     |ascii(%c) |int(%d)   |hexa(%x)  |
+----------+----------+----------+----------+
|         0|         B|        66|        42|
|         1|         o|       111|        6f|
|         2|         n|       110|        6e|
|         3|         j|       106|        6a|
|         4|         o|       111|        6f|
|         5|         u|       117|        75|
|         6|         r|       114|        72|
|         7|         |         0|         0|
+----------+----------+----------+----------+

1.4. Parcours d’une chaîne de caractères
On utilise le caractère 0 de fin pour arrêter la boucle.

1.4.1. Parcours indiciel du tableau
NoneExemple : Parcours d’une chaîne de caractères avec for
char str[] = "Bonjour";
for (int i = 0; str[i] != 0; i++) {
  printf("'%c', ", str[i]);
}

'B', 'o', 'n', 'j', 'o', 'u', 'r', 
NoneExemple : Parcours d’une chaîne de caractères avec while
char str[] = "Bonjour";
int i = 0;
while (str[i] != 0) {
  printf("'%c', ", str[i]);
  i++;
}

'B', 'o', 'n', 'j', 'o', 'u', 'r', 
1.4.2. Parcours avec pointeur
On peut également parcourir la chaine avec un pointeur.

NoneExemple : Parcours d’une chaîne de caractères avec for avec pointeur
char *str = "Bonjour";
for (char *ptrStr = str; *ptrStr != 0; ptrStr++) {
  printf("'%c', ", *ptrStr);
}

'B', 'o', 'n', 'j', 'o', 'u', 'r', 
NoneExemple : Parcours d’une chaîne de caractères avec while avec pointeur
char *str = "Bonjour";
char *ptrStr = str;
while (*ptrStr != 0) {
  printf("'%c', ", *ptrStr);
  ptrStr++;
}

'B', 'o', 'n', 'j', 'o', 'u', 'r', 
1.5. Récupérer une chaîne de caractère avec scanf et fgets
1.5.1. Utilisation de scanf
Le spécificateur %s peut-être utilisé pour récupérer une entrée clavier.

Mise en garde
La fonction scanf ne permet pas de récupérer une chaîne de caractères contenant des espaces.

NoneExemple : Récupérer une chaîne de caractère avec scanf
//| stdin: Bonjour:) Monde
char str[64];

printf("Entrez une chaîne de caractères (sans espace): ");
scanf("%s", str);
printf("Voici la chaîne récupérée: %s\n", str);
puts(
    "\nLe reste de l'entrée reste dans le tampon(buffer) de l'entrée "
    "standard!");

Entrez une chaîne de caractères (sans espace): Bonjour:)
Voici la chaîne récupérée: Bonjour:)

Le reste de l'entrée reste dans le tampon(buffer) de l'entrée standard!
Monde
1.5.2. Utilisation de fgets
Pour récupérer une chaine de caractère, nous allons utiliser la fonction fgets.

Mise en garde
La fonction fgets récupère également le caractère de nouvelle ligne \n à la fin de la chaîne de caractères.

NoneExemple : Récupérer une chaîne de caractère avec fgets
//| stdin: Bonjour:) Monde\n
char chaine[100];

// Entrée d'un mot
puts("Entrez une phrase:");
fgets(chaine, sizeof(chaine), stdin);

puts("\nChaine récupérée avec fgets:");
printf("%s|%s\n", chaine, "Saut de ligne présent");

// Remplace le caractère de nouvelle ligne par un caractère nul
// La fct strcspn est importée grâce à <string.h>
chaine[strcspn(chaine, "\n")] = '\0';

puts("\nChaine traitée avec strcspn:");
printf("%s|%s\n", chaine,
       "Saut de ligne remplacé par 0 pour finir correctement la chaine");

Entrez une phrase:
Bonjour:) Monde

Chaine récupérée avec fgets:
Bonjour:) Monde
|Saut de ligne présent

Chaine traitée avec strcspn:
Bonjour:) Monde|Saut de ligne remplacé par 0 pour finir correctement la chaine

1.6. Formater et analyser des chaînes avec sprintf et sscanf
Ces fonctions permettent de manipuler des chaînes de caractères comme des flux de données.

sprintf: écrit des données formatées dans une chaîne (comme printf mais vers une variable)
sscanf: lit des données formatées depuis une chaîne (comme scanf mais depuis une variable)
1.6.1. Comparaison avec les fonctions standard
Fonction	Source/Destination	Exemple d’utilisation
printf	Sortie standard	printf("Valeur: %d", x);
scanf	Entrée standard	scanf("%d", &x);
sprintf	Chaîne de sortie	sprintf(str, "Valeur: %d", x);
sscanf	Chaîne d’entrée	sscanf(str, "%d", &x);
1.7. La fonction sprintf
Permet d’écrire des données formatées dans une chaîne de caractères.

int sprintf(char *str, const char *format, ...);

Retourne le nombre de caractères écrits (sans le \0 final)
Écrit toujours un \0 à la fin de la chaîne
Attention aux débordements de taille!
NoneExemple : Utilisation basique de sprintf
char str[50];
int age = 25;
float taille = 1.78f;

sprintf(str, "Age: %d ans, Taille: %.2f m", age, taille);
puts(str);

Age: 25 ans, Taille: 1.78 m

NoneExemple : Construction dynamique de requêtes SQL
char query[100];
const char *table = "users";
int id = 42;

sprintf(query, "SELECT * FROM %s WHERE id = %d;", table, id);
puts(query);

SELECT * FROM users WHERE id = 42;

AvertissementProblème de sécurité avec sprintf
//| error: true
char smallStr[5];
int value = 12345;

// Dépassement de taille - comportement indéfini!
sprintf(smallStr, "Valeur: %d", value);
puts(smallStr);

GccException: Compilation errors: <stdin>: Dans la fonction « main »:
<stdin>:18:19: attention: la directive « Valeur:  » écrit 8 octets dans une région dont la taille est 5 [-Wformat-overflow=]
<stdin>:18:19: note: argument de directive « 12345 »
<stdin>:18:1: note: « sprintf » écrit 14 octets dans une destination dont la taille est 5
1.8. La fonction sscanf
Permet de lire des données formatées depuis une chaîne de caractères.

int sscanf(const char *str, const char *format, ...);

Retourne le nombre d’éléments correctement lus
Fonctionne comme scanf mais lit depuis une chaîne
Utile pour parser des données structurées
NoneExemple : Extraction de données depuis une chaîne
const char *data = "Jean 25 1.78";
char nom[20];
int age;
float taille;

int count = sscanf(data, "%s %d %f", nom, &age, &taille);
printf("Elements lus: %d\nNom: %s\nAge: %d\nTaille: %.2f\n", count, nom, age,
       taille);

Elements lus: 3
Nom: Jean
Age: 25
Taille: 1.78

NoneExemple : Parsing de dates
const char *date_str = "2023-12-25";
int annee, mois, jour;

sscanf(date_str, "%d-%d-%d", &annee, &mois, &jour);
printf("Date: %02d/%02d/%d\n", jour, mois, annee);

Date: 25/12/2023

NoneExemple : Validation de format avec retour de sscanf
const char *input1 = "10 20";
const char *input2 = "10 abc";
int a, b;

int result1 = sscanf(input1, "%d %d", &a, &b);
int result2 = sscanf(input2, "%d %d", &a, &b);

printf("Input1 valide: %d (a=%d, b=%d)\n", result1 == 2, a, b);
printf("Input2 valide: %d\n", result2 == 2);

Input1 valide: 1 (a=10, b=20)
Input2 valide: 0

1.9. Tous les caractères ne font pas un octet!
À l’exception des caractères simples de l’encodage ASCII, les caractères ne sont pas codés sur un seul octet.

NoneExemple : Taille d’une chaîne de caractères non-ASCII
char lettre = 'A';

printf("|%19s |%7s |%7s |\n", "type", "glyphe", "sizeof");
afficherSepTab("20,8,8");

printf("|%19s |%7c | %7zu|\n", typename(lettre), lettre, sizeof(lettre));

// lettre = 'é'; Impossible car  erreur: constante caractère multi-caractères
// [-Werror=multichar]

char aMajuscule[] = "A";
printf("|%19s |%7s | %7zu|\n", typename(aMajuscule), aMajuscule,
       sizeof(aMajuscule));
// La taille est de 3 car le caractère 'é' est codé en UTF-8 sur 2 octets + 1
// octet pour le caractère nul de fin de chaîne

char eAccent[] = "é";
printf("|%19s |%8s | %7zu|\n", typename(eAccent), eAccent, sizeof(eAccent));
// La taille est de 3 car le caractère 'é' est codé en UTF-8 sur 2 octets + 1
// octet pour le caractère nul de fin de chaîne

char coffee[] = "☕";
printf("|%19s |%8s | %7zu|\n", typename(coffee), coffee, sizeof(coffee));

// La taille est de 4 car le caractère '☕' est codé en UTF-8 sur 3 octets + 1
// octet pour le caractère nul de fin de chaîne

|               type | glyphe | sizeof |
+--------------------+--------+--------+
|               char |      A |       1|
|    pointer to char |      A |       2|
|    pointer to char |      é |       3|
|    pointer to char |     ☕ |       4|

NoneExemple : Taille d’une chaine de caractères avec caractères non ASCII
char utf8Str[] = "Café 😊";  // 'é' = 2 octets, '😊' = 4 octets
printf("Affichage avec %%s: %s -> ✓\n", utf8Str);
printf("Taille en octets: %d -> ⚠\n", (int)sizeof(utf8Str));

Affichage avec %s: Café 😊 -> ✓
Taille en octets: 11 -> ⚠

2. Encodage des caractères
2.1. Encodages sur 1 octet
2.1.1. ASCII (American Standard Code for Information Interchange)
crée dans les années 70.
7 bits : Représente 128 caractères (0-127).
Caractères de contrôle (0-31), imprimables (32-126), et DEL (127).
suffit pour les textes en anglais mais trop limitée pour les autres langues(à, é, ë, ñ, …)
Article Wikipédia sur l’ASCII

NoneExemple
char a = 65;  // 'A' en ASCII
printf("%c", a);

A
NoneExemple : Affichage de la table ASCII
Table ASCII (caractères imprimables)

    |x0|x1|x2|x3|x4|x5|x6|x7|x8|x9|xA|xB|xC|xD|xE|xF|
+---+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
| 0x|                                                
| 1x|                                                
| 2x|    !  "  #  $  %  &  '  (  )  *  +  ,  -  .  / 
| 3x| 0  1  2  3  4  5  6  7  8  9  :  ;  <  =  >  ? 
| 4x| @  A  B  C  D  E  F  G  H  I  J  K  L  M  N  O 
| 5x| P  Q  R  S  T  U  V  W  X  Y  Z  [  \  ]  ^  _ 
| 6x| `  a  b  c  d  e  f  g  h  i  j  k  l  m  n  o 
| 7x| p  q  r  s  t  u  v  w  x  y  z  {  |  }  ~    

Lecture du tableau (héxadécimale):
- le caractère x41 est A
- le caractère x3F est ?
- le caractère x61 est a

2.1.2. Latin-1 (ISO-8859-1)
8 bits : Étend ASCII à 256 caractères (0-255): 128 caractères suplémentaires.

Ajoute des caractères accentués (é, è, ç), des symboles, et des lettres spécifiques à certaines langues européennes.

Limitation : Ne couvre pas les caractères de langues comme le chinois, l’arabe, ou les émoticônes.

Il y a donc de multiples normes pour les différentes régions:

ISO-8859-2: Europe centrale
ISO-8859-3: Europe du sud
…
ISO-8859-6: Arabe
…
ISO-8859-11: Thai
…


Tableau des caractères imprimables sur Wikipédia
Article Wikipédia sur l’Latin-1

2.2. Limites des encodages sur 1 octet
Problème : Impossible de représenter tous les caractères du monde avec seulement 256 valeurs.
Difficile de partager les fichiers textuels, il faut connaitre l’encodage utilisé.
Solution : Utiliser des encodages multi-octets comme UTF-8.
2.3. UTF-8 – Encodage multi octets
Cet encodage est compatible avec l’ASCII et est utilisé par défaut dans les navigateurs web.

2.3.1. Principe
Variable-length encoding : Un caractère peut occuper 1 à 4 octets.

Le premier octet indique la longueur d’encodage du caractère.

Les suivants sont des octets de continuation et commencent par 10.

1 octet: 0xxxxxxx (0-127, compatible ASCII).
2 octets: 110xxxxx 10xxxxxx (128-2047).
3 octets: 1110xxxx 10xxxxxx 10xxxxxx (2048-65535).
4 octets: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx (65536-1114111).
NoneExemple : Compatibilité UTF-8 avec ASCII (0-127)
Table Unicode (U+0 à U+7f) en UTF-8 :

      |x0|x1|x2|x3|x4|x5|x6|x7|x8|x9|xA|xB|xC|xD|xE|xF|
+-----+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
| U+0x|                                                
| U+1x|                                                
| U+2x|    !  "  #  $  %  &  '  (  )  *  +  ,  -  .  / 
| U+3x| 0  1  2  3  4  5  6  7  8  9  :  ;  <  =  >  ? 
| U+4x| @  A  B  C  D  E  F  G  H  I  J  K  L  M  N  O 
| U+5x| P  Q  R  S  T  U  V  W  X  Y  Z  [  \  ]  ^  _ 
| U+6x| `  a  b  c  d  e  f  g  h  i  j  k  l  m  n  o 

Lecture du tableau (hexadécimal):
- Le caractère U+0041 est 'A'
- Le caractère U+0059 est 'Y'
- Le caractère U+0079 est 'y'

NoneExemple : Début des caractères UTF-8 à deux octets (128-255)
Table Unicode (U+80 à U+ff) en UTF-8 :

      |x0|x1|x2|x3|x4|x5|x6|x7|x8|x9|xA|xB|xC|xD|xE|xF|
+-----+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
| U+8x|                                                
| U+9x|                                                
| U+Ax|    ¡  ¢  £  ¤  ¥  ¦  §  ¨  ©  ª  «  ¬  ­  ®  ¯ 
| U+Bx| °  ±  ²  ³  ´  µ  ¶  ·  ¸  ¹  º  »  ¼  ½  ¾  ¿ 
| U+Cx| À  Á  Â  Ã  Ä  Å  Æ  Ç  È  É  Ê  Ë  Ì  Í  Î  Ï 
| U+Dx| Ð  Ñ  Ò  Ó  Ô  Õ  Ö  ×  Ø  Ù  Ú  Û  Ü  Ý  Þ  ß 
| U+Ex| à  á  â  ã  ä  å  æ  ç  è  é  ê  ë  ì  í  î  ï 

Lecture du tableau (hexadécimal):
- Le caractère U+00C8 est 'È'
- Le caractère U+00E9 est 'é'
- Le caractère U+00AB est '«'

NoneExemple : Caractères UTF-8 à trois octets (5024-…)
Il s’agit des caractères Cherokee.

Table Unicode (U+13a0 à U+149f) en UTF-8 :

        |x0|x1|x2|x3|x4|x5|x6|x7|x8|x9|xA|xB|xC|xD|xE|xF|
+-------+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
| U+13Ax| Ꭰ  Ꭱ  Ꭲ  Ꭳ  Ꭴ  Ꭵ  Ꭶ  Ꭷ  Ꭸ  Ꭹ  Ꭺ  Ꭻ  Ꭼ  Ꭽ  Ꭾ  Ꭿ 
| U+13Bx| Ꮀ  Ꮁ  Ꮂ  Ꮃ  Ꮄ  Ꮅ  Ꮆ  Ꮇ  Ꮈ  Ꮉ  Ꮊ  Ꮋ  Ꮌ  Ꮍ  Ꮎ  Ꮏ 
| U+13Cx| Ꮐ  Ꮑ  Ꮒ  Ꮓ  Ꮔ  Ꮕ  Ꮖ  Ꮗ  Ꮘ  Ꮙ  Ꮚ  Ꮛ  Ꮜ  Ꮝ  Ꮞ  Ꮟ 
| U+13Dx| Ꮠ  Ꮡ  Ꮢ  Ꮣ  Ꮤ  Ꮥ  Ꮦ  Ꮧ  Ꮨ  Ꮩ  Ꮪ  Ꮫ  Ꮬ  Ꮭ  Ꮮ  Ꮯ 
| U+13Ex| Ꮰ  Ꮱ  Ꮲ  Ꮳ  Ꮴ  Ꮵ  Ꮶ  Ꮷ  Ꮸ  Ꮹ  Ꮺ  Ꮻ  Ꮼ  Ꮽ  Ꮾ  Ꮿ 
| U+13Fx| Ᏸ  Ᏹ  Ᏺ  Ᏻ  Ᏼ  Ᏽ        ᏸ  ᏹ  ᏺ  ᏻ  ᏼ  ᏽ       
| U+140x| ᐀  ᐁ  ᐂ  ᐃ  ᐄ  ᐅ  ᐆ  ᐇ  ᐈ  ᐉ  ᐊ  ᐋ  ᐌ  ᐍ  ᐎ  ᐏ 
| U+141x| ᐐ  ᐑ  ᐒ  ᐓ  ᐔ  ᐕ  ᐖ  ᐗ  ᐘ  ᐙ  ᐚ  ᐛ  ᐜ  ᐝ  ᐞ  ᐟ 
| U+142x| ᐠ  ᐡ  ᐢ  ᐣ  ᐤ  ᐥ  ᐦ  ᐧ  ᐨ  ᐩ  ᐪ  ᐫ  ᐬ  ᐭ  ᐮ  ᐯ 
| U+143x| ᐰ  ᐱ  ᐲ  ᐳ  ᐴ  ᐵ  ᐶ  ᐷ  ᐸ  ᐹ  ᐺ  ᐻ  ᐼ  ᐽ  ᐾ  ᐿ 
| U+144x| ᑀ  ᑁ  ᑂ  ᑃ  ᑄ  ᑅ  ᑆ  ᑇ  ᑈ  ᑉ  ᑊ  ᑋ  ᑌ  ᑍ  ᑎ  ᑏ 
| U+145x| ᑐ  ᑑ  ᑒ  ᑓ  ᑔ  ᑕ  ᑖ  ᑗ  ᑘ  ᑙ  ᑚ  ᑛ  ᑜ  ᑝ  ᑞ  ᑟ 
| U+146x| ᑠ  ᑡ  ᑢ  ᑣ  ᑤ  ᑥ  ᑦ  ᑧ  ᑨ  ᑩ  ᑪ  ᑫ  ᑬ  ᑭ  ᑮ  ᑯ 
| U+147x| ᑰ  ᑱ  ᑲ  ᑳ  ᑴ  ᑵ  ᑶ  ᑷ  ᑸ  ᑹ  ᑺ  ᑻ  ᑼ  ᑽ  ᑾ  ᑿ 
| U+148x| ᒀ  ᒁ  ᒂ  ᒃ  ᒄ  ᒅ  ᒆ  ᒇ  ᒈ  ᒉ  ᒊ  ᒋ  ᒌ  ᒍ  ᒎ  ᒏ 

Lecture du tableau (hexadécimal):
- Le caractère U+13AF est 'Ꭿ'
- Le caractère U+1410 est 'ᐐ'

NoneExemple : Caractères émoticônes UTF-8 à quatre octets (128512-…)
La largeur de caractères n’est peut-être pas fixe car non disponible dans la police utilisée sur votre navigateur.

Table Unicode (U+1f600 à U+1f6ff) en UTF-8 :

         |x0|x1|x2|x3|x4|x5|x6|x7|x8|x9|xA|xB|xC|xD|xE|xF|
+--------+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
| U+1F60x| 😀  😁  😂  😃  😄  😅  😆  😇  😈  😉  😊  😋  😌  😍  😎  😏 
| U+1F61x| 😐  😑  😒  😓  😔  😕  😖  😗  😘  😙  😚  😛  😜  😝  😞  😟 
| U+1F62x| 😠  😡  😢  😣  😤  😥  😦  😧  😨  😩  😪  😫  😬  😭  😮  😯 
| U+1F63x| 😰  😱  😲  😳  😴  😵  😶  😷  😸  😹  😺  😻  😼  😽  😾  😿 
| U+1F64x| 🙀  🙁  🙂  🙃  🙄  🙅  🙆  🙇  🙈  🙉  🙊  🙋  🙌  🙍  🙎  🙏 
| U+1F65x| 🙐  🙑  🙒  🙓  🙔  🙕  🙖  🙗  🙘  🙙  🙚  🙛  🙜  🙝  🙞  🙟 
| U+1F66x| 🙠  🙡  🙢  🙣  🙤  🙥  🙦  🙧  🙨  🙩  🙪  🙫  🙬  🙭  🙮  🙯 
| U+1F67x| 🙰  🙱  🙲  🙳  🙴  🙵  🙶  🙷  🙸  🙹  🙺  🙻  🙼  🙽  🙾  🙿 
| U+1F68x| 🚀  🚁  🚂  🚃  🚄  🚅  🚆  🚇  🚈  🚉  🚊  🚋  🚌  🚍  🚎  🚏 
| U+1F69x| 🚐  🚑  🚒  🚓  🚔  🚕  🚖  🚗  🚘  🚙  🚚  🚛  🚜  🚝  🚞  🚟 
| U+1F6Ax| 🚠  🚡  🚢  🚣  🚤  🚥  🚦  🚧  🚨  🚩  🚪  🚫  🚬  🚭  🚮  🚯 
| U+1F6Bx| 🚰  🚱  🚲  🚳  🚴  🚵  🚶  🚷  🚸  🚹  🚺  🚻  🚼  🚽  🚾  🚿 
| U+1F6Cx| 🛀  🛁  🛂  🛃  🛄  🛅  🛆  🛇  🛈  🛉  🛊  🛋  🛌  🛍  🛎  🛏 
| U+1F6Dx| 🛐  🛑  🛒  🛓  🛔  🛕  🛖  🛗              🛜  🛝  🛞  🛟 
| U+1F6Ex| 🛠  🛡  🛢  🛣  🛤  🛥  🛦  🛧  🛨  🛩  🛪  🛫  🛬          

Lecture du tableau (hexadécimal):
- Le caractère U+1F600 est '😀'
- Le caractère U+1F6A7 est '🚧

2.3.2. Avantages
Compatible avec ASCII.
Économique en espace pour les textes en anglais/européen.
Supporte tous les caractères Unicode (émoticônes, idéogrammes, etc.).
Standard international (UTF-8 est le standard Unicode).
Il reste des places vides pour ajouter des nouveaux symboles.
3. Les bibliothèques de manipulation de chaînes
Le standard C définit de nombreux modules pour la manipulation des chaines de caractères(null-terminated byte string (NTBS)).

Note
Il n’est pas nécessaire d’appendre toutes ces fonctions, mais de savoir utiliser la documentation pour s’en servir de manière opportune.

 Doc

3.1. Module <string.h>
3.1.1. Manipulation de chaînes
Comme on l’a vu, il n’est pas possible de copier une chaîne de caractères en utilisant l’opérateur d’affectation =.

Fonction	Description	Exemple d’utilisation
strcpy	Copie une chaîne dans une autre	char dest[10]; strcpy(dest, "Hello");
strcat	Concatène deux chaînes	char dest[20] = "Hello"; strcat(dest, " World"); → dest = "Hello World"
strncat	Concatène un nombre donné de caractères	char dest[20] = "Hello"; strncat(dest, " World!", 6); → dest = "Hello World"
NoneExemple : Manipulation de chaînes avec <string.h>
char dest[20];

afficherTitre("Copie simple -- strcpy");
strcpy(dest, "Hello");
printf("dest = \"%s\"\n", dest);

afficherTitre("Concaténation simple -- strcat");
strcat(dest, " World!");
printf("dest = \"%s\"\n", dest);

afficherTitre("Concaténation limitée -- strncat");
strncat(dest, " World!", 6);
printf("dest = \"%s\" (6 caractères ajoutés)\n", dest);


=== Copie simple -- strcpy ===
dest = "Hello"

=== Concaténation simple -- strcat ===
dest = "Hello World!"

=== Concaténation limitée -- strncat ===
dest = "Hello World! World" (6 caractères ajoutés)

3.1.2. Examen de chaînes
Fonction	Description	Exemple d’utilisation
strlen	Retourne la longueur d’une chaîne	strlen("Hello") → retourne 5
strcmp	Compare deux chaînes	strcmp("abc", "abc") → retourne 0
strchr	Trouve la première occurrence d’un caractère	strchr("Hello", 'e') → retourne un pointeur sur 'e'
strrchr	Trouve la dernière occurrence d’un caractère	strrchr("Hello", 'l') → retourne un pointeur sur le dernier 'l'
strstr	Trouve la première occurrence d’une sous-chaîne	strstr("Hello World", "World") → retourne un pointeur sur "World"
strtok	Trouve le prochain jeton dans une chaîne	char str[] = "Hello,World"; char *token = strtok(str, ","); → token = "Hello"
NoneExemple : Examen de chaînes avec <string.h>
afficherTitre("Longueur -- strlen");
printf("strlen(\"Bonjour\") = %zu\n", strlen("Bonjour"));

afficherTitre("Comparaison -- strcmp");
printf("strcmp(\"abc\", \"abc\") = %d\n", strcmp("abc", "abc"));
printf("strcmp(\"abc\", \"abd\") = %d\n", strcmp("abc", "abd"));

afficherTitre("Première occurrence -- strchr");
char* str = "Programmation";

char* ptr = strchr(str, 'm');
if (ptr) printf("Trouvé 'm' à la position %ld sans %s\n", ptr - str, str);
ptr = strchr(str, 'M');
if (ptr)
  printf("Trouvé 'M' à la position %ld sans %s\n", ptr - str, str);
else
  printf("Pas de 'M' dans %s\n", str);

afficherTitre("Dernière occurrence -- strrchr");
ptr = strrchr(str, 'm');
if (ptr) printf("Dernier 'm' à la position %ld dans %s\n", ptr - str, str);

afficherTitre("Sous-chaîne -- strstr");
str = "Bonjour tout le monde";
ptr = strstr(str, "monde");
if (ptr) printf("Trouvé \"%s\" dans: \"%s\" à %ld\n", ptr, str, ptr - str);

afficherTitre("Découpage -- strtok");
char str2[] = "pomme,banane,orange";
printf("Chaîne initiale: \"%s\"\n", str2);
puts("Découpage selon les ,");
char* token = strtok(str2, ",");
while (token) {
  printf("Token: %s\n", token);
  token = strtok(NULL, ",");
}


=== Longueur -- strlen ===
strlen("Bonjour") = 7

=== Comparaison -- strcmp ===
strcmp("abc", "abc") = 0
strcmp("abc", "abd") = -1

=== Première occurrence -- strchr ===
Trouvé 'm' à la position 6 sans Programmation
Pas de 'M' dans Programmation

=== Dernière occurrence -- strrchr ===
Dernier 'm' à la position 7 dans Programmation

=== Sous-chaîne -- strstr ===
Trouvé "monde" dans: "Bonjour tout le monde" à 16

=== Découpage -- strtok ===
Chaîne initiale: "pomme,banane,orange"
Découpage selon les ,
Token: pomme
Token: banane
Token: orange

3.2. Module <ctype.h>
3.2.1. Classification de caractères
Fonction	Description	Exemple d’utilisation
isalnum	Vérifie si un caractère est alphanumérique	isalnum('A') → retourne une valeur non nulle
isalpha	Vérifie si un caractère est alphabétique	isalpha('x') → retourne une valeur non nulle
islower	Vérifie si un caractère est en minuscule	islower('a') → retourne une valeur non nulle
isupper	Vérifie si un caractère est en majuscule	isupper('Z') → retourne une valeur non nulle
isdigit	Vérifie si un caractère est un chiffre	isdigit('7') → retourne une valeur non nulle
isspace	Vérifie si un caractère est un espace	isspace(' ') → retourne une valeur non nulle
ispunct	Vérifie si un caractère est une ponctuation	ispunct('?') → retourne une valeur non nulle
NoneExemple : Classification de caractères avec <ctype.h>
#include <ctype.h>
#include <stdio.h>

#include "../lib/utils.h"

int main() {
  afficherTitre("isalnum - Vérifie si alphanumérique");
  printf("isalnum('A') -> %d\n", isalnum('A'));
  printf("isalnum('7') -> %d\n", isalnum('7'));
  printf("isalnum('#') -> %d\n", isalnum('#'));

  afficherTitre("isalpha - Vérifie si alphabétique");
  printf("isalpha('x') -> %d\n", isalpha('x'));
  printf("isalpha('Z') -> %d\n", isalpha('Z'));
  printf("isalpha('5') -> %d\n", isalpha('5'));

  afficherTitre("islower - Vérifie si minuscule");
  printf("islower('a') -> %d\n", islower('a'));
  printf("islower('B') -> %d\n", islower('B'));

  afficherTitre("isupper - Vérifie si majuscule");
  printf("isupper('Z') -> %d\n", isupper('Z'));
  printf("isupper('x') -> %d\n", isupper('x'));

  afficherTitre("isdigit - Vérifie si chiffre");
  printf("isdigit('7') -> %d\n", isdigit('7'));
  printf("isdigit('A') -> %d\n", isdigit('A'));

  afficherTitre("isspace - Vérifie si espace");
  printf("isspace(' ') -> %d\n", isspace(' '));
  printf("isspace('\\t') -> %d\n", isspace('\t'));
  printf("isspace('\\n') -> %d\n", isspace('\n'));

  afficherTitre("ispunct - Vérifie si ponctuation");
  printf("ispunct('?') -> %d\n", ispunct('?'));
  printf("ispunct('!') -> %d\n", ispunct('!'));
  printf("ispunct('A') -> %d\n", ispunct('A'));
  return 0;
}


=== isalnum - Vérifie si alphanumérique ===
isalnum('A') -> 8
isalnum('7') -> 8
isalnum('#') -> 0

=== isalpha - Vérifie si alphabétique ===
isalpha('x') -> 1024
isalpha('Z') -> 1024
isalpha('5') -> 0

=== islower - Vérifie si minuscule ===
islower('a') -> 512
islower('B') -> 0

=== isupper - Vérifie si majuscule ===
isupper('Z') -> 256
isupper('x') -> 0

=== isdigit - Vérifie si chiffre ===
isdigit('7') -> 2048
isdigit('A') -> 0

=== isspace - Vérifie si espace ===
isspace(' ') -> 8192
isspace('\t') -> 8192
isspace('\n') -> 8192

=== ispunct - Vérifie si ponctuation ===
ispunct('?') -> 4
ispunct('!') -> 4
ispunct('A') -> 0

3.2.2. Manipulation de caractères
Fonction	Description	Exemple d’utilisation
tolower	Convertit un caractère en minuscule	tolower('B') → retourne 'b'
toupper	Convertit un caractère en majuscule	toupper('c') → retourne 'C'
NoneExemple : Manipulation de caractères avec tolower et toupper
#include <ctype.h>
#include <stdio.h>

#include "../lib/utils.h"

int main() {
  afficherTitre("tolower - Conversion en minuscule");
  printf("tolower('A') -> '%c' (code %d)\n", tolower('A'), tolower('A'));
  printf("tolower('z') -> '%c' (code %d)\n", tolower('z'), tolower('z'));
  printf("tolower('3') -> '%c' (code %d)\n", tolower('3'), tolower('3'));
  printf("tolower('?') -> '%c' (code %d)\n", tolower('?'), tolower('?'));

  afficherTitre("toupper - Conversion en majuscule");
  printf("toupper('b') -> '%c' (code %d)\n", toupper('b'), toupper('b'));
  printf("toupper('Z') -> '%c' (code %d)\n", toupper('Z'), toupper('Z'));
  printf("toupper('8') -> '%c' (code %d)\n", toupper('8'), toupper('8'));
  printf("toupper('@') -> '%c' (code %d)\n", toupper('@'), toupper('@'));

  afficherTitre("Exemple d'utilisation avec une chaîne");
  char str[] = "BonJour 123!";
  printf("Original: %s\n", str);

  printf("Minuscules: ");
  for (int i = 0; str[i]; i++) {
    putchar(tolower(str[i]));
  }
  printf("\n");

  printf("Majuscules: ");
  for (int i = 0; str[i]; i++) {
    putchar(toupper(str[i]));
  }
  printf("\n");
  return 0;
}


=== tolower - Conversion en minuscule ===
tolower('A') -> 'a' (code 97)
tolower('z') -> 'z' (code 122)
tolower('3') -> '3' (code 51)
tolower('?') -> '?' (code 63)

=== toupper - Conversion en majuscule ===
toupper('b') -> 'B' (code 66)
toupper('Z') -> 'Z' (code 90)
toupper('8') -> '8' (code 56)
toupper('@') -> '@' (code 64)

=== Exemple d'utilisation avec une chaîne ===
Original: BonJour 123!
Minuscules: bonjour 123!
Majuscules: BONJOUR 123!

3.3. Module <stdlib.h>: Conversions entre chaînes et nombres
Les fonctions de <stdlib.h> permettent de convertir entre chaînes de caractères et valeurs numériques.

NoneExemple : Conversions de chaînes vers nombres
afficherTitre("Conversions basiques");
printf("atof(\"3.14\") -> %f\n", atof("3.14"));
printf("atoi(\"42\") -> %d\n", atoi("42"));
printf("atol(\"123456789\") -> %ld\n", atol("123456789"));
printf("atoll(\"123456789012345\") -> %lld\n", atoll("123456789012345"));

afficherTitre("Conversions avancées avec base");
char* endptr;

// Conversion binaire
long bin = strtol("1010", &endptr, 2);
printf("strtol(\"1010\", NULL, 2) -> %ld (binaire 1010 = décimal %ld)\n", bin,
       bin);

// Conversion hexadécimale
long hex = strtol("FF", &endptr, 16);
printf("strtol(\"FF\", NULL, 16) -> %ld (hex FF = décimal %ld)\n", hex, hex);

afficherTitre("Conversions flottantes");
double dbl = strtod("3.14159", &endptr);
printf("strtod(\"3.14159\", &endptr) -> %f, reste: \"%s\"\n", dbl, endptr);

float flt = strtof("1.234", &endptr);
printf("strtof(\"1.234\", &endptr) -> %f, reste: \"%s\"\n", flt, endptr);


=== Conversions basiques ===
atof("3.14") -> 3.140000
atoi("42") -> 42
atol("123456789") -> 123456789
atoll("123456789012345") -> 123456789012345

=== Conversions avancées avec base ===
strtol("1010", NULL, 2) -> 10 (binaire 1010 = décimal 10)
strtol("FF", NULL, 16) -> 255 (hex FF = décimal 255)

=== Conversions flottantes ===
strtod("3.14159", &endptr) -> 3.141590, reste: ""
strtof("1.234", &endptr) -> 1.234000, reste: ""

4. Tableaux de chaînes de caractères
Un tableau de chaînes est un tableau où chaque élément est une chaîne de caractères (tableau de char).

char livres[][50] = {"Le Petit Prince", "Les Misérables",
                     "À la recherche du temps perdu"};

4.1. Deux méthodes de déclaration
4.1.1. Tableau 2D statique
Taille fixe pour chaque chaîne (50 octets ici)
Même si la chaîne est plus courte
char villes[][30] = {"Paris", "Lyon", "Marseille"};

4.1.2. Tableau de pointeurs
Plus économique en mémoire
Pointe vers des littéraux en mémoire statique
char *villes[] = {"Paris", "Lyon", "Marseille"};

NoneExemple : Échange de chaînes via pointeurs
#include <stdio.h>

int main() {
  char *couleurs[] = {"rouge", "vert", "bleu"};

  // Échange des deux premières couleurs
  char *temp = couleurs[0];
  couleurs[0] = couleurs[1];
  couleurs[1] = temp;

  for (int i = 0; i < 3; i++) printf("%s\n", couleurs[i]);
  return 0;
}

vert
rouge
bleu

4.2. Accès aux éléments
4.2.1. Accès à une chaîne complète
printf("%s", livres[1]);  // Affiche "Les Misérables"

4.2.2. Accès à un caractère spécifique
printf("%c", livres[0][4]);  // Affiche 'P' (5ème caractère)

NoneExemple : Manipulation basique
#include <stdio.h>

int main() {
  char fruits[][20] = {"pomme", "poire", "banane"};

  printf("Fruit: %s\n", fruits[1]);               // poire
  printf("Première lettre: %c\n", fruits[0][0]);  // p
  return 0;
}

Fruit: poire
Première lettre: p

4.3. Recherche avec strstr()
Recherche un sous-chaine substr dans une chaîne str.

char *strstr(const char *str, const char *substr);

 Doc

Retourne un pointeur vers la première occurrence
Retourne NULL si non trouvé
Sensible à la casse
NoneExemple : Recherche simple
char *str = "Bonjour tout le monde";

// recherche positive
char *substr = "monde";
char *ptr = strstr(str, substr);

// affichage
ptr ? printf("\"%s\" trouvé dans: \"%s\" à %ld\n", ptr, str, ptr - str)
    : printf("\"%s\" non trouvé dans \"%s\"", substr, str);

// recherche négative
substr = "Monde";
ptr = strstr(str, substr);

// affichage
ptr ? printf("\"%s\" trouvé dans: \"%s\" à %ld\n", ptr, str, ptr - str)
    : printf("\"%s\" non trouvé dans \"%s\"", substr, str);

"monde" trouvé dans: "Bonjour tout le monde" à 16
"Monde" non trouvé dans "Bonjour tout le monde"
NoneExemple : Recherche dans une bibliothèque
//| stdin: pe
#include <stdio.h>
#include <string.h>

void chercherLivre(char livres[][50], int taille, char mot[]);

int main() {
  char livres[][50] = {"Le petit Prince", "Les Misérables",
                       "À la recherche du temps perdu"};

  char recherche[50];
  printf("Entrez le terme recherché: ");
  fgets(recherche, 50, stdin);
  // Retirer le saut de ligne éventuel
  recherche[strcspn(recherche, "\n")] = 0;
  printf("Recherche de: %s\n", recherche);

  int taille = sizeof(livres) / sizeof(livres[0]);

  // appel de la fonction de recherche
  chercherLivre(livres, taille, recherche);

  return 0;
}

void chercherLivre(char livres[][50], int taille, char mot[]) {
  for (int i = 0; i < taille; i++) {
    // crée un pointeur sur le livre d'indice i
    char *livrePtr = livres[i];
    if (strstr(livrePtr, mot)) printf("Trouvé: %s\n", livrePtr);
  }
}

Entrez le terme recherché: pe
Recherche de: pe
Trouvé: Le petit Prince
Trouvé: À la recherche du temps perdu
5. Introduction aux wchar_t et fonctions wide
Comme on l’a vu, la taille d’un caractère non ASCII n’est pas de 1 octet.

On ne peut donc utiliser les fonctions classiques de la bibliothèque standard pour manipuler des chaînes de caractères non ASCII.

5.1. Problème avec les fonctions classiques
strlen(utf8_str) retourne le nombre d’octets, pas de caractères.
Pour compter les caractères, il faut décoder l’UTF-8.
NoneExemple : Parcours d’une chaîne de caractères non-ASCII
char utf8Str[] = "Café 😊";  // 'é' = 2 octets, '😊' = 4 octets
printf("Affichage avec %%s: %sn -> ✓\n", utf8Str);
printf("Taille en octets(sizeof): %d -> ⚠\n", (int)sizeof(utf8Str));
printf("Taille de la chaîne(strlen): %d -> ⚠\n", (int)strlen(utf8Str));
int i = 0;
while (utf8Str[i]) {
  printf("Caractère %d: %x\n", i, utf8Str[i]);
  i++;
}

Affichage avec %s: Café 😊n -> ✓
Taille en octets(sizeof): 11 -> ⚠
Taille de la chaîne(strlen): 10 -> ⚠
Caractère 0: 43
Caractère 1: 61
Caractère 2: 66
Caractère 3: ffffffc3
Caractère 4: ffffffa9
Caractère 5: 20
Caractère 6: fffffff0
Caractère 7: ffffff9f
Caractère 8: ffffff98
Caractère 9: ffffff8a

NoneExemple : Impossibilité d’afficher des caractères non-ASCII
char utf8Str[] = "Café 😊";  // 'é' = 2 octets, '😊' = 4 octets

int i = 0;
while (utf8Str[i]) {
  printf("Caractère %d: %c\n", i, utf8Str[i]);
  i++;
}

UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc3 in position 65: invalid continuation byte
5.2. Pourquoi les wchar_t ?
wchar_t est un type capable de représenter tous les caractères Unicode en une seule unité.
Taille dépendante de la plateforme (généralement 2 ou 4 octets).
Avantages :
1 caractère = 1 élément dans un tableau wchar_t.
Fonctions dédiées (wcslen, wprintf, etc.) pour manipuler ces chaînes.
 Doc

5.3. Utilisation de la libraire <wchar.h>
Pour traiter les caractères larges (wide characters) en C, on utilise la librairie <wchar.h>:

le préfixe L pour indiquer une chaîne de caractères large (wide character).
le type wchar_t pour les variables de caractères larges.
les focntions préfixées par w: wprintf, wscanf, wcslen, etc. pour manipuler les chaînes de caractères larges.
Important
Le choix de la loacalisation est important pour l’affichage des caractères larges.

On peut utiliser la fonction setlocale pour définir la locale.

Par exemple, pour utiliser la locale française, on peut utiliser setlocale(LC_ALL, "fr_FR.UTF-8").

NoneExemple : Déclaration et traitement d’une chaine d caractères larges
#include <locale.h>
#include <stdio.h>
#include <wchar.h>

int main() {
  setlocale(LC_ALL, "fr_FR.UTF-8");

  wchar_t wideStr[] = L"Café 😊";
  wprintf(L"Chaîne : %ls, Longueur : %zu\n", wideStr, wcslen(wideStr));
  wprintf(
      L"Taille en octets(sizeof): %d -> ⚠ Chaque caractère large fait 2 ou 4 "
      L"octets suivant les plateformes\n",
      (int)sizeof(wideStr));

  // Itération et affichage des caractères un par un
  wchar_t *ptr = wideStr;
  while (*ptr) {
    wprintf(L"Caractère : %lc (Code Unicode : %04X) -> %p\n", *ptr, *ptr,
            ptr);  // Affichage du caractère actuel
    ptr++;         // Avancer au caractère suivant
  }
  return 0;
}

Chaîne : Café 😊, Longueur : 6
Taille en octets(sizeof): 28 -> ⚠ Chaque caractère large fait 2 ou 4 octets suivant les plateformes
Caractère : C (Code Unicode : 0043) -> 0x7ffcf227dc60
Caractère : a (Code Unicode : 0061) -> 0x7ffcf227dc64
Caractère : f (Code Unicode : 0066) -> 0x7ffcf227dc68
Caractère : é (Code Unicode : 00E9) -> 0x7ffcf227dc6c
Caractère :   (Code Unicode : 0020) -> 0x7ffcf227dc70
Caractère : 😊 (Code Unicode : 1F60A) -> 0x7ffcf227dc74

5.4. Modules de la bibliothèque standard
De nombreuses fonctions dicponibles pour les char ont leur équaivalent pour les wchar_t.

wctype.h : Fonctions de classification et de conversion
towlower, towupper, iswalpha, iswdigit, iswspace…
wchar.h : Fonctions de manipulation de chaînes larges
wcslen, wcscmp, wcscpy, wcscat, wcsstr, wcstok…
NoneExemple : Fonctions de manipulation des chaines larges
#include <locale.h>
#include <stdio.h>
#include <wchar.h>
#include <wctype.h>

int main() {
  if (setlocale(LC_ALL, "fr_FR.utf8") == NULL) {
    wprintf(L"Impossible de définir la locale française.\n");
    return 1;
  }
  // Afficher la locale courante pour vérifier
  wprintf(L"Locale actuelle : %s\n", setlocale(LC_ALL, NULL));

  // Longueur d'une chaîne large
  wchar_t str_len[] = L"Bonjour le monde!";
  size_t length = wcslen(str_len);
  wprintf(L"Longueur de chaîne:\n");
  wprintf(L"  Chaîne: %ls → Longueur: %zu caractères\n\n", str_len, length);

  // Conversion de casse
  wchar_t large_char = L'À';
  wchar_t small_char = L'É';
  wprintf(L"Conversion de casse:\n");
  wprintf(L"  Original: %lc → Miniscule: %lc\n", large_char,
          towlower(large_char));
  wprintf(L"  Original: %lc → Majuscule: %lc\n\n", small_char,
          towupper(small_char));

  // Copie de chaîne large
  wchar_t src[] = L"Salut!";
  wchar_t dest[20];
  wcscpy(dest, src);
  wprintf(L"Copie de chaîne:\n");
  wprintf(L"  Chaîne copiée: %ls\n\n", dest);

  // Concaténation de chaînes larges
  wchar_t str1[20] = L"Bonjour ";
  wchar_t str2[] = L"à tous!";
  wprintf(L"Concaténation de chaînes: \"%ls\" + \"%ls\"\n", str1, str2);
  wcscat(str1, str2);
  wprintf(L"  Résultat: %ls\n\n", str1);

  // Comparaison de chaînes larges
  // la collation défini l'ordre de tri des chaînes
  setlocale(LC_COLLATE, "fr_FR.utf8");
  wchar_t *str_cmp1 = L"chantont";
  wchar_t *str_cmp2 = L"chanté";
  wprintf(
      L"Comparaison de chaînes par wcscmp(ne regarde que les valeurs des "
      L"caractères):\n");
  if (wcscmp(str_cmp1, str_cmp2) < 0)
    wprintf(L"%ls < %ls\n", str_cmp1, str_cmp2);
  else if ((wcscoll(str_cmp1, str_cmp2) != 0))
    wprintf(L"%ls < %ls\n", str_cmp2, str_cmp1);

  wprintf(L"Comparaison de chaînes par wcscoll(Tient compte de la locale):\n");

  if (wcscoll(str_cmp1, str_cmp2) < 0)
    wprintf(L"%ls < %ls\n", str_cmp1, str_cmp2);
  else if ((wcscoll(str_cmp1, str_cmp2) != 0))
    wprintf(L"%ls < %ls\n", str_cmp2, str_cmp1);

  return 0;
}

Locale actuelle : fr_FR.utf8
Longueur de chaîne:
  Chaîne: Bonjour le monde! → Longueur: 17 caractères

Conversion de casse:
  Original: À → Miniscule: à
  Original: É → Majuscule: É

Copie de chaîne:
  Chaîne copiée: Salut!

Concaténation de chaînes: "Bonjour " + "à tous!"
  Résultat: Bonjour à tous!

Comparaison de chaînes par wcscmp(ne regarde que les valeurs des caractères):
chantont < chanté
Comparaison de chaînes par wcscoll(Tient compte de la locale):
chanté < chantont

6. À retenir
AstuceBonne pratique
Toujours vérifier les retours de strstr(), strchr(), etc. (NULL = non trouvé)

Éviter les débordements avec strncpy() et strncat() plutôt que strcpy()/strcat()

Supprimer les \n après fgets():

input[strcspn(input, "\n")] = '\0';

Préférer les tableaux de pointeurs pour les listes de chaînes statiques

Utiliser const char* pour les chaînes littérales non modifiables

6.1. Résumé visuel

Les références
Griffiths, David. 2012. Head first C. 1st ed. Head first series. Sebastopol, CA: O’Reilly.
TD6B
