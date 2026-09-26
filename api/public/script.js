class Code {
    constructor() {
        this.code = '';
        this.translate_endpoint = '/UI/Translate';

        document.getElementById('btn-expression-insert').addEventListener('click', async (tx,ld) => {
            const expression = document.getElementById('expression').value;
            const targetlanguage = document.getElementById('select_target_language').value;
            // Handle the expression insertion logic here

            try {
                const response = await fetch(this.translate_endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ expression: expression, target_language: targetlanguage })
            });
            const result = await response.json();

            document.getElementById("sp_traducao").textContent = `> ${result.translation.text}`;
            document.getElementById("sp_origem_traducao").textContent =`detectado do: ${result.translation.origin_language}`;

            } catch (error) {
                console.log("Error Front:");
                console.log(error);
            }

        });

    };

    

    mountToTranslate = () => {
        urlDestino.searchParams.append('text',tx)
        urlDestino.searchParams.append('text','ld')
    }

}

const code = new Code();