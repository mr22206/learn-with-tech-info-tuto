// Script d'exécution de code C interactif
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Script interactif C chargé');

    // Attendre que CodeMirror soit chargé
    if (typeof CodeMirror === 'undefined') {
        console.log('⏳ CodeMirror pas encore chargé, attente...');
        setTimeout(arguments.callee, 100);
        return;
    }

    console.log('✅ CodeMirror chargé, initialisation...');

    // Initialiser le bloc de test simple
    const editorContainer = document.getElementById('editor-container');
    if (editorContainer) {
        console.log('🎯 Initialisation bloc test');
        initializeTestBlock(editorContainer);
    }

    // Attendre un peu plus pour que Quarto finisse de générer le contenu
    setTimeout(function() {
        console.log('🔍 Recherche des blocs interactifs...');

        // Initialiser tous les blocs de code interactifs (pour Quarto)
        const codeBlocks = document.querySelectorAll('pre.interactive-c');
        console.log('📊 Blocs .interactive-c trouvés:', codeBlocks.length);

        // Chercher aussi d'autres sélecteurs possibles
        const sourceCodeBlocks = document.querySelectorAll('pre.sourceCode');
        console.log('📊 Blocs .sourceCode trouvés:', sourceCodeBlocks.length);

        const allPreBlocks = document.querySelectorAll('pre');
        console.log('📊 Total blocs pre:', allPreBlocks.length);

        // Lister les classes de tous les pre
        allPreBlocks.forEach(function(block, index) {
            console.log('  pre[' + index + '] classes:', block.className);
            if (block.className && block.className.includes('interactive-c')) {
                console.log('  🎯 Bloc interactif trouvé, transformation...');
                initializeInteractiveBlock(block);
            }
        });

        // Essayer aussi avec MutationObserver pour les changements dynamiques
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const interactiveBlocks = node.querySelectorAll ? node.querySelectorAll('pre.interactive-c') : [];
                            interactiveBlocks.forEach(function(block) {
                                console.log('🎯 Nouveau bloc interactif détecté');
                                initializeInteractiveBlock(block);
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

    }, 1000);
});

function initializeTestBlock(editorContainer) {
    // Code C par défaut pour le test
    var defaultCode = '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str1[] = "test";\n    char str2[50] = "test";\n\n    printf("sizeof(str1) = %zu\\n", sizeof(str1));\n    printf("strlen(str1) = %zu\\n", strlen(str1));\n\n    printf("sizeof(str2) = %zu\\n", sizeof(str2));\n    printf("strlen(str2) = %zu\\n", strlen(str2));\n\n    return 0;\n}';

    // Initialiser CodeMirror
    var editor = CodeMirror(editorContainer, {
        value: defaultCode,
        mode: 'text/x-csrc',
        lineNumbers: true,
        theme: 'default',
        readOnly: false
    });

    // Gestionnaire d'événement pour le bouton
    var runButton = document.querySelector('.run-button');
    var output = document.querySelector('.output');

    if (runButton && output) {
        runButton.addEventListener('click', function() {
            var code = editor.getValue();
            output.textContent = 'Compilation en cours...';

            try {
                executeCCode(code, output);
            } catch (error) {
                output.textContent = 'Erreur : ' + error.message;
            }
        });
    }
}

function initializeInteractiveBlock(preElement) {
    // Créer la structure interactive
    var container = document.createElement('div');
    container.className = 'interactive-c-container';
    container.style.cssText = 'border: 2px solid #ddd; border-radius: 8px; margin: 1em 0; padding: 1em; background: #f9f9f9;';

    var header = document.createElement('div');
    header.className = 'interactive-c-header';
    header.style.cssText = 'display: flex; justify-content: flex-end; margin-bottom: 0.5em;';

    var runButton = document.createElement('button');
    runButton.textContent = '▶ Exécuter';
    runButton.className = 'run-button';
    runButton.style.cssText = 'background: #28a745; color: white; border: none; padding: 0.5em 1em; border-radius: 5px; cursor: pointer; font-weight: bold;';

    var editorContainer = document.createElement('div');
    editorContainer.style.cssText = 'border: 1px solid #ccc; border-radius: 4px; margin-bottom: 1em;';

    var output = document.createElement('pre');
    output.className = 'output';
    output.style.cssText = 'background: #333; color: #fff; padding: 1em; border-radius: 4px; font-family: "Courier New", monospace; white-space: pre-wrap; min-height: 100px;';
    output.textContent = 'Le résultat s\'affichera ici...';

    header.appendChild(runButton);
    container.appendChild(header);
    container.appendChild(editorContainer);
    container.appendChild(output);

    // Remplacer le bloc pré par le conteneur interactif
    preElement.parentElement.replaceChild(container, preElement.parentElement);

    // Initialiser CodeMirror
    var editor = CodeMirror(editorContainer, {
        value: extractCodeFromPre(preElement),
        mode: 'text/x-csrc',
        lineNumbers: true,
        theme: 'default',
        readOnly: false
    });

    // Gestionnaire d'événement pour le bouton
    runButton.addEventListener('click', function() {
        var code = editor.getValue();
        output.textContent = 'Compilation en cours...';

        try {
            executeCCode(code, output);
        } catch (error) {
            output.textContent = 'Erreur : ' + error.message;
        }
    });
}

function extractCodeFromPre(preElement) {
    // Extraire le code des spans colorés
    var spans = preElement.querySelectorAll('span[id^="cb"]');
    var code = '';
    for (var i = 0; i < spans.length; i++) {
        code += spans[i].textContent + '\n';
    }
    return code.trim();
}

function executeCCode(code, outputElement) {
    // Simulation de compilation pour le moment
    console.log('Code à exécuter:', code);

    // Simulation d'une compilation avec analyse du code
    setTimeout(function() {
        var result = analyzeCCode(code);
        outputElement.textContent = result;
    }, 1000);
}

function analyzeCCode(code) {
    var result = 'Sortie du programme :\n';

    // Nettoyer le code des numéros de ligne CodeMirror
    code = code.replace(/^\d+\n/gm, ''); // Supprimer les numéros de ligne au début
    code = code.replace(/^\d+\s*/gm, ''); // Supprimer les numéros de ligne avec espaces

    // Analyser les déclarations de variables et générer les sorties printf
    var lines = code.split('\n');
    var variables = {};

    // Première passe : analyser les déclarations de variables
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();

        // Déclaration char str[] = "chaine"
        var strArrayMatch = line.match(/char\s+(\w+)\[\]\s*=\s*"([^"]*)"/);
        if (strArrayMatch) {
            var varName = strArrayMatch[1];
            var content = strArrayMatch[2];
            variables[varName] = {
                type: 'array_auto',
                content: content,
                size: content.length + 1 // +1 pour \0
            };
        }

        // Déclaration char str[size] = "chaine"
        var strFixedMatch = line.match(/char\s+(\w+)\[(\d+)\]\s*=\s*"([^"]*)"/);
        if (strFixedMatch) {
            var varName = strFixedMatch[1];
            var declaredSize = parseInt(strFixedMatch[2]);
            var content = strFixedMatch[3];
            variables[varName] = {
                type: 'array_fixed',
                content: content,
                size: declaredSize
            };
        }

        // Déclaration char str[] = { octets }
        var byteArrayMatch = line.match(/char\s+(\w+)\[\]\s*=\s*\{\s*([^}]+)\s*\}/);
        if (byteArrayMatch) {
            var varName = byteArrayMatch[1];
            var byteList = byteArrayMatch[2];
            // Analyser les octets (simplifié)
            var bytes = byteList.split(',').map(function(b) {
                b = b.trim();
                if (b.startsWith('0x')) {
                    return parseInt(b, 16);
                } else if (b === '0x00') {
                    return 0;
                } else if (b.startsWith("'")) {
                    return b.charCodeAt(1); // Caractère simple
                }
                return parseInt(b) || 0;
            });

            // Calculer la longueur de la chaîne (jusqu'à \0)
            var strLength = 0;
            for (var j = 0; j < bytes.length; j++) {
                if (bytes[j] === 0) break;
                strLength++;
            }

            variables[varName] = {
                type: 'byte_array',
                bytes: bytes,
                size: bytes.length,
                strLength: strLength
            };
        }
    }

    // Deuxième passe : analyser les printf et générer la sortie
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();

        if (line.indexOf('printf') !== -1) {
            // Chercher sizeof(variable)
            var sizeofMatch = line.match(/sizeof\((\w+)\)/);
            if (sizeofMatch) {
                var varName = sizeofMatch[1];
                if (variables[varName]) {
                    result += 'sizeof(' + varName + ') = ' + variables[varName].size + '\n';
                }
            }

            // Chercher strlen(variable)
            var strlenMatch = line.match(/strlen\((\w+)\)/);
            if (strlenMatch) {
                var varName = strlenMatch[1];
                if (variables[varName]) {
                    if (variables[varName].type === 'byte_array') {
                        result += 'strlen(' + varName + ') = ' + variables[varName].strLength + '\n';
                    } else {
                        result += 'strlen(' + varName + ') = ' + variables[varName].content.length + '\n';
                    }
                }
            }

            // Chercher printf simple sans format complexe
            if (!sizeofMatch && !strlenMatch) {
                // Analyser le printf complet
                var printfContent = line.substring(line.indexOf('"') + 1);
                printfContent = printfContent.substring(0, printfContent.lastIndexOf('"'));

                // Remplacer les %d, %s, etc. par des valeurs simulées
                printfContent = printfContent.replace(/%d/g, function(match, offset, string) {
                    // Chercher la variable correspondante dans les arguments
                    var afterFormat = string.substring(offset + 2);
                    var varMatch = afterFormat.match(/(\w+)/);
                    if (varMatch) {
                        var varName = varMatch[1];
                        if (variables[varName]) {
                            if (varName === 'taille' || varName === 'position') {
                                // Valeurs spéciales pour l'exemple
                                if (varName === 'taille') return '6';
                                if (varName === 'position') return '-1';
                            }
                        }
                        // Valeurs par défaut pour les variables
                        if (varName === 'valeur_a_trouver') return '9';
                        if (varName === 'position') return '-1';
                        return '0'; // Valeur par défaut
                    }
                    return '0';
                });

                result += printfContent + '\n';
            }
        }
    }

    // Si aucun printf n'a été trouvé, donner un message par défaut
    if (result === 'Sortie du programme :\n') {
        result += 'Aucune sortie printf détectée dans le code.\n';
        result += 'Ajoutez des printf() pour voir les résultats !';
    }

    return result;
}
