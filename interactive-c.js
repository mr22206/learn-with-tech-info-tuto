// Ce script sera vide pour l'instant.
// Il sera rempli à la prochaine étape.

function initializeInteractiveBlocks() {
    if (document.querySelector('.interactive-c-container')) {
        return;
    }

    const codeBlocks = document.querySelectorAll('pre.interactive-c');
    
    if (codeBlocks.length === 0) {
        return;
    }

    if (intervalId) {
        clearInterval(intervalId);
    }
    
    const tcc = new TCC();
    
    codeBlocks.forEach(preElement => {
        const parentDiv = preElement.parentElement;
        
        // Reconstitution intelligente du code source
        let initialCode = '';
        const lines = preElement.querySelectorAll('span[id^="cb"]');
        lines.forEach(line => {
            initialCode += line.innerText + '\n';
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

const intervalId = setInterval(initializeInteractiveBlocks, 100);

setTimeout(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
}, 5000);
