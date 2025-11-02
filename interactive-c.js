// Ce script sera vide pour l'instant.
// Il sera rempli à la prochaine étape.

function initializeInteractiveBlocks() {
    // Si les blocs sont déjà initialisés, on ne fait rien
    if (document.querySelector('.interactive-c-container')) {
        return;
    }

    const codeBlocks = document.querySelectorAll('pre.interactive-c');
    
    // Si on ne trouve pas encore les blocs, on ne fait rien pour l'instant
    if (codeBlocks.length === 0) {
        return;
    }

    // On a trouvé les blocs, on peut arrêter de vérifier
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    const tcc = new TCC();
    
    codeBlocks.forEach(preElement => {
        const parentDiv = preElement.parentElement;
        const initialCode = preElement.textContent.trim();
        
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
        
        // Remplace l'ancien conteneur de code par notre nouvelle structure
        parentDiv.parentElement.replaceChild(container, parentDiv);

        // Initialise l'éditeur CodeMirror
        const editor = CodeMirror(editorWrapper, {
            value: initialCode,
            mode: 'text/x-csrc',
            lineNumbers: true,
            theme: 'eclipse'
        });

        // Gère l'événement du clic sur le bouton "Exécuter"
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

// On lance une vérification toutes les 100ms
const intervalId = setInterval(initializeInteractiveBlocks, 100);

// Sécurité : on arrête tout après 5 secondes si rien n'est trouvé
setTimeout(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
}, 5000);
