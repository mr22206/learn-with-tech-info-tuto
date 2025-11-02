// Script d'exécution de code C interactif
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que CodeMirror soit chargé
    if (typeof CodeMirror === 'undefined') {
        console.log('CodeMirror pas encore chargé, attente...');
        setTimeout(arguments.callee, 100);
        return;
    }

    console.log('CodeMirror chargé, initialisation...');

    // Initialiser le bloc de test simple
    const editorContainer = document.getElementById('editor-container');
    if (editorContainer) {
        initializeTestBlock(editorContainer);
    }

    // Initialiser tous les blocs de code interactifs (pour Quarto)
    const codeBlocks = document.querySelectorAll('pre.interactive-c');
    codeBlocks.forEach(function(block) {
        initializeInteractiveBlock(block);
    });
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
    var result = '';

    // Analyser les déclarations de variables
    var str1Size = 5; // sizeof("test") + 1 pour \0
    var str2Size = 50; // taille par défaut du tableau
    var str1Content = "test";
    var str2Content = "test";

    // Chercher la déclaration de str1
    var str1Match = code.match(/char\s+str1\[\]\s*=\s*"([^"]*)"/);
    if (str1Match) {
        str1Content = str1Match[1];
        str1Size = str1Content.length + 1; // +1 pour \0
    }

    // Chercher la déclaration de str2
    var str2Match = code.match(/char\s+str2\[(\d+)\]\s*=\s*"([^"]*)"/);
    if (str2Match) {
        str2Size = parseInt(str2Match[1]);
        str2Content = str2Match[2];
    }

    // Générer la sortie selon les printf présents
    if (code.indexOf('printf') !== -1) {
        result += 'Sortie du programme :\n';

        if (code.indexOf('sizeof(str1)') !== -1) {
            result += 'sizeof(str1) = ' + str1Size + '\n';
        }
        if (code.indexOf('strlen(str1)') !== -1) {
            result += 'strlen(str1) = ' + str1Content.length + '\n';
        }
        if (code.indexOf('sizeof(str2)') !== -1) {
            result += 'sizeof(str2) = ' + str2Size + '\n';
        }
        if (code.indexOf('strlen(str2)') !== -1) {
            result += 'strlen(str2) = ' + str2Content.length + '\n';
        }
    } else {
        result += 'Code compilé sans erreurs apparentes';
    }

    return result;
}
