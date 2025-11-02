// Ce script sera vide pour l'instant.
// Il sera rempli à la prochaine étape.

document.addEventListener('DOMContentLoaded', () => {
    // Initialise le compilateur C via WebAssembly
    const tcc = new TCC();
    
    // Cible directement les balises <pre> qui ont notre classe
    const codeBlocks = document.querySelectorAll('pre.interactive-c');

    codeBlocks.forEach(preElement => {
        const parentDiv = preElement.parentElement; // Le <div class="sourceCode">
        const initialCode = preElement.textContent.trim();
        
        // Crée la structure HTML pour l'éditeur, le header et l'output
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
});
