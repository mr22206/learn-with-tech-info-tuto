// Ce script sera vide pour l'instant.
// Il sera rempli à la prochaine étape.

// Fonction qui transforme les blocs de code statiques en éditeurs interactifs
function initializeInteractiveBlocks() {
    const codeBlocks = document.querySelectorAll('pre.interactive-c:not(.processed)');
    
    if (codeBlocks.length === 0) {
        return;
    }

    // On arrête l'observateur une fois qu'on a trouvé les blocs pour éviter le travail inutile
    observer.disconnect();

    const tcc = new TCC();
    
    codeBlocks.forEach(preElement => {
        preElement.classList.add('processed'); // Marque le bloc pour ne pas le retraiter
        const parentDiv = preElement.parentElement;
        
        let initialCode = '';
        const lines = preElement.querySelectorAll('span[id^="cb"]');
        lines.forEach(line => {
            initialCode += line.textContent + '\n';
        });

        const container = document.createElement('div');
        container.className = 'interactive-c-container';

        const header = document.createElement('div');
        header.className = 'interactive-c-header';

        const runButton = document.createElement('button');
        runButton.className = 'interactive-c-run-btn';
        runButton.textContent = '▶ Exécuter';
        
        const editorWrapper = document.createElement('div');

        const output = document.createElement('pre');
        output.className = 'interactive-c-output';
        output.textContent = 'Le résultat s\'affichera ici...';

        header.appendChild(runButton);
        container.appendChild(header);
        container.appendChild(editorWrapper);
        container.appendChild(output);
        
        parentDiv.parentElement.replaceChild(container, parentDiv);

        const editor = CodeMirror(editorWrapper, {
            value: initialCode.trim(),
            mode: 'text/x-csrc',
            lineNumbers: true,
            theme: 'eclipse'
        });

        runButton.addEventListener('click', async () => {
            const code = editor.getValue();
            output.textContent = 'Compilation en cours...';

            try {
                const result = await tcc.compile(code);
                if (result.exitCode === 0) {
                    const stdout = new TextDecoder().decode(result.stdout);
                    const stderr = new TextDecoder().decode(result.stderr);
                    let outputText = '';
                    if (stdout) outputText += `${stdout}`;
                    if (stderr) outputText += `\n${stderr}`;
                    output.textContent = outputText.trim() || 'Le programme s\'est exécuté sans rien afficher.';
                } else {
                    const stderr = new TextDecoder().decode(result.stderr);
                    output.textContent = `Erreur de compilation :\n${stderr}`;
                }
            } catch (error) {
                output.textContent = `Une erreur inattendue est survenue : ${error.message}`;
            }
        });
    });
}

// L'observateur qui attend les modifications du DOM
const observer = new MutationObserver(() => {
    // Dès qu'une modification a lieu, on vérifie si nos blocs sont là
    initializeInteractiveBlocks();
});

// Cible la zone de contenu principale de Quarto
const mainContent = document.getElementById('quarto-document-content');
if (mainContent) {
    observer.observe(mainContent, {
        childList: true,
        subtree: true
    });
}

// Un appel de secours au cas où les éléments seraient déjà là au moment où le script s'exécute
window.addEventListener('load', initializeInteractiveBlocks);
