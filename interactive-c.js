// Script d'exécution de code C interactif
document.addEventListener('DOMContentLoaded', function() {
    // Attendre que CodeMirror soit chargé
    if (typeof CodeMirror === 'undefined') {
        setTimeout(arguments.callee, 100);
        return;
    }

    // Initialiser tous les blocs de code interactifs
    const codeBlocks = document.querySelectorAll('pre.interactive-c');
    codeBlocks.forEach(block => {
        initializeInteractiveBlock(block);
    });
});

function initializeInteractiveBlock(preElement) {
    // Créer la structure interactive
    const container = document.createElement('div');
    container.className = 'interactive-c-container';
    container.style.cssText = `
        border: 2px solid #ddd;
        border-radius: 8px;
        margin: 1em 0;
        padding: 1em;
        background: #f9f9f9;
    `;

    const header = document.createElement('div');
    header.className = 'interactive-c-header';
    header.style.cssText = `
        display: flex;
        justify-content: flex-end;
        margin-bottom: 0.5em;
    `;

    const runButton = document.createElement('button');
    runButton.textContent = '▶ Exécuter';
    runButton.className = 'run-button';
    runButton.style.cssText = `
        background: #28a745;
        color: white;
        border: none;
        padding: 0.5em 1em;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
    `;

    const editorContainer = document.createElement('div');
    editorContainer.style.cssText = `
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 1em;
    `;

    const output = document.createElement('pre');
    output.className = 'output';
    output.style.cssText = `
        background: #333;
        color: #fff;
        padding: 1em;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
        min-height: 100px;
    `;
    output.textContent = 'Le résultat s\'affichera ici...';

    header.appendChild(runButton);
    container.appendChild(header);
    container.appendChild(editorContainer);
    container.appendChild(output);

    // Remplacer le bloc pré par le conteneur interactif
    preElement.parentElement.replaceChild(container, preElement.parentElement);

    // Initialiser CodeMirror
    const editor = CodeMirror(editorContainer, {
        value: extractCodeFromPre(preElement),
        mode: 'text/x-csrc',
        lineNumbers: true,
        theme: 'default',
        readOnly: false
    });

    // Gestionnaire d'événement pour le bouton
    runButton.addEventListener('click', async function() {
        const code = editor.getValue();
        output.textContent = 'Compilation en cours...';

        try {
            // Utiliser une approche différente pour l'exécution
            await executeCCode(code, output);
        } catch (error) {
            output.textContent = `Erreur : ${error.message}`;
        }
    });
}

function extractCodeFromPre(preElement) {
    // Extraire le code des spans colorés
    const spans = preElement.querySelectorAll('span[id^="cb"]');
    let code = '';
    spans.forEach(span => {
        code += span.textContent + '\n';
    });
    return code.trim();
}

async function executeCCode(code, outputElement) {
    // Pour l'instant, simulons l'exécution
    // Dans une vraie implémentation, nous utiliserions WebAssembly
    outputElement.textContent = 'Fonctionnalité en développement...\n\nCode reçu :\n' + code;

    // Simulation d'une compilation
    setTimeout(() => {
        if (code.includes('printf')) {
            outputElement.textContent += '\n\nSimulation : Le code contient printf()';
        } else {
            outputElement.textContent += '\n\nSimulation : Code compilé sans erreurs';
        }
    }, 1000);
}
