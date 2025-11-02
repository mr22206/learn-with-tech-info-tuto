Chapitre 6
Algorithmes de tris et de recherche et complexité algorithmique

R1.01
c
Résumé Présentation des principaux algorithmes de tri et de recherche dans les tableaux. Introduction à la complexité algorithmique.
Objectifs
Comprendre les mécanismes des algorithmes de tris itératifs classiques
Analyser l’efficacité des algorithmes grâce à la complexité algorithmique.
Appliquer ces concepts à la recherche de données.
Aborder la méthode «Diviser pour régner» et la complexité logarithmique à travers la recherche dichotomique.
Les algorithmes de tri permettent de réorganiser les éléments d’une collection selon un ordre défini.

Le tri des données a une importance cruciale notamment dans le domaine de la recherche d’éléments qu’il permet de rendre beaucoup plus rapide.

Nous nous concentrerons ici sur des implémentations itératives (sans récursivité) sur place c’est-à-dire qui ne nécessitent pas de créer un nouveau tableau et donc économes en mémoire.

1. Tri à bulles (Bubble Sort)
1.1. Principe
Parcourt le tableau en comparant les éléments adjacents.
Échange les éléments s’ils sont dans le mauvais ordre.
Lorsqu’on arrive au bout du tableau, le maximum est à sa place.
On répète ce processus jusqu’à l’avant-dernier élément jusqu’à ce que tous les éléments soient à leur place


Tri à bulles: on fait remonter le maximum par permutations succesives (©Creative Commons Attribution-Share Alike 3.0 via Wikimedia)
NoneExemple : Tri à bulles de [6, 5, 3, 1, 8, 7, 2, 4]
Tableau à trier:

États intermédiaires en fin de boucle externe (
i
i)
i	Non trié	Trié	Etat intermédiaire
7	[5, 3, 1, 6, 7, 2, 4]	[8]	[5, 3, 1, 6, 7, 2, 4, 8]
6	[3, 1, 5, 6, 2, 4]	[7, 8]	[3, 1, 5, 6, 2, 4, 7, 8]
5	[1, 3, 5, 2, 4]	[6, 7, 8]	[1, 3, 5, 2, 4, 6, 7, 8]
4	[1, 3, 2, 4]	[5, 6, 7, 8]	[1, 3, 2, 4, 5, 6, 7, 8]
3	[1, 2, 3]	[4, 5, 6, 7, 8]	[1, 2, 3, 4, 5, 6, 7, 8]
2	[1, 2]	[3, 4, 5, 6, 7, 8]	[1, 2, 3, 4, 5, 6, 7, 8]
1	[1]	[2, 3, 4, 5, 6, 7, 8]	[1, 2, 3, 4, 5, 6, 7, 8]
Tableau trié: [1, 2, 3, 4, 5, 6, 7, 8]

1.2. Algorithme
1.3. Optimisation et variantes
Cet algorithme peut-être écrit dans l’autre sens en faisant redescendre le minimum en bas du tableau par permutations successives.
Arrêter l’algorithme si aucun échange n’est effectué lors d’un passage complet.
Le tri cocktail est une variante qui alterne le sens du parcours pour placer alternativement un maximum à la fin et un minimum au début.
Le tri jump down qui compare chaque élément du tableau avec celui qui est à la place du plus grand, et permute lorsqu’il trouve un nouveau plus grand.
Voir l’article Tri à bulles sur Wikipédia

2. Tri par sélection (Selection Sort)
2.1. Principe
Trouve le minimum dans la partie non triée du tableau.
Échange cet élément avec le premier élément de la partie non triée.
Répète jusqu’à ce que tout le tableau soit trié.


Tri par sélection: en jaune les éléments déjà triés, en rouge le minimum trouvé dans la partie non triée (©Creative Commons Attribution-Share Alike 3.0 via Wikimedia)
NoneExemple : Tri par sélection de [8, 5, 2, 6, 9, 3, 1, 4, 0, 7]
Tableau à trier: [8, 5, 2, 6, 9, 3, 1, 4, 0, 7]

États intermédiaires en fin de boucle externe (
i
i)
i	Trié	Non trié	Etat intermédiaire
0	[0]	[5, 2, 6, 9, 3, 1, 4, 8, 7]	[0, 5, 2, 6, 9, 3, 1, 4, 8, 7]
1	[0, 1]	[2, 6, 9, 3, 5, 4, 8, 7]	[0, 1, 2, 6, 9, 3, 5, 4, 8, 7]
2	[0, 1, 2]	[6, 9, 3, 5, 4, 8, 7]	[0, 1, 2, 6, 9, 3, 5, 4, 8, 7]
3	[0, 1, 2, 3]	[9, 6, 5, 4, 8, 7]	[0, 1, 2, 3, 9, 6, 5, 4, 8, 7]
4	[0, 1, 2, 3, 4]	[6, 5, 9, 8, 7]	[0, 1, 2, 3, 4, 6, 5, 9, 8, 7]
5	[0, 1, 2, 3, 4, 5]	[6, 9, 8, 7]	[0, 1, 2, 3, 4, 5, 6, 9, 8, 7]
6	[0, 1, 2, 3, 4, 5, 6]	[9, 8, 7]	[0, 1, 2, 3, 4, 5, 6, 9, 8, 7]
7	[0, 1, 2, 3, 4, 5, 6, 7]	[8, 9]	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
8	[0, 1, 2, 3, 4, 5, 6, 7, 8]	[9]	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Tableau trié: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

2.2. Algorithme
3. Tri par insertion (Insertion Sort)
3.1. Principe
Construit progressivement une partie triée du tableau de la gauche vers la droite.
Insère chaque nouvel élément à sa place dans la partie triée.


Tri par insertion (©Creative Commons Attribution-Share Alike 3.0 via Wikimedia)
NoneExemple : Tri par insertion de [6, 5, 3, 1, 8, 7, 2, 4]
Tableau à trier: [6, 5, 3, 1, 8, 7, 2, 4]

États intermédiaires en fin de boucle externe (
i
i)
i	Trié	Non trié	Etat intermédiaire
1	[5, 6]	[3, 1, 8, 7, 2, 4]	[5, 6, 3, 1, 8, 7, 2, 4]
2	[3, 5, 6]	[1, 8, 7, 2, 4]	[3, 5, 6, 1, 8, 7, 2, 4]
3	[1, 3, 5, 6]	[8, 7, 2, 4]	[1, 3, 5, 6, 8, 7, 2, 4]
4	[1, 3, 5, 6, 8]	[7, 2, 4]	[1, 3, 5, 6, 8, 7, 2, 4]
5	[1, 3, 5, 6, 7, 8]	[2, 4]	[1, 3, 5, 6, 7, 8, 2, 4]
6	[1, 2, 3, 5, 6, 7, 8]	[4]	[1, 2, 3, 5, 6, 7, 8, 4]
7	[1, 2, 3, 4, 5, 6, 7, 8]	[]	[1, 2, 3, 4, 5, 6, 7, 8]
Tableau trié: [1, 2, 3, 4, 5, 6, 7, 8]

3.2. Algorithme
4. Introduction à la complexité algorithmique
Pour quantifier la performance d’un algorithme on utilise deux mesures:

la complexité en temps: compte le nombre d’étapes de calcul.
la complexité en espace mémoire: mesure la mémoire auxiliaire utilisée par l’algorithme.
4.1. Limites de notre étude
Ce cours n’étant pas un cours d’algorithmique, on assimilera le nombre d’opérations au nombre de tours de boucles effectués sans compter les affectations, comparaisons…

4.2. Cas du tri à bulles
Au premier tour, 
i
=
n
−
1
i=n−1, 
j
j va de 0 à 
n
−
2
n−2 soit 
n
−
1
=
i
n−1=i tours de boucle.

Les tours suivants 
j
j fera toujours un tour de moins que le tour précédent.

n
b
o
p
=
(
n
−
1
)
+
(
n
−
2
)
+
⋯
+
1
=
∑
k
=
1
n
−
1
k
nb 
op
​
 =(n−1)+(n−2)+⋯+1= 
k=1
∑
n−1
​
 k

Sachant que la somme des 
n
n premiers entiers est 
n
(
n
+
1
)
2
2
n(n+1)
​
 .

n
b
o
p
=
n
(
n
−
1
)
2
=
n
2
2
−
n
2
→
n
→
+
∞
n
2
nb 
op
​
 = 
2
n(n−1)
​
 = 
2
n 
2
 
​
 − 
2
n
​
  
n→+∞
​
 n 
2
 

Ce tri est qualifié de quadratique, il inclus deux boucles imbriquées donc le nombre d’opérations croît proportionnellement à 
n
2
n 
2
 , lorsque n tend vers l’infini(complexité asymptotique).

AstuceDémonstration
4.3. Notations
Les complexités sont mesurées par rapport à 
n
n la taille des données et on distingue:

O
(
f
(
n
)
)
O(f(n)) : Complexité asymptotique supérieure (pire cas).
Ω
(
f
(
n
)
)
Ω(f(n)) : Complexité asymptotique inférieure (meilleur cas).
4.4. Cas du tri par insertion
En raison de la présence du tant que, l’algorithme n’effectue pas tours le m^me nombre d’opérations.

Meilleur cas : Le tableau est déjà trié. La boucle tant que n’est jamais exécutée. La complexité est donc linéaire 
Ω
(
n
)
Ω(n)
Pire cas: le tableau est à l’envers. La boucle tant que est exécutée 
i
i fois pour chaque élément du tableau. La complexité est donc au met au plus quadratique 
O
(
n
2
)
O(n 
2
 ).
5. Complexité des algorithmes de tri
Algorithme	Pire cas	Meilleur cas	Espace utilisé
Tri à bulles	
O
(
n
2
)
O(n 
2
 )	
O
(
n
2
)
O(n 
2
 )	
O
(
1
)
O(1)
Tri à bulles optimisé	
O
(
n
2
)
O(n 
2
 )	
O
(
n
)
O(n)	
O
(
1
)
O(1)
Tri par sélection	
O
(
n
2
)
O(n 
2
 )	
O
(
n
2
)
O(n 
2
 )	
O
(
1
)
O(1)
Tri par insertion	
O
(
n
2
)
O(n 
2
 )	
O
(
n
)
O(n)	
O
(
1
)
O(1)
6. Complexité des recherches
6.1. Recherche séquentielle
Nous avons déjà rencontré l’algorithme de recherche séquentielle en TD.

6.1.1. principe
Parcourt le tableau élément par élément jusqu’à trouver la valeur recherchée.

6.1.2. Complexité
Complexités temporelles de la recherche séquentielle
Cas	Complexité	Explication
Meilleur cas	
θ
(
1
)
θ(1)	L’élément recherché est en première position du tableau (indice 0).
Pire cas	
O
(
n
)
O(n)	L’élément recherché est en dernière position ou absent du tableau.
6.2. Recherche dichotomique
6.2.1. Principe
Nécessite un tableau trié. Divise le tableau en deux à chaque étape pour trouver la valeur.



Dichotomie vient du grec ancien διχοτομία, dikhotomia (« division en deux parties ») (©Creative Commons Attribution-Share Alike 4.0 via Wikimedia)
NoteDiviser pour régner
Cet algorithme appartient à la famille des algorithmes de diviser pour régner (divide and conquer).

Il est plus efficace que la recherche séquentielle de la famille des algorithmes de force brute(brute force), mais nécessite un tableau trié.

6.2.2. Algorithme
6.2.3. Complexité
Cas	Complexité	Explication
Meilleur cas	
θ
(
1
)
θ(1)	L’élément recherché est exactement au milieu du tableau dès la première comparaison.
Pire cas	
O
(
log
⁡
n
)
O(logn)	L’élément recherché est absent ou nécessite un nombre maximal de divisions du tableau.
Cas moyen	
O
(
log
⁡
n
)
O(logn)	L’élément est présent et nécessite en moyenne 
log
⁡
2
n
log 
2
​
 n comparaisons.
NoteFonction logarithme en informatique
En informatique, le logarithme est souvent utilisé avec la base 2, car il est lié à la notion de division binaire.

Le log en base deux est l’opération inverse de l’exponentiation par deux. Par exemple, 
log
⁡
2
8
=
3
log 
2
​
 8=3 car 
2
3
=
8
2 
3
 =8.

Sa croissance est donc beaucoup plus lente que 
n
n.

Valeurs de log₂(n), n, et n² pour n allant de 2 à 1024.
log₂(n)	n	n²
1	2	4
2	4	16
3	8	64
4	16	256
5	32	1024
6	64	4096
7	128	16384
8	256	65536
9	512	262144
10	1024	1048576
7. Tri fusion(Merge Sort)
Nous allons utiliser la méthode «Diviser pour régner» à l’algorithme de tri.

Ceci nous permettra d’atteindre la meilleure complexité possible pour un tri 
O
(
n
log
⁡
n
)
O(nlogn).

7.1. Principe
Divise le tableau en sous-tableaux de taille 1: 
O
(
log
⁡
n
)
O(logn).
Fusionne les sous-tableaux triés deux à deux en les triant: 
O
(
n
)
O(n).


On divise le tableau en sous-tableaux d’un élément (forcément trié) qu’il ne reste alors plus qu’à fusionner. Cette illustration représente la version récursive, mais le principe reste le même. (©Public domain via Wikimedia)
7.2. Algorithme
7.3. Complexité
Pire cas, moyen et meilleur cas : 
O
(
n
log
⁡
n
)
O(nlogn).
Espace utilisé : 
O
(
n
)
O(n) (nécessite un tableau temporaire).
La complexité temporelle est bien meilleur que 
n
2
n 
2
 .

log₂(n)	n	n log₂(n)	n²
1	2	2	4
2	4	8	16
3	8	24	64
4	16	64	256
5	32	160	1024
6	64	384	4096
7	128	896	16384
8	256	2048	65536
9	512	4608	262144
10	1024	10240	1048576
8. Comparaison des tris itératifs
Algorithme	En place	Complexité	Utilisation pratique
Tri à bulles	Oui	
O
(
n
2
)
O(n 
2
 )	Éducatif, petits tableaux
Tri par sélection	Oui	
O
(
n
2
)
O(n 
2
 )	Éducatif, petits tableaux
Tri par insertion	Oui	
O
(
n
2
)
O(n 
2
 )	Tableaux presque triés(descend à 
θ
(
n
)
θ(n))
Tri fusion	Non	
O
(
n
log
⁡
n
)
O(nlogn)	Grandes données, mais avec mémoire auxiliaire
9. À retenir
Les algorithmes de tri itératifs évitent la récursivité, ce qui peut être utile pour optimiser la mémoire.
La complexité algorithmique permet de comparer objectivement les performances des algorithmes.
Le choix d’un algorithme de tri dépend du contexte (taille des données, mémoire disponible).
Une fois triées, les données permettent des recherches efficaces (recherche dichotomique).
TD5B
